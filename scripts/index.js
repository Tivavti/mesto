let profileEditButton = document.querySelector('.profile__edit-button');
let editPopup = document.querySelector('.popup');
if (!profileEditButton) {
  throw new Error('no edit button');
};

profileEditButton.addEventListener('click', function() {
  openPopup(editPopup);
});

let popupCloseButton = document.querySelector('.popup__button-closed');
popupCloseButton.addEventListener('click', function () {
  closePopup(editPopup);
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

let userNameElement = document.querySelector('.profile__name');
let userAboutMeElement = document.querySelector('.profile__occupation');
let nameInput = document.querySelector('.popup__input_name');
nameInput.value = userNameElement.textContent;

let jobInput = document.querySelector('.popup__input_about-me');
jobInput.value = userAboutMeElement.textContent;

let formElement = document.querySelector('.popup__inputs');
function handleFormSubmit(evt) {
    evt.preventDefault();
userNameElement.textContent = nameInput.value;
userAboutMeElement.textContent = jobInput.value;
closePopup(editPopup);
};

formElement.addEventListener('submit', handleFormSubmit);
