use actix::ActorContext;
use actix::{Actor, AsyncContext, Handler, StreamHandler};
use actix_web::{web, HttpRequest, HttpResponse};
use actix_web_actors::ws;
use lazy_static::lazy_static;
use std::env;
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};

use super::message::UpdateMessage;

lazy_static! {
    pub static ref WEBSOCKET_ADDR: Arc<Mutex<Option<actix::Addr<WebSocket>>>> =
        Arc::new(Mutex::new(None));
}

pub struct WebSocket {
    last_message_sent: Instant,
}

impl Actor for WebSocket {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        *WEBSOCKET_ADDR.lock().unwrap() = Some(ctx.address());
        self.schedule_message(ctx);
    }

    fn stopping(&mut self, _: &mut Self::Context) -> actix::Running {
        println!("WebSocket is stopping");
        // Remove the address from the global state
        *WEBSOCKET_ADDR.lock().unwrap() = None;
        actix::Running::Stop
    }

    fn stopped(&mut self, _: &mut Self::Context) {
        println!("WebSocket stopped");
    }
}

impl WebSocket {
    fn schedule_message(&mut self, ctx: &mut <Self as Actor>::Context) {
        ctx.run_interval(Duration::from_secs(5), |act, ctx| {
            if Instant::now() - act.last_message_sent >= Duration::from_secs(5) {
                ctx.text("Hello from server");
                act.last_message_sent = Instant::now();
            }
        });
    }
}

impl Handler<UpdateMessage> for WebSocket {
    type Result = ();

    fn handle(&mut self, msg: UpdateMessage, ctx: &mut Self::Context) {
        ctx.text(msg.0);
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for WebSocket {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Ping(msg)) => ctx.pong(&msg),
            Ok(ws::Message::Text(text)) => {
                println!("Received message from client: {}", text);
            }
            Ok(ws::Message::Binary(bin)) => ctx.binary(bin),
            Ok(ws::Message::Close(reason)) => {
                println!("Client disconnected: {:?}", reason);
                ctx.stop(); // Stop the actor when the client disconnects
            }
            _ => (),
        }
    }
}

// Function to check if header validation should be enforced
fn should_enforce_header() -> bool {
    env::var("ENFORCE_HEADER")
        .map(|value| value.to_lowercase() != "false")
        .unwrap_or(true)
}

pub async fn index(
    req: HttpRequest,
    stream: web::Payload,
) -> Result<HttpResponse, actix_web::Error> {
    // Check if header validation should be enforced
    if should_enforce_header() {
        // Check for the special header
        if let Some(header_value) = req.headers().get("X-Special-Header") {
            if header_value == "expected_value" {
                // Header is present and has the expected value
                return ws::start(
                    WebSocket {
                        last_message_sent: Instant::now(),
                    },
                    &req,
                    stream,
                );
            }
        }
        // If the header is missing or has an incorrect value, return a 400 Bad Request
        return Err(actix_web::error::ErrorBadRequest(
            "Missing or invalid X-Special-Header",
        ));
    }

    // If header validation is disabled, start the WebSocket session without checking the header
    ws::start(
        WebSocket {
            last_message_sent: Instant::now(),
        },
        &req,
        stream,
    )
}
