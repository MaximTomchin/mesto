import Popup from './Popup.js';

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
        super(popupSelector);
        this._image = document.querySelector('.popup__image');
        this._caption = document.querySelector('.popup__caption');
    }

    open (data) {   
        this._link = data.link;
        this._title = data.title;
        this._image.src = this._link;
        this._image.alt = this._title;
        this._caption.textContent = this._title;
        super.open ();
    }
}    