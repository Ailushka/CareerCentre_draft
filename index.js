/* -------------------- */
/*      Mobile menu     */
/* -------------------- */

const burgerButton = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const menuLinks = document.querySelectorAll('.nav-list__link');

burgerButton.addEventListener("click", function () {
    burgerButton.classList.toggle("burger_active");
    nav.classList.toggle("nav_opened");
    nav.classList.toggle("transition");
    document.querySelector('.page').classList.toggle('no-scroll');
    document.querySelector('html').classList.toggle('no-scroll');
});

menuLinks.forEach(menuLink => {
  menuLink.addEventListener('click', () => {
    burgerButton.classList.remove("burger_active");
    nav.classList.remove("nav_opened");
    nav.classList.remove("transition");
    document.querySelector('.page').classList.remove('no-scroll');
    document.querySelector('html').classList.remove('no-scroll');
  })
});

/* -------------------- */
/*     Touch slider     */
/* -------------------- */

const slider = document.querySelector('.touch-slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  slider.classList.remove('grab');
  slider.classList.add('grabbing');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', _ => {
  isDown = false;
  slider.classList.remove('active');
  slider.classList.add('grab');
  slider.classList.remove('grabbing');
});
slider.addEventListener('mouseup', _ => {
  isDown = false;
  slider.classList.remove('active');
  slider.classList.add('grab');
  slider.classList.remove('grabbing');
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 2;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
});

slider.classList.add('grab');
slider.classList.remove('grabbing');

/* -------------------- */
/*     Smooth links     */
/* -------------------- */

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

/* -------------------- */
/*    Carousel slider   */
/* -------------------- */

document.querySelectorAll('.slide-arrow_next').forEach((item) => {
  item.addEventListener('click', (evt) => {
    const slidesContainer = evt.target.parentNode.parentNode.querySelector('.slides-container');
    const slide = slidesContainer.querySelector(".slide");

    const slideWidth = slide.offsetWidth;
    const slidesGap = parseInt(getComputedStyle(slidesContainer).gap, 10);

    slidesContainer.scrollLeft += (slideWidth + slidesGap);

    if (slidesContainer.scrollLeft >= (slidesContainer.scrollWidth - slidesContainer.offsetWidth - (slideWidth + slidesGap))) {
      item.classList.remove('slide-arrow_active');
    }

      item.previousElementSibling.classList.add('slide-arrow_active');
  })
})

document.querySelectorAll('.slide-arrow_prev').forEach((item) => {
  item.addEventListener('click', (evt) => {
    item.nextElementSibling.classList.add('slide-arrow_active');
    const slidesContainer = evt.target.parentNode.parentNode.querySelector('.slides-container');
    const slide = slidesContainer.querySelector(".slide");

    const slideWidth = slide.offsetWidth;
    const slidesGap = parseInt(getComputedStyle(slidesContainer).gap, 10);
    slidesContainer.scrollLeft -= (slideWidth + slidesGap);

    if (slidesContainer.scrollLeft < (slideWidth + slidesGap)) {
      item.classList.remove('slide-arrow_active');
    }
  })
})

/* -------------------- */
/*       Accordeon      */
/* -------------------- */

document.querySelectorAll('.accordeon__title').forEach((item) => {
  item.addEventListener('click', (evt) => {
    const content = evt.target.parentNode.querySelector('.accordeon__content');

    if (!item.classList.contains('accordeon__title_active'))
    {
      item.classList.add('accordeon__title_active');
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      item.classList.remove('accordeon__title_active');
      content.style.maxHeight = '';
    }
  })
})

/* -------------------- */
/*         Tabs         */
/* -------------------- */

