import {togglePopup} from './utils.js'

export class Card {
    constructor(data, cardSelector) {
      this._title = data.title;
      this._link = data.link;
      this._cardSelector = cardSelector;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  
      return cardElement;
    }

    _deleteCard = () => {
      this._content.remove();
    }

    _handleLike = () => {
      this._content.querySelector('.element__button-like').classList.toggle('element__button-like_active');
    }

    _handleImage = () => {
      const popupImage = document.querySelector('.popup_type_image');
      const popupPicture = document.querySelector('.popup__image');
      const popupCaption = document.querySelector('.popup__caption');
      popupPicture.src = this._link;
      popupPicture.alt = this._title;
      popupCaption.textContent = this._title;
      togglePopup (popupImage);
    }

    _setEventListeners() {
      this._content.querySelector('.element__button-reset').addEventListener('click', () => this._deleteCard());
      this._content.querySelector('.element__button-like').addEventListener('click', () => this._handleLike());
      this._content.querySelector ('.element__image').addEventListener('click', () => this._handleImage());
    }

    generateCard() {
      this._content = this._getTemplate();
      this._content.querySelector('.element__title').textContent = this._title;
      this._content.querySelector('.element__image').alt= this._title;
      this._content.querySelector('.element__image').src = this._link;
      this._setEventListeners();
      
      return this._content;
    }
  };