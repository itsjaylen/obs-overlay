-- Your SQL goes here
CREATE TABLE object (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    type_ VARCHAR(50) NOT NULL,
    clientX FLOAT,
    clientY FLOAT,
    scaleX FLOAT,
    scaleY FLOAT,
    clientRotation FLOAT,
    visible BOOLEAN NOT NULL DEFAULT TRUE,
    draggable BOOLEAN NOT NULL DEFAULT TRUE,
    throttleDrag FLOAT DEFAULT 1,
    edgeDraggable BOOLEAN DEFAULT FALSE,
    startDragRotate FLOAT DEFAULT 0,
    throttleDragRotate FLOAT DEFAULT 0,
    scalable BOOLEAN DEFAULT TRUE,
    keepRatio BOOLEAN DEFAULT FALSE,
    throttleScale FLOAT DEFAULT 0,
    renderDirections VARCHAR(255)[] DEFAULT '{"nw", "n", "ne", "w", "e", "sw", "s", "se"}',
    rotatable BOOLEAN DEFAULT TRUE,
    throttleRotate FLOAT DEFAULT 0,
    rotationPosition VARCHAR(255) DEFAULT 0
);