// const tabList = document.querySelector('[role="tablist"]');
// const tabs = document.querySelectorAll('[role="tab"]');
//
// tabList.addEventListener('keydown', changeTabFocus);
//
// tabs.forEach((tab) => {
//     tab.addEventListener('click', changeTabPanel);
// });
//
//
// let tabFocus = 0;
// function changeTabFocus(evt) {
//     const keydownLeft = 37;
//     const keydownRight = 39;
//
//     if (evt.keyCode === keydownLeft || evt.keyCode === keydownRight) {
//         tabs[tabFocus].setAttribute("tabindex", -1);
//     }
//
//     if (evt.keyCode === keydownRight) {
//         tabFocus++;
//         if (tabFocus >= tabs.length) {
//             tabFocus = 0;
//         }
//     }
//
//     if (evt.keyCode === keydownLeft) {
//         tabFocus--;
//         if (tabFocus < 0) {
//             tabFocus = tabs.length - 1;
//         }
//     }
//
//     tabs[tabFocus].setAttribute("tabindex", 0);
//     tabs[tabFocus].focus();
// }
//
//
// function changeTabPanel(evt) {
//     const targetTab = evt.target;
//     const targetPanel = targetTab.getAttribute("aria-controls");
//
//     const tabContainer = targetTab.parentNode.parentNode;
//     const mainContainer = tabContainer.parentNode;
//
//     tabContainer
//         .querySelector('[aria-selected="true"]')
//         .setAttribute("aria-selected", false);
//
//     targetTab.setAttribute("aria-selected", true);
//
//     hideContent(mainContainer, '[role="tabpanel"]');
//     showContent(mainContainer, [`#${targetPanel}`]);
// }
//
// function hideContent(parent, content) {
//     parent
//         .querySelectorAll(content)
//         .forEach((item) => {
//           item.setAttribute("hidden", true);
//           item.classList.remove('tabpanel_active');
//         });
// }
//
// function showContent(parent, content) {
//      parent.querySelector(content).removeAttribute('hidden');
//      parent.querySelector(content).classList.add('tabpanel_active');
// }

/* -------------------- */
/*         Popup        */
/* -------------------- */

const requestButtons = document.querySelectorAll('.button_type_request');
const closeButtons = document.querySelectorAll('.button_type_close');
const requestPopup = document.querySelector('.popup_type_request');
const requestForm = document.querySelector('.form_type_request');
const successPopup = document.querySelector('.popup_type_success');
const reviewPopup = document.querySelector('.popup_type_review');
const reviewName = reviewPopup.querySelector('.reviews__name');
const reviewContent = reviewPopup.querySelector('.reviews__content');
const reviewImageName = reviewPopup.querySelector('.reviews__image');
const reviewImageLink = reviewPopup.querySelector('.reviews__image');
const reviews = document.querySelectorAll('.reviews-list__item');
const ESCAPE = 27;

function openPopUp(popup) {
  popup.classList.add('popup_opened');
  popup.classList.add('transition');
  document.querySelector('.page').classList.add('no-scroll');
  document.addEventListener('click', closePopUpByOverlay);
  document.addEventListener('keydown', closePopUpByEsc);

}

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  popup.classList.remove('transition');
  document.querySelector('.page').classList.remove('no-scroll');
  document.removeEventListener('click', closePopUpByOverlay);
  document.removeEventListener('keydown', closePopUpByEsc);
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function closePopUpByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopUp(evt.target);
  }
}

function closePopUpByEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.keyCode === ESCAPE) {
    closePopUp(popupOpened);
  }
}

function handleRequestFormSubmit(evt) {
    evt.preventDefault();
    const data = {};
    requestForm.querySelectorAll('.form__input').forEach((input) => {
      data[input.name] = input.value;
    });
    console.log(data);
    // onSubmit(name, email, phone, telegram, goal);
    closePopUp(requestPopup);
    openPopUp(successPopup);
    resetForm(evt.target);
    // return false;
}

// function onSubmit(name, email, phone, telegram, goal) {
//   api.postUserRequest(name, email, phone, telegram, goal)
//     .then((res) => {
//       if (res) {
//         console.log(res);
//         closePopUp(requestPopup);
//       } else {
//         console.log(res);
//       }
//     })
//     .catch(err => console.log(err))
// }

requestButtons.forEach((item) => {
  item.addEventListener('click', () => {
      openPopUp(requestPopup);
  });
});

