const validationParams = {
   formSelector: '.popup__container',
   inputSelector: '.popup__field',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: '.popup__button_invalid',
   inputErrorClass: '.error',
   errorClass: '.popup__field_invalid'
};


const showError = (formElement, input) => {
    const errorElement = document.querySelector(`#${input.id}-error`);
    input.classList.add('popup__field_invalid');
    errorElement.textContent = input.validationMessage;
};  

const hideError = (formElement, input) => {
    const errorElement = document.querySelector(`#${input.id}-error`);
    input.classList.remove('popup__field_invalid');
    errorElement.textContent = '';
};


const checkInputValidity = (formElement, input) => {
    input.setCustomValidity('');

    if (input.checkValidity()) {
        hideError(formElement, input);
    } else {
        showError(formElement, input);
    };
};

const toggleButtonState = (formElement, buttonElement) => {
    if (!formElement.checkValidity()) {
        buttonElement.classList.add('popup__button_invalid');
        buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove('popup__button_invalid');
       buttonElement.disabled = false;
    };
};

const setEventListeners = (formElement) => {
    const inputElements = Array.from(formElement.querySelectorAll('.popup__field')); 
    const buttonElement = formElement.querySelector('.popup__button');

    inputElements.forEach((input) => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(formElement, evt.target);
            toggleButtonState(formElement, buttonElement);
        });
    });

    toggleButtonState(formElement, buttonElement);
};


const enableValidation = ({formSelector}) => {
    const formElements = Array.from(document.querySelectorAll(formSelector));

    formElements.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(form);
    });
};

enableValidation(validationParams);
