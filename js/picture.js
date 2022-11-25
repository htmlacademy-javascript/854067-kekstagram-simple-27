const picturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPictures = (photos) => {
  const picturesFragment = document.createDocumentFragment();

  photos.forEach(({url, likes, comments}) => {
    const newPicture = pictureTemplateElement.cloneNode(true);

    newPicture.querySelector('.picture__img').src = url;
    newPicture.querySelector('.picture__likes').textContent = likes;
    newPicture.querySelector('.picture__comments').textContent = comments;

    picturesFragment.append(newPicture);
  });

  picturesElement.append(picturesFragment);
};

export {renderPictures};
