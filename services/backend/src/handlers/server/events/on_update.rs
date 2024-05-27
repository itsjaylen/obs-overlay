use crate::handlers::database::{
    database::Database, models::UpdatedObject,
};

use super::tasks::redis_tasks::update_expired_keys;
use tokio::spawn;

pub async fn on_update(filename: String, updated_object: UpdatedObject) {
    let db = Database::new();

    // Spawn a task to update expired keys
    spawn(async {
        if let Err(e) = update_expired_keys().await {
            eprintln!("Error updating keys: {}", e);
        }
    });

    match db.update_object(filename, updated_object).await {
        Ok(rows_affected) => {
            println!("Updated {} rows", rows_affected);
        }
        Err(e) => {
            eprintln!("Error updating object: {}", e);
        }
    }
}
