import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor ({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._element = this._popup.querySelector('.popup__container');
    };
  
    setEventListeners() {
        super.setEventListeners();
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();;
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
};

  
  