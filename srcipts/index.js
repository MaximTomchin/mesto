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
const overlay = document.querySelector('.popup__overlay');
const overlayAdd = document.querySelector('.popup__overlay_type_add');
const overlayImage = document.querySelector('.popup__overlay_type_image');


const closePopup = () => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByESC);
};

const closePopupByESC = (evt) => {
    if (evt.key === 'Escape') {
       closePopup ();
    };
};

const togglePopup = () => {
    popup.classList.toggle('popup_opened');
    nameInput.value = profile.textContent;
    jobInput.value = description.textContent; 
    document.addEventListener('keydown', closePopupByESC);
};

const  handleFormSubmit = (evt) => {
    evt.preventDefault();
    profile.textContent = nameInput.value;
    description.textContent = jobInput.value;
    popup.classList.toggle('popup_opened');
};

const handleRemove = (evt) => {
    evt.target.closest('.element').remove();
};


const closePopupImage = () => {
   popupImage.classList.remove('popup_opened');
   document.removeEventListener('keydown', closePopupImageByESC);
};

const closePopupImageByESC = (evt) => {
  if (evt.key === 'Escape') {
     closePopupImage ();
   };
};

const togglePopupImage  = (data) => {
    popupPicture.src = data.link;
    popupPicture.alt = data.title;
    popupCaption.textContent = data.title;
    popupImage.classList.toggle('popup_opened');
    document.addEventListener('keydown', closePopupImageByESC);
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
    popupAdd.classList.toggle('popup_opened');
    titleInput.value = "";
    linkInput.value = "";
};

const disableButtonAdd = () => {
    buttonSavePopupAdd.classList.add('popup__button_invalid');
    buttonSavePopupAdd.disabled = true;
};

const closePopupAdd = () => {
   popupAdd.classList.remove('popup_opened');
   document.removeEventListener('keydown', closePopupAddByESC);
};

const closePopupAddByESC = (evt) => {
   if (evt.key === 'Escape') {
       closePopupAdd ();
   };
};

const togglePopupAdd = () => {    
    popupAdd.classList.toggle('popup_opened');
    formElementAdd.addEventListener('submit', handleCardFormSubmit); 
    document.addEventListener('keydown', closePopupAddByESC);
    disableButtonAdd ();
};

const renderList = () => {
    const items = initialCards.map(getItem);
    cards.append(...items);
};

renderList();


buttonOpenPopup.addEventListener('click',togglePopup);
buttonOpenPopupAdd.addEventListener('click',togglePopupAdd);
buttonClosePopup.addEventListener('click',togglePopup);
buttonClosePopupAdd.addEventListener('click',togglePopupAdd);
formElement.addEventListener('submit',handleFormSubmit); 
formElementAdd.addEventListener('submit',handleCardFormSubmit);
buttonClosePopupImage.addEventListener('click',closePopupImage);
overlay.addEventListener('click', closePopup);
overlayAdd.addEventListener('click', closePopupAdd);
overlayImage.addEventListener('click', closePopupImage);

