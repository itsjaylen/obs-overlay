use std::error::Error;

use crate::handlers::database::{database::Database, redis_db::RedisDatabase};
use redis::AsyncCommands;

pub async fn on_run() -> Result<(), Box<dyn Error + Send + Sync>> {
    let db = Database::new();
    let all_objects = db.show_all_objects().await;
    let redis_database = RedisDatabase::new();

    let mut connection = redis_database.get_connection().await?;

    // Iterate over each object in the array
    for object in all_objects {
        let json_str = serde_json::to_string(&object)?;
        let parsed_json = serde_json::from_str::<serde_json::Value>(&json_str)?;

        // Extract URL
        if let Some(url) = parsed_json["url"].as_str() {
            // Remove the URL from the parsed JSON object
            let mut object_without_url = parsed_json.clone();
            object_without_url.as_object_mut().unwrap().remove("url");

            // Using a hash to store nested keys
            let main_key = format!("object:{}", url);

            // Set values in the hash using composite keys for the nested structure
            for (key, value) in object_without_url.as_object().unwrap().iter() {
                let field_name = format!("{}", key);
                match value {
                    serde_json::Value::String(s) => {
                        connection.hset(&main_key, &field_name, s).await?;
                        connection.expire(&main_key, 300).await?;
                    }
                    _ => {
                        connection
                            .hset(&main_key, &field_name, value.to_string())
                            .await?;
                    }
                }
            }
        }
    }

    Ok(())
}
