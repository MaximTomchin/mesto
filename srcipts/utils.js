const closePopupByESC = (evt) => {
    if (evt.key === 'Escape') {
        togglePopup(document.querySelector('.popup_opened'));
    }; 
};

const togglePopup = (popup) => {
    popup.classList.toggle('popup_opened');
    
    if (popup.classList.contains('popup_opened')) {
        document.addEventListener('keydown', closePopupByESC);
        popup.addEventListener('click', () => togglePopup(popup));
     
    } else {
        document.removeEventListener('keydown', closePopupByESC);
        popup.removeEventListener('click', () => togglePopup(popup)); 
    
    };
};

export {togglePopup}; 