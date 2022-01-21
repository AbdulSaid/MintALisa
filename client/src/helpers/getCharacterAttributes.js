const getCharacterAttributes = (item) => {

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
    item.attributes = itemAttributes;
  }
  return item;
}

module.exports = {getCharacterAttributes};