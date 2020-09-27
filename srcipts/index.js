console.log ('Hallo, Welt');

let buttonOpenPopup = document.querySelector('.profile__edit-button');
let buttonClosePopup = document.querySelector('.popup__close-image');
let popup = document.querySelector('.popup');

let popupTuggle = () => {
popup.classList.toggle('popup_opened');
}

buttonOpenPopup.addEventListener('click',popupTuggle);
buttonClosePopup.addEventListener('click',popupTuggle);

 
let formElement = document.querySelector('.popup__container');

let formSubmitHandler  = (evt) => {
    evt.preventDefault();
    let nameInput = document.querySelector('.popup__field[name="name"]');
    let jobInput = document.querySelector('.popup__field[name="about"]');  
    document.querySelector('.profile__name').textContent = nameInput.value;     
    document.querySelector('.profile__description').textContent = jobInput.value; 
    popup.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 
