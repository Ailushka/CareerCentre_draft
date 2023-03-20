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

let currentScreenWidth;

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

// тест
const testObj =
{
    "name": "Светлана Анастасова",
    "post": "Старший продуктовый дизайнер в Chatfood",
    "company_spheres": [
        "EdTech",
        "IT",
        "Международный рынок"
    ],
    "services": [
        {
            "name": "Карьерная консультация",
            "duration": "1.0",
            "price": "4000.00"
        },
        {
            "name": "Консультация по резюме на английском",
            "duration": "1.0",
            "price": "8000.00"
        },
        {
            "name": "Консультация по резюме на русском",
            "duration": "1.0",
            "price": "4000.00"
        },
        {
            "name": "Консультация с ментором",
            "duration": "1.0",
            "price": "4000.00"
        },
        {
            "name": "План по развитию навыков",
            "duration": "5.0",
            "price": "20000.00"
        },
        {
            "name": "Рекомендации по резюме на английском",
            "duration": null,
            "price": "2000.00"
        },
        {
            "name": "Рекомендации по резюме на русском",
            "duration": null,
            "price": "2000.00"
        },
        {
            "name": "Тренировочное интервью с рекрутером и экспертом",
            "duration": "1.5",
            "price": "8000.00"
        }
    ],
    "description": "⁃ Составить резюме на вакансии в российские и зарубежные компании\n ⁃ Составить портфолио: из чего должен состоять кейс продуктового дизайнера\n ⁃ Подготовить к собеседованию: какие вопросы часто задают и как на них лучше отвечать\n ⁃ Подготовить к техническому собеседованию по профилю UX/UI и продуктовый дизайн\n ⁃ Составить план карьерного развития в сфере UX/UI и продуктового дизайна",
    "about_me": "Я начала свою карьеру с работы в студии разработки мобильных приложений. Я проработала там около 2-х лет. За это время с моим участием было разработано с нуля и запущено около 10 продуктов, среди которых официальное приложение Пикабу на Андроид. \n\nПосле прохождения курсов в БВШД и Skillbox меня пригласили работать в МТС. Там в течение 2-х лет я занималась развитием дизайн культуры и построением дизайн процессов: проводила исследования, учебные конференции и митапы. Руководила командой из 12 дизайнеров и координировала их работу по продуктам компании. В то же самое время я занималась продуктами MTС Кэшбэк и МТС Локатор, которые были разработаны с нуля и запущены по agile-методологии.\n\nПоследние 2 года я работала старшим продуктовым дизайнером в Озоне. Я отвечала за дизайн-систему и занималась ее развитием, проводила собеседования, обучала стажёров. \n\nСейчас работаю в зарубежном стартапе Chatfood, где в мои задачи, помимо продуктовых, входит построение команды и налаживание процессов.\n\nВ течение последнего года я занималась с зарубежными рекрутерами, которые помогали мне составить резюме и подготовиться к собеседованиям по международным стандартам. Последние полгода я активно занималась поиском работы и прошла, наверное, пол сотни собеседований в различные российские и международные компании. \n",
    "experience": "⁃ Более 8 лет в дизайне, в том числе более 6 лет в UI/UX и продуктовом дизайне\n ⁃ UI/UX дизайнер в студии мобильной разработки Iron Water Studio\n ⁃ Продуктовый дизайнер, Старший продуктовый дизайнер, руководитель группы дизайна в МТС\n ⁃ Старший продуктовый дизайнер в Ozon\n ⁃ Ревьюер в Яндекс Практикум\n ⁃ Старший продуктовый дизайнер в Chatfood",
    "photo": "http://51.250.92.80/backend_media/photos/%D0%A1%D0%B2%D0%B5%D1%82%D0%BB%D0%B0%D0%BD%D0%B0_%D0%90%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D1%81%D0%BE%D0%B2%D0%B0.jpeg"
};

profiCardContainerElement.prepend(createCard(testObj));


// тест

// добавление карточки в разметку

function renderCard(card, cardContainer) {
  const cardItem = createCard(card);
  cardContainer.prepend(cardItem);
  handleShowMoreButton();
}

function handleShowMoreButton() {

  const infoContainersList = document.querySelectorAll('.expert-card__tabpanel-content');

  infoContainersList.forEach((item) => {
    if (item.offsetHeight > 304 && screen.width < 640) {
      item.style.maxHeight = `304px`;

      const showMoreButton = document.createElement('button');
      item.closest('.expert-card__tabpanel').append(showMoreButton);
      showMoreButton.classList.add('button', 'expert-card__more-button');
      showMoreButton.setAttribute("type", "button");
      showMoreButton.textContent = 'Подробнее';

      showMoreButton.addEventListener('click', (evt) => {
        if (evt.target.previousElementSibling.style.maxHeight === `304px`) {
          evt.target.previousElementSibling.style.maxHeight = `${evt.target.previousElementSibling.scrollHeight}px`;
          showMoreButton.textContent = 'Скрыть';
        } else {
          evt.target.previousElementSibling.style.maxHeight = `304px`;
          showMoreButton.textContent = 'Подробнее';
        }
      })
    }
  })
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

function getCurrentScreenWidth() {
  currentScreenWidth = screen.width;
  return currentScreenWidth;
}

window.addEventListener('resize', getCurrentScreenWidth);

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
