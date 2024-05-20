use std::path::Path;

pub fn get_extension(filename: &str) -> Option<&str> {
    Path::new(filename).extension().and_then(|ext| ext.to_str())
}

pub fn is_image_file(filename: &str, extensions: &[&str]) -> bool {
    match Path::new(filename).extension().and_then(|ext| ext.to_str()) {
        Some(ext) => extensions.contains(&ext.to_lowercase().as_str()),
        None => false,
    }
}

pub fn is_gif_file(filename: &str, gif_extension: &str) -> bool {
    match Path::new(filename).extension().and_then(|ext| ext.to_str()) {
        Some(ext) => ext.eq_ignore_ascii_case(gif_extension),
        None => false,
    }
}
