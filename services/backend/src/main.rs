use actix::spawn;
use actix_cors::Cors;
use actix_files as fs;
use actix_web::{web, App, HttpResponse, HttpServer};
use handlers::server::{
    events::{on_run::on_run, tasks::redis_tasks::update_expired_keys},
    routes::{delete_file, force_update_keys, get_objects, list_files, update_file, upload},
    test_route::upload_with_custom_header,
    utils::csrf::get_csrf,
    websocket::socket::index,
};
use std::{error::Error, path::Path};
use tokio::fs as tokio_fs;

pub mod handlers;

#[actix_web::main]
async fn main() -> Result<(), Box<dyn Error + 'static>> {
    let on_run_task = spawn(on_run());
    let redis_tasks = spawn(update_expired_keys(false));

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
            .service(fs::Files::new("/assets", "./assets/").show_files_listing())
            .route("/", web::get().to(root))
            .route("/upload", web::post().to(upload))
            .route("/files", web::get().to(list_files))
            .route("/delete/{filename}", web::delete().to(delete_file))
            .route("/update", web::post().to(update_file))
            .route("/forceupdate", web::post().to(force_update_keys))
            .route("/get_csrf", web::get().to(get_csrf))
            .route("/test", web::post().to(upload_with_custom_header))
            .route("/get_objects", web::get().to(get_objects))
            .route("/ws/", web::get().to(index))
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await?;

    let _ = on_run_task.await.unwrap();
    let _ = redis_tasks.await.unwrap();

    Ok(())
}

async fn root() -> HttpResponse {
    HttpResponse::Ok().body("Server is up and running.")
}
