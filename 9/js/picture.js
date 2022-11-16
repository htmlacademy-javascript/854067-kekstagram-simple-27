import {createPhotoGallery} from './data.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureGallery = createPhotoGallery();

const picturesFragment = document.createDocumentFragment();

const renderPictures = pictureGallery.forEach(({url, likes, comments}) => {
  const newPicture = pictureTemplate.cloneNode(true);

  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments;

  picturesFragment.append(newPicture);
});

pictures.append(picturesFragment);

export {renderPictures};
