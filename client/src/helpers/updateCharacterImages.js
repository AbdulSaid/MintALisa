const fs = require('fs');
const path = require("path");
const {CHARACTERS_NUMBER} = require("./numberOfCharacters");

function checkDirectoryExistence(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
}

const updateCharacterImages = function () {

  const p = path.resolve(__dirname, '../../data/');
  const newDir = path.resolve(__dirname, '../../data/updated');

  checkDirectoryExistence(newDir);

  for (let i = 1; i <= CHARACTERS_NUMBER; i++) {
    try {
      const data = fs.readFileSync(`${p}/${i}.json`, 'utf8');
      const character = JSON.parse(data);
      character.localImage = `/public/images/${i}.png`
      const image = JSON.stringify(character, null, 4);

      fs.writeFile(`${newDir}/${i}.json`, image, (err) => {
        if (err) {
          throw err;
        }
      });

    } catch (err) {
      console.log(`Error reading file from disk: ${err}`);
    }
  }

}

module.exports = {updateCharacterImages};