import './index.css';
import {Api} from '../components/api.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {Card} from '../components/Card.js'
import {
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

const api = new Api ({
    url: "https://mesto.nomoreparties.co/v1/cohort-18/",
    headers: {
       authorization: "91c2835b-f41e-43e9-bed7-ea071878b36c",
       "Content-Type": "application/json"
    } 
});

const userInformation = api.getUserInfo ();
    
const initialCards = api.getInitialCards ();

initialCards.then ((data) => {
    CardList.renderItems(
        data.map((item) => ({ name: item.name, link: item.link }))
    );       
})
.catch((err) => alert(err));

const CardList = new Section ({
    renderer: (data) => renderCard (data)},
    container);


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

const newAddCardPopupForm = new PopupWithForm (
   {popup: popupAdd,               
    handleFormSubmit: (formData) => {
        console.log (api);
        api.addCard(formData)
        .then((formData) => {
            renderCard(formData);
        })
        .catch((err) => console.log(err));
        newAddCardPopupForm.close();
        }
    });     
  
newAddCardPopupForm.setEventListeners ();

openAddCardPopupButton.addEventListener('click', () => {
    addForm.clearFormInputs (popupAddCard, [titleInput, linkInput]);  
    addForm.disableButton (buttonSavePopupAdd);
    newAddCardPopupForm.open(); 
});

const newUserInfo = new UserInfo (profile, description);

const newEditProfilePopupForm = new PopupWithForm (
    {popup: popupEdit,               
    handleFormSubmit: (data) => {         
        if (popupEdit.classList.contains('popup_opened')) { 
           newUserInfo.setUserInfo (data); 
           newEditProfilePopupForm.close(); 
        };                      
     }
});

newEditProfilePopupForm.setEventListeners();

openEditProfileButton.addEventListener('click', () => {
    editForm.clearFormInputs (popupEditProfile, [nameInput, jobInput]);
    const newUser = newUserInfo.getUserInfo ();  
    nameInput.value = newUser.name;
    jobInput.value = newUser.about; 
    newEditProfilePopupForm.open(); 
});
    
const editForm = new FormValidator (validationParams, popupEditProfile);
editForm.enableValidation (openEditProfileButton);

const addForm = new FormValidator (validationParams, popupAddCard);
addForm.enableValidation (openAddCardPopupButton);