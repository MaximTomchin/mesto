
import {Card} from './card.js'
import {initialCards} from './data.js'
import {validationParams} from './object.js'
import {FormValidator} from './validate.js'

const buttonOpenPopup = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelector('.popup__close-button');
const buttonClosePopupAdd = document.querySelector('.popup__close-button_type_add');
const buttonSavePopupAdd = document.querySelector('.popup__button_type_add');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const formElement = document.querySelector('.popup__container');
const formElementEdit = document.querySelector('.popup__container_type_edit');
const formElementAdd = document.querySelector('.popup__container_type_add');
const nameInput = popup.querySelector('.popup__field[name="name"]');
const jobInput = popup.querySelector('.popup__field[name="about"]'); 
const titleInput = popupAdd.querySelector('.popup__field[name="title"]');
const linkInput = popupAdd.querySelector('.popup__field[name="link"]'); 
const profile = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const container = document.querySelector('.elements');
const buttonClosePopupImage = document.querySelector('.popup__close-button_type_image');
const popupImage = document.querySelector('.popup_type_image');
const popupPicture = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const overlay = document.querySelector('.popup__overlay');
const overlayAdd = document.querySelector('.popup__overlay_type_add');
const overlayImage = document.querySelector('.popup__overlay_type_image');
const ITEM_TEMPLATE_SELECTOR = '#card-template';

const editForm = new FormValidator (validationParams, formElementEdit);
editForm.enableValidation ();

const addForm = new FormValidator (validationParams, formElementAdd);
addForm.enableValidation ();


const closePopupByESC = (evt) => {
    if (evt.key === 'Escape') {
        togglePopup(document.querySelector('.popup_opened'));
    };
};


const togglePopup = (popup) => {
    popup.classList.toggle('popup_opened');

    if (popup.classList.contains('popup_opened')) {
        document.addEventListener('keydown', closePopupByESC);
    } else {
       document.removeEventListener('keydown', closePopupByESC);
    };
   
   disableButtonAdd ();
};


const  handleFormSubmit = (evt) => {
    evt.preventDefault();
    profile.textContent = nameInput.value;
    description.textContent = jobInput.value;
   togglePopup(popup);
};


const togglePopupImage  = (data) => {
    popupPicture.src = data.link;
    popupPicture.alt = data.title;
    popupCaption.textContent = data.title;
    togglePopup (popupImage);
};


const addCard = (data) => {
    const listCard = new Card (data, ITEM_TEMPLATE_SELECTOR, () => togglePopupImage(data));
    const cardElement = listCard.generateCard();
    container.prepend(cardElement);
};


const disableButtonAdd = () => {
   buttonSavePopupAdd.classList.add('popup__button_invalid');
   buttonSavePopupAdd.disabled = true;
};


const handleCardFormSubmit = (evt) => {
     evt.preventDefault();
     addCard ({
       title: titleInput.value,
       link: linkInput.value
    });
    togglePopup(popupAdd);
     titleInput.value = "";
     linkInput.value = "";
};


initialCards.map(addCard);

buttonOpenPopup.addEventListener('click',() => togglePopup(popupEdit));
buttonOpenPopupAdd.addEventListener('click',() => togglePopup(popupAdd));
buttonClosePopup.addEventListener('click',() => togglePopup(popupEdit));
buttonClosePopupAdd.addEventListener('click',() => togglePopup(popupAdd));
formElement.addEventListener('submit',handleFormSubmit); 
formElementAdd.addEventListener('submit',handleCardFormSubmit);
buttonClosePopupImage.addEventListener('click',() => togglePopup(popupImage));
overlay.addEventListener('click', () => togglePopup(popupEdit));
overlayAdd.addEventListener('click', () => togglePopup(popupAdd));
overlayImage.addEventListener('click', () => togglePopup(popupImage));