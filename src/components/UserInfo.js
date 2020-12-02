export class UserInfo {
    constructor(UserName, UserAbout) {
        this._userName = UserName;
        this._userAbout = UserAbout;
        this._name = document.querySelector('.popup__field[name="name"]');
        this._about = document.querySelector('.popup__field[name="about"]');
    };

    getUserInfo () {
        this._userInfoList = [
            this._name.value = this._userName.textContent,
            this._about.value = this._userAbout.textContent
        ];
        return this._userInfoList;
    };

    setUserInfo () {
       this._userName.textContent  = this._name.value;
       this._userAbout.textContent  = this._about.value; 
    };
};

