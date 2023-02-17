let profileEditButton = document.querySelector('.profile__edit-button');
let editPopup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__button-closed');
let userNameElement = document.querySelector('.profile__name');
let userAboutMeElement = document.querySelector('.profile__occupation');
let nameInput = document.querySelector('.popup__item_type_name');
let jobInput = document.querySelector('.popup__item_type_about-me');
let formElement = document.querySelector('.popup__inputs');

if (!profileEditButton) {
  throw new Error('no edit button');
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  nameInput.value = userNameElement.textContent;
  jobInput.value = userAboutMeElement.textContent;
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

profileEditButton.addEventListener('click', function() {
  openPopup(editPopup);
});


popupCloseButton.addEventListener('click', function () {
  closePopup(editPopup);
});

formElement.addEventListener('submit', handleFormSubmit);
