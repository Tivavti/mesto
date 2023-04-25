import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__inputs')
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__item'));

    const formValues = {};
    this._inputList.forEach(input => {
      const value = input.value;
      const name = input.name;

      formValues[name] = value;
    });

    return formValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);

      this.closePopup();
    })

    super.setEventListeners();
  }

  closePopup() {
    this._form.reset();
    super.closePopup();
  }
}
