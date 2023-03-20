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
/*  Experts card render */
/* -------------------- */

const profiCardContainerElement = document.querySelector('.main');
const profiCardTemplateElement = document.querySelector('.template_type_profi-card').content;

// создание карточки эксперта на основе темплейта

function createCard(card) {
  const newCard = profiCardTemplateElement.querySelector('.expert-card').cloneNode(true);

  const nameElement = newCard.querySelector('.expert-card__title');
  nameElement.textContent = card.name;

  const postElement = newCard.querySelector('.expert-card__about');
  if (card.post) {
    postElement.textContent = card.post;
  } else {
    postElement.style.display = "none";
  }

  if (card.company_spheres.length !== 0) {
    const tagsContainer = newCard.querySelector('.expert-card__tags');
    card.company_spheres.forEach(tag => {
      const tagItem = document.createElement('li');
      tagsContainer.prepend(tagItem);
      tagItem.classList.add('tag');
      tagItem.textContent = tag;
    });
  } else {
    newCard.querySelector('.expert-card__skills').style.display = "none";
  }

  const pattern = /⁃|\- ?/g;

  if (card.description) {
    const descContainer = newCard.querySelector('.expert-card__tabpanel-content_type_description');
    card.description.replace(pattern, '').split('\n').forEach(item => {
      const descItem = document.createElement('li');
      descContainer.append(descItem);
      descItem.classList.add('expert-card__info-item');
      descItem.textContent = item;
    });
  }

  if (card.about_me) {
    const aboutMeContainer = newCard.querySelector('.expert-card__tabpanel-content_type_about');
    card.about_me.replace(pattern, '').split('\n\n').forEach(item => {
      const aboutMeItem = document.createElement('li');
      aboutMeContainer.prepend(aboutMeItem);
      aboutMeItem.classList.add('expert-card__info-item');
      aboutMeItem.style.listStyleType = 'none';
      aboutMeItem.textContent = item;
    });
  }

  if (card.experience) {
    const expContainer = newCard.querySelector('.expert-card__tabpanel-content_type_experience');
    card.experience.replace(pattern, '').split('\n').forEach(item => {
      const experienceItem = document.createElement('li');
      expContainer.append(experienceItem);
      experienceItem.classList.add('expert-card__info-item');
      experienceItem.textContent = item;
    });
  }

  const photoElement = newCard.querySelector('.expert-card__image');

  if (card.photo) {
    photoElement.src = card.photo.replace('http://51.250.92.80', 'https://student-diary-landing.praktikum-services.ru/');
  } else {
    photoElement.src = "./images/experts/no-photo.svg";
  }

  photoElement.alt = card.name;

  if (card.services.length !== 0) {
    const servicesContainer = newCard.querySelector('.services-list');
    card.services.forEach(service => {
      const serviceItem = document.createElement('li');
      servicesContainer.append(serviceItem);
      serviceItem.classList.add('services-list__item');

      const serviceName = document.createElement('h3');
      serviceItem.prepend(serviceName);
      serviceName.classList.add('services-list__title', 'section-subtitle');
      serviceName.textContent = service.name;

      const servicePrice = document.createElement('p');
      serviceItem.append(servicePrice);
      servicePrice.classList.add('services-list__price');
      servicePrice.textContent = `${service.price.slice(0, -3).replace(/\B(?=(?:\d{3})*$)/g, ' ')} \u20bd`;

      if (service.duration) {
        const serviceDuration = document.createElement('span');
        servicePrice.append(serviceDuration);
        serviceDuration.classList.add('services-list__duration', 'section-subline');
        serviceDuration.textContent = ` / ${Math.floor(service.duration)} ч.`;
      }

      if (service.description) {
        const serviceDescription = document.createElement('p');
        serviceItem.append(serviceDescription);
        serviceDescription.classList.add('services-list__info', 'section-subline');
        serviceDescription.textContent = service.description;
      }

      const serviceButton = document.createElement('button');
      serviceItem.append(serviceButton);
      serviceButton.classList.add('button', 'button_type_main', 'expert-card__button', 'button-text', 'button_type_request');
      serviceButton.setAttribute("type", "button");
      serviceButton.textContent = 'Записаться';

    });
  } else {
    newCard.querySelector('.expert-card__services').style.display = "none";
  }

  const tabList = newCard.querySelector('[role="tablist"]');
  const tabs = newCard.querySelectorAll('[role="tab"]');

  tabList.addEventListener('keydown', changeTabFocus);

  tabs.forEach((tab) => {
      tab.addEventListener('click', changeTabPanel);
  });

  const newCardRequestButtons = newCard.querySelectorAll('.button_type_request');
  const newCardCloseButtons = document.querySelectorAll('.button_type_close');

  newCardRequestButtons.forEach((item) => {
    item.addEventListener('click', () => {
        openPopUp(requestPopup);
    });
  });

  newCardCloseButtons.forEach((item) => {
    item.addEventListener('click', (evt) => {
        const popUpToClose = evt.target.closest('.popup');
        closePopUp(popUpToClose);
    });
  });

  return newCard;
}

// добавление карточки в разметку

function renderCard(card, cardContainer) {
  const cardItem = createCard(card);
  cardContainer.prepend(cardItem);
}

// получаем id эксперта из параметра в URL-адресе
const params = new URLSearchParams(window.location.search);
const expertId = params.get('id');

// создание запроса на сервер для получения карточки эксперта

const getExpertsCard = () => {
  return fetch(`https://student-diary-landing.praktikum-services.ru/api/v1/experts/${expertId}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

const init = async () => {
  profiCard = await getExpertsCard();
  renderCard(profiCard, profiCardContainerElement);
}

init();

/* -------------------- */
/*         Popup        */
/* -------------------- */

const requestButtons = document.querySelectorAll('.button_type_request');
const closeButtons = document.querySelectorAll('.button_type_close');
const requestPopup = document.querySelector('.popup_type_request');
const requestForm = document.querySelector('.form_type_request');
const successPopup = document.querySelector('.popup_type_success');
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

requestButtons.forEach((item) => {
  item.addEventListener('click', () => {
      openPopUp(requestPopup);
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
/*         Tabs         */
/* -------------------- */

let tabFocus = 0;
function changeTabFocus(evt) {
    const keydownLeft = 37;
    const keydownRight = 39;

    if (evt.keyCode === keydownLeft || evt.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);
    }

    if (evt.keyCode === keydownRight) {
        tabFocus++;
        if (tabFocus >= tabs.length) {
            tabFocus = 0;
        }
    }

    if (evt.keyCode === keydownLeft) {
        tabFocus--;
        if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
        }
    }

    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}


function changeTabPanel(evt) {
    const targetTab = evt.target;
    const targetPanel = targetTab.getAttribute("aria-controls");

    const tabContainer = targetTab.parentNode.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);

    targetTab.setAttribute("aria-selected", true);

    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => {
          item.setAttribute("hidden", true);
          item.classList.remove('tabpanel_active');
        });
}

function showContent(parent, content) {
     parent.querySelector(content).removeAttribute('hidden');
     parent.querySelector(content).classList.add('tabpanel_active');
}
