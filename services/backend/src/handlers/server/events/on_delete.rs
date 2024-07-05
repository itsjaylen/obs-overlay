use actix::spawn;

use crate::handlers::{database::{database::Database, redis_db::RedisDatabase}, server::events::tasks::redis_tasks::update_expired_keys};

pub async fn on_delete(filename: String) {
    let redis_database = RedisDatabase::new();
    let key_to_delete = format!("object:{}", filename);

    match redis_database.delete_key(&key_to_delete).await {
        Ok(_) => println!("Key '{}' deleted successfully", &filename),
        Err(err) => eprintln!("Failed to delete key '{}': {}", &filename, err),
    }

    println!("File '{}' deleted successfully.", filename);
    let db = Database::new();

    match db.delete_object(filename).await {
        Ok(rows_affected) => {
            println!("Deleted {} rows", rows_affected);
            spawn(async {
                if let Err(e) = update_expired_keys(true).await {
                    eprintln!("Error updating keys: {}", e);
                }
            });
        }
        Err(e) => {
            eprintln!("Error deleting object: {}", e);
        }
    }
}
 