const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 1,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;

const formElement = document.querySelector('.img-upload__form');
const imageElement = formElement.querySelector('.img-upload__preview img');
const sliderElement = formElement.querySelector('.effect-level__slider');
const levelEffectElement = formElement.querySelector('.effect-level__value');
const sliderUploadElement = formElement.querySelector('.img-upload__effect-level');

const isDefault = () => currentEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  sliderUploadElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
  });

  if (isDefault()) {
    sliderUploadElement.classList.add('hidden');
  }
};

const onSliderUpdate = () => {
  imageElement.style.filter = 'none';
  levelEffectElement.value = '';
  imageElement.className = '';
  if (isDefault()) {
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  imageElement.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  imageElement.classList.add(`effects__preview--${currentEffect.name}`);
  levelEffectElement.value = sliderValue;
};

const onFormChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);

    updateSlider();
  }
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

formElement.addEventListener('change', (evt) => onFormChange(evt));
sliderElement.noUiSlider.on('update', (evt) => onSliderUpdate(evt));

export {resetEffects};
