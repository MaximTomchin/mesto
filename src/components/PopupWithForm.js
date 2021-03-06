import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor ({popup, handleFormSubmit}) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._element = this._popup.querySelector('.popup__container');
        this._button = this._element.querySelector('.popup__button');
    };
  
    setEventListeners() {
        super.setEventListeners();
        this._element.addEventListener('submit', () => {
            this._handleFormSubmit(this._getInputValues());
         })
    };
  
    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__field');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    };

    close() {
        super.close();
        this._element.reset();
        delete this._formValues;
    };

    renderLoading (isLoading){
        if (isLoading) {
            this._button.textContent = "Сохранение...";
        } else {
            this._button.textContent = "Сохранить";
        }
    }
};