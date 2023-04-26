export default class FormValidation {
  //принимает в конструктор объект настроек с селекторами и классами формы, принимает вторым параметром элемент той формы, которая валидируется;
  constructor(config, form) {
   this.config = config;
   this._form = form;
   this._inputList = Array.from(this._form.querySelectorAll(this.config.inputSelector));
   this._submitButton = this._form.querySelector(this.config.submitButtonSelector);
  };

  _showInputError = (input, validationMessage) => {
    const errorTextElement = this._form.querySelector(`${this.config.errorClassTemplate}${input.name}`);
    input.classList.add(this.config.errorClass);
    errorTextElement.textContent = validationMessage;
    errorTextElement.classList.add(this.config.activeErrorClass);
  };

  _hideInputError = (input) => {
    const errorTextElement = this._form.querySelector(`${this.config.errorClassTemplate}${input.name}`);
    console.log(this._form)
    input.classList.remove(this.config.errorClass);
    console.log(errorTextElement)
    errorTextElement.classList.remove(this.config.activeErrorClass);
    errorTextElement.textContent = '';
  };

  clearInputErrors = () => {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  };

  //изменяет состояние кнопки сабмита
  disableButton() {
    this._submitButton.classList.remove(this.config.validSubmitButtonClass);
    this._submitButton.disabled = true;
  };

  _enableButton() {
    this._submitButton.classList.add(this.config.validSubmitButtonClass);
    this._submitButton.disabled = false;
  };

  //метод проверяет валидность поля
  _checkInputValidation(input) {
    if(!input.validity.valid) {
      this._showInputError(input, input.validationMessage, this.config);
    } else {
      input.classList.remove(this.config.errorClass);
      this._hideInputError(input);
    };
  };

  _hasInvalidInput() {
    return Array.from(this._inputList).some((input) => !input.validity.valid);
  };

  _toggleButtonState() {
    if(!this._hasInvalidInput(this._inputList)) {
      this._enableButton();
    } else {
      this.disableButton();
    };
  };

//устанавливает все обработчики
  _setEventListeners() {
      this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
         this._checkInputValidation(input);
         this._toggleButtonState();
        });
     });
  };

  //включает валидацию формы
  enableValidation() {
    this._inputList.forEach(() => {
      this._setEventListeners();

      this._form.addEventListener('reset', () => {
        this.disableButton();
      });
    });
  };
};
