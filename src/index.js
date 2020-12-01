import './index.css';
import {PopupWithForm} from './components/PopupWithForm.js'
import {PopupWithImage} from './components/PopupWithImage.js'
import {Card} from './components/Card.js'
import {
    initialCards,
    openEditProfileButton,
    openAddCardPopupButton,
    popupEdit,
    popupAdd,
    popupEditProfile,
    popupAddCard,
    nameInput,
    jobInput, 
    titleInput,
    linkInput, 
    profile,
    description,
    container,
    popupImage,
    itemTemplateSelector,
    errorProfileName,
    errorProfileAbout,
    errorCardTitle,
    errorCardLink,
    buttonSavePopupAdd, 
    validationParams} 
from './utils/constans.js'
import {FormValidator} from './components/Validate.js'
import {Section} from './components/Section.js'
import {UserInfo} from './components/UserInfo.js'

const editForm = new FormValidator (validationParams, popupEditProfile);
editForm.enableValidation (openEditProfileButton);

const addForm = new FormValidator (validationParams, popupAddCard);
addForm.enableValidation (openAddCardPopupButton);

const clearEditProfileFormInputs = () => {
    nameInput.classList.remove(validationParams.errorClass);
    jobInput.classList.remove(validationParams.errorClass);
    errorProfileName.textContent = "";
    errorProfileAbout.textContent = ""; 
};

const disableButtonAdd = () => {
    buttonSavePopupAdd.classList.add(validationParams.inactiveButtonClass);
    buttonSavePopupAdd.disabled = true;
};

const clearCardFormInputs = () => {
    disableButtonAdd ();
    titleInput.classList.remove(validationParams.errorClass);
    linkInput.classList.remove(validationParams.errorClass);
    errorCardTitle.textContent = "";
    errorCardLink.textContent = ""; 
};

const renderCard = (data) => {
    const newCard = new Card (data, 
        itemTemplateSelector, 
        {handleCardClick: () => renderBigImage (data)});
    
    const cardElement = newCard.generateCard();
    CardList.addItem(cardElement);
};

const renderBigImage = (evt) => {
    const defaultPopupWithImage = new PopupWithImage(evt, popupImage);    
    defaultPopupWithImage.open(evt);                                                  
    defaultPopupWithImage.setEventListeners();   
}

const CardList = new Section ({
    items: initialCards,
    renderer: (data) => renderCard (data)},
    container); 

CardList.renderItems();

const newAddCardPopupForm = new PopupWithForm ({
    popupSelector: popupAdd,               
    handleFormSubmit: (formData) => {
        renderCard (formData);
        newAddCardPopupForm.close();
    }
}); 

newAddCardPopupForm.setEventListeners();

openAddCardPopupButton.addEventListener('click', () => {
    clearCardFormInputs ();
    newAddCardPopupForm.open(); 
});

const newUserInfo = new UserInfo (profile, description);

const newEditProfilePopupForm = new PopupWithForm ({
    popupSelector: popupEdit,               
    handleFormSubmit: (formData) => {           
        if (popupEdit.classList.contains('popup_opened')) { 
           newUserInfo.setUserInfo (formData); 
           newEditProfilePopupForm.close();   
        };                      
     }
});

newEditProfilePopupForm.setEventListeners();

openEditProfileButton.addEventListener('click', () => {
    clearEditProfileFormInputs ();
    newUserInfo.getUserInfo ();   
    newEditProfilePopupForm.open(); 
});