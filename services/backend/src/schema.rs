// @generated automatically by Diesel CLI.

diesel::table! {
    widgets (widget_id) {
        widget_id -> Int4,
        #[max_length = 100]
        widget_name -> Varchar,
        position_x -> Nullable<Int4>,
        position_y -> Nullable<Int4>,
        embed -> Nullable<Bool>,
        interactive -> Nullable<Bool>,
        opacify -> Nullable<Int4>,
        position_z -> Nullable<Int4>,
        blur -> Nullable<Int4>,
    }
}
