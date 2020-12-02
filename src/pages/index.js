import './index.css';
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {Card} from '../components/Card.js'
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
    buttonSavePopupAdd, 
    validationParams} 
from '../utils/constans.js'
import {FormValidator} from '../components/Validate.js'
import {Section} from '../components/Section.js'
import {UserInfo} from '../components/UserInfo.js'

const editForm = new FormValidator (validationParams, popupEditProfile);
editForm.enableValidation (openEditProfileButton);

const addForm = new FormValidator (validationParams, popupAddCard);
addForm.enableValidation (openAddCardPopupButton);

const renderCard = (data) => {
    const newCard = new Card (data, 
        itemTemplateSelector, 
        {handleCardClick: () => renderBigImage (data)});
    
    const cardElement = newCard.generateCard();
    CardList.addItem(cardElement);
};

const newPopupWithImage = new PopupWithImage(popupImage);
newPopupWithImage.setEventListeners(); 

const renderBigImage = (evt) => {    
    newPopupWithImage.open(evt);                                                    
};

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
    addForm.clearFormInput (popupAddCard, titleInput); 
    addForm.clearFormInput (popupAddCard, linkInput); 
    addForm.disableButton (buttonSavePopupAdd);
    newAddCardPopupForm.open(); 
});

const newUserInfo = new UserInfo (profile, description);

const newEditProfilePopupForm = new PopupWithForm ({
    popupSelector: popupEdit,               
    handleFormSubmit: (data) => {            
        if (popupEdit.classList.contains('popup_opened')) { 
           newUserInfo.setUserInfo (data); 
           newEditProfilePopupForm.close(); 
        };                      
     }
});

newEditProfilePopupForm.setEventListeners();

openEditProfileButton.addEventListener('click', () => {
    newUserInfo.getUserInfo (); 
    editForm.clearFormInput (popupEditProfile, nameInput); 
    editForm.clearFormInput (popupEditProfile, jobInput);   
    newEditProfilePopupForm.open(); 
});
