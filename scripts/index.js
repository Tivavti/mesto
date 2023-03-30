const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const placePopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
const cardTemplate = document.querySelector('.element__template');
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
const popupList = Array.from(document.querySelectorAll('.popup'));

function closePopupByEscKey(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', closePopupByEscKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupByEscKey);
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

function openProfilePopup() {
  openPopup(profilePopup);

  nameInput.value = userNameElement.textContent;
  jobInput.value = userAboutMeElement.textContent;
}

class Card {
  //конструктор, который принимает данные карточки и шаблон, и сохраняет эти значения в свойствах
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  //метод, который получает разметку из шаблона
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  //обработчик лайка
  _like() {
    this._buttonLike.classList.toggle('element__like-button_active');
  }

  //обработчик удаления
  _delete() {
    this._element.remove();
    this._element = null;
  };

  //нажатие карточки для зума изображения
  _handleOpenImagePopup() {
    imageElement.src = this._link;
    imageElement.alt = this._name;
    imageCaption.textContent = this._name;

    openPopup(imagePopup);
  };

  //накладывает все обработчики событий на карточку
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._like();
    });

    this._buttonDelete.addEventListener('click', () => {
     this._delete();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleOpenImagePopup();
    });
  }

  //создание карточки для дальнейшей отрисовки в разметке
  generateCard() {
    //заголовок
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardTitle.textContent = this._name;

    //изображение
    this._cardImage = this._element.querySelector('.element__image');
    this._cardImage.src =  this._link;
    this._cardImage.alt = `Фотография ${this._name}`;

    //кнопки
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._buttonDelete = this._element.querySelector('.element__delete-button');

    this._setEventListeners();

    return this._element;
  }
}

const renderCard = (card) => {
  // Создаем карточку на основе данных
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
    }
  })
})

profileEditButton.addEventListener('click', openProfilePopup);

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
