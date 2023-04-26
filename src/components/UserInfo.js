export default class UserInfo {
  constructor({ userNameSelector, userAboutMeSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutMeElement = document.querySelector(userAboutMeSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userAboutMe: this._userAboutMeElement.textContent
    }
  }

  setUserInfo( {userName, userAboutMe} ) {
    this._userNameElement.textContent = userName;
    this._userAboutMeElement.textContent = userAboutMe;
  }
}
