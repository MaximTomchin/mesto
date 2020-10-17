const initialCards = [
    {
        title: 'Царское село',
        link: './images/tsarskoe.jpg'
    },
    {
        title: 'Петергоф',
        link: './images/peterhof.jpg'
    },
    {
        title: 'Гатчина',
        link: './images/gatchina.jpg'
    },
    {
        title: 'Ораниенбаум',
        link: './images/oranienbaum.jpg'
    },
    {
        title: 'Павловск',
        link: './images/pavlovsk.jpg'
    },
    {
        title: 'Карельский перешеек',
        link: './images/karelsky.jpg'
    }
]; 

const buttonOpenPopup = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelector('.popup__close-button');
const buttonClosePopupAdd = document.querySelector('.popup__close-button_type_add');
const resetButton = document.querySelector('.element__button-reset');
const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_type_add');
const formElement = document.querySelector('.popup__container');
const formElementAdd = document.querySelector('.popup__container_type_add');
const nameInput = document.querySelector('.popup__field[name="name"]');
const jobInput = document.querySelector('.popup__field[name="about"]'); 
const titleInput = document.querySelector('.popup__field[name="title"]');
const linkInput = document.querySelector('.popup__field[name="link"]'); 
const profile = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const template = document.querySelector('.template');
const cards = document.querySelector('.elements');
const buttonClosePopupImage = document.querySelector('.popup__close-button_type_image');
const popupImage = document.querySelector('.popup_type_image');
const popupPicture = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');



const togglePopup = () => {
    if (!popup.classList.contains('popup_opened')) {
        nameInput.value = profile.textContent;
        jobInput.value = description.textContent;
        popup.classList.toggle('popup_opened');
    } else {
        popup.classList.toggle('popup_opened');
    }
}


const togglePopupAdd = () => {
    if (!popupAdd.classList.contains('popup_opened')) {
       popupAdd.classList.toggle('popup_opened');
    } else {
       popupAdd.classList.toggle('popup_opened');
    }
    formElementAdd.addEventListener('submit', handleCardFormSubmit); 
}


const  handleFormSubmit = (evt) => {
    evt.preventDefault();
    profile.textContent = nameInput.value;
    description.textContent = jobInput.value;
    popup.classList.toggle('popup_opened');
}


const getItems = (data) => {
    const card = template.content.cloneNode(true);
    card.querySelector('.element__title').textContent = data.title;
    card.querySelector('.element__image').alt = data.title;
    card.querySelector('.element__image').src = data.link;   
   
    const resetButton = card.querySelector('.element__button-reset');
    card.querySelector('.element__button-like').addEventListener('click',handleLike);
    card.querySelector('.element__image').addEventListener('click',() => togglePopupImage(data));

    resetButton.addEventListener('click',handleRemove);

    return card;
};

const renderList = () => {
    const items = initialCards.map(element => getItems(element));
    cards.append(...items);
};


const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    const item = getItems({
        title: titleInput.value,
        link: linkInput.value
         });
    cards.prepend(item);
    popupAdd.classList.toggle('popup_opened');
    titleInput.value = "";
    linkInput.value = "";
}


const togglePopupImage  = (data) => {
    popupPicture.src = data.link;
    popupPicture.alt = data.title;
    popupCaption.textContent = data.title;
    popupImage.classList.toggle('popup_opened');
}


const closePopupImage = () => {
    popupImage.classList.remove('popup_opened');
}


const handleLike = (evt) => {
    evt.target.classList.toggle('element__button-like_active');
};


const handleRemove = (evt) => {
    evt.target.closest('.element').remove();
};


renderList();


buttonOpenPopup.addEventListener('click',togglePopup);
buttonOpenPopupAdd.addEventListener('click',togglePopupAdd);
buttonClosePopup.addEventListener('click',togglePopup);
buttonClosePopupAdd.addEventListener('click',togglePopupAdd);
formElement.addEventListener('submit',handleFormSubmit); 
formElementAdd.addEventListener('submit',handleCardFormSubmit);
buttonClosePopupImage.addEventListener('click',closePopupImage);