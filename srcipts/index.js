import {Card} from './card.js'
import {initialCards} from './data.js'
import {validationParams} from './ constans.js'
import {FormValidator} from './validate.js'
import {togglePopup} from './utils.js'

const openEditProfileButton = document.querySelector('.profile__edit-button');
const openAddCardPopupButton = document.querySelector('.profile__add-button');
const closeEditProfilePopupButton = document.querySelector('.popup__close-button');
const closeAddCardPopupButton = document.querySelector('.popup__close-button_type_add');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const formElement = document.querySelector('.popup__container');
const popupEditProfile = document.querySelector('.popup__container_type_edit');
const popupAddCard = document.querySelector('.popup__container_type_add');
const nameInput = popup.querySelector('.popup__field[name="name"]');
const jobInput = popup.querySelector('.popup__field[name="about"]'); 
const titleInput = popupAdd.querySelector('.popup__field[name="title"]');
const linkInput = popupAdd.querySelector('.popup__field[name="link"]'); 
const profile = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const container = document.querySelector('.elements');
const closePopupImageButton = document.querySelector('.popup__close-button_type_image');
const popupImage = document.querySelector('.popup_type_image');
const itemTemplateSelector = '#card-template';
const errorProfileName = popup.querySelector('.error_type_name');
const errorProfileAbout = popup.querySelector('.error_type_about');
const errorCardTitle = popupAdd.querySelector('.error_type_title');
const errorCardLink = popupAdd.querySelector('.error_type_link');
const buttonSavePopupAdd = document.querySelector('.popup__button_type_add');

const editForm = new FormValidator (validationParams, popupEditProfile);
editForm.enableValidation (togglePopup);

const addForm = new FormValidator (validationParams, popupAddCard);
addForm.enableValidation (togglePopup);


const  handleEditProfileFormSubmit = (evt) => {
    evt.preventDefault();
    profile.textContent = nameInput.value;
    description.textContent = jobInput.value;
    togglePopup(popup);
};

const addCard = (data) => {
    const listCard = new Card (data, itemTemplateSelector);
    const cardElement = listCard.generateCard();
    container.prepend(cardElement);
};

const handleCardFormSubmit = (evt) => {
     evt.preventDefault();
     addCard ({
       title: titleInput.value,
       link: linkInput.value
    });
    togglePopup(popupAdd);
};

const clearEditProfileFormInputs = () => {
    nameInput.value = profile.textContent;
    jobInput.value = description.textContent;
    nameInput.classList.remove(validationParams.errorClass);
    jobInput.classList.remove(validationParams.errorClass);
    errorProfileName.textContent = "";
    errorProfileAbout.textContent = ""; 
    togglePopup(popup)
}

const disableButtonAdd = () => {
    buttonSavePopupAdd.classList.add(validationParams.inactiveButtonClass);
    buttonSavePopupAdd.disabled = true;
 };



const clearCardFormInputs = () => {
    disableButtonAdd ();
    titleInput.value = "";
    linkInput.value = "";
    titleInput.classList.remove(validationParams.errorClass);
    linkInput.classList.remove(validationParams.errorClass);
    errorCardTitle.textContent = "";
    errorCardLink.textContent = ""; 
    togglePopup(popupAdd)
}


initialCards.map(addCard);

openEditProfileButton.addEventListener('click',clearEditProfileFormInputs);
openAddCardPopupButton.addEventListener('click', clearCardFormInputs);
closeEditProfilePopupButton.addEventListener('click',() => togglePopup(popupEdit));
closeAddCardPopupButton.addEventListener('click',() => togglePopup(popupAdd));
formElement.addEventListener('submit', handleEditProfileFormSubmit); 
popupAddCard.addEventListener('submit', handleCardFormSubmit);
closePopupImageButton.addEventListener('click',() => togglePopup(popupImage));