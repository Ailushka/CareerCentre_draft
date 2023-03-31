/* -------------------- */
/*         Popup        */
/* -------------------- */

const requestButtons = document.querySelectorAll('.button_type_request');
const closeButtons = document.querySelectorAll('.button_type_close');
const requestPopup = document.querySelector('.popup_type_request');
const filtersPopup = document.querySelector('.popup_type_filters');
const filtersButton = document.querySelector('.button_type_filter');
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

filtersButton.addEventListener('click', () => {
  openPopUp(filtersPopup);
})

closeButtons.forEach((item) => {
  item.addEventListener('click', (evt) => {
      const popUpToClose = evt.target.closest('.popup');
      closePopUp(popUpToClose);
  });
});

/* -------------------- */
/*  Experts list render */
/* -------------------- */

const profiListContainerElement = document.querySelector('.profi-list');
const profiItemTemplateElement = document.querySelector('.template_type_profi-item').content;
const loadMoreButton = document.querySelector('.button_type_load-more');
const searchForm = document.querySelector('.form_type_search');
const searchQuery = searchForm.querySelector('.search-form__input');
const checkboxes = document.querySelectorAll('input[type=checkbox]');
let enabledSettings = [];
let profiItems = [];

const itemsPerPage = 12;
let currentPage = 1;

// создание карточки эксперта на основе темплейта

function createItem(item) {
  const newItem = profiItemTemplateElement.querySelector('.profi-list__item').cloneNode(true);

  const linkElement = newItem.querySelector('.profi__link');
  linkElement.href = `./expert-page.html?id=${item.id}`;

  const imageElement = newItem.querySelector('.profi__image');
  if (item.photo) {
    imageElement.src = item.photo.replace('http://51.250.92.80', 'https://student-diary-landing.praktikum-services.ru/');
  } else {
    imageElement.src = "./images/experts/no-photo.svg";
  }

  imageElement.alt = item.name;

  const headerElement = newItem.querySelector('.profi__name');
  headerElement.textContent = item.name;

  const tagsContainer = newItem.querySelector('.profi__tags');
  item.company_spheres.forEach(tag => {
    const tagItem = document.createElement('li');
    tagsContainer.prepend(tagItem);
    tagItem.classList.add('tag');
    tagItem.textContent = tag;
  });

  const textElement = newItem.querySelector('.profi__about');
  if (item.post) {
    textElement.textContent = item.post;
  } else {
    textElement.style.display = "none";
  }

  return newItem;
}

// добавление карточек в разметку

function renderItems(item, itemContainer) {
  const profiItem = createItem(item);
  itemContainer.append(profiItem);
}

// отрисовка карточек по 12 штук на странице

function addItems (expertsList, pageIndex) {
  const itemsLimit = expertsList.length;
  const pageCount = Math.ceil(itemsLimit / itemsPerPage);
  currentPage = pageIndex;

  if (currentPage < pageCount) {
    loadMoreButton.style.display = "block";
  } else {
    loadMoreButton.style.display = "none";
  }

  const startRange = (pageIndex - 1) * itemsPerPage;
  const endRange = pageIndex * itemsPerPage > itemsLimit ? itemsLimit : pageIndex * itemsPerPage;

  if (currentPage === 1) {
    profiListContainerElement.textContent = '';
    document.querySelector('.profi__request').style.display = 'none';
    profiListContainerElement.classList.remove('skeleton');
  }

  for (let i = startRange; i < endRange; i++) {
    renderItems(expertsList[i], profiListContainerElement);
  }

  if (expertsList.length === 0) {
    document.querySelector('.profi__request').style.display = 'flex';
  }
};

// отрисовка следующих 12 карточек по кнопке Показать ещё

function handleLoadMoreItems() {
  addItems(profiItems, currentPage + 1);
}

// скелетон на время ожидания ответа от сервера

function isLoading() {
  profiListContainerElement.classList.add('skeleton');
  for (let i = 0; i < itemsPerPage; i++) {
    profiListContainerElement.append(profiItemTemplateElement.querySelector('.profi-list__item').cloneNode(true));
  }
}

// создание запроса на сервер для получения списка экспертов
// http://51.250.92.80/api/v1/experts/
// https://student-diary-landing.praktikum-services.ru/api/v1/experts/

const getExpertsList = () => {
  return fetch('./experts.json')
    .then(response => response.json())
    .catch(error => console.log(error.message));
}

// создание запроса на сервер для получения списка экспертов

const getFilteredBySearchExpertsList = () => {
  return fetch(`http://51.250.92.80/api/v1/experts/search/?text=${searchQuery.value}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

// добавление списка экспертов при загрузке страницы

const init = async () => {
  isLoading();
  try {
    profiItems = await getExpertsList();
    addItems(profiItems, currentPage);
  } catch(err) {
    profiListContainerElement.style.display = 'none';
    profiListContainerElement.classList.remove('skeleton');
    loadMoreButton.style.display = 'none';
    document.querySelector('.profi__request').style.display = 'flex';
    document.querySelector('.request__title').textContent = 'Кажется, что-то пошло не так :-(';
    document.querySelector('.request__text').textContent = 'Попробуйте перезагрузить страницу или напишите нам, и мы подскажем, можем ли вам помочь.';
  }

}

init();

const handleSearchSubmit = async (evt) => {
  evt.preventDefault();
  isLoading();
  profiItems = await getFilteredBySearchExpertsList();
  addItems(profiItems, currentPage);
  searchForm.reset();
};

// const handleCheckboxChange = async (evt) => {
//   evt.preventDefault();
//   enabledSettings = Array.from(checkboxes).filter(i => i.checked).map(i => i.value);
//   console.log(enabledSettings);
//   isLoading();
//   profiItems = await getFilteredByServiceExpertsList();
//   addItems(profiItems, currentPage);
// };

searchForm.addEventListener('submit', handleSearchSubmit);
// checkboxes.forEach(checkbox => {
//   checkbox.addEventListener('change', handleCheckboxChange)
// })

loadMoreButton.addEventListener('click', handleLoadMoreItems);


// let values = [];
//
// values = Array.from(checkboxes).map(i => {
//   const { name, value } = i;
//   return { name, value };
// });

function createFilterQuery(data) {
  let queryString = '';
  data.forEach(item => {
    queryString += `${item.name}=${item.value}&`;
  })
  return queryString.slice(0, -1);
}
//
// const filterQueryString = createFilterQuery(values);
// console.log(filterQueryString);


/* -------------------- */
/*      Filter form     */
/* -------------------- */

const filterForm = document.querySelector('.form_type_filters');

// сбор данных из формы

function serializeForm(formNode) {
  const { elements } = formNode

  const data = Array.from(elements)
    .map((element) => {
      const { name, type } = element
      const value = type === 'checkbox' && !element.checked ? '' : element.value

      return { name, value }
    })
    .filter((item) => !!item.name && !!item.value)

  return data;
}

const getFilteredByFilterFormExpertsList = (filterFormQueryString) => {
  return fetch(`http://51.250.92.80/api/v1/experts/?${filterFormQueryString}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

const handleFilterFormSubmit = async (evt) => {
  console.log('я вызвалась');
  evt.preventDefault();
  const filterFormData = serializeForm(filterForm);
  const filterFormQueryString = createFilterQuery(filterFormData);
  console.log(filterFormQueryString);
  isLoading();
  profiItems = await getFilteredByFilterFormExpertsList(filterFormQueryString);
  console.log(profiItems.length);
  addItems(profiItems, currentPage);
  closePopUp(filtersPopup);
};

filterForm.addEventListener('submit', handleFilterFormSubmit);


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
/*    Checkbox-option   */
/* -------------------- */

const options = document.querySelectorAll('.option');

options.forEach(option => {
  const checkboxes = option.querySelectorAll('.suboption');
  const checkall = option.querySelector('.option__input');

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', function() {
      const checkedCount = document.querySelectorAll('.suboption:checked').length;

      checkall.checked = checkedCount > 0;
      checkall.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
    });
  }

  checkall.addEventListener('click', function() {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = this.checked;
    }
  });
})

/* -------------------- */
/*  Price range slider  */
/* -------------------- */

window.onload = function(){
    slideOne();
    slideTwo();
}

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}
function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}
function fillColor(){
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #E0E0E0 ${percent1}% , #4C75FA ${percent1}% , #4C75FA ${percent2}%, #E0E0E0 ${percent2}%)`;
}
