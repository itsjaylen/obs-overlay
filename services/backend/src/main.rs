use actix_cors::Cors;
use actix_files;
use actix_web::{web, App, HttpResponse, HttpServer};
use handlers::{database::redis_db::RedisDatabase, server::{events::{on_run::on_run, tasks::redis_tasks::update_expired_keys}, files::{delete_file, list_files, update_file, upload}}};
use redis::AsyncCommands;
use std::{error::Error, path::Path};
use tokio::{fs as tokio_fs, task};

pub mod handlers;

#[actix_web::main]
async fn main() -> Result<(), Box<dyn Error + 'static >> {
    let on_run_task = task::spawn(on_run());
    let redis_tasks = task::spawn(update_expired_keys());

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
    .await?;

    
    let _ = on_run_task.await.unwrap();
    let _ = redis_tasks.await.unwrap();

    Ok(())
}


async fn root() -> HttpResponse {
    HttpResponse::Ok().body("Server is up and running.")
}


async fn test_redis_database() -> Result<(), Box<dyn Error>> {
    // Create a new instance of RedisDatabase
    let database = RedisDatabase::new();

    // Get a connection from the pool
    let mut connection = database.get_connection().await?;
    
    // Use the connection to interact with Redis
    connection.set("key", 42).await?;

    let initial_x = 0;
    let initial_y = 0;
    
    // Using a hash to store nested keys
    let main_key = "bike:1";
    
    // Set values in the hash using composite keys for the nested structure
    connection.hset(main_key, "position:x", initial_x).await?;
    connection.hset(main_key, "position:y", initial_y).await?;
    connection.hset(main_key, "price", 100).await?;

    // Set TTL (e.g., 60 seconds) on the hash key
    let ttl_seconds = 60;
    connection.expire(main_key, ttl_seconds).await?;
    
    // Return the connection to the pool
    database.return_connection(connection).await;

    Ok(())
}