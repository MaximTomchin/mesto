let buttonOpenPopup = document.querySelector('.profile__edit-button');
let buttonClosePopup = document.querySelector('.popup__close-image');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__field[name="name"]');
let jobInput = document.querySelector('.popup__field[name="about"]'); 
let profile = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');

let togglePopup = () => {
    nameInput.value = profile.textContent;
    jobInput.value = description.textContent;
    popup.classList.toggle('popup_opened');
}

let formSubmitHandler  = (evt) => {
    evt.preventDefault();
    profile.textContent = nameInput.value;     
    description.textContent = jobInput.value; 
    popup.classList.toggle('popup_opened');
}

buttonOpenPopup.addEventListener('click',togglePopup);
buttonClosePopup.addEventListener('click',togglePopup);
formElement.addEventListener('submit', formSubmitHandler); 