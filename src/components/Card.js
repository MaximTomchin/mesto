export class Card {
    constructor(data, cardSelector, { handleCardClick }, { handleDeleteIconClick }, {handleLikeClick}) {
        this._title = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._id = data._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._handleLikeClick = handleLikeClick;
        this._userId = document.querySelector('.profile__name')._id;
        this._content = this._getTemplate();
        this._image = this._content.querySelector('.element__image');
        this._buttonLike = this._content.querySelector('.element__button-like');
        this._like = this._content.querySelector('.element__number-of-likes');
        this._buttonReset = this._content.querySelector('.element__button-reset');
        this._titleElement = this._content.querySelector('.element__title');
    }
  
    _getTemplate () {
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

    handleLike (data) {     
        this._likes = data.likes;
        this._buttonLike.classList.toggle('element__button-like_active');
        this._like.textContent = data.likes.length;    
        this._validateLikes (this._likes);
    }
 
    _showButtonReset () {
        if (this._ownerId === this._userId) {
            this._buttonReset.classList.toggle('element__button-reset_active');
            this._buttonReset.addEventListener('click', () => this._handleDeleteIconClick (this._id));
        }   
    }

    _validateLikes (data) {
        this._isLiked = data.some(i => i._id === this._userId);
            if (this._isLiked) {
                this._buttonLike.classList.add('element__button-like_active');
        }
    }

    _setEventListeners () {
        this._showButtonReset ();
        this._validateLikes (this._likes);
        this._buttonLike.addEventListener('click', () => this._handleLikeClick(this._isLiked, this._id));
        this._image.addEventListener('click', () => this._handleCardClick ());
    }
    
    generateCard () {
        this._titleElement.textContent = this._title;
        this._image.alt= this._title;
        this._image.src = this._link;
        this._like.textContent = this._likes.length;
        this._setEventListeners();
        return this._content;
    }
};
