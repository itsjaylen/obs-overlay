ALTER TABLE widgets
ADD COLUMN embed BOOLEAN,
ADD COLUMN interactive BOOLEAN,
ADD COLUMN opacify INTEGER CHECK (opacify >= 0 AND opacify <= 100),
ADD COLUMN position_z INTEGER CHECK (position_z >= 0 AND position_z <= 180),
ADD COLUMN blur INTEGER CHECK (blur >= 0 AND blur <= 100);
