import Popup from './Popup.js';

export default class PopupWithConfirmationjsjs extends Popup {
  constructor(popupSelector, cardId) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__inputs');
    this._cardId = cardId;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this.close();
    });
  };
}
