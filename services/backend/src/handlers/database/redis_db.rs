use redis::{Client, AsyncCommands};


pub async fn redis_test() -> Result<(), redis::RedisError> {
    // Connect to the Redis server
    let client = Client::open("redis://18.217.161.135").unwrap();
    let mut con = client.get_multiplexed_async_connection().await?;

    // Use the connection to send commands
    redis::cmd("SET").arg("my_key").arg(42);

    let _: () = con.set("my_key", "hello world").await?;
    let value: String = con.get("my_key").await?;

    println!("Value of my_key: {}", value);

    Ok(())
}
