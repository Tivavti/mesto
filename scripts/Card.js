import { imagePopup, imageElement, imageCaption } from'./data.js'
import { openPopup } from './index.js'
export default class Card {
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
  };
};
