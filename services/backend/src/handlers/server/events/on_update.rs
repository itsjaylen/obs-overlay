use crate::handlers::database::{database::Database, models::UpdatedObject};

pub async fn on_update(filename: String, updated_object: UpdatedObject) {
    
    let db = Database::new();
    match db.update_object(filename, updated_object).await {
        Ok(rows_affected) => {
            println!("Updated {} rows", rows_affected);
        }
        Err(e) => {
            eprintln!("Error updating object: {}", e);
        }
    }
}