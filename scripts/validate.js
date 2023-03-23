const showInputError = (input, errorTextElement, validationMessage, activeErrorClass, errorClass) => {
  input.classList.add(errorClass);
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(activeErrorClass);
}

const hideInputError = (input, errorTextElement, activeErrorClass, errorClass) => {
  input.classList.remove(errorClass);
  errorTextElement.classList.remove(activeErrorClass);
  errorTextElement.textContent = '';
}

const disableButton = (submitButton, validSubmitButtonClass) => {
  submitButton.classList.remove(validSubmitButtonClass);
  submitButton.disabled = true;
}

const enableButton = (submitButton, validSubmitButtonClass) => {
  submitButton.classList.add(validSubmitButtonClass);
  submitButton.disabled = false;
}

const checkInputValidation = (input, errorClassTemplate, activeErrorClass, errorClass) => {
  const errorTextElement = document.querySelector(`${errorClassTemplate}${input.name}`);
  if(!input.validity.valid) {

    showInputError(input, errorTextElement, input.validationMessage, activeErrorClass, errorClass);
  } else {
    input.classList.remove(errorClass);
    hideInputError(input, errorTextElement, activeErrorClass, errorClass);
  }
}

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => !input.validity.valid);
}

const toggleButtonState = (submitButton, validSubmitButtonClass, inputList) => {
  if(!hasInvalidInput(inputList)) {
    enableButton(submitButton, validSubmitButtonClass);
  } else {
    disableButton(submitButton, validSubmitButtonClass);
  }
}

const setEventListeners = (inputList, { errorClassTemplate, activeErrorClass, validSubmitButtonClass, errorClass }, submitButton) => {
   inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidation(input, errorClassTemplate, activeErrorClass, errorClass);
      toggleButtonState(submitButton, validSubmitButtonClass, inputList);
    });
  });
}

const enableValidation = ( { formSelector, inputSelector, submitButtonSelector, ...config } ) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    const inputList = form.querySelectorAll(inputSelector);
    const submitButton = form.querySelector(submitButtonSelector);

    setEventListeners(inputList, config, submitButton);

    form.addEventListener('reset', () => {
      disableButton(submitButton, config.validSubmitButtonClass)
    })
  });
};

enableValidation({
  formSelector: '.popup__inputs',
  inputSelector: '.popup__item',
  errorClassTemplate: '.popup__item-error_type_',
  activeErrorClass: 'popup__input-error',
  submitButtonSelector: '.popup__button',
  validSubmitButtonClass: 'popup__button_valid',
  errorClass: 'popup__item-underline'
});
