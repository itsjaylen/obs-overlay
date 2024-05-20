use crate::handlers::{
    database::database::Database,
    server::utils::{
        constants::{GIF_EXTENSION, IMAGE_EXTENSIONS},
        file_utils::{is_gif_file, is_image_file},
    },
};

pub async fn on_upload(filename: String) {
    println!("File '{}' uploaded successfully.", filename);

    let type_str = if is_gif_file(&filename, GIF_EXTENSION) {
        "gif"
    } else if is_image_file(&filename, IMAGE_EXTENSIONS) {
        "image"
    } else {
        "unknown"
    };

    let db = Database::new();

    let result = db
        .create_object(
            filename.to_string(),
            type_str.to_string(),
            1,
            1,
            1,
            1,
            0,
            true,
            false,
        )
        .await;

    match result {
        Ok(rows) => println!("Successfully inserted {} row(s)", rows),
        Err(e) => println!("Error inserting object: {}", e),
    }
}
