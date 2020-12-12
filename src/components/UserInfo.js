export class UserInfo {
    constructor(UserName, UserAbout) {
        this._userName = UserName;
        this._userAbout = UserAbout;
    };

    getUserInfo () {
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent,
        }
    };
          
    setUserInfo (data) {     
        this._userName.textContent  = data.name; 
        this._userAbout.textContent  = data.about;  
        this._userName._id = data._id;
    }; 
};