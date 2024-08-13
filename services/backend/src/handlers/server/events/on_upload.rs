use std::error::Error;

use crate::handlers::{
    database::{ database::Database, redis_db::RedisDatabase },
    server::{
        events::tasks::redis_tasks::update_expired_keys,
        utils::{
            constants::{ GIF_EXTENSION, IMAGE_EXTENSIONS },
            file_utils::{ is_gif_file, is_image_file },
        },
    },
};
use actix::spawn;
use redis::AsyncCommands;

pub async fn on_upload(filename: String) -> Result<(), Box<dyn Error + Send + Sync>> {
    println!("File '{}' uploaded successfully.", filename);

    let redis_database = RedisDatabase::new();
    let mut connection = redis_database.get_connection().await?;

    let type_str = if is_gif_file(&filename, GIF_EXTENSION) {
        "gif"
    } else if is_image_file(&filename, IMAGE_EXTENSIONS) {
        "image"
    } else {
        "unknown"
    };

    let db = Database::new();

    let result = db.create_object(
        filename.to_string(),
        type_str.to_string(),
        1.0,
        1.0,
        1.0,
        1.0,
        0.0,
        true,
        false,
        1.0,
        0.0,
    ).await;

    match result {
        Ok(rows) => {
            println!("Successfully inserted {} row(s)", rows);

            let object = db.fetch_object_by_filename(&filename).await?;

            if let ref url = object.url {
                let mut object_without_url = serde_json::to_value(&object)?;
                object_without_url.as_object_mut().unwrap().remove("url");

                let main_key = format!("object:{}", url);

                for (key, value) in object_without_url.as_object().unwrap().iter() {
                    let field_name = format!("{}", key);
                    match value {
                        serde_json::Value::String(s) => {
                            connection.hset(&main_key, &field_name, s).await?;
                        }
                        _ => {
                            connection.hset(&main_key, &field_name, value.to_string()).await?;
                        }
                    }
                }

                connection.expire(&main_key, 300).await?;
                spawn(async {
                    if let Err(e) = update_expired_keys(true).await {
                        eprintln!("Error updating keys: {}", e);
                    }
                });
            } else {
                println!("Object has no URL.");
            }
        }
        Err(e) => println!("Error inserting object: {}", e),
    }

    Ok(())
}
