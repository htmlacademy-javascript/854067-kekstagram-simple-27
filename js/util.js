const ALERT_SHOW_TIME = 5000;

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

export {isEscapeKey, showAlert};
 