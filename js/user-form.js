import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';
import {sendData} from './api.js';

const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
const comment = imgUploadOverlay.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const pristine = new Pristine(form, {
  classTo: 'img-upload-item',
  errorTextParent: 'img-upload-item',
  errorTextClass: 'img-upload-item__error-text',
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
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

    if (!imgUploadOverlay.classList.contains('hidden')) {
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

function showModal () {
  resetScale();
  resetEffects();

  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  uploadCancel.addEventListener('click', () => hideModal());
  document.addEventListener('keydown', onModalEscKeydown);
}

function hideModal () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadCancel.removeEventListener('click', () => hideModal());
  document.removeEventListener('keydown', onModalEscKeydown);

  comment.value = '';
  uploadFile.value = '';
}

uploadFile.addEventListener('change', () => showModal());

const getSuccessNotification = () => {
  const successModal = successTemplate.cloneNode(true);
  body.append(successModal);

  const successButtonClose = successModal.querySelector('.success__button');
  document.removeEventListener('keydown', onModalEscKeydown);
  document.addEventListener('keydown', (evt) => onNotificationEscKeydown(evt, successModal));

  successButtonClose.addEventListener('click', () => removeNotification(successModal), {once: true});
  successModal.addEventListener( 'click', (evt) => onClickOutBounds(evt, successModal, 'success__inner'));
};

const getErrorNotification = () => {
  const errorModal = errorTemplate.cloneNode(true);
  body.append(errorModal);

  const errorButtonClose = errorModal.querySelector('.error__button');
  document.removeEventListener('keydown', onModalEscKeydown);
  document.addEventListener('keydown', (evt) => onNotificationEscKeydown(evt, errorModal));

  errorButtonClose.addEventListener('click', () => removeNotification(errorModal), {once: true});
  errorModal.addEventListener( 'click', (evt) => onClickOutBounds(evt, errorModal, 'error__inner'));
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
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
