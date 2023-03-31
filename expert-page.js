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

  const pattern = /^( ?⁃|\-|\—|\– ?)/g;
  const regexp = /\n\n/g;
  const endOfTheLine = /\n$/g;

  if (card.description) {
    const descContainer = newCard.querySelector('.expert-card__tabpanel-content_type_description');

    card.description.replace(regexp, '\n').split('\n').forEach(item => {
      const descItem = document.createElement('li');
      descContainer.append(descItem);
      descItem.classList.add('expert-card__info-item');
      if (item !== '') {
        descItem.textContent = item.replace(pattern, '').trim();
      } else {
        descItem.style.display = 'none';
      }

    });
  }

  if (card.about_me) {
    const aboutMeContainer = newCard.querySelector('.expert-card__tabpanel-content_type_about');
    card.about_me.replace(regexp, '\n').replace(endOfTheLine, '').split('\n').forEach(item => {
      const aboutMeItem = document.createElement('li');
      aboutMeContainer.append(aboutMeItem);
      aboutMeItem.classList.add('expert-card__info-item');
      aboutMeItem.style.listStyleType = 'none';
      aboutMeItem.textContent = item;
    });
  } else {
    const aboutMeListItem = newCard.querySelector('.expert-card__tabs-item_type_about');
    aboutMeListItem.style.display = 'none';
  }

  if (card.experience) {
    const expContainer = newCard.querySelector('.expert-card__tabpanel-content_type_experience');
    card.experience.replace(regexp, '\n').split('\n').forEach(item => {

      const experienceItem = document.createElement('li');
      expContainer.append(experienceItem);
      experienceItem.classList.add('expert-card__info-item');
      if (item !== '') {
        experienceItem.textContent = item.replace(pattern, '').trim();
      } else {
        experienceItem.style.display = 'none';
      }
    });
  } else {
    const expListItem = newCard.querySelector('.expert-card__tabs-item_type_experience');
    expListItem.style.display = 'none';
  }

  const photoElement = newCard.querySelector('.expert-card__image');

  if (card.photo) {
    photoElement.src = card.photo;
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
  profiCardContainerElement.querySelector('.expert-card').remove();
  profiCardContainerElement.classList.remove('skeleton');
  console.log('Сейчас я очищусь');
  document.querySelector('.profi__request').style.display = 'none';

  cardContainer.prepend(cardItem);

  const tabContainer = document.querySelector('.expert-card__tabs');
  checkActiveTab(tabContainer);
}

// скелетон на время ожидания ответа от сервера

function isLoading() {
  profiCardContainerElement.classList.add('skeleton');
  profiCardContainerElement.prepend(profiCardTemplateElement.querySelector('.expert-card').cloneNode(true));

}

// создание запроса для получения карточки эксперта

const getExpertsCard = () => {
  return fetch('./experts_full.json')
    .then(response => response.json())
    .catch(error => console.log(error));
}

// получаем id эксперта из параметра в URL-адресе
const params = new URLSearchParams(window.location.search);
const expertId = params.get('id');

const init = async () => {
  isLoading();
  try {
    profiCards = await getExpertsCard();
    const profiCard = profiCards.find((element) => element.id === Number(expertId));
    renderCard(profiCard, profiCardContainerElement);
  } catch {
    profiCardContainerElement.querySelector('.expert-card').remove();
    profiCardContainerElement.classList.remove('skeleton');
    document.querySelector('.profi__request').style.display = 'flex';
  }

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

    // удалить класс tabpanel_full у всех элементов с классом tabpanel
    mainContainer
        .querySelectorAll(".tabpanel")
        .forEach((item) => item.classList.remove("tabpanel_full"));

    mainContainer
        .querySelectorAll(".expert-card__tabpanel-content")
        .forEach((item) => item.classList.remove("overlay"));

    removeShowMoreButton();

    showMoreButton(mainContainer, `[id="${targetPanel}"]`);
    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);

}

function showMoreButton(parent, content) {
  const activePanel = parent.querySelector(content);
  const height = activePanel.scrollHeight;
  const activePanelContent = activePanel.querySelector('.expert-card__tabpanel-content');

  if (height > 300) {
    activePanelContent.classList.add('overlay');

    const moreButtons = parent.querySelectorAll('.expert-card__more-button');
    moreButtons.forEach((button) => button.remove());

    const moreButton = document.createElement('button');
    moreButton.classList.add('expert-card__more-button', 'button');
    moreButton.innerHTML = 'Подробнее';
    moreButton.addEventListener('click', () => {
      activePanel.classList.toggle('tabpanel_full');
      activePanelContent.classList.toggle('overlay');
      if (moreButton.innerHTML === 'Подробнее') {
        moreButton.innerHTML = 'Скрыть';
        activePanelContent.classList.remove('overlay');
      } else {
        moreButton.innerHTML = 'Подробнее';
        activePanelContent.classList.add('overlay');
      }
    });
    activePanel.parentNode.appendChild(moreButton);
  }
}

function removeShowMoreButton() {
  const readMoreButtons = document.querySelectorAll('.expert-card__more-button');
  readMoreButtons.forEach((button) => {
    button.remove();
  });
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => {
          item.classList.add("hidden");
          item.classList.remove('tabpanel_active');
        });
}

function showContent(parent, content) {
  parent.querySelector(content).classList.remove("hidden");
  parent.querySelector(content).classList.add('tabpanel_active');
}

function checkActiveTab(tabContainer) {
  const activeTab = tabContainer.querySelector('[aria-selected="true"]');
  const activePanel = tabContainer.querySelector(`#${activeTab.getAttribute("aria-controls")}`);

  removeShowMoreButton(tabContainer);
  showMoreButton(activePanel.parentNode, `#${activePanel.id}`);
}
