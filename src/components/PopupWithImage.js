import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElement = this._popupSelector.querySelector('.popup__image');
    this._imageCaption = this._popupSelector.querySelector('.popup__caption');
  }

  openPopup(data) {
    this._imageElement.src = data.link;
    this._imageElement.alt = data.name;
    this._imageCaption.textContent = data.name;
    super.open();
  }

}
