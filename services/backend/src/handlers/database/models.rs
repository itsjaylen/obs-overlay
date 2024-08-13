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
    pub clientx: Option<f64>,
    pub clienty: Option<f64>,
    pub scalex: Option<f64>,
    pub scaley: Option<f64>,
    pub clientrotation: Option<f64>,
    pub visible: bool,
    pub draggable: bool,
    pub throttledrag: Option<f64>,
    pub edgedraggable: Option<bool>,
    pub startdragrotate: Option<f64>,
    pub throttledragrotate: Option<f64>,
    pub scalable: Option<bool>,
    pub keepratio: Option<bool>,
    pub throttlescale: Option<f64>,
    pub renderdirections: Option<Vec<Option<String>>>,
    pub rotatable: Option<bool>,
    pub throttlerotate: Option<f64>,
    pub rotationposition: Option<String>,
    pub opacity: f64,
    pub blur: Option<f64>,
}



#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = object)]
pub struct NewObject {
    pub url: String,
    pub type_: String,
    pub clientx: f64,
    pub clienty: f64,
    pub scalex: f64,
    pub scaley: f64,
    pub clientrotation: f64,
    pub visible: bool,
    pub draggable: bool,
    pub opacity: f64,
    pub blur: f64,
}


#[derive(AsChangeset, Serialize, Deserialize, Debug)]
#[diesel(table_name = object)]
pub struct UpdatedObject {
    pub url: String,
    pub clientx: Option<f64>,
    pub clienty: Option<f64>,
    pub scalex: Option<f64>,
    pub scaley: Option<f64>,
    pub clientrotation: Option<f64>,
    pub visible: Option<bool>,
    pub draggable: Option<bool>,
    pub throttledrag: Option<f64>,
    pub edgedraggable: Option<bool>,
    pub startdragrotate: Option<f64>,
    pub throttledragrotate: Option<f64>,
    pub scalable: Option<bool>,
    pub keepratio: Option<bool>,
    pub throttlescale: Option<f64>,
    pub renderdirections: Option<Vec<Option<String>>>,
    pub rotatable: Option<bool>,
    pub throttlerotate: Option<f64>,
    pub rotationposition: Option<String>,
}
