import {validationParams} from './ constans.js'
const overlay = document.querySelector('.popup__overlay');
const overlayAdd = document.querySelector('.popup__overlay_type_add');
const overlayImage = document.querySelector('.popup__overlay_type_image');
const buttonSavePopupAdd = document.querySelector('.popup__button_type_add');


const closePopupByESC = (evt) => {
    if (evt.key === 'Escape') {
        togglePopup(document.querySelector('.popup_opened'));
    }; 
};

const closePopup = (evt) => {
    togglePopup(document.querySelector('.popup_opened'));
};

const disableButtonAdd = () => {
    buttonSavePopupAdd.classList.add(validationParams.inactiveButtonClass);
    buttonSavePopupAdd.disabled = true;
 };

const togglePopup = (popup) => {
    popup.classList.toggle('popup_opened');
    

    if (popup.classList.contains('popup_opened')) {
        document.addEventListener('keydown', closePopupByESC);
        overlay.addEventListener('click', closePopup);
        overlayAdd.addEventListener('click', closePopup);
        overlayImage.addEventListener('click', closePopup);
    } else {
        document.removeEventListener('keydown', closePopupByESC);
        overlay.removeEventListener('click', closePopup);
        overlayAdd.removeEventListener('click', closePopup);
        overlayImage.removeEventListener('click', closePopup);
    };
   
   disableButtonAdd ();
};

export {togglePopup}; 