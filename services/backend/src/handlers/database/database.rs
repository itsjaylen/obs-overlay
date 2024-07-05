use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::result::Error;
use dotenvy::dotenv;
use std::env;

use crate::handlers::database::models::NewObject;

use super::models::{Object, UpdatedObject};

type PgPool = Pool<ConnectionManager<PgConnection>>;

pub struct Database {
    pool: PgPool,
}

impl Database {
    pub fn new() -> Self {
        dotenv().ok();
        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let manager = ConnectionManager::<PgConnection>::new(database_url);
        let pool = Pool::builder()
            .max_size(15)
            .build(manager)
            .expect("Failed to create pool");
        Database { pool }
    }

    pub async fn create_object(
        &self,
        url_str: String,
        type_str: String,
        clientx_int: f64,
        clienty_int: f64,
        scalex_int: f64,
        scaley_int: f64,
        clientrotation_int: f64,
        visible_bool: bool,
        draggable_bool: bool,
    ) -> Result<usize, Error> {
        use crate::handlers::database::schema::object::dsl::*;

        let mut conn = self.pool.get().expect("Failed to get connection from pool");

        let new_object = NewObject {
            url: url_str,
            type_: type_str,
            clientx: clientx_int,
            clienty: clienty_int,
            scalex: scalex_int,
            scaley: scaley_int,
            clientrotation: clientrotation_int,
            visible: visible_bool,
            draggable: draggable_bool,
        };

        diesel::insert_into(object)
            .values(&new_object)
            .execute(&mut conn)
    }

    pub async fn update_object(
        &self,
        url_str: String,
        updated_object: UpdatedObject,
    ) -> Result<usize, diesel::result::Error> {
        use crate::handlers::database::schema::object::dsl::*;

        let mut conn = self.pool.get().expect("Failed to get connection from pool");

        let target = object.filter(url.eq(&url_str));
        diesel::update(target)
            .set(&updated_object)
            .execute(&mut conn)
    }

    pub async fn delete_object(&self, url_str: String) -> Result<usize, diesel::result::Error> {
        use crate::handlers::database::schema::object::dsl::*;

        let mut conn = self.pool.get().expect("Failed to get connection from pool");

        diesel::delete(object.filter(url.eq(&url_str))).execute(&mut conn)
    }

    pub async fn show_all_objects(&self) -> Vec<Object> {
        use crate::handlers::database::schema::object::dsl::*;

        let mut conn = self.pool.get().expect("Failed to get connection from pool");

        object
            .select(Object::as_select())
            .load::<Object>(&mut conn)
            .expect("Error loading tasks")
    }

    pub async fn fetch_object_by_filename(&self, filename: &str) -> Result<Object, Error> {
        use crate::handlers::database::schema::object::dsl::*;

        let mut conn = self.pool.get().expect("Failed to get connection from pool");

        object
            .filter(url.eq(filename))
            .first::<Object>(&mut conn)
    }

}
