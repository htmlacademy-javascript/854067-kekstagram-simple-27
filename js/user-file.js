const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('.img-upload__wrapper input[type=file]');
const imageElement = document.querySelector('.img-upload__preview img');
const previewElements = document.querySelectorAll('.effects__preview');

fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const isFileTypeMatch = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isFileTypeMatch) {
    imageElement.src = URL.createObjectURL(file);

    previewElements.forEach((preview) => {
      preview.style.backgroundImage = `url(${imageElement.src})`;
    });
  }
});
