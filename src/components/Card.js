export class Card {
    constructor(data, cardSelector, { handleCardClick }) {
      this._title = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._content = this._getTemplate();
      this._image = this._content.querySelector('.element__image');
      this._buttonLike = this._content.querySelector('.element__button-like');
      this._buttonReset = this._content.querySelector('.element__button-reset');
      this._titleElement = this._content.querySelector('.element__title');
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  
      return cardElement;
    }

    _deleteCard () {
      this._content.remove();
    }

    _handleLike () {
      this._buttonLike.classList.toggle('element__button-like_active');
    }

    _setEventListeners() {
      this._buttonReset.addEventListener('click', () => this._deleteCard());
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