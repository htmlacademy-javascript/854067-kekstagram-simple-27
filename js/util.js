const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElem = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getMaxLength = (str, maxLength) => (str.length <= maxLength);

getMaxLength('Very long string', 2);

export {getRandomInt, getRandomArrayElem};
