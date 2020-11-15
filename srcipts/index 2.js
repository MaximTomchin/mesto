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
const buttonSavePopupAdd = document.querySelector('.popup__button_type_add');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const formElement = document.querySelector('.popup__container');
const formElementAdd = document.querySelector('.popup__container_type_add');
const nameInput = popup.querySelector('.popup__field[name="name"]');
const jobInput = popup.querySelector('.popup__field[name="about"]'); 
const titleInput = popupAdd.querySelector('.popup__field[name="title"]');
const linkInput = popupAdd.querySelector('.popup__field[name="link"]'); 
const profile = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const template = document.querySelector('.template');
const cards = document.querySelector('.elements');
const buttonClosePopupImage = document.querySelector('.popup__close-button_type_image');
const popupImage = document.querySelector('.popup_type_image');
const popupPicture = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const overlay = document.querySelector('.popup__overlay');
const overlayAdd = document.querySelector('.popup__overlay_type_add');
const overlayImage = document.querySelector('.popup__overlay_type_image');


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

const togglePopupEdit = () => {
    nameInput.value = profile.textContent;
    jobInput.value = description.textContent; 
    togglePopup (popupEdit);
}

const  handleFormSubmit = (evt) => {
    evt.preventDefault();
    profile.textContent = nameInput.value;
    description.textContent = jobInput.value;
   togglePopup(popup);
};

const handleRemove = (evt) => {
    evt.target.closest('.element').remove();
};


const togglePopupImage  = (data) => {
    popupPicture.src = data.link;
    popupPicture.alt = data.title;
    popupCaption.textContent = data.title;
    togglePopup (popupImage);
};

const handleLike = (evt) => {
    evt.target.classList.toggle('element__button-like_active');
};

const getItem = (data) => {
    const card = template.content.cloneNode(true);
    const elementImage = card.querySelector('.element__image');
    card.querySelector('.element__title').textContent = data.title;
    elementImage.alt = data.title;
    elementImage.src = data.link;   
   
    const resetButton = card.querySelector('.element__button-reset');
    card.querySelector('.element__button-like').addEventListener('click',handleLike);
    elementImage.addEventListener('click',() => togglePopupImage(data));

    resetButton.addEventListener('click',handleRemove);

    return card;
};

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    const item = getItem({
        title: titleInput.value,
        link: linkInput.value
    });
    cards.prepend(item);
    togglePopup(popupAdd);
    titleInput.value = "";
    linkInput.value = "";
};

const disableButtonAdd = () => {
    buttonSavePopupAdd.classList.add('popup__button_invalid');
    buttonSavePopupAdd.disabled = true;
};


const togglePopupAdd = () => {    
    topplePopup(popupAdd);
    formElementAdd.addEventListener('submit', handleCardFormSubmit); 
};

const renderList = () => {
    const items = initialCards.map(getItem);
    cards.append(...items);
};

renderList();


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