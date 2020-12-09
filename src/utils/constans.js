export const validationParams = {
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: '.error',
    errorClass: 'popup__field_type_error'
 };
 
export const openEditProfileButton = document.querySelector('.profile__edit-button');
export const openAddCardPopupButton = document.querySelector('.profile__add-button');
export const closeEditProfilePopupButton = document.querySelector('.popup__close-button');
export const closeAddCardPopupButton = document.querySelector('.popup__close-button_type_add');
const popup = document.querySelector('.popup');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupEditProfile = document.querySelector('.popup__container_type_edit');
export const popupAddCard = document.querySelector('.popup__container_type_add');
export const nameInput = popup.querySelector('.popup__field[name="name"]');
export const jobInput = popup.querySelector('.popup__field[name="about"]'); 
export const titleInput = popupAdd.querySelector('.popup__field[name="name"]');
export const linkInput = popupAdd.querySelector('.popup__field[name="link"]'); 
export const profile = document.querySelector('.profile__name');
export const description = document.querySelector('.profile__description');
export const container = document.querySelector('.elements');
export const avatar = document.querySelector('.profile__avatar');
export const closePopupImageButton = document.querySelector('.popup__close-button_type_image');
export const popupImage = document.querySelector('.popup_type_image');
export const popupResetCard = document.querySelector('.popup_type_delete-card');
export const itemTemplateSelector = '#card-template';
export const buttonSavePopupAdd = document.querySelector('.popup__button_type_add');