INSERT INTO collections (id, name, description)
VALUES (1, 'special edition', 'The first monalisa special edition.');

INSERT INTO collections (id, name, description)
VALUES (2, 'regular edition', 'The monalisa regular edition.');

INSERT INTO inventory (id, quantity)
VALUES (1, 0);

INSERT INTO inventory (id, quantity)
VALUES (2, 5);

INSERT INTO characters (dna, name, description, image, price, collection_id, inventory_id)
VALUES (1, 'monalisa_1', 'first monalisa', 'image_url', '0.91', 1, 1);

INSERT INTO characters (dna, name, description, image, price, collection_id, inventory_id)
VALUES (2, 'monalisa_2', 'second monalisa', 'image_url', '0.81', 2, 2);

INSERT INTO characters (dna, name, description, image, price, collection_id, inventory_id)
VALUES (3, 'monalisa_3', 'third monalisa', 'image_url', '0.81', 2, 2);

INSERT INTO hats (id, name, rarity, price)
VALUES (1, 'Cowboy', 30, 0.0015),
       (2, 'Beret', 40, 0.001),
       (3, 'Fedora', 35, 0.0013),
       (4, 'HardHat', 25, 0.0017),
       (5, 'Graduation', 20, 0.0021);

INSERT INTO mouths (id, name, rarity, price)
VALUES (1, 'RedLipsSmile', 40, 0.001),
       (2, 'SideSmile', 25, 0.0017),
       (3, 'OpenWithTeeth', 35, 0.0013),
       (4, 'TongueOut', 30, 0.0015),
       (5, 'OpenSmile', 20, 0.0021);

INSERT INTO glasses (id, name, rarity, price)
VALUES (1, 'Round', 40, 0.001),
       (2, 'YellowStriped', 20, 0.0021),
       (3, '3DGoggles', 35, 0.0013),
       (4, 'Aviator', 30, 0.0015),
       (5, 'Cartoon', 25, 0.017);

INSERT INTO backgrounds (id, name, rarity, price)
VALUES (1, 'Monet', 25, 0.0017),
       (2, 'AcidPinkBlue', 40, 0.001),
       (3, 'RustedMetal', 35, 0.0013),
       (4, 'Bed', 30, 0.0015),
       (5, 'LouvreWithMona', 20, 0.0021);

INSERT INTO accessories (id, name, rarity, price)
VALUES (1, 'Pipe', 25, 0.0017),
       (2, 'Money', 20, 0.0021),
       (3, 'Flowers', 35, 0.0013),
       (4, 'Book', 30, 0.0015),
       (5, 'Tattoo', 30, 0.0015);

INSERT INTO character_attributes ( dna, hat_id, mouth_id, glasses_id, background_id, accessory_id)
VALUES (
        (SELECT dna from characters WHERE name = 'monalisa_1'),
        (SELECT id from hats WHERE name = 'Graduation'),
        (SELECT id from mouths WHERE name = 'OpenSmile'),
        (SELECT id from glasses WHERE name = 'YellowStriped'),
        (SELECT id from backgrounds WHERE name = 'LouvreWithMona'),
        (SELECT id from accessories WHERE name = 'Money'));

INSERT INTO character_attributes (dna, hat_id, mouth_id, glasses_id, background_id, accessory_id)
VALUES (
        (SELECT dna from characters WHERE name = 'monalisa_2'),
        (SELECT id from hats WHERE name = 'Beret'),
        (SELECT id from mouths WHERE name = 'RedLipsSmile'),
        (SELECT id from glasses WHERE name = 'Round'),
        (SELECT id from backgrounds WHERE name = 'AcidPinkBlue'),
        (SELECT id from accessories WHERE name = 'Flowers'));

INSERT INTO character_attributes ( dna, hat_id, mouth_id, glasses_id, background_id, accessory_id)
VALUES (
        (SELECT dna from characters WHERE name = 'monalisa_3'),
        (SELECT id from hats WHERE name = 'Beret'),
        (SELECT id from mouths WHERE name = 'RedLipsSmile'),
        (SELECT id from glasses WHERE name = 'Round'),
        (SELECT id from backgrounds WHERE name = 'AcidPinkBlue'),
        (SELECT id from accessories WHERE name = 'Flowers'));
