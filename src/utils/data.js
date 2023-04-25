const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const placePopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
const cardTemplate = document.querySelector('.element__template');
const popupEditCloseButton = profilePopup.querySelector('.popup__button-closed');
const popupAddCloseButton = placePopup.querySelector('.popup__button-closed');
const popupCloseButtonList = document.querySelectorAll('.popup__button-closed');
const popupImageCloseButton = imagePopup.querySelector('.popup__button-closed');
const profileFormElement = document.querySelector('.popup__inputs_placed_profile');
const placeFormElement = document.querySelector('.popup__inputs_placed_elements');
const userNameElement = document.querySelector('.profile__name');
const userAboutMeElement = document.querySelector('.profile__occupation');
const nameInput = document.querySelector('.popup__item_type_name');
const jobInput = document.querySelector('.popup__item_type_about-me');
const titleInput = placeFormElement.querySelector('.popup__item_type_place');
const linkInput = placeFormElement.querySelector('.popup__item_type_link');
const profileAddButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements__list');
const imageElement = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');
const popupList = Array.from(document.querySelectorAll('.popup'));
const config = {
  formSelector: '.popup__inputs',
  inputSelector: '.popup__item',
  errorClassTemplate: '.popup__item-error_type_',
  activeErrorClass: 'popup__input-error',
  submitButtonSelector: '.popup__button',
  validSubmitButtonClass: 'popup__button_valid',
  errorClass: 'popup__item-underline'
};

export { profileEditButton, profilePopup, placePopup, imagePopup, cardTemplate, popupEditCloseButton, popupAddCloseButton, popupCloseButtonList, popupImageCloseButton, profileFormElement, placeFormElement, userNameElement, userAboutMeElement, nameInput, jobInput, titleInput, linkInput, profileAddButton, cardsContainer, imageElement, imageCaption, popupList, config }
