DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS suits CASCADE;
DROP TABLE IF EXISTS visor CASCADE;
DROP TABLE IF EXISTS beams CASCADE;
DROP TABLE IF EXISTS missiles CASCADE;
DROP TABLE IF EXISTS charge CASCADE;
DROP TABLE IF EXISTS upgrade CASCADE;
DROP TABLE IF EXISTS forum CASCADE;
DROP TABLE IF EXISTS poster CASCADE;

CREATE TABLE forum(
    post_id SERIAL PRIMARY KEY,
    time TIMESTAMP,
    username VARCHAR(70),
    title VARCHAR(60),
    post TEXT
);

CREATE TABLE poster(
    poster_id SERIAL PRIMARY KEY,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(80),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    userLocation VARCHAR(100),
    aboutMe TEXT
);

CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    title TEXT UNIQUE,
    publisher TEXT,
    year INT,
    console TEXT
);

CREATE TABLE suits (
    suit_id SERIAL PRIMARY KEY,
    name TEXT,
    game TEXT REFERENCES games (title),
    how_to_obtain TEXT,
    purpose TEXT 
);

CREATE TABLE beams (
    beams_id SERIAL PRIMARY KEY,
    name TEXT, 
    game TEXT REFERENCES games (title),
    how_to_obtain TEXT,
    purpose TEXT
);

CREATE TABLE missiles (
    missile_id SERIAL PRIMARY KEY,
    name TEXT, 
    game TEXT REFERENCES games (title),
    how_to_obtain TEXT,
    purpose TEXT
);

CREATE TABLE charge (
    charge_id SERIAL PRIMARY KEY,
    name TEXT, 
    game TEXT REFERENCES games (title),
    how_to_obtain TEXT,
    purpose TEXT
);

CREATE TABLE visor (
    visor_id SERIAL PRIMARY KEY,
    name TEXT, 
    game TEXT REFERENCES games (title),
    how_to_obtain TEXT,
    purpose TEXT
);

CREATE TABLE upgrades (
    suit_id SERIAL REFERENCES suits(suit_id),
    beams_id SERIAL  REFERENCES beams(beams_id),
    missile_id SERIAL REFERENCES missiles(missile_id),
    charge_id SERIAL REFERENCES charge(charge_id),
    visor_id SERIAL REFERENCES visor(visor_id)
);


ALTER TABLE forum ADD poster_id INTEGER REFERENCES poster(poster_id) ON DELETE CASCADE;

ALTER TABLE poster ADD post_id INTEGER REFERENCES forum(post_id) ON DELETE CASCADE;

