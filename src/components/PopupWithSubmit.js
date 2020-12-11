import Popup from './Popup.js';

export class PopupWithSubmit extends Popup {
	constructor(popupSelector, {handleSubmitButton}) {
        super(popupSelector);
        this._handleSubmitButton = handleSubmitButton;
        this._element = this._popup.querySelector('.popup__container_type_delete-card');
    }

    setSubmitAction(submitAction) {
        this._handleSubmitButton = submitAction;
    }

    setEventListeners() {
        super.setEventListeners();
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitButton();
            this.close();;
        })
    }
}