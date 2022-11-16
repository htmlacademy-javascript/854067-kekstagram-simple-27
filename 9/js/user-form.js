import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';

const body = document.querySelector('body');
const uploadFileElement = document.querySelector('#upload-file');

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

const comment = imgUploadOverlay.querySelector('.text__description');

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
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
  uploadFileElement.value = '';
}

uploadFileElement.addEventListener('change', () => showModal());
