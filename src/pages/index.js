import './index.css';
import {Api} from '../utils/api.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithSubmit} from '../components/PopupWithSubmit.js'
import {Card} from '../components/Card.js'
import {
    openEditProfileButton,
    openAddCardPopupButton,
    openChangeAvatarPopupButton,
    popupEdit,
    popupAdd,
    popupChange,
    popupEditProfile,
    popupAddCard,
    popupChangeAvatar,
    nameInput,
    jobInput, 
    titleInput,
    linkInput, 
    avatarInput,
    profile,
    description,
    container,
    avatar,
    popupImage,
    popupResetCard,
    itemTemplateSelector,
    buttonSavePopupAdd, 
    buttonSavePopupEdit,
    buttonSavePopupChangeAvatar,
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

const CardList = new Section ({
    renderer: (data) => renderCard (data)},
    container);

const newPopupWithSubmit = new PopupWithSubmit(popupResetCard, {handleSubmitButton: () => {}} );

const newPopupWithImage = new PopupWithImage(popupImage);

const newUserInfo = new UserInfo (profile, description);

const newAddCardPopupForm = new PopupWithForm (
    {popup: popupAdd,               
    handleFormSubmit: (formData) => {
        newAddCardPopupForm.renderLoading(true);
        api.addСard(formData)
        .then((formData) => {
            renderCard(formData);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            newAddCardPopupForm.renderLoading(false);
        })
        }
});     
      
const newEditProfilePopupForm = new PopupWithForm (
    {popup: popupEdit,               
    handleFormSubmit: (data) => {  
        newEditProfilePopupForm.renderLoading(true); 
        api.addUserInfo(data)
            .then((data) => { 
                newUserInfo.setUserInfo (data);})
            .catch((err) => console.log(err)) 
            .finally(() => {
                newEditProfilePopupForm.renderLoading(false);
           });
        }
});
   
const newChangeAvatarForm = new PopupWithForm ({
     popup: popupChange,
     handleFormSubmit: (data) => {
        newChangeAvatarForm.renderLoading(true);
        api.addAvatar(data)
            .then((data) => {
                avatar.src = data.avatar})
            .catch((err) => console.log(err))
            .finally(() => {
                newChangeAvatarForm.renderLoading(false)
            });
    }
});

const editForm = new FormValidator (validationParams, popupEditProfile);

const addForm = new FormValidator (validationParams, popupAddCard);

const changeAvatarForm = new FormValidator (validationParams, popupChangeAvatar);

api.getAllNeededData().then(argument => {
    const [ dataFromFirstPromise, dataFromSecondPromise ] = argument
        profile.textContent = dataFromFirstPromise.name
        profile._id = dataFromFirstPromise._id
        description.textContent = dataFromFirstPromise.about
        avatar.src = dataFromFirstPromise.avatar
        const initialCards = dataFromSecondPromise.reverse()
        CardList.renderItems(
                    initialCards.map((item) => ({ name: item.name, link: item.link, owner: item.owner, _id: item._id, likes: item.likes }))
                );       
})
.catch((err) => alert(err));


const renderCard = (data) => {
    const newCard = new Card (data, 
        itemTemplateSelector, 
        {handleCardClick: () => renderBigImage (data)},
        {handleDeleteIconClick: (id) => {
            newPopupWithSubmit.setSubmitAction (() => {
                api.deleteCard(id)
                   .then ((res) => newCard.deleteCard())
                   .catch((err) => console.log(err));
            });
            newPopupWithSubmit.open();
            }
        },
        {handleLikeClick: (isLiked, id) => {
            if (!isLiked) {
                api.likeCard(id)
                    .then(res => newCard.handleLike(res))
                    .catch((err) => console.log(err));
                    } else {
                api.removeLikeCard(id)
                    .then(res => newCard.handleLike(res))
                    .catch((err) => console.log(err));
                }
            }
        });
    const cardElement = newCard.generateCard();
    CardList.addItem(cardElement);
};

const renderBigImage = (evt) => {    
    newPopupWithImage.open(evt);                                                    
};

changeAvatarForm.enableValidation (openChangeAvatarPopupButton);

editForm.enableValidation (openEditProfileButton);

addForm.enableValidation (openAddCardPopupButton);

newPopupWithSubmit.setEventListeners() 

newPopupWithImage.setEventListeners(); 

newAddCardPopupForm.setEventListeners ();

newEditProfilePopupForm.setEventListeners();

newChangeAvatarForm.setEventListeners();

openAddCardPopupButton.addEventListener('click', () => {
    addForm.clearFormInputs (popupAddCard, [titleInput, linkInput]);  
    addForm.disableButton (buttonSavePopupAdd);
    newAddCardPopupForm.open(); 
});

openEditProfileButton.addEventListener('click', () => {
    editForm.clearFormInputs (popupEditProfile, [nameInput, jobInput]);
    const newUser = newUserInfo.getUserInfo ();  
    editForm.enableButton (buttonSavePopupEdit, {nameInput, jobInput});
    nameInput.value = newUser.name;
    jobInput.value = newUser.about; 
    newEditProfilePopupForm.open(); 
});

openChangeAvatarPopupButton.addEventListener('click', () => {
    changeAvatarForm.clearFormInputs (popupChangeAvatar, [avatarInput]); 
    changeAvatarForm.enableButton (buttonSavePopupChangeAvatar, avatarInput);
    avatarInput.value = avatar.src;
    newChangeAvatarForm.open(); 
});
