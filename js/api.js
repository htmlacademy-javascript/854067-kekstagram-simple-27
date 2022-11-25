const Urls = {
  GET_ADDRESS: 'https://27.javascript.pages.academy/kekstagram-simple/data',
  SEND_ADDRESS: 'https://27.javascript.pages.academy/kekstagram-simple',
};

const getData = (onSuccess, onFail) => {
  fetch(Urls.GET_ADDRESS)
    .then((response) => response.json())
    .then((photos) => onSuccess(photos))
    .catch(() => {
      onFail('При загрузке данных произошла ошибка запроса');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    Urls.SEND_ADDRESS,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
