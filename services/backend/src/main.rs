use actix_cors::Cors;
use actix_web::{web, App, HttpRequest, HttpResponse, HttpServer};
use futures_util::TryStreamExt;
use serde_json::json;
use std::fs;
use std::io;
use std::path::Path;
use tokio::fs as tokio_fs;
use tokio::io::AsyncWriteExt;

#[actix_web::main]
async fn main() -> io::Result<()> {
    if !Path::new("./upload").exists() {
        tokio_fs::create_dir("./upload").await?;
    }

    HttpServer::new(|| {
        App::new()
            .wrap(
                Cors::permissive(), // Use permissive() instead of new()
            )
            .route("/", web::get().to(root))
            .route("/upload", web::post().to(upload))
            .route("/files", web::get().to(list_files)) // New route for listing files
    })
    .bind(("127.0.0.1", 9191))?
    .run()
    .await
}

async fn root() -> String {
    "Server is up and running.".to_string()
}

async fn upload(mut payload: actix_multipart::Multipart, req: HttpRequest) -> HttpResponse {
    let content_length: usize = match req.headers().get("content-length") {
        Some(header_value) => header_value.to_str().unwrap_or("0").parse().unwrap(),
        None => 0,
    };

    let max_file_count: usize = 3;
    let max_file_size: usize = 10_000_000; // Increased file size limit

    if content_length > max_file_size {
        return HttpResponse::BadRequest().finish();
    }

    let dir: &str = "./upload/";

    let mut current_count: usize = 0;
    while current_count < max_file_count {
        if let Some(mut field) = payload.try_next().await.unwrap() {
            let filename = match field.content_disposition().get_filename() {
                Some(name) => name,
                None => "unknown_file",
            };
            let destination = format!("{}{}", dir, filename);

            let mut saved_file = tokio_fs::File::create(&destination).await.unwrap();
            while let Some(chunk) = field.try_next().await.unwrap() {
                saved_file.write_all(&chunk).await.unwrap();
            }
            current_count += 1;
        } else {
            break;
        }
    }

    HttpResponse::Ok().finish()
}

async fn list_files() -> Result<HttpResponse, io::Error> {
    let dir = "./upload";
    let mut files = Vec::new();

    // Read directory and collect filenames
    if let Ok(entries) = fs::read_dir(dir) {
        for entry in entries {
            if let Ok(entry) = entry {
                if let Some(filename) = entry.file_name().to_str() {
                    files.push(filename.to_owned());
                }
            }
        }
    } else {
        return Ok(HttpResponse::InternalServerError().finish());
    }

    // Serialize files list to JSON
    let json_response = json!({ "files": files });

    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(json_response.to_string()))
}