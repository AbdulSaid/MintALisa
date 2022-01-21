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
    charactersController.getAttributeById(req.params.id)
      .then(({rows: characters}) => res.json(characters));
  });

  characterRoutes.get("/characters/:id", function (req, res) {
    charactersController.getById(req.params.id)
      .then(({rows: characters}) => res.json(characters));
  });

  characterRoutes.post("/characters/:id", function (req, res) {

    charactersController.updateCharacterById(req).then(result => {
      const {code, message} = result;
      res.status(code).json(message);
    }).catch(result => {
      const {code, error} = result;
      res.status(code).json(error)
    })
  });


  return characterRoutes;

}
