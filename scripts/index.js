const stagesContainer = document.querySelector('.stages__plan');
const participantsContainer = document.querySelector('.participants__list');
const participantsCounter = document.querySelector('.participants__counter');
const nextParticipantBtn = document.querySelector(".next_participant");
const prevParticipantBtn = document.querySelector(".prev_participant");
const headerCaption = document.querySelector(".text_place_header");

let screenWidth = document.documentElement.clientWidth;

const stages = [
  {
    number: "1",
    description: "Строительство железнодорожной магистрали Москва-Васюки"
  },
  {
    number: "2",
    description: "Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов"
  },
  {
    number: "3",
    description: "Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей, фруктов, икры, шоколадных конфет"
  },
  {
    number: "4",
    description: "Строительство дворца для турнира"
  },
  {
    number: "5",
    description: "Размещение гаражей для гостевого автотранспорта"
  },
  {
    number: "6",
    description: "Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов"
  },
  {
    number: "7",
    description: "Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн"
  },
];

const participants = [
  {
    name: "Хозе-Рауль Капабланка",
    rank: "Чемпион мира по шахматам"
  },
  {
    name: "Эммануил Ласкер",
    rank: "Чемпион мира по шахматам"
  },
  {
    name: "Александр Алехин",
    rank: "Чемпион мира по шахматам"
  },
  {
    name: "Арон Нимцович",
    rank: "Чемпион мира по шахматам"
  },
  {
    name: "Рихард Рети",
    rank: "Чемпион мира по шахматам"
  },
  {
    name: "Остап Бендер",
    rank: "Гроссмейстер"
  }
];

const participantsCarouselSettings = {
  carousel: participantsContainer,
  items: [],
  nextBtn: nextParticipantBtn,
  prevBtn: prevParticipantBtn,
  isAuto: true,
  counter: participantsCounter,
  needDisabling: false,
  needDots: false,
  dotsContainerSelector: ""
};

const stagesCarouselSettings = {
  carousel: stagesContainer,
  items: [],
  nextBtn: {},
  prevBtn: {},
  isAuto: false,
  counter: false,
  needDisabling: true,
  needDots: true,
  dotsContainerSelector: ".dots"
};

function addStage(number, description, moreNumber, moreDescription) {
  const stagesTemplate = document.querySelector('#stages-template').content;
  const stagesItem = stagesTemplate.querySelector('.stages__item').cloneNode(true);

  stagesItem.querySelector('.stages__number_main').textContent = number;
  stagesItem.querySelector('.stages__description_main').textContent = description;

  if (moreNumber && moreDescription) {
    stagesItem.querySelector('.stages__content_more').style.display = 'flex';
    stagesItem.querySelector('.stages__number_more').textContent = moreNumber;
    stagesItem.querySelector('.stages__description_more').textContent = moreDescription;
  }

  return stagesItem;
};


function renderStages() {
  const render = (n) => {
    stagesContainer.append(addStage(stages[n].number, stages[n].description));
  }

  const renderMore = (n) => {
    stagesContainer.append(addStage(stages[n].number, stages[n].description, stages[n + 1].number, stages[n + 1].description));
  } 

  if (screenWidth <= 1000) {
    for (let i = 0; i < stages.length; i++) {
      if (i === 0) {
        renderMore(i);
      } else if (i === 1) {
        continue;
      } else if (i === 3) {
        renderMore(i);
      } else if (i === 4) {
        continue;
      } else {
        render(i);
      }
    }
  } else {
      stages.forEach(function (item) {
        stagesContainer.append(addStage(item.number, item.description));
      });
    
    stagesContainer.children[2].classList.add('two-rows')
    stagesContainer.children[6].classList.add('two-cols')    
  }
};

renderStages();

function addParticipant(name, rank) {
  const participantsTemplate = document.querySelector('#participants-template').content;
  const participantsItem = participantsTemplate.querySelector('.participants__item').cloneNode(true);

  participantsItem.querySelector('.participants__name').textContent = name;
  participantsItem.querySelector('.participants__rank').textContent = rank;

  return participantsItem;
};

participants.forEach(function (item) {
  participantsContainer.append(addParticipant(item.name, item.rank));
});

