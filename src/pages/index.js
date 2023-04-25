import './index.css';

import { profileEditButton, profilePopup, placePopup, nameInput, jobInput, profileAddButton, config } from'../utils/data.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import initialCards from '../utils/cards.js';
import FormValidation from '../components/FormValidation.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupWithImage = new PopupWithImage('.popup_type_image');

const userInfoElement = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutMeSelector: '.profile__occupation'
})

const profilePopupWithForm = new PopupWithForm(
  '.popup_type_edit',
  (data) => {
    userInfoElement.setUserInfo(data);
})

const placePopupWithForm = new PopupWithForm(
  '.popup_type_add',
 (data) => {
    const cardElement = createCard(data);
    section.setItem(cardElement);
});

const createCard = (data) => {
  const card = new Card ({
    data,
    handleCardClick: (data) => {
      popupWithImage.openPopup(data);
    }},
    '.element__template'
  );
  return card.generateCard();
}

const section = new Section ({
  renderer: (data) => {
    section.setItem(createCard(data));
  }},
'.elements__list');

const formValidationProfilePopup = new FormValidation(config, profilePopup);
const formValidationPlacePopup = new FormValidation(config, placePopup);

formValidationProfilePopup.enableValidation();
formValidationPlacePopup.enableValidation();

section.renderItems(initialCards);
popupWithImage.setEventListeners();
profilePopupWithForm.setEventListeners();
placePopupWithForm.setEventListeners();

profileEditButton.addEventListener('click', () => {
  profilePopupWithForm.openPopup();
  const profileUserInfo = userInfoElement.getUserInfo();

  nameInput.value = profileUserInfo.userName;
  jobInput.value = profileUserInfo.userAboutMe;

  formValidationProfilePopup.clearInputError();
})

profileAddButton.addEventListener('click', () => {
  placePopupWithForm.openPopup();
  formValidationPlacePopup.clearInputError();
  formValidationPlacePopup.disableButton();

});