reviews.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const reviewToOpen = evt.target.closest('.reviews-list__item');
    const openedReviewName = reviewToOpen.querySelector('.reviews__name').textContent;
    const openedReviewContent = reviewToOpen.querySelector('.reviews__content').textContent;
    const openedReviewImageName = reviewToOpen.querySelector('.reviews__image').alt;
    const openedReviewImageLink = reviewToOpen.querySelector('.reviews__image').src;

    reviewName.textContent = openedReviewName;
    reviewContent.textContent = openedReviewContent;
    reviewImageName.alt = openedReviewImageName;
    reviewImageLink.src = openedReviewImageLink;

      openPopUp(reviewPopup);
  });
});

closeButtons.forEach((item) => {
  item.addEventListener('click', (evt) => {
      const popUpToClose = evt.target.closest('.popup');
      closePopUp(popUpToClose);
  });
});

// requestForm.addEventListener('submit', handleRequestFormSubmit);

/* -------------------- */
/*    Form validation   */
/* -------------------- */

const showInputError = (formElement, inputElement, errorMessage) => {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('form__input_invalid');
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('form__input_invalid');
  errorElement.textContent = '';
}

const isValid = (formElement, inputElement) => {

  if (inputElement.name === 'name') {
    if (inputElement.value.length === 0) {
      inputElement.setCustomValidity('Это обязательное поле');
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else if (!inputElement.value.match(/[a-zа-я\s\-]/gi)) {
      inputElement.setCustomValidity('Недопустимый символ для ввода');
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      inputElement.setCustomValidity('');
      hideInputError(formElement, inputElement);
    }
  }

  if (inputElement.name === 'email') {
    if (inputElement.value.length === 0) {
      inputElement.setCustomValidity('Это обязательное поле');
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else if (!inputElement.value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
      inputElement.setCustomValidity('Некорректный email-адрес');
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      inputElement.setCustomValidity('');
      hideInputError(formElement, inputElement);
    }
  }

  if (inputElement.name === 'telegram') {
    if (inputElement.value.length === 0) {
      inputElement.setCustomValidity('Это обязательное поле');
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else if (inputElement.value.match(/^\@/)) {
      inputElement.setCustomValidity('Недопустимый символ для ввода');
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      inputElement.setCustomValidity('');
      hideInputError(formElement, inputElement);
    }
  }

  // Валидация телефона - ^[+][0-9]\d{10}$
  // Валидация телеграма - ^[_a-zA-Z][\w\d]{4,31}$


  if (inputElement.type === 'tel') {
    if (!inputElement.value.match(/^\+/)) {
      inputElement.setCustomValidity('Поле должно начинаться со знака +');
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      inputElement.setCustomValidity('');
      hideInputError(formElement, inputElement);
    }
  }

  if (!inputElement.required && inputElement.value.length === 0) {
    inputElement.setCustomValidity('');
    hideInputError(formElement, inputElement);
  }
}

const setButtonState = (buttonElement, isActive) => {
  if (isActive) {
    buttonElement.classList.remove('button_disabled');
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add('button_disabled');
    buttonElement.disabled = true;
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.button_type_submit');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      setButtonState(buttonElement, formElement.checkValidity());
    })
  });
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('reset', () => {
      inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
      });
      setButtonState(buttonElement, false);
    })
  });
}

const resetForm = (formElement) => {
  formElement.reset();
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  const buttonElement = formElement.querySelector('.button_type_submit');
  setButtonState(buttonElement, false);
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();

/* -------------------- */
/*    Experts search    */
/* -------------------- */

// const init = () => {
//   getExpertsList();
// }
//
// const getExpertsList = () => {
//   return fetch('http://51.250.92.80/api/v1/experts/')
//     .then(response => response.json())
//     // .then(data => console.log(data))
//     .catch(error => console.log(error));
// }
//
// init();

/* -------------------- */
/*          API         */
/* -------------------- */

class Api {
  constructor(baseUrl) {
    this._url = baseUrl;
  }

  // форма заявки
  postUserRequest(name, email, phone, telegram, goal) {
    return fetch(`${this._url}/api/v1/leeds`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "phone": phone,
        "telegram": telegram,
        "goal": goal
      })
    })
    .then(this._checkResponse)
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api('http://localhost');
