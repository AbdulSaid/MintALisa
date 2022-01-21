const charactersModel = require("../models/charactersModel");
const {computeOccurrences} = require("../helpers/computeOccurrences");
const {readCharacterData} = require("../helpers/character_reader");
const {getCharacterAttributes} = require("../helpers/getCharacterAttributes");
const traitsData = require("../../data/traits_results.json");

exports.getAllCharacters = () => {
  return charactersModel.getAllCharacters();
};

exports.getCharacterById = (id) => {
  return charactersModel.getCharacterById(id);
};

exports.getAllAttributes = () => {
  return charactersModel.getAllAttributes();
};


exports.getAttributeById = (id) => {
  return charactersModel.getAttributeById(id);
};


exports.addAllCharacters = () => {
  const characterData = readCharacterData();
  let count = 0;

  for (let item_ of characterData) {

    const item = getCharacterAttributes(item_);

    charactersModel.getPriceByItem(item)
      .then(([{rows: hat}, {rows: mouth}, {rows: glasses}, {rows: background}, {rows: accessories}]) => {

        item.price = Number(hat[0].price)
          + Number(mouth[0].price)
          + Number(glasses[0].price)
          + Number(background[0].price)
          + Number(accessories[0].price);

        charactersModel.addCharacter(item)
          .then(() => charactersModel.addInventory(item))
          .then(() => count++)
          .then(() => console.log(`done, ${count} characters have been added`));
      });
  }
};

exports.addAllAttributes = () => {
  const characterData = readCharacterData();

  for (let item_ of characterData) {

    const item = getCharacterAttributes(item_);

    charactersModel.addAttribute(item)
      .then(({rows: characters}) => console.log(characters))
      .then(() => console.log("done"))
  }
};

exports.getAllOccurrences = () => {
  return charactersModel.getAllOccurrences()
    .then(({rows: characters}) => {

      const occurrences = computeOccurrences(characters);

      for (let character of characters) {
        character.hat_occurance = occurrences['hats'][character.hat];
        character.mouth_occurance = occurrences['mouths'][character.mouth];
        character.background_occurance = occurrences['backgrounds'][character.background];
        character.glasses_occurance = occurrences['glasses'][character.glasses];
        character.accessories_occurance = occurrences['accessories'][character.accessories];
      }
      return characters;
    });
};

exports.getOccurrenceById = (id) => {
  return charactersModel.getAllOccurrences()
    .then(({rows: characters}) => {

      const occurrences = computeOccurrences(characters);

      for (let character of characters) {
        character.hat_occurance = occurrences['hats'][character.hat];
        character.mouth_occurance = occurrences['mouths'][character.mouth];
        character.background_occurance = occurrences['backgrounds'][character.background];
        character.glasses_occurance = occurrences['glasses'][character.glasses];
        character.accessories_occurance = occurrences['accessories'][character.accessories];
      }
      return characters.filter(item => item.dna === id);
    });
};

exports.addOccurrences = () => {

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

  return charactersModel.addOccurrences(data);
};

exports.updateCharacterById = (req) => {

  if (!req.body.minted) {
    return Promise.reject({code: 400, error: 'Invalid request: minted value not set in POST body'});
  } else if (!req.body.quantity) {
    return Promise.reject({code: 400, error: 'Invalid request: quantity value not set in POST body'});
  } else {
    return charactersModel.updateCharacterById(req)
      .then(({rows: updatedRows}) => {
        return updatedRows.length === 0 ? {code: 400, message: "Minting update was not successful."} :
          {code: 201, message: `The character ${req.params.id} has been minted successfully.`};
      });
  }
};


