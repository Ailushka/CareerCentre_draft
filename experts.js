/* -------------------- */
/*  Experts list render */
/* -------------------- */

const profiListContainerElement = document.querySelector('.profi-list');
const profiItemTemplateElement = document.querySelector('.template_type_profi-item');

function isLoading() {
  for (let i = 0; i < 12; i++) {
    profiListContainerElement.append(profiItemTemplateElement.content.cloneNode(true));
  }
}

function renderList(expertsList) {
  const profiItem = expertsList.slice(0, 12).map(composeItem);
  profiListContainerElement.textContent = '';
  profiListContainerElement.classList.remove('skeleton');
  profiListContainerElement.append(...profiItem);
}

function composeItem(item) {
  const newItem = profiItemTemplateElement.content.cloneNode(true);

  const imageElement = newItem.querySelector('.profi__image');
  if (item.photo) {
    imageElement.src = item.photo;
  } else {
    imageElement.src = "./images/experts/no-photo.svg";
    imageElement.style.objectFit = 'none';
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
  textElement.textContent = item.post;

  return newItem;
}

const init = async () => {
  isLoading();
  const profiItems = await getExpertsList();
  renderList(profiItems);
}

const getExpertsList = () => {
  return fetch('http://51.250.92.80/api/v1/experts/')
    .then(response => response.json())
    .catch(error => console.log(error));
}

init();

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
