// @generated automatically by Diesel CLI.

diesel::table! {
    object (id) {
        id -> Int4,
        #[max_length = 255]
        url -> Varchar,
        #[sql_name = "type"]
        #[max_length = 50]
        type_ -> Varchar,
        clientx -> Nullable<Int4>,
        clienty -> Nullable<Int4>,
        scalex -> Nullable<Int4>,
        scaley -> Nullable<Int4>,
        clientrotation -> Nullable<Int4>,
        visible -> Bool,
        draggable -> Bool,
        throttledrag -> Nullable<Int4>,
        edgedraggable -> Nullable<Bool>,
        startdragrotate -> Nullable<Int4>,
        throttledragrotate -> Nullable<Int4>,
        scalable -> Nullable<Bool>,
        keepratio -> Nullable<Bool>,
        throttlescale -> Nullable<Int4>,
        renderdirections -> Nullable<Array<Nullable<Varchar>>>,
        rotatable -> Nullable<Bool>,
        throttlerotate -> Nullable<Int4>,
        #[max_length = 255]
        rotationposition -> Nullable<Varchar>,
    }
}
