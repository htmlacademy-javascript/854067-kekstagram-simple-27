import {renderPictures} from './picture.js';
import {showAlert} from './util.js';
import {setUserFormSubmit, hideModal} from './user-form.js';
import {getData} from './api.js';
import './n-user-file.js';

getData(renderPictures, showAlert);
setUserFormSubmit(hideModal);
