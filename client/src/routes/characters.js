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

  characterRoutes.get("/characters/attributes", function (req, res) {
    charactersController.getAllAttributes()
      .then(({rows: characters}) => res.json(characters));
  });

  characterRoutes.get("/characters/attributes/insert", function (req, res) {
    charactersController.addAllAttributes();
    res.send("Attributes have been added!");
  });

  characterRoutes.get("/characters/attributes/occurrence", function (req, res) {
    charactersController.getAllOccurrences().then(characters => res.json(characters));
  });

  characterRoutes.get("/characters/attributes/occurrence/insert", function (req, res) {
    charactersController.addOccurrences()
      .then(() => res.send("Occurrences have been added!"));
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
