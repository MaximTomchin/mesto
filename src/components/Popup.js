export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    };

    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
            this._popup.classList.remove('popup_opened');
        };
    };

    open () {
        this._popup.classList.toggle('popup_opened'); 
        document.addEventListener('keydown', this._handleEscClose);
    };

    close () {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);   
    
    };

    setEventListeners () {
        this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
			this.close(this._popup)
        });
    
    this._overlay = this._popup.querySelector('.popup__overlay');   
       this._overlay.addEventListener('click', () => { 
          this.close(this._popup)
      });
    };
    
};