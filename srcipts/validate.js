export class FormValidator {

    constructor(validationParams, popupForm) {
       this._formSelector = validationParams.formSelector;
       this._inputSelector = validationParams.inputSelector,
       this._submitButtonSelector = validationParams.submitButtonSelector,
       this._inactiveButtonClass = validationParams.inactiveButtonClass,
       this._inputErrorClass = validationParams.inputErrorClass,
       this._errorClass = validationParams.errorClass,
       this._popupForm = popupForm;
    };


    _showError = (form, input) => {
        const errorElement = document.querySelector(`#${input.id}-error`);
        errorElement.textContent = input.validationMessage;
        input.classList.add('popup__field_invalid');
       
    };  
    

    _hideError = (form, input) => {
        const errorElement = document.querySelector(`#${input.id}-error`);
        input.classList.remove('popup__field_invalid');
        errorElement.textContent = '';
    };
    

    _checkInputValidity = (form, input) => {
        input.setCustomValidity('');

        if (this._popupForm.checkValidity()) {
            this._hideError(this._popupForm.querySelector(this._inputSelector), input);
        } else {
            this._showError(this._popupForm.querySelector(this._inputSelector), input);
        };
    };
    

    _toggleButtonState = (input, buttonElement) => {
        if (!this._popupForm.checkValidity()) {
            buttonElement.classList.add('popup__button_invalid');
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove('popup__button_invalid');
           buttonElement.disabled = false;
        };
    };


    _setEventListeners = () => {
        const inputElements = Array.from(this._popupForm.querySelectorAll('.popup__field')); 
        const buttonElement = this._popupForm.querySelector('.popup__button');
    
        inputElements.forEach((input) => {
            input.addEventListener('input', (evt) => {
                this._checkInputValidity(this._popupForm.querySelector(this._inputSelector), evt.target);
                this._toggleButtonState(this._popupForm.querySelector(this._inputSelector), buttonElement);
            });
        });
    
        this._toggleButtonState(this._popupForm.querySelector(this._inputSelector), buttonElement);
    };


    enableValidation = () => {
       
        this._popupForm.addEventListener('submit', (evt) => {
                evt.preventDefault();
        });
    
            this._setEventListeners();
    };
    
};