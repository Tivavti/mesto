const showInputError = (errorTextElement, validationMessage, activeErrorClass) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(activeErrorClass);
}

const hideInputError = (errorTextElement, activeErrorClass) => {
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

const checkInputValidation = (input, errorClassTemplate, activeErrorClass) => {
  const errorTextElement = document.querySelector(`${errorClassTemplate}${input.name}`);
  if(!input.validity.valid) {
    showInputError(errorTextElement, input.validationMessage, activeErrorClass);
  } else {
    hideInputError(errorTextElement);
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

const setEventListeners = (form, inputList, { errorClassTemplate, activeErrorClass, validSubmitButtonClass }, submitButton) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidation(input, errorClassTemplate, activeErrorClass);
      toggleButtonState(submitButton, validSubmitButtonClass, inputList);
    });
  });
}

const enableValidation = ( { formSelector, inputSelector, submitButtonSelector, ...config } ) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    const inputList = form.querySelectorAll(inputSelector);
    const submitButton = form.querySelector(submitButtonSelector);

    setEventListeners(form, inputList, config, submitButton);

    form.addEventListener('reset', () => {
      disableButton(submitButton, validSubmitButtonClass)
    })
  });
};

enableValidation({
  formSelector: '.popup__inputs',
  inputSelector: '.popup__item',
  errorClassTemplate: '.popup__item-error_type_',
  activeErrorClass: 'popup__input-error',
  submitButtonSelector: '.popup__button',
  validSubmitButtonClass: 'popup__button_valid'
});
