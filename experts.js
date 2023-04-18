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
  checkItemsQuantity();
  openPopUp(filtersPopup);
})

closeButtons.forEach((item) => {
  item.addEventListener('click', (evt) => {
      const popUpToClose = evt.target.closest('.popup');
      closePopUp(popUpToClose);
  });
});

/* -------------------- */
/*   Show more button   */
/* -------------------- */

const lists = document.querySelectorAll('.filters-form__list');
const hiddenClass = 'collapsed';
const showMoreText = 'Показать еще';
const showLessText = 'Свернуть';

function checkItemsQuantity() {
  lists.forEach(list => {
    const items = list.querySelectorAll('li');
    const showMoreButton = list.closest('.filters-form__content').querySelector('.button_type_show-more');
    let isExpanded = false;

    // Если элементов больше 8, скрываем элементы и показываем кнопку
    if (items.length > 8) {
      for (let i = 8; i < items.length; i++) {
        items[i].classList.add(hiddenClass);
        items[i].style.display = 'none';
      }
      showMoreButton.textContent = showMoreText;
    }

    if (showMoreButton) {
      // При нажатии на кнопку, показываем скрытые элементы
      showMoreButton.addEventListener('click', () => {
        if (!isExpanded) {
          for (let i = 8; i < items.length; i++) {
            items[i].classList.remove(hiddenClass);
            items[i].style.display = 'flex';
            items[i].style.animationName = 'fadeIn';
            items[i].style.animationDuration = '.5s';
          }
          showMoreButton.textContent = showLessText;
        } else {
          for (let i = 8; i < items.length; i++) {
            items[i].style.animationName = 'fadeOut';
            items[i].style.animationDuration = '.5s';

            setTimeout(() => {
              items[i].classList.add(hiddenClass);
              items[i].style.display = 'none';
            }, 300);


          }
          showMoreButton.textContent = showMoreText;
        }
        isExpanded = !isExpanded;
      });
    }
  });
}

/* -------------------- */
/*  Experts list render */
/* -------------------- */

const profiListContainerElement = document.querySelector('.profi-list');
const profiItemTemplateElement = document.querySelector('.template_type_profi-item').content;
const loadMoreButton = document.querySelector('.button_type_load-more');
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
    // imageElement.src = item.photo.replace('http://51.250.92.80', 'https://student-diary-landing.praktikum-services.ru/');
    imageElement.src = item.photo;
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
    document.querySelector('.profi').style.display = 'block';
    profiListContainerElement.textContent = '';
    document.querySelector('.filters-error').style.display = 'none';
    profiListContainerElement.classList.remove('skeleton');
  }

  for (let i = startRange; i < endRange; i++) {
    renderItems(expertsList[i], profiListContainerElement);
  }

  if (expertsList.length === 0) {
    document.querySelector('.profi').style.display = 'none';
    document.querySelector('.filters-error').style.display = 'flex';
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
  return fetch('./experts_full.json')
    .then(response => response.json())
    .catch(error => console.log(error.message));
}

// добавление списка экспертов при загрузке страницы

const init = async () => {
  isLoading();
  try {
    profiItems = await getExpertsList();
    addItems(profiItems, currentPage);
  } catch(err) {
    document.querySelector('.profi').style.display = 'none';
    document.querySelector('.server-error').style.display = 'flex';
  }

}

init();

loadMoreButton.addEventListener('click', handleLoadMoreItems);

/* -------------------- */
/*  Фильтрация-фронтенд */
/* -------------------- */

const filterForm = document.querySelector('.form_type_filters');
const searchForm = document.querySelector('.form_type_search');
const searchQuery = searchForm.querySelector('.search-form__input');
const checkboxes = document.querySelectorAll('.checkbox__item input[type=checkbox]');

let filters = [];

// сбор данных из формы

function serializeForm(formNode) {
  const { elements } = formNode;

  const data = Array.from(elements)
    .map((element) => {
      const { name, type } = element
      const value = type === 'checkbox' && !element.checked ? '' : element.value

      return { name, value }
    })
    .filter((item) => !!item.name && !!item.value)

  return data;
}

const handleSearchSubmit = (evt) => {
  evt.preventDefault();

  filters = filters.filter(item => item.name !== 'search');

  filters.push(...serializeForm(searchForm));
  filtration();
};

const handleCheckboxChange = (evt) => {
  evt.preventDefault();

  filters = filters.filter(item => item.name !== 'services');

  const data = Array.from(checkboxes)
    .map((element) => {
      const { name, type } = element
      const value = type === 'checkbox' && !element.checked ? '' : element.value

      return { name, value }
    })
    .filter((item) => !!item.name && !!item.value);

  filters.push(...data);
  filtration();
};

const handleFilterFormSubmit = (evt) => {
  evt.preventDefault();

  // очищаем предыдущие фильтры формы

  filters = filters.filter(item =>
    item.name !== 'fee__gt' &&
    item.name !== 'fee__lt' &&
    item.name !== 'display_services' &&
    item.name !== 'grades' &&
    item.name !== 'specializations' &&
    item.name !== 'company_spheres'
);

  filters.push(...serializeForm(filterForm));

  closePopUp(filtersPopup);
  filtration();
};

// фильтрация списка экспертов

