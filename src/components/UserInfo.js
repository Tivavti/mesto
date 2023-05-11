export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._userNameElement = document.querySelector(name);
    this._userAboutMeElement = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userAboutMeElement.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._userNameElement.textContent = name;
    this._userAboutMeElement.textContent = about;
    this._avatar.src = avatar;
  }
}
