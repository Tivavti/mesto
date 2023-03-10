const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const placePopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
const newCard = document.querySelector('.element__template');
const popupEditCloseButton = profilePopup.querySelector('.popup__button-closed');
const popupAddCloseButton = placePopup.querySelector('.popup__button-closed');
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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
}

const createCard = (cardData) => {
  const newCardCopy = newCard.content.cloneNode(true);

  //?????????????????? ?????? ?????????????????????? ???? ?????????????? data,
  const cardTitle = newCardCopy.querySelector('.element__title');
  cardTitle.textContent = cardData.name;

  const cardImage = newCardCopy.querySelector('.element__image');
  cardImage.src =  cardData.link;
  cardImage.alt = `???????????????????? ${cardData.name}`;

  //???????????????????? ???????????? ?????????????????????? ??????????????
  const buttonLike = newCardCopy.querySelector('.element__like-button');
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('element__like-button_active')
  });

  const buttonDelete = newCardCopy.querySelector('.element__delete-button');
  const card = newCardCopy.querySelector('.element');
  buttonDelete.addEventListener('click', () => {
    card.remove()
  });

  cardImage.addEventListener('click', function () {
    imageElement.src = cardData.link;
    imageElement.alt = cardData.alt;
    imageCaption.textContent = cardData.name;

    openPopup(imagePopup);
  });

  // ???????????????????? ???????????????????????? ????????????????
  return newCardCopy;
};

const renderCard = (card) => {
  // ?????????????? ???????????????? ???? ???????????? ????????????
  const cardElement = createCard(card);
  // ???????????????? ???? ?? ?????????????????? ????????????????
  cardsContainer.prepend(cardElement);
};

initialCards.forEach(card => {
  renderCard(card);
});

profileEditButton.addEventListener('click', function () {
  openPopup(profilePopup);

  nameInput.value = userNameElement.textContent;
  jobInput.value = userAboutMeElement.textContent;
});

popupEditCloseButton.addEventListener('click', function () {
  closePopup(profilePopup);
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

placeFormElement.addEventListener('submit', handlePlaceFormSubmit);

profileAddButton.addEventListener('click', function () {
  openPopup(placePopup);
});

popupAddCloseButton.addEventListener('click', function () {
  closePopup(placePopup);
});

popupImageCloseButton.addEventListener('click', function () {
  closePopup(imagePopup);
});
