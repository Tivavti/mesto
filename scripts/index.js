const profileEditButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup__type_edit');
const addPopup = document.querySelector('.popup__type_add');
const imagePopup = document.querySelector('.popup__type_image');
const popupEditCloseButton = editPopup.querySelector('.popup__button-closed');
const popupAddCloseButton = addPopup.querySelector('.popup__button-closed');
const popupImageCloseButton = imagePopup.querySelector('.popup__button-closed');
const editFormElement = document.querySelector('.popup__inputs_placed_profile');
const addFormElement = document.querySelector('.popup__inputs_placed_elements');
const userNameElement = document.querySelector('.profile__name');
const userAboutMeElement = document.querySelector('.profile__occupation');
const nameInput = document.querySelector('.popup__item_type_name');
const jobInput = document.querySelector('.popup__item_type_about-me');
const titleInput = addFormElement.querySelector('.popup__item_type_place');
const linkInput = addFormElement.querySelector('.popup__item_type_link');
const profileAddButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements__list');

const initialCards = [
  {
    name: 'Архыз',
    alt: 'Горы.',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    alt: 'Река.',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    alt: 'Панельные дома.',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    alt: 'Сопка.',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    alt: 'Железная дорога через лес. ',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    alt: 'Скалистый берег Байкала.',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = nameInput.value;
  userAboutMeElement.textContent = jobInput.value;
  closePopup(editPopup);
};

const createCard = (card) => {
  const newCard = document.querySelector('.element__template').content.cloneNode(true);

  //наполняем его информацией из объекта data,
  const cardTitle = newCard.querySelector('.element__title');
  cardTitle.textContent = card.name;
  const cardImage = newCard.querySelector('.element__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', `Фотография ${card.name}`);
  linkInput.src = cardImage.src;

  //навешиваем всякие обработчики событий
  newCard.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active')});
  newCard.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove()});
  cardImage.addEventListener('click', function () {
    const imageElement = document.querySelector('.popup__image');
    imageElement.src = card.link;
    imageElement.alt = card.alt;
    const imageCaption = document.querySelector('.popup__caption');
    imageCaption.textContent = card.name;
    openPopup(imagePopup);
  });

  // Возвращаем получившуюся карточку
  return newCard;
};

const renderCard = (card) => {
  // Создаем карточку на основе данных
  const cardElement = createCard(card);
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);
};

addFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

renderCard({
  name: titleInput.value,
  link: linkInput.value
});

evt.target.reset();
closePopup(addPopup);
});

initialCards.forEach(card => {
  renderCard(card);
});

profileEditButton.addEventListener('click', function() {
  openPopup(editPopup);
  nameInput.value = userNameElement.textContent;
  jobInput.value = userAboutMeElement.textContent;
});

popupEditCloseButton.addEventListener('click', function () {
  closePopup(editPopup);
});

editFormElement.addEventListener('submit', handleFormSubmit);

profileAddButton.addEventListener('click', function() {
  openPopup(addPopup);
});

popupAddCloseButton.addEventListener('click', function () {
  closePopup(addPopup);
});

popupImageCloseButton.addEventListener('click', function () {
  closePopup(imagePopup);
});
