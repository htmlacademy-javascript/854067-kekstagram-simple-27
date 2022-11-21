const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getMaxLength = (str, maxLength) => (str.length <= maxLength);

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.position = 'absolute';
  alertContainer.style.zIndex = '100';
  alertContainer.style.top = '0';

  alertContainer.style.width = '100%';
  alertContainer.style.height = '100%';
  alertContainer.style.padding = '55px';

  alertContainer.style.alignItems = 'center';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.lineHeight = '50px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';

  alertContainer.style.backgroundColor = '#232321';
  alertContainer.style.backgroundImage = 'url(../img/cry-cat.png)';
  alertContainer.style.backgroundRepeat = 'no-repeat';
  alertContainer.style.backgroundPosition = 'center';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {getRandomInteger, getRandomArrayElement, getMaxLength, isEscapeKey, showAlert};