const carousel = (settings) => {
  const { carousel, items, nextBtn, prevBtn, isAuto, counter, needDisabling, needDots, dotsContainerSelector } = settings;
  const slides = Array.from(items);
  const carouselWidth = carousel.clientWidth;
  const itemWidth = items[0].clientWidth;
  const slideCount = Math.ceil((slides.length * itemWidth) / carouselWidth);
  const itemsShown = Math.floor(carouselWidth / itemWidth);

  let slideIndex = 0;

  if (counter) {
    counter.textContent = `${itemsShown}/${items.length}`;
  }

  if (needDisabling) {
    prevBtn.setAttribute('disabled', '');
  }

  if (needDots) {
    const dotsContainer = document.querySelector(dotsContainerSelector);
  
    if (dotsContainer.children.length == 0) {
      for (let i = 0; i < slideCount; i++) {
        let dot = document.createElement("span");
        
        dot.classList.add("dots__item");
        dot.dataset.index = i;

        if (i === slideIndex) {
          dot.classList.add("dots__item_active")
        };

        dot.addEventListener('click', () => {
          slideIndex = i;
          slide()
        });

        dotsContainer.appendChild(dot);
      };
    }
  }

  const activateDots = () => {
    let dots = document.querySelectorAll(".dots__item");

    dots.forEach((dot, i) => {
      i === slideIndex ? dot.classList.add("dots__item_active") : dot.classList.remove("dots__item_active");
    })
  }

  const disableBtns = () => {
    slideIndex === 0 ? prevBtn.setAttribute('disabled', '') : prevBtn.removeAttribute('disabled');
    slideIndex === slideCount - 1 ? nextBtn.setAttribute('disabled', '') : nextBtn.removeAttribute('disabled')
  }

  const checkNextCounter = (n) => {
    if (n < itemsShown || n > items.length) {
      return slideIndex === slideCount - 1 ? items.length : itemsShown;
    }

    return n;
  }

  const checkPrevCounter = () => {
    if ((items.length % itemsShown !== 0) && (slideIndex === slideCount - 2)) {
      counter.textContent = `${items.length - items.length % itemsShown}/${items.length}`;
    } else if (slideIndex === slideCount - 1) {
      counter.textContent = `${items.length}/${items.length}`
    } else {
      counter.textContent = `${itemsShown * (slideIndex + 1)}/${items.length}`;
    }
  }
  
  const slide = () => {
    needDisabling && disableBtns();
    needDots && activateDots()

    const slideOffset = -slideIndex * carouselWidth;
    carousel.style.transform = `translateX(${slideOffset}px)`;
  }

  const slideNext = () => {
    slideIndex = (slideIndex + 1) % slideCount;

    if (counter) {
      counter.textContent = `${checkNextCounter(itemsShown + itemsShown * slideIndex)}/${items.length}`;
    }

    slide();
  }

  const slideBack = () => {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;

    if (counter) {
      checkPrevCounter()
    }

    slide();
  }

  nextBtn.addEventListener('click', () => {
    slideNext();
  });

  prevBtn.addEventListener('click', () => {
    slideBack();
  });
  
  const autoSlide = () => {
    slideNext();
    setTimeout(() => {
      autoSlide();
    }, 4000)
  }
  
  if (isAuto) {
    autoSlide();
  }
}

const participantsItems = document.querySelectorAll(".participants__item");
participantsCarouselSettings.items = participantsItems;
const participantsCarousel = carousel(participantsCarouselSettings);

function activateStagesCarousel() {
  const stagesItems = document.querySelectorAll(".stages__item");
  const nextStageBtn = document.querySelector(".next_stage");
  const prevStageBtn = document.querySelector(".prev_stage");

  stagesCarouselSettings.items = stagesItems;
  stagesCarouselSettings.nextBtn = nextStageBtn;
  stagesCarouselSettings.prevBtn = prevStageBtn;
  
  const stagesCarousel = carousel(stagesCarouselSettings);
}

screenWidth <= 1000 && activateStagesCarousel()

window.addEventListener('resize', () => {
  const newScreenWidth = document.documentElement.clientWidth;

  if (newScreenWidth <= 425) {
    headerCaption.classList.remove('text_align_center')
  } else {
    !headerCaption.classList.contains('text_align_center') && headerCaption.classList.add('text_align_center')
  }

  if (screenWidth > 1000 && newScreenWidth <= 1000) {
    activateStagesCarousel();
  }

  if (screenWidth <= 1000 && newScreenWidth > 1000) {
    stagesContainer.style.transform = `none`;
  }

  if (screenWidth > 1000 && newScreenWidth <= 1000 || screenWidth <= 1000 && newScreenWidth > 1000) {
    const list = stagesContainer.querySelectorAll('.stages__item');
    list.forEach((stage) => {
      stagesContainer.removeChild(stage);
    });
  }

  screenWidth = newScreenWidth;
  stagesContainer.children.length === 0 && renderStages();
});
