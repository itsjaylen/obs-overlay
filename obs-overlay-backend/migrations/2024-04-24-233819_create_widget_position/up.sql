CREATE TABLE widgets (
    widget_id SERIAL PRIMARY KEY,
    widget_name VARCHAR(100) NOT NULL,
    position_x INTEGER,
    position_y INTEGER
);
