const db = require("../db");
const format = require("pg-format");


exports.getAllCharacters = async () => {
  return await db.query(`SELECT characters.dna          as dna,
                                characters.name         as name,
                                characters.description  as description,
                                image,
                                price,
                                collections.name        as collection_name,
                                collections.description as collection_description,
                                minted,
                                inventory.quantity      as quantity
                         FROM characters
                                  JOIN collections ON collection_id = collections.id
                                  JOIN inventory ON characters.dna = inventory.dna`
  );
};

exports.getCharacterById = async (id) => {
  return await db.query(`SELECT characters.dna          as dna,
                                characters.name         as name,
                                characters.description  as description,
                                image,
                                price,
                                collections.name        as collection_name,
                                collections.description as collection_description,
                                minted,
                                inventory.quantity      as quantity
                         FROM characters
                                  JOIN collections ON collection_id = collections.id
                                  JOIN inventory ON characters.dna = inventory.dna
                         WHERE characters.dna = '${id}'`
  )
};

exports.getAllAttributes = async () => {
  return await db.query(`SELECT characters.dna         as dna,
                                characters.name        as name,
                                characters.description as description,
                                hats.name              as hat,
                                mouths.name            as mouth,
                                backgrounds.name       as background,
                                glasses.name           as glasses,
                                accessories.name       as accessories
                         FROM character_attributes
                                  JOIN characters ON character_attributes.dna = characters.dna
                                  JOIN hats ON hat_id = hats.id
                                  JOIN mouths ON mouth_id = mouths.id
                                  JOIN backgrounds ON background_id = backgrounds.id
                                  JOIN glasses ON glasses_id = glasses.id
                                  JOIN accessories ON accessory_id = accessories.id`
  );
};

exports.getAttributeById = async (id) => {
  return await db.query(`SELECT characters.dna         as dna,
                                characters.name        as name,
                                characters.description as description,
                                hats.name              as hat,
                                mouths.name            as mouth,
                                backgrounds.name       as background,
                                glasses.name           as glasses,
                                accessories.name       as accessories
                         FROM character_attributes
                                  JOIN characters ON character_attributes.dna = characters.dna
                                  JOIN hats ON hat_id = hats.id
                                  JOIN mouths ON mouth_id = mouths.id
                                  JOIN backgrounds ON background_id = backgrounds.id
                                  JOIN glasses ON glasses_id = glasses.id
                                  JOIN accessories ON accessory_id = accessories.id
                         WHERE character_attributes.dna = '${id}'`
  );
};

exports.getAllOccurrences = async () => {
  return await db.query(`SELECT characters.dna   as dna,
                                characters.name  as name,
                                hats.name        as hat,
                                mouths.name      as mouth,
                                backgrounds.name as background,
                                glasses.name     as glasses,
                                accessories.name as accessories
                         FROM character_attributes
                                  JOIN characters ON character_attributes.dna = characters.dna
                                  JOIN hats ON hat_id = hats.id
                                  JOIN mouths ON mouth_id = mouths.id
                                  JOIN backgrounds ON background_id = backgrounds.id
                                  JOIN glasses ON glasses_id = glasses.id
                                  JOIN accessories ON accessory_id = accessories.id`
  );
};

exports.addCharacter = async (item) => {
  return await db.query(`INSERT INTO characters (dna, name, description, image, price, collection_id)
                         VALUES ('${item.dna}', '${item.name}', '${item.description}',
                                 '${item.image}', '${item.price}', 1)`);
};

exports.addAttribute = async (item) => {
  return await db.query(`INSERT INTO character_attributes (dna, hat_id, mouth_id, glasses_id, background_id, accessory_id)
                         VALUES ('${item.dna}',
                                 (SELECT id from hats WHERE name = '${item.attributes.hat}'),
                                 (SELECT id from mouths WHERE name = '${item.attributes.mouth}'),
                                 (SELECT id from glasses WHERE name = '${item.attributes.glasses}'),
                                 (SELECT id from backgrounds WHERE name = '${item.attributes.background}'),
                                 (SELECT id from accessories WHERE name = '${item.attributes.accessories}'))`);
};

exports.addInventory = async (item) => {
  return await db.query(`INSERT INTO inventory (dna, quantity)
                         VALUES ('${item.dna}', 1)
                         RETURNING *`);

};

exports.addOccurrences = async (data) => {
  return await db.query(format('INSERT INTO traits (name, weight, occurrence) VALUES %L returning id', data));
};

exports.updateCharacterById = async (req) => {
  return db.query(`WITH character_update AS (UPDATE characters
      SET minted = '${req.body.minted}'
      WHERE dna = '${req.params.id}')
                   UPDATE inventory
                   SET quantity = '${req.body.quantity}'
                   WHERE dna = '${req.params.id}'
                   RETURNING *`
  );
};
