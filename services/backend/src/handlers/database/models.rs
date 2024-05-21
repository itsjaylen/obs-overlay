use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use super::schema::object;



#[derive(Queryable, Selectable, Serialize, Deserialize, Debug, Clone)]
#[diesel(table_name = object)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Object {
    pub id: i32,
    pub url: String,
    pub type_: String,
    pub clientx: Option<i32>,
    pub clienty: Option<i32>,
    pub scalex: Option<i32>,
    pub scaley: Option<i32>,
    pub clientrotation: Option<i32>,
    pub visible: bool,
    pub draggable: bool,
    pub throttledrag: Option<i32>,
    pub edgedraggable: Option<bool>,
    pub startdragrotate: Option<i32>,
    pub throttledragrotate: Option<i32>,
    pub scalable: Option<bool>,
    pub keepratio: Option<bool>,
    pub throttlescale: Option<i32>,
    pub renderdirections: Option<Vec<Option<String>>>,
    pub rotatable: Option<bool>,
    pub throttlerotate: Option<i32>,
    pub rotationposition: Option<String>,
}



#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = object)]
pub struct NewObject {
    pub url: String,
    pub type_: String,
    pub clientx: i32,
    pub clienty: i32,
    pub scalex: i32,
    pub scaley: i32,
    pub clientrotation: i32,
    pub visible: bool,
    pub draggable: bool,
}


#[derive(AsChangeset, Serialize, Deserialize, Debug)]
#[diesel(table_name = object)]
pub struct UpdatedObject {
    pub url: String,
    pub clientx: Option<i32>,
    pub clienty: Option<i32>,
    pub scalex: Option<i32>,
    pub scaley: Option<i32>,
    pub clientrotation: Option<i32>,
    pub visible: Option<bool>,
    pub draggable: Option<bool>,
    pub throttledrag: Option<i32>,
    pub edgedraggable: Option<bool>,
    pub startdragrotate: Option<i32>,
    pub throttledragrotate: Option<i32>,
    pub scalable: Option<bool>,
    pub keepratio: Option<bool>,
    pub throttlescale: Option<i32>,
    pub renderdirections: Option<Vec<Option<String>>>,
    pub rotatable: Option<bool>,
    pub throttlerotate: Option<i32>,
    pub rotationposition: Option<String>,
}
