const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const smallerScaleControlElement = document.querySelector('.scale__control--smaller');
const biggerScaleControlElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview');

const scaleImage = (value = DEFAULT_SCALE) => {
  imageElement.style.transform = `scale(${value / DEFAULT_SCALE})`;
  scaleValueElement.value = `${value}%`;
};

const onScaleReduce = () => {
  const currentValue = parseInt(scaleValueElement.value, 10);
  const newValue = (currentValue > MIN_SCALE) ? currentValue - STEP_SCALE : currentValue;
  scaleImage(newValue);
};

const onScaleIncrease = () => {
  const currentValue = parseInt(scaleValueElement.value, 10);
  const newValue = (currentValue < MAX_SCALE) ? currentValue + STEP_SCALE : currentValue;
  scaleImage(newValue);
};

const resetScale = () => scaleImage();

smallerScaleControlElement.addEventListener('click', onScaleReduce);
biggerScaleControlElement.addEventListener('click', onScaleIncrease);

export {resetScale};