function filterExperts(experts, filters) {
  return experts.filter((expert) => {
    return filters.every((filter) => {
      const value = expert[filter.name];
      if (filter.name === 'search') {
        return searchExpert(expert, filter.value);
      } else if (filter.name === "fee__gt") {
        const services = expert.services || [];
        const filteredServices = services.filter((service) => {
          return Number(service.price) >= Number(filter.value);
        });
        return filteredServices.length === services.length;
      } else if (filter.name === "fee__lt") {
        const services = expert.services || [];
        const filteredServices = services.filter((service) => {
          return Number(service.price) <= Number(filter.value);
        });
        return filteredServices.length === services.length;
      } else if (Array.isArray(value)) {
        return value.some((item) => {
          if (typeof item === 'string') {
            return item === filter.value;
          } else if (typeof item === 'object') {
            return Object.values(item).some((itemValue) => {
              return itemValue === filter.value;
            });
          }
        });
      } else if (typeof value === 'object') {
        return Object.values(value).some((itemValue) => {
          return itemValue === filter.value;
        });
      } else {
        return value === filter.value;
      }
    });
  });
}

function searchExpert(expert, query) {
  query = query.toLowerCase();
  for (const key in expert) {
    const value = expert[key];
    if (typeof value === 'string' && value.toLowerCase().includes(query)) {
      return true;
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === 'string' && item.toLowerCase().includes(query)) {
          return true;
        } else if (typeof item === 'object' && searchExpert(item, query)) {
          return true;
        }
      }
    } else if (typeof value === 'object' && searchExpert(value, query)) {
      return true;
    }
  }
  return false;
}

const filtration = async () => {
  isLoading();
  try {
    profiItems = await getExpertsList();
    profiItems = filterExperts(profiItems, filters);
    addItems(profiItems, 1);
  } catch(err) {
    document.querySelector('.profi').style.display = 'none';
    document.querySelector('.server-error').style.display = 'flex';
  }
}


// установка слушателей на изменения фильтров

searchForm.addEventListener('submit', handleSearchSubmit);
searchForm.addEventListener('reset', () => {
  filters = filters.filter(item => item.name !== 'search');
  filtration();
})
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', handleCheckboxChange)
});
filterForm.addEventListener('submit', handleFilterFormSubmit);
filterForm.addEventListener('reset', () => {
  filters = filters.filter(item =>
    item.name !== 'fee__gt' &&
    item.name !== 'fee__lt' &&
    item.name !== 'display_services' &&
    item.name !== 'grades' &&
    item.name !== 'specializations' &&
    item.name !== 'company_spheres'
);
  filtration();
  resetPriceRangeSlider();
})

/* -------------------- */
/*  Фильтрация - бэкенд */
/* -------------------- */

// const filterForm = document.querySelector('.form_type_filters');
// const searchForm = document.querySelector('.form_type_search');
// const searchQuery = searchForm.querySelector('.search-form__input');
// const checkboxes = document.querySelectorAll('input[type=checkbox]');
//
// let enabledSettings = [];
//
//
// // сбор данных из формы
//
// function serializeForm(formNode) {
//   const { elements } = formNode
//
//   const data = Array.from(elements)
//     .map((element) => {
//       const { name, type } = element
//       const value = type === 'checkbox' && !element.checked ? '' : element.value
//
//       return { name, value }
//     })
//     .filter((item) => !!item.name && !!item.value)
//
//   return data;
// }
//
// // создание запроса на сервер для получения отфильтрованного поиском списка экспертов
//
// const getFilteredBySearchExpertsList = () => {
//   return fetch(`http://51.250.92.80/api/v1/experts/search/?text=${searchQuery.value}`)
//     .then(response => response.json())
//     .catch(error => console.log(error));
// }
//
// const handleSearchSubmit = async (evt) => {
//   evt.preventDefault();
//   isLoading();
//   profiItems = await getFilteredBySearchExpertsList();
//   addItems(profiItems, currentPage);
//   searchForm.reset();
// };
//
// // const handleCheckboxChange = async (evt) => {
// //   evt.preventDefault();
// //   enabledSettings = Array.from(checkboxes).filter(i => i.checked).map(i => i.value);
// //   console.log(enabledSettings);
// //   isLoading();
// //   profiItems = await getFilteredByServiceExpertsList();
// //   addItems(profiItems, currentPage);
// // };
//
// searchForm.addEventListener('submit', handleSearchSubmit);
// // checkboxes.forEach(checkbox => {
// //   checkbox.addEventListener('change', handleCheckboxChange)
// // })
//
//
//
// const getFilteredByFilterFormExpertsList = (filterFormQueryString) => {
//   return fetch(`http://51.250.92.80/api/v1/experts/?${filterFormQueryString}`)
//     .then(response => response.json())
//     .catch(error => console.log(error));
// }
//
// const handleFilterFormSubmit = async (evt) => {
//   console.log('я вызвалась');
//   evt.preventDefault();
//   const filterFormData = serializeForm(filterForm);
//   console.log(filterFormData);
//   const filterFormQueryString = createFilterQuery(filterFormData);
//   console.log(filterFormQueryString);
//   isLoading();
//   profiItems = await getFilteredByFilterFormExpertsList(filterFormQueryString);
//   console.log(profiItems.length);
//   addItems(profiItems, currentPage);
//   closePopUp(filtersPopup);
// };
//
// filterForm.addEventListener('submit', handleFilterFormSubmit);

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
sliderOneDefaultValue = sliderOne.value;
let sliderTwo = document.getElementById("slider-2");
sliderTwoDefaultValue = sliderTwo.value;
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

function resetPriceRangeSlider() {
  sliderOne.value = sliderOneDefaultValue;
  displayValOne.textContent = sliderOne.value;
  sliderTwo.value = sliderTwoDefaultValue;
  displayValTwo.textContent = sliderTwo.value;
  fillColor();
}

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

/* -------------------- */
/*    Refresh button    */
/* -------------------- */

const refreshButton = document.querySelector('.button_type_refresh');

function refreshPage() {
  window.location.reload();
};

refreshButton.addEventListener('click', refreshPage);
