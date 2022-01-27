const fs = require('fs');
const path = require("path");
const {CHARACTERS_NUMBER} = require("./numberOfCharacters");

const readCharacterData = function () {
  const p = path.resolve(__dirname, `../../data/updated`);
  const characterData = [];

  for (let i = 1; i <= CHARACTERS_NUMBER; i++) {
    try {
      const data = fs.readFileSync(`${p}/${i}.json`, 'utf8');
      const character = JSON.parse(data);
      characterData.push(character);
    } catch (err) {
      console.log(`Error reading file from disk: ${err}`);
    }
  }
  return characterData;
}
module.exports = {readCharacterData};