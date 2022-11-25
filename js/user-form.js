import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';
import {sendData} from './api.js';

const formElement = document.querySelector('.img-upload__form');
const bodyElement = document.querySelector('body');
const fileUploadElement = document.querySelector('#upload-file');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const cancelUploadElement = imgUploadOverlayElement.querySelector('#upload-cancel');
const comment = imgUploadOverlayElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload-item',
  errorTextParent: 'img-upload-item',
  errorTextClass: 'img-upload-item__error-text',
});

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
};

const onNotificationEscKeydown = (evt, notification) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    notification.remove();
    document.removeEventListener('keydown', onNotificationEscKeydown);

    if (!imgUploadOverlayElement.classList.contains('hidden')) {
      document.addEventListener('keydown', onModalEscKeydown);
    }
  }
};

const removeNotification = (notification) => {
  notification.remove();
  document.removeEventListener('keydown', onNotificationEscKeydown);
  document.addEventListener('keydown', onModalEscKeydown);
};

const onClickOutBounds = (evt, notification, targetClass) => {
  if ( !evt.target.classList.contains(targetClass) ) {
    notification.remove();
    notification.removeEventListener('click', onClickOutBounds);
  }
};

const showModal = () => {
  resetScale();
  resetEffects();

  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  cancelUploadElement.addEventListener('click', () => hideModal());
  document.addEventListener('keydown', onModalEscKeydown);
};

function hideModal () {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  cancelUploadElement.removeEventListener('click', () => hideModal());
  document.removeEventListener('keydown', onModalEscKeydown);

  comment.value = '';
  fileUploadElement.value = '';

  formElement.reset();
}

fileUploadElement.addEventListener('change', () => showModal());

const getSuccessNotification = () => {
  const successModal = successTemplate.cloneNode(true);
  bodyElement.append(successModal);

  const successButtonClose = successModal.querySelector('.success__button');
  document.removeEventListener('keydown', onModalEscKeydown);
  document.addEventListener('keydown', (evt) => onNotificationEscKeydown(evt, successModal));

  successButtonClose.addEventListener('click', () => removeNotification(successModal), {once: true});
  successModal.addEventListener( 'click', (evt) => onClickOutBounds(evt, successModal, 'success__inner'));
};

const getErrorNotification = () => {
  const errorModal = errorTemplate.cloneNode(true);
  bodyElement.append(errorModal);

  const errorCloseButtonElement = errorModal.querySelector('.error__button');
  document.removeEventListener('keydown', onModalEscKeydown);
  document.addEventListener('keydown', (evt) => onNotificationEscKeydown(evt, errorModal));

  errorCloseButtonElement.addEventListener('click', () => removeNotification(errorModal), {once: true});
  errorModal.addEventListener( 'click', (evt) => onClickOutBounds(evt, errorModal, 'error__inner'));
};

const setUserFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          getSuccessNotification();
        },
        () => {
          unblockSubmitButton();
          getErrorNotification();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {hideModal, setUserFormSubmit};
