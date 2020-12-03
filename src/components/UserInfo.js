export class UserInfo {
    constructor(UserName, UserAbout) {
        this._userName = UserName;
        this._userAbout = UserAbout;
        this._name = document.querySelector('.popup__field[name="name"]');
        this._about = document.querySelector('.popup__field[name="about"]');
    };

    getUserInfo () {
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent,
        }
    };
          
    setUserInfo () {     
        this._userName.textContent  = this._name.value; 
        this._userAbout.textContent  = this._about.value;  
     }; 
};