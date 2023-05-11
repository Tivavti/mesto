export default class Card {
  constructor( { data, handleCardClick, handleDeleteClick, handleLikeClick }, userId, templateSelector) {
    this.cardId = data._id;
    this._name = data.name;
    this._link = data.link;
    this.likes = data.likes;
    this._ownerId = data.owner._id;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;

    this.userId = userId;
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

  //обработчики лайка
  setLike() {
    this._buttonLike.classList.add('element__like-button_active');
  }

  deleteLike() {
    this._buttonLike.classList.remove('element__like-button_active');
  }

  isLiked() {
    return this.likes.some((item) => item._id === this.userId);
  }

  //обработчик удаления
  delete() {
    this._element.remove();
  };

  //накладывает все обработчики событий на карточку
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({
        name: this._name,
        link: this._link
      });
    });
  }

  //создание карточки для дальнейшей отрисовки в разметке
  generateCard() {
    this._element = this._getTemplate();

    //заголовок
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardTitle.textContent = this._name;

    //изображение
    this._cardImage = this._element.querySelector('.element__image');
    this._cardImage.src =  this._link;
    this._cardImage.alt = `Фотография ${this._name}`;

    //кнопки
    this._buttonLike = this._element.querySelector('.element__like-button');

    //счётчик лайков
    this._counterLikes = this._element.querySelector('.element__quantity-likes');
    this._counterLikes.textContent = this.likes.length;
      if (this.isLiked()) {
        this.setLike();
      }

    this._buttonDelete = this._element.querySelector('.element__delete-button');
      if (this._ownerId !== this.userId) {
        this._buttonDelete.remove();
      };

    this._setEventListeners();

    return this._element;
  };
};
