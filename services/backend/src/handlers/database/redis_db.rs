use percent_encoding::{utf8_percent_encode, NON_ALPHANUMERIC};
use redis::{aio::MultiplexedConnection, AsyncCommands, Client};
use std::sync::Arc;
use tokio::sync::Mutex;

pub struct RedisDatabase {
    pool: Arc<Mutex<Vec<MultiplexedConnection>>>,
    client: Client,
}

impl RedisDatabase {
    // Create a new instance of Database
    pub fn new() -> Self {
        let encoded_password =
            utf8_percent_encode("T@Nm{q%?w[vS,)hDJby#4x", NON_ALPHANUMERIC).to_string();
        let client = Client::open(format!("redis://:{}@18.217.161.135", encoded_password))
            .expect("Failed to create Redis client");
        let pool = Arc::new(Mutex::new(Vec::new()));
        RedisDatabase { pool, client }
    }

    // Get a connection from the pool
    pub async fn get_connection(&self) -> redis::RedisResult<MultiplexedConnection> {
        let mut pool = self.pool.lock().await;
        if let Some(conn) = pool.pop() {
            return Ok(conn);
        }

        // If the pool is empty, create a new connection
        self.client.get_multiplexed_async_connection().await
    }

    // Return a connection to the pool
    pub async fn return_connection(&self, conn: MultiplexedConnection) {
        let mut pool = self.pool.lock().await;
        pool.push(conn);
    }

     // Delete a key from the Redis database
     pub async fn delete_key(&self, key: &str) -> redis::RedisResult<()> {
        let mut conn = self.get_connection().await?;
        let result = conn.del(key).await;
        self.return_connection(conn).await;
        result
    }

    
}
