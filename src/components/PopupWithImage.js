import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup(data) {
    const imageElement = this._popup.querySelector('.popup__image');
    const imageCaption = this._popup.querySelector('.popup__caption');
    imageElement.src = data.link;
    imageElement.alt = data.name;
    imageCaption.textContent = data.name;
    super.openPopup();
  }

}
