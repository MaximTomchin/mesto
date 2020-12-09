import {profile} from '../utils/constans.js'

export class Card {
    constructor(data, cardSelector, { handleCardClick }, { handleDeleteIconClick }) {
      this._title = data.name;
      this._link = data.link;
      this._ownerId = data.owner._id;
      this._id = data.id;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteIconClick = handleDeleteIconClick;
      this._userId = profile.id;
      this._content = this._getTemplate();
      this._image = this._content.querySelector('.element__image');
      this._buttonLike = this._content.querySelector('.element__button-like');
      this._buttonReset = this._content.querySelector('.element__button-reset');
      this._titleElement = this._content.querySelector('.element__title');
    }
  
    _getTemplate() {
      const card = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  
      return card;
    }

    deleteCard () {
      this._content.remove();
    }

    _handleLike () {
      this._buttonLike.classList.toggle('element__button-like_active');
    }

    _showButtonReset () {
     if (this._ownerId === this._userId) {
        this._buttonReset.classList.toggle('element__button-reset_active');
        this._buttonReset.addEventListener('click', () => this._handleDeleteIconClick (this._id));
        console.log (this._id);
      }   
     }
    

    _setEventListeners() {
      this._showButtonReset ();
      this._buttonLike.addEventListener('click', () => this._handleLike());
      this._image.addEventListener('click', () => this._handleCardClick ());
    }

    generateCard() {
      this._titleElement.textContent = this._title;
      this._image.alt= this._title;
      this._image.src = this._link;
      this._setEventListeners();
      
      return this._content;
    }
  };