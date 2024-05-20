use actix_cors::Cors;
use actix_files;
use actix_web::{web, App, HttpResponse, HttpServer};
use handlers::{database::redis_db::redis_test, 
    server::files::{delete_file, list_files, update_file, upload}}
;
use std::path::Path;
use tokio::fs as tokio_fs;

pub mod handlers;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let _ = redis_test().await;

    if !Path::new("./assets/").exists() {
        tokio_fs::create_dir_all("./assets/").await?;
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
            .service(actix_files::Files::new("/assets", "./assets/").show_files_listing())
            .route("/", web::get().to(root))
            .route("/upload", web::post().to(upload))
            .route("/files", web::get().to(list_files))
            .route("/delete/{filename}", web::delete().to(delete_file))
            .route("/update", web::post().to(update_file))
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}

async fn root() -> HttpResponse {
    HttpResponse::Ok().body("Server is up and running.")
}
