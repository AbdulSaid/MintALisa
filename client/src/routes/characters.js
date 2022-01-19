"use strict";
const format = require('pg-format');
const pgp = require('pg-promise')();
const express = require('express');
const characterRoutes = express.Router();

let traitsData = require('../../data/traits_results.json');
const fs = require("fs");
const path = require("path");
const {readCharacterData} = require("../helpers/character_reader");


module.exports = function (db) {

  characterRoutes.get("/characters", function (req, res) {
    // DataHelpers.getTweets((err, tweets) => {
    //   if (err) {
    //     res.status(500).json({ error: err.message });
    //   } else {
    //     res.json(tweets);
    //   }
    // });

    db.query(`SELECT dna,
                     characters.name         as name,
                     characters.description  as description,
                     image,
                     price,
                     collections.name        as collection_name,
                     collections.description as collection_description,
                     inventory.quantity      as quantity

              FROM characters
                       JOIN collections ON collection_id = collections.id
                       JOIN inventory ON inventory_id = inventory.id`
    ).then(({rows: characters}) => {
      res.json(characters);
    });

  });

  characterRoutes.get("/characters/insert", function (req, res) {
    async function executeQuery(query) {
      try {
        let {rows} = await db.query(query);
        //     console.log(rows);
      } catch (e) {
        console.error(e);
      }
    }

    const characterData = readCharacterData();

    const data = [];

    for (let item of characterData) {
      const details = [];
      details.push(item.dna);
      details.push(item.name);
      details.push(item.description);
      details.push(item.image);
      details.push(1.1);
      details.push(1);
      details.push(1);
      data.push(details);
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
    }


    // console.log(data);
    const query = format('INSERT INTO characters (dna, name, description, image, price, collection_id, inventory_id) VALUES %L', data);
    executeQuery(query).then(() => {
      res.send('Done inserting the characters!');
    })

    //   ----------------


    // for (let item of characterData) {
    //   const itemAttributes = {};
    //   for (let attribute of item.attributes) {
    //     if (attribute.trait_type === 'Background') {
    //       itemAttributes.background = attribute.value;
    //     }
    //     if (attribute.trait_type === 'Cap') {
    //       itemAttributes.hat = attribute.value;
    //     }
    //     if (attribute.trait_type === 'Glasses') {
    //       itemAttributes.glasses = attribute.value;
    //     }
    //     if (attribute.trait_type === 'Mouth') {
    //       itemAttributes.mouth = attribute.value;
    //     }
    //     if (attribute.trait_type === 'Misc') {
    //       itemAttributes.accessories = attribute.value;
    //     }
    //   }
    //
    //
    //   db.query(`select id
    //             from hats
    //             where name = ${itemAttributes.hat};
    //   select id
    //   from mouths
    //   where name = ${itemAttributes.mouth};
    //   select id
    //   from glasses
    //   where name = ${itemAttributes.glasses};
    //   select id
    //   from backgrounds
    //   where name = ${itemAttributes.background};
    //   select id
    //   from accessories
    //   where name = ${itemAttributes.accessories};`)
    //     .then(([{rows: hatId}, {rows: mouthId}, {rows: glassesId}, {rows: backgroundId}, {rows: accessoriesId}]) => {
    //       db.query(`INSERT INTO character_attributes (character_id, hat_id, mouth_id, glasses_id, background_id,
    //                                                   accessory_id)
    //                 VALUES (${item.dna},
    //                         (SELECT id from hats WHERE name = ${hatId}),
    //                         (SELECT id from mouths WHERE name = ${mouthId}),
    //                         (SELECT id from glasses WHERE name = ${glassesId}),
    //                         (SELECT id from backgrounds WHERE name = ${backgroundId}),
    //                         (SELECT id from accessories WHERE name = ${accessoriesId}));`
    //       ).then(({rows: characters}) => {
    //         console.log(characters);
    //       });
    //     }).then(() => {
    //     console.log("done")
    //   })
    // }
    //
    // //  console.log('itemAttributes -- ---- ', itemAttributes);
    // res.send("Done!")

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
    db.query(`SELECT dna,
                     characters.name         as name,
                     characters.description  as description,
                     image,
                     price,
                     collections.name        as collection_name,
                     collections.description as collection_description,
                     inventory.quantity      as quantity

              FROM characters
                       JOIN collections ON collection_id = collections.id
                       JOIN inventory ON inventory_id = inventory.id
              WHERE dna = '${req.params.id}'`
    ).then(({rows: characters}) => {
      res.json(characters);
    });


  });

  characterRoutes.get("/pricing", function (req, res) {

  });

// characterRoutes.post("/", function(req, res) {
//   if (!req.body.text) {
//     res.status(400).json({ error: 'invalid request: no data in POST body'});
//     return;
//   }
//
//   const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
//   const tweet = {
//     user: user,
//     content: {
//       text: req.body.text
//     },
//     created_at: Date.now()
//   };
//
//   // DataHelpers.saveTweet(tweet, (err) => {
//   //   if (err) {
//   //     res.status(500).json({ error: err.message });
//   //   } else {
//   //     res.status(201).send();
//   //   }
//   // });
//
//
//
//
// });

  return characterRoutes;

}