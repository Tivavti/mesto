export default class Section {
  //конструктор, который принимает данные карточки и шаблон, и сохраняет эти значения в свойствах
  constructor( { renderer }, containerSelector) {
   this._renderer = renderer;
   this._container = document.querySelector(containerSelector);
  }

  //отрисовка всех элементов
  renderItems(items) {
    items.forEach(this._renderer);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

