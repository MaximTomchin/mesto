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
        input.classList.add(this._errorClass);
    };  
    

    _hideError = (form, input) => {
        const errorElement = document.querySelector(`#${input.id}-error`);
        input.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };
    

    _checkInputValidity = (form, input) => {
        input.setCustomValidity('');

        if (input.checkValidity()) {
            this._hideError(this._popupForm.querySelector(this._inputSelector), input);
        } else {
            this._showError(this._popupForm.querySelector(this._inputSelector), input);
        };
    };
    

    _toggleButtonState = (input, buttonElement) => {
        if (!this._popupForm.checkValidity()) {
            buttonElement.disabled = true;
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.disabled = false;
            buttonElement.classList.remove(this._inactiveButtonClass);
        };
    };


    _setEventListeners = () => {
        const inputElements = Array.from(this._popupForm.querySelectorAll(this._inputSelector)); 
        const buttonElement = this._popupForm.querySelector(this._submitButtonSelector);
    
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