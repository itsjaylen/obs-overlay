use crate::handlers::database::database::Database;

pub async fn on_delete(filename: String) {
    println!("File '{}' deleted successfully.", filename);
    let db = Database::new();

    match db.delete_object(filename).await {
        Ok(rows_affected) => {
            println!("Deleted {} rows", rows_affected);
        }
        Err(e) => {
            eprintln!("Error deleting object: {}", e);
        }
    }
}
