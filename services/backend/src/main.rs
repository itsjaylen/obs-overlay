 use actix_cors::Cors;
use actix_web::{web, App, HttpRequest, HttpResponse, HttpServer};
use actix_files;
use futures_util::TryStreamExt;
use serde_json::json;
use std::fs;
use std::io;
use tokio::fs as tokio_fs;
use tokio::io::AsyncWriteExt;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    if !std::path::Path::new("./images").exists() {
        tokio::fs::create_dir("./images").await?;
    }

    let port: u16 = match std::env::var("PORT") {
        Ok(port_str) => port_str.parse().expect("PORT must be a valid u16"),
        Err(_) => {
            println!("No PORT environment variable set, using default port 9191");
            9191
        }
    };

    HttpServer::new(|| {
        App::new()
    .wrap(Cors::permissive())
    .service(actix_files::Files::new("/static", "./static").show_files_listing()) // for other static files
    .service(actix_files::Files::new("/images", "./images").show_files_listing()) // for images
    .route("/", web::get().to(root))
    .route("/upload", web::post().to(upload))
    .route("/files", web::get().to(list_files))

    })
    .bind(("0.0.0.0", port))?
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
    let max_file_size: usize = 10_000_000;

    if content_length > max_file_size {
        return HttpResponse::BadRequest().finish();
    }

    let dir: &str = "./images/";

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
    let dir = "./images";
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
