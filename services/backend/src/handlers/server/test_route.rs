use actix_multipart::Multipart;
use actix_web::{HttpRequest, HttpResponse};

pub async fn upload_with_custom_header(_payload: Multipart, req: HttpRequest) -> HttpResponse {
    // Get the custom header value
    let custom_header = match req.headers().get("X-CSRF-Token") {
        Some(header_value) => match header_value.to_str() {
            Ok(value) => value,
            Err(_) => return HttpResponse::BadRequest().body("Invalid X-CSRF-Token value"),
        },
        None => return HttpResponse::BadRequest().body("X-CSRF-Token is required"),
    };

    // Print the custom header value
    println!("Received custom header: {}", custom_header);

    let csrf_token =" generate_csrf_token().await;".to_string();

    // Return a successful response
    HttpResponse::Ok().body(csrf_token)
}