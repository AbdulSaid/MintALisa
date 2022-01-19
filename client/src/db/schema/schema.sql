DROP DATABASE IF EXISTS monalisa_development;

-- Create the db
CREATE DATABASE monalisa_development;

-- Move into the db
\c monalisa_development

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS wallets CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS characters CASCADE;
DROP TABLE IF EXISTS attributes CASCADE;
DROP TABLE IF EXISTS collection CASCADE;


CREATE TABLE users
(
    id        SERIAL PRIMARY KEY NOT NULL,
    email     VARCHAR(100)       NOT NULL,
    password  VARCHAR(255)       NOT NULL,
    wallet_id VARCHAR(255) REFERENCES wallets (id) ON DELETE CASCADE
);

CREATE TABLE wallets
(
    id         SERIAL PRIMARY KEY NOT NULL,
    public_key VARCHAR(255)       NOT NULL
);

CREATE TABLE inventory
(
    id       SERIAL PRIMARY KEY NOT NULL,
    quantity INTEGER
);

CREATE TABLE characters
(
    dna           SERIAL PRIMARY KEY NOT NULL,
    name          VARCHAR(255)       NOT NULL,
    description   VARCHAR(255)       NOT NULL,
    image         VARCHAR(100)       NOT NULL,
    price         NUMERIC(12, 6)     NOT NULL,
    collection_id INTEGER REFERENCES collection (id) ON DELETE CASCADE,
    inventory_id  INTEGER REFERENCES inventory (id) ON DELETE CASCADE
);

CREATE TABLE attributes
(
    id           SERIAL PRIMARY KEY NOT NULL,
    character_id INTEGER REFERENCES characters (dna) ON DELETE CASCADE,
    eyes         VARCHAR(125)       NOT NULL,
    nose         VARCHAR(125)       NOT NULL,
    mouth        VARCHAR(125)       NOT NULL,
    bg_color     VARCHAR(125)       NOT NULL,
    accessory_id INTEGER REFERENCES accessories (id) ON DELETE CASCADE
);


CREATE TABLE accessories
(
    id           SERIAL PRIMARY KEY NOT NULL,
    character_id INTEGER REFERENCES characters (dna) ON DELETE CASCADE,
    name         VARCHAR(125)       NOT NULL,
    description  VARCHAR(125)       NOT NULL,
    mouth        VARCHAR(125)       NOT NULL,
    bg_color     VARCHAR(125)       NOT NULL,
    accessories  VARCHAR(125)
);


CREATE TABLE collection
(
    id          SERIAL PRIMARY KEY NOT NULL,
    name        VARCHAR(255)       NOT NULL,
    description VARCHAR(255)       NOT NULL
);
