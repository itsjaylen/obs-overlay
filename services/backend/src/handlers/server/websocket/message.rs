// src/messages.rs

use actix::Message;

pub struct UpdateMessage(pub String);

impl Message for UpdateMessage {
    type Result = ();
}
