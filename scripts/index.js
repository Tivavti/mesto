import { profileEditButton, profilePopup, placePopup, imagePopup, popupEditCloseButton, popupAddCloseButton, popupImageCloseButton, profileFormElement, placeFormElement, userNameElement, userAboutMeElement, nameInput, jobInput, titleInput, linkInput, profileAddButton, cardsContainer, popupList, config } from'./data.js';
import Card from './Card.js';
import initialCards from './cards.js';
import FormValidation from './FormValidation.js';

const formValidationProfilePopup = new FormValidation(config, profilePopup);
const formValidationPlacePopup = new FormValidation(config, placePopup);

function closePopupByEscKey(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', closePopupByEscKey);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupByEscKey);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userNameElement.textContent = nameInput.value;
  userAboutMeElement.textContent = jobInput.value;

  closePopup(profilePopup);
};

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  renderCard( {
    name: titleInput.value,
    link: linkInput.value
  });

  evt.target.reset();
  closePopup(placePopup);
};

function openProfilePopup() {
  openPopup(profilePopup);

  nameInput.value = userNameElement.textContent;
  jobInput.value = userAboutMeElement.textContent;

  formValidationProfilePopup.clearInputError();
};

const renderCard = (card) => {
  // Создаем карточку на основе класса
  const cardElement = new Card(card, '.element__template');
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement.generateCard());
};

initialCards.forEach(card => {
 renderCard(card);
});

popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
  });
});

formValidationProfilePopup.enableValidation();
formValidationPlacePopup.enableValidation();

profileEditButton.addEventListener('click', openProfilePopup);

popupEditCloseButton.addEventListener('click', function () {
  closePopup(profilePopup);
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

placeFormElement.addEventListener('submit', handlePlaceFormSubmit);

profileAddButton.addEventListener('click', () => {
  formValidationPlacePopup.clearInputError();
  openPopup(placePopup);
});

popupAddCloseButton.addEventListener('click', function () {
  closePopup(placePopup);
});

popupImageCloseButton.addEventListener('click', function () {
  closePopup(imagePopup);
});


