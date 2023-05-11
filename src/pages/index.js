import './index.css';

import { profileEditButton, profilePopup, placePopup, avatarPopup, nameInput, jobInput, profileAddButton, popupAvatarButton, config } from'../utils/data.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidation from '../components/FormValidation.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '6f02116a-e75d-4412-8aed-af12499c9bd8',
    "Content-Type": "application/json"
  }
});

let userId;

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    userInfoElement.setUserInfo(userInfo);
    section.renderItems(cards.reverse());
    })
 .catch((res) => {
    console.log(`Ошибка ${res.status}`)
  })

const popupWithImage = new PopupWithImage('.popup_type_image');

const popupWithSubmit = new PopupWithConfirmation('.popup_type_submit');
const userInfoElement = new UserInfo({
  name: '.profile__name',
  about: '.profile__occupation',
  avatar: '.profile__avatar'
});

const popupWithAvatar = new PopupWithForm(
  '.popup_type_avatar',
  (data) => {
    popupWithAvatar.handleLoading();
    api.changeAvatar(data.avatar)
      .then((res) => {
        userInfoElement.setUserInfo(res);
        popupWithAvatar.close();
      })
      .catch((res) => {
         console.log(`Ошибка ${res.status}`);
      })
      .finally(() => {
        popupWithAvatar.handleLoading('Сохранить');
      })
  });

const profilePopupWithForm = new PopupWithForm(
  '.popup_type_edit',
  (data) => {
    profilePopupWithForm.handleLoading();
    api.editUserInfo(data.name, data.about)
      .then((res) => {
        userInfoElement.setUserInfo(res);
        profilePopupWithForm.close();
      })
      .catch((res) => {
         console.log(`Ошибка ${res.status}`);
      })
      .finally(() => {
        profilePopupWithForm.handleLoading('Сохранить');
      })
});

const placePopupWithForm = new PopupWithForm(
  '.popup_type_add',
  (data) => {
    placePopupWithForm.handleLoading();
    api.addNewCard(data.name, data.link)
      .then((res) => {
        const cardElement = createCard(res, userId);
        section.addItem(cardElement);
        placePopupWithForm.close();
        })
      .catch((res) => {
        console.log(`Ошибка ${res.status}`);
      })
      .finally(() => {
        placePopupWithForm.handleLoading('Сохранить');
      })
});

const createCard = (data) => {
  const card = new Card ({
    data,
    handleCardClick: (data) => {
      popupWithImage.open(data);
    },
    handleDeleteClick: (card) => {
      popupWithSubmit.open();
      popupWithSubmit.setSubmitAction(() => {
        api.deleteCard(card.cardId)
          .then((res) => {
            card.delete(res);
            popupWithSubmit.close();
        })
        .catch((res) => {
          console.log(`Ошибка ${res.status}`);
        })
     })
    },
    handleLikeClick: (card) => {
      if (card.hasLiked()) {
        api.deleteLike(card.cardId)
          .then ((res) => {
            card.deleteLike();
            card.setLike(res);
         })
      } else {
        api.setLike(card.cardId)
          .then ((res) => {
            card.addLike();
            card.setLike(res);
          })
      }
    }
  },
  userId,
  '.element__template'
  );
      return card.generateCard();
};

    const section = new Section ({
      renderer: (data) => {
        section.addItem(createCard(data));
      }},
    '.elements__list');


const formValidationProfilePopup = new FormValidation(config, profilePopup);
const formValidationPlacePopup = new FormValidation(config, placePopup);
const formValidationAvatarPopup = new FormValidation(config, avatarPopup);

formValidationProfilePopup.enableValidation();
formValidationPlacePopup.enableValidation();
formValidationAvatarPopup.enableValidation();

popupWithImage.setEventListeners();
profilePopupWithForm.setEventListeners();
placePopupWithForm.setEventListeners();
popupWithAvatar.setEventListeners();
popupWithSubmit.setEventListeners();

popupAvatarButton.addEventListener('click', () => {
  formValidationAvatarPopup.clearInputErrors();
  formValidationAvatarPopup.disableButton();

  popupWithAvatar.open();
});

profileEditButton.addEventListener('click', () => {
 const profileUserInfo = userInfoElement.getUserInfo();

  nameInput.value = profileUserInfo.name;
  jobInput.value = profileUserInfo.about;

  formValidationProfilePopup.clearInputErrors();

  profilePopupWithForm.open();
});

profileAddButton.addEventListener('click', () => {
  formValidationPlacePopup.clearInputErrors();
  formValidationPlacePopup.disableButton();

  placePopupWithForm.open();
});
