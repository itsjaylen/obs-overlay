-- Your SQL goes here
CREATE TABLE object (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    clientX INTEGER,
    clientY INTEGER,
    scaleX INTEGER,
    scaleY INTEGER,
    clientRotation INTEGER,
    visible BOOLEAN NOT NULL DEFAULT TRUE,
    draggable BOOLEAN NOT NULL DEFAULT TRUE,
    throttleDrag INTEGER DEFAULT 1,
    edgeDraggable BOOLEAN DEFAULT FALSE,
    startDragRotate INTEGER DEFAULT 0,
    throttleDragRotate INTEGER DEFAULT 0,
    scalable BOOLEAN DEFAULT TRUE,
    keepRatio BOOLEAN DEFAULT FALSE,
    throttleScale INTEGER DEFAULT 0,
    renderDirections VARCHAR(255)[] DEFAULT '{"nw", "n", "ne", "w", "e", "sw", "s", "se"}',
    rotatable BOOLEAN DEFAULT TRUE,
    throttleRotate INTEGER DEFAULT 0,
    rotationPosition VARCHAR(255) DEFAULT 0
);

