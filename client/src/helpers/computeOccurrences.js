const computeOccurrences = (characters) => {
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
  return occurrences;

}

module.exports = {computeOccurrences};