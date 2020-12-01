export class UserInfo {
    constructor(UserNameSelector, UserInfoSelector) {
        this._userName = UserNameSelector;
        this._userInfo = UserInfoSelector;
        this._name = document.querySelector('.popup__field[name="name"]');
        this._about = document.querySelector('.popup__field[name="about"]');
    };

    getUserInfo () {
        this._name.value = this._userName.textContent;
        this._about.value = this._userInfo.textContent;
    };

    setUserInfo () {
        this._userName.textContent  = this._name.value;
        this._userInfo.textContent  = this._about.value; 
    };
};

