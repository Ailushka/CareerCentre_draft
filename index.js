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

    // if(slidesContainer.scrollLeft === 876) {
    //   item.classList.remove('slide-arrow_active');
    // };
  })
})

document.querySelectorAll('.slide-arrow_prev').forEach((item) => {
  item.addEventListener('click', (evt) => {
    const slidesContainer = evt.target.parentNode.parentNode.querySelector('.slides-container');
    const slide = slidesContainer.querySelector(".slide");

    const slideWidth = slide.offsetWidth;
    const slidesGap = parseInt(getComputedStyle(slidesContainer).gap, 10);
    slidesContainer.scrollLeft -= (slideWidth + slidesGap);
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

const tabList = document.querySelector('[role="tablist"]');
const tabs = document.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});


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

/* -------------------- */
/*         Popup        */
/* -------------------- */

const requestButtons = document.querySelectorAll('.button_type_request');
const closeButtons = document.querySelectorAll('.button_type_close');
const requestPopup = document.querySelector('.popup_type_request');
const requestForm = document.querySelector('.form_type_request');
const ESCAPE = 27;

function openPopUp(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('click', closePopUpByOverlay);
    document.addEventListener('keydown', closePopUpByEsc);
}

function closePopUp(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('click', closePopUpByOverlay);
    document.removeEventListener('keydown', closePopUpByEsc);
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
    closePopUp(requestPopup);
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

requestForm.addEventListener('submit', handleRequestFormSubmit);
