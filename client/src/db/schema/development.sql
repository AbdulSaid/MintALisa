INSERT INTO collections (id, name, description)
VALUES (1, 'special edition', 'The first monalisa special edition.');

INSERT INTO collections (id, name, description)
VALUES (2, 'regular edition', 'The monalisa regular edition.');

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
