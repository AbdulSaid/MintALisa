"use strict";
const format = require('pg-format');
const pgp = require('pg-promise')();
const express = require('express');
const characterRoutes = express.Router();

let traitsData = require('../../data/traits_results.json');
const fs = require("fs");
const path = require("path");
const {readCharacterData} = require("../helpers/character_reader");
const charactersController = require("../controllers/charactersController");


module.exports = function (db) {

  characterRoutes.get("/characters", function (req, res) {
    charactersController.getAll()
      .then(({rows: characters}) => res.json(characters));
  });

  characterRoutes.get("/characters/insert", function (req, res) {
    charactersController.addAllCharacters()
    res.send('Characters have been added!');
  });

  characterRoutes.get("/characters/attributes/insert", function (req, res) {
    const characterData = readCharacterData();

    for (let item of characterData) {
      const itemAttributes = {};
      for (let attribute of item.attributes) {
        if (attribute.trait_type === 'Background') {
          itemAttributes.background = attribute.value;
        }
        if (attribute.trait_type === 'Cap') {
          itemAttributes.hat = attribute.value;
        }
        if (attribute.trait_type === 'Glasses') {
          itemAttributes.glasses = attribute.value;
        }
        if (attribute.trait_type === 'Mouth') {
          itemAttributes.mouth = attribute.value;
        }
        if (attribute.trait_type === 'Misc') {
          itemAttributes.accessories = attribute.value;
        }
      }
      item.attributes = itemAttributes;
    }

    for (let item of characterData) {
      db.query(`INSERT INTO character_attributes (dna, hat_id, mouth_id, glasses_id, background_id, accessory_id)
                VALUES ('${item.dna}',
                        (SELECT id from hats WHERE name = '${item.attributes.hat}'),
                        (SELECT id from mouths WHERE name = '${item.attributes.mouth}'),
                        (SELECT id from glasses WHERE name = '${item.attributes.glasses}'),
                        (SELECT id from backgrounds WHERE name = '${item.attributes.background}'),
                        (SELECT id from accessories WHERE name = '${item.attributes.accessories}'))`)
        .then(({rows: characters}) => {
          console.log(characters);
        })
        .then(() => {
          console.log("done")
        })
    }
    res.send("Done!")
  });

  characterRoutes.get("/characters/attributes", function (req, res) {
    db.query(`SELECT characters.dna         as dna,
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
    ).then(({rows: characters}) => {
      res.json(characters);
    });
  });

  characterRoutes.get("/characters/attributes/occurrence", function (req, res) {
    db.query(`SELECT characters.dna   as dna,
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
    ).then(({rows: characters}) => {

      const occurrences = {hats: {}, mouths: {}, backgrounds: {}, glasses: {}, accessories: {}}
      for (let character of characters) {
        if (occurrences['hats'][character.hat] === undefined) {
          occurrences['hats'][character.hat] = 1;
        } else {
          occurrences['hats'][character.hat] = occurrences['hats'][character.hat] + 1;
        }

        if (occurrences['mouths'][character.mouth] === undefined) {
          occurrences['mouths'][character.mouth] = 1;
        } else {
          occurrences['mouths'][character.mouth] = occurrences['mouths'][character.mouth] + 1;
        }

        if (occurrences['backgrounds'][character.background] === undefined) {
          occurrences['backgrounds'][character.background] = 1;
        } else {
          occurrences['backgrounds'][character.background] = occurrences['backgrounds'][character.background] + 1;
        }

        if (occurrences['glasses'][character.glasses] === undefined) {
          occurrences['glasses'][character.glasses] = 1;
        } else {
          occurrences['glasses'][character.glasses] = occurrences['glasses'][character.glasses] + 1;
        }

        if (occurrences['accessories'][character.accessories] === undefined) {
          occurrences['accessories'][character.accessories] = 1;
        } else {
          occurrences['accessories'][character.accessories] = occurrences['accessories'][character.accessories] + 1;
        }
      }

      for (let character of characters) {
        character.hat_occurance = occurrences['hats'][character.hat];
        character.mouth_occurance = occurrences['mouths'][character.mouth];
        character.background_occurance = occurrences['backgrounds'][character.background];
        character.glasses_occurance = occurrences['glasses'][character.glasses];
        character.accessories_occurance = occurrences['accessories'][character.accessories];
      }
      console.log(occurrences);
      console.log(characters);
      console.log("total: ", characters.length)

      res.json(characters);
    });
  });

  characterRoutes.get("/characters/attributes/occurrence/insert", function (req, res) {
    async function executeQuery(query) {
      try {
        let {rows} = await db.query(query);
        console.log(rows);
      } catch (e) {
        console.error(e);
      }
      // finally {
      //   db.end();
      // }
    }

    const data = [];

    for (let item of traitsData) {
      const details = [];
      const weight = Number(item.weight)
      const occurrence = item.occurrence.replace(/(^\d+)(.+$)/i, '$1');

      details.push(item.trait);
      details.push(weight);
      details.push(occurrence);
      data.push(details);
    }
    console.log(data);
    const query = format('INSERT INTO traits (name, weight, occurrence) VALUES %L returning id', data);
    executeQuery(query).then(() => res.send("query has been executed!"));
  });

  characterRoutes.get("/characters/attributes/:id", function (req, res) {
    console.log("dna -- --- ---", req.params.id)
    db.query(`SELECT characters.dna         as dna,
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
              WHERE character_attributes.dna = '${req.params.id}'`
    ).then(({rows: characters}) => {
      res.json(characters);
    });
  });

  characterRoutes.get("/characters/:id", function (req, res) {
    db.query(`SELECT characters.dna          as dna,
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
              WHERE characters.dna = '${req.params.id}'`
    ).then(({rows: characters}) => {
      res.json(characters);
    });
  });

  characterRoutes.post("/characters/:id", function (req, res) {

    if (!req.body.minted) {
      res.status(400).json({error: 'invalid request: minted value not set in POST body'});
      return;
    }

    if (!req.body.quantity) {
      res.status(400).json({error: 'invalid request: quantity value not set in POST body'});
      return;
    }

    db.query(`WITH character_update AS (UPDATE characters
        SET minted = '${req.body.minted}'
        WHERE dna = '${req.params.id}')
              UPDATE inventory
              SET quantity = '${req.body.quantity}'
              WHERE dna = '${req.params.id}'
              RETURNING *`
    ).then(({rows: results}) => {
      results.length === 0 ? res.send("Minting update was not successful.") :
        res.send(`The character ${req.params.id} has been minted successfully.`);
    });
  });


  return characterRoutes;

}
