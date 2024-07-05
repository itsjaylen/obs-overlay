use actix_web::{Error, HttpRequest, HttpResponse};
use rand::Rng;
use std::io;

//TODO implement later

const CSRF_TOKEN_LENGTH: usize = 32;

pub async fn get_csrf() -> Result<HttpResponse, io::Error> {
    let csrf_token = generate_csrf_token().await;

    Ok(HttpResponse::Ok()
        .content_type("text/plain")
        .body(csrf_token))
}

pub async fn validate_csrf(req: HttpRequest) -> Result<&'static str, Error> {
    let csrf_token = req
        .headers()
        .get("X-CSRF-Token")
        .and_then(|value| value.to_str().ok());

    let stored_csrf_token = "your_stored_csrf_token";

    match csrf_token {
        Some(token) if token == stored_csrf_token => Ok("CSRF token is valid"),
        _ => Err(actix_web::error::ErrorBadRequest("Invalid CSRF token")),
    }
}

async fn generate_csrf_token() -> String {
    let mut rng = rand::thread_rng();
    (0..CSRF_TOKEN_LENGTH)
        .map(|_| rng.sample(rand::distributions::Alphanumeric) as char)
        .collect()
}
