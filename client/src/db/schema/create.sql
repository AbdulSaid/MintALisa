DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS wallets CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS collections CASCADE;
DROP TABLE IF EXISTS characters CASCADE;
DROP TABLE IF EXISTS character_attributes CASCADE;
DROP TABLE IF EXISTS attributes CASCADE;
DROP TABLE IF EXISTS hats CASCADE;
DROP TABLE IF EXISTS mouths CASCADE;
DROP TABLE IF EXISTS glasses CASCADE;
DROP TABLE IF EXISTS backgrounds CASCADE;
DROP TABLE IF EXISTS accessories CASCADE;
DROP TABLE IF EXISTS traits CASCADE;


CREATE TABLE wallets
(
    id         SERIAL PRIMARY KEY NOT NULL,
    public_key VARCHAR(255)       NOT NULL
);

CREATE TABLE users
(
    id        SERIAL PRIMARY KEY NOT NULL,
    email     VARCHAR(100)       NOT NULL,
    password  VARCHAR(255)       NOT NULL,
    wallet_id INTEGER REFERENCES wallets (id) ON DELETE CASCADE
);


CREATE TABLE collections
(
    id          SERIAL PRIMARY KEY NOT NULL,
    name        VARCHAR(255)       NOT NULL,
    description VARCHAR(255)       NOT NULL
);

CREATE TABLE characters
(
    dna           VARCHAR(45) PRIMARY KEY NOT NULL,
    name          VARCHAR(255)            NOT NULL,
    description   VARCHAR(255)            NOT NULL,
    image         VARCHAR(100)            NOT NULL,
    price         NUMERIC(12, 6)          NOT NULL,
    collection_id INTEGER REFERENCES collections (id) ON DELETE CASCADE
);

CREATE TABLE inventory
(
    id       SERIAL PRIMARY KEY NOT NULL,
    dna      VARCHAR(45) REFERENCES characters (dna) ON DELETE CASCADE,
    quantity INTEGER
);

CREATE TABLE hats
(
    id     SERIAL PRIMARY KEY NOT NULL,
    name   VARCHAR(125)       NOT NULL,
    rarity NUMERIC(12, 6)     NOT NULL,
    price  NUMERIC(12, 6)     NOT NULL
);

CREATE TABLE mouths
(
    id     SERIAL PRIMARY KEY NOT NULL,
    name   VARCHAR(125)       NOT NULL,
    rarity NUMERIC(12, 6)     NOT NULL,
    price  NUMERIC(12, 6)     NOT NULL
);

CREATE TABLE backgrounds
(
    id     SERIAL PRIMARY KEY NOT NULL,
    name   VARCHAR(125)       NOT NULL,
    rarity NUMERIC(12, 6)     NOT NULL,
    price  NUMERIC(12, 6)     NOT NULL
);

CREATE TABLE glasses
(
    id     SERIAL PRIMARY KEY NOT NULL,
    name   VARCHAR(125)       NOT NULL,
    rarity NUMERIC(12, 6)     NOT NULL,
    price  NUMERIC(12, 6)     NOT NULL
);

CREATE TABLE accessories
(
    id     SERIAL PRIMARY KEY NOT NULL,
    name   VARCHAR(125)       NOT NULL,
    rarity NUMERIC(12, 6)     NOT NULL,
    price  NUMERIC(12, 6)     NOT NULL
);

CREATE TABLE traits
(
    id         SERIAL PRIMARY KEY NOT NULL,
    name       VARCHAR(125)       NOT NULL,
    weight     INTEGER            NOT NULL,
    occurrence INTEGER            NOT NULL
);

CREATE TABLE character_attributes
(
    id            SERIAL PRIMARY KEY NOT NULL,
    dna           VARCHAR(45) REFERENCES characters (dna) ON DELETE CASCADE,
    hat_id        INTEGER REFERENCES hats (id) ON DELETE CASCADE,
    mouth_id      INTEGER REFERENCES mouths (id) ON DELETE CASCADE,
    glasses_id    INTEGER REFERENCES glasses (id) ON DELETE CASCADE,
    background_id INTEGER REFERENCES backgrounds (id) ON DELETE CASCADE,
    accessory_id  INTEGER REFERENCES accessories (id) ON DELETE CASCADE
);




