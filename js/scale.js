const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview');

const scaleImage = (value = DEFAULT_SCALE) => {
  image.style.transform = `scale(${value / DEFAULT_SCALE})`;
  scaleValue.value = `${value}%`;
};

const onScaleReduce = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = (currentValue > MIN_SCALE) ? currentValue - STEP_SCALE : currentValue;
  scaleImage(newValue);
};

const onScaleIncrease = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = (currentValue < MAX_SCALE) ? currentValue + STEP_SCALE : currentValue;
  scaleImage(newValue);
};

const resetScale = () => scaleImage();

scaleSmaller.addEventListener('click', () => onScaleReduce());
scaleBigger.addEventListener('click', () => onScaleIncrease());

export {resetScale};
