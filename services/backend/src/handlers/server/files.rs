use actix_multipart::Multipart;
use actix_web::{HttpRequest, HttpResponse};
use futures_util::TryStreamExt;
use serde_json::json;
use std::io;
use tokio::io::AsyncWriteExt;
use tokio::{fs as tokio_fs, task};

use crate::handlers::database::models::UpdatedObject;
use crate::handlers::server::events::on_delete::on_delete;
use crate::handlers::server::events::on_update::on_update;
use crate::handlers::server::events::on_upload::on_upload;
use crate::handlers::server::utils::parse::{
    parse_multipart_data, parse_optional_bool, parse_optional_int,
};

use super::events::tasks::redis_tasks::update_expired_keys;

pub async fn upload(mut payload: Multipart, req: HttpRequest) -> HttpResponse {
    let content_length: usize = req
        .headers()
        .get("content-length")
        .and_then(|header_value| header_value.to_str().ok())
        .and_then(|s| s.parse().ok())
        .unwrap_or(0);

    let max_file_count: usize = 3;
    let max_file_size: usize = 10_000_000;

    if content_length > max_file_size {
        return HttpResponse::BadRequest().finish();
    }

    let dir: &str = "./assets/";

    let mut current_count: usize = 0;
    while current_count < max_file_count {
        if let Some(mut field) = payload.try_next().await.unwrap() {
            let filename = field
                .content_disposition()
                .get_filename()
                .unwrap_or("unknown_file");
            let destination = format!("{}{}", dir, filename);

            let mut saved_file = tokio_fs::File::create(&destination)
                .await
                .unwrap_or_else(|_| panic!("Failed to create file: {}", filename));

            let _ = on_upload(filename.to_owned()).await;

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

pub async fn list_files() -> Result<HttpResponse, io::Error> {
    let dir = "./assets/";
    let mut files = Vec::new();

    if let Ok(entries) = std::fs::read_dir(dir) {
        for entry in entries {
            if let Ok(entry) = entry {
                if let Some(file_path) = entry.path().to_str() {
                    files.push(file_path.to_owned());
                }
            }
        }
    } else {
        return Ok(HttpResponse::InternalServerError().finish());
    }

    let json_response = json!({ "files": files });

    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(json_response.to_string()))
}

pub async fn delete_file(req: HttpRequest) -> HttpResponse {
    let filename = req.match_info().get("filename").unwrap_or("unknown_file");
    let file_path = format!("./assets/{}", filename);

    on_delete(filename.to_owned()).await;

    if let Err(_) = tokio_fs::remove_file(&file_path).await {
        println!("Deleted {} successfully.", filename);

        return HttpResponse::InternalServerError().finish();
    }

    HttpResponse::Ok().finish()
}

pub async fn update_file(mut payload: Multipart, _req: HttpRequest) -> HttpResponse {
    let data = parse_multipart_data(&mut payload).await;

    if let Some(url) = data.get("url") {
        let updated_object = UpdatedObject {
            url: url.to_string(),
            clientx: parse_optional_int(&data, "clientx"),
            clienty: parse_optional_int(&data, "clienty"),
            scalex: parse_optional_int(&data, "scalex"),
            scaley: parse_optional_int(&data, "scaley"),
            clientrotation: parse_optional_int(&data, "clientrotation"),
            visible: parse_optional_bool(&data, "visible"),
            draggable: parse_optional_bool(&data, "draggable"),
            throttledrag: parse_optional_int(&data, "throttledrag"),
            edgedraggable: parse_optional_bool(&data, "edgedraggable"),
            startdragrotate: parse_optional_int(&data, "startdragrotate"),
            throttledragrotate: parse_optional_int(&data, "throttledragrotate"),
            scalable: parse_optional_bool(&data, "scalable"),
            keepratio: parse_optional_bool(&data, "keepratio"),
            throttlescale: parse_optional_int(&data, "throttlescale"),
            renderdirections: None,
            rotatable: parse_optional_bool(&data, "rotatable"),
            throttlerotate: parse_optional_int(&data, "throttlerotate"),
            rotationposition: data.get("rotationposition").map(|s| s.to_string()),
        };

        on_update(updated_object.url.to_string(), updated_object).await;

        HttpResponse::Ok().finish()
    } else {
        HttpResponse::BadRequest().body("URL is required")
    }
}

pub async fn force_update_keys() -> HttpResponse {
    // Spawn a new task to update expired keys
    task::spawn(async {
        if let Err(e) = update_expired_keys().await {
            eprintln!("Failed to update expired keys: {}", e);
        }
    });

    HttpResponse::Ok().body("Redis keys has been force updated.")
}
