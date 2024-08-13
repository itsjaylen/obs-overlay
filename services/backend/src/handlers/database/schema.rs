// @generated automatically by Diesel CLI.

diesel::table! {
    object (id) {
        id -> Int4,
        #[max_length = 255]
        url -> Varchar,
        #[max_length = 50]
        type_ -> Varchar,
        clientx -> Nullable<Float8>,
        clienty -> Nullable<Float8>,
        scalex -> Nullable<Float8>,
        scaley -> Nullable<Float8>,
        clientrotation -> Nullable<Float8>,
        visible -> Bool,
        draggable -> Bool,
        throttledrag -> Nullable<Float8>,
        edgedraggable -> Nullable<Bool>,
        startdragrotate -> Nullable<Float8>,
        throttledragrotate -> Nullable<Float8>,
        scalable -> Nullable<Bool>,
        keepratio -> Nullable<Bool>,
        throttlescale -> Nullable<Float8>,
        renderdirections -> Nullable<Array<Nullable<Varchar>>>,
        rotatable -> Nullable<Bool>,
        throttlerotate -> Nullable<Float8>,
        rotationposition -> Nullable<Text>,
        opacity -> Float8,
        blur -> Nullable<Float8>,
    }
}
