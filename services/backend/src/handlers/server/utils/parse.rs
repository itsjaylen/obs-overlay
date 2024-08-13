use std::collections::HashMap;
use actix_multipart::Multipart;
use futures_util::TryStreamExt;

pub async fn parse_multipart_data(payload: &mut Multipart) -> HashMap<String, String> {
    let mut data = HashMap::new();

    while let Ok(Some(mut field)) = payload.try_next().await {
        // Handle Option<&str> from field.name()
        let field_name = field.name()
            .map(|name| name.to_string())
            .unwrap_or_else(|| "unknown_field".to_string());

        let mut field_value = String::new();

        while let Ok(Some(chunk)) = field.try_next().await {
            field_value.push_str(std::str::from_utf8(&chunk).unwrap_or(""));
        }

        data.insert(field_name, field_value);
    }

    data
}


pub fn parse_optional_int(data: &HashMap<String, String>, key: &str) -> Option<f64> {
    data.get(key).and_then(|s| s.parse().ok())
}

pub fn parse_optional_bool(data: &HashMap<String, String>, key: &str) -> Option<bool> {
    data.get(key).and_then(|s| s.parse().ok())
}