import Popup from './Popup.js';

export class PopupWithImage extends Popup {
	constructor(data, popupSelector) {
        super(popupSelector);
        this._link = data.link;
        this._title = data.title;
    }

    open () {    
       document.querySelector('.popup__image').src = this._link;
       document.querySelector('.popup__image').alt = this._title;
       document.querySelector('.popup__caption').textContent = this._title;
       super.open ();
    }
}    