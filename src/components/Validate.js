export class FormValidator {

    constructor(validationParams, popupForm) {
       this._formSelector = validationParams.formSelector;
       this._inputSelector = validationParams.inputSelector,
       this._submitButtonSelector = validationParams.submitButtonSelector,
       this._inactiveButtonClass = validationParams.inactiveButtonClass,
       this._inputErrorClass = validationParams.inputErrorClass,
       this._errorClass = validationParams.errorClass,
       this._popupForm = popupForm;
       this._buttonElement = this._popupForm.querySelector(this._submitButtonSelector);
       this._inputElements = Array.from(this._popupForm.querySelectorAll(this._inputSelector)); 
    };

    _showError (form, input) {
        this._errorElement = document.querySelector(`#${input.id}-error`);
        this._errorElement.textContent = input.validationMessage;
        input.classList.add(this._errorClass);
    };  
    
    _hideError (form, input) {
        this._errorElement = document.querySelector(`#${input.id}-error`);
        input.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    };
    
    _checkInputValidity (form, input) {
        input.setCustomValidity('');

        if (input.checkValidity()) {
            this._hideError(this._popupForm.querySelector(this._inputSelector), input);
        } else {
            this._showError(this._popupForm.querySelector(this._inputSelector), input);
        };
    };
    
    _toggleButtonState () {
        if (!this._popupForm.checkValidity()) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        };
    };


    _setEventListeners () {
        this._inputElements.forEach((input) => {
            input.addEventListener('input', (evt) => {
                this._checkInputValidity(this._popupForm.querySelector(this._inputSelector), evt.target);
                this._toggleButtonState(this._popupForm.querySelector(this._inputSelector), this._buttonElement);
            });
        });
    
        this._toggleButtonState(this._popupForm.querySelector(this._inputSelector), this._buttonElement);
    };


    enableValidation () {
        this._popupForm.addEventListener('submit', (evt) => {
                evt.preventDefault();
        });
    
        this._setEventListeners();
    };

   clearFormInput (popupForm, input) {
       this._hideError (this._popupForm.querySelector(this._inputSelector), input);
    };
    
    disableButton () {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
   };
};