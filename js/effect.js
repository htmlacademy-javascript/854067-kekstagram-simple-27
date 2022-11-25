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

const form = document.querySelector('.img-upload__form');
const image = form.querySelector('.img-upload__preview img');
const sliderElement = form.querySelector('.effect-level__slider');
const levelEffect = form.querySelector('.effect-level__value');
const sliderUpload = form.querySelector('.img-upload__effect-level');

const isDefault = () => currentEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  sliderUpload.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
  });

  if (isDefault()) {
    sliderUpload.classList.add('hidden');
  }
};

const onSliderUpdate = () => {
  image.style.filter = 'none';
  levelEffect.value = '';
  image.className = '';
  if (isDefault()) {
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  image.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  image.classList.add(`effects__preview--${currentEffect.name}`);
  levelEffect.value = sliderValue;
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

form.addEventListener('change', (evt) => onFormChange(evt));
sliderElement.noUiSlider.on('update', (evt) => onSliderUpdate(evt));

export {resetEffects};
