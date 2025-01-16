const stagesContainer = document.querySelector('.stages__plan');
const participantsContainer = document.querySelector('.participants__list');
const participantsCounter = document.querySelector('.participants__counter');
const nextParticipantBtn = document.querySelector(".carousel-btns_type_next");
const prevParticipantBtn = document.querySelector(".carousel-btns_type_prev");
const headerCaption = document.querySelector(".text_place_header");

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
  },
  // {
  //   name: "Остап Бендер",
  //   rank: "Гроссмейстер"
  // },
  // {
  //   name: "Остап Бендер",
  //   rank: "Гроссмейстер"
  // },
  // {
  //   name: "Остап Бендер",
  //   rank: "Гроссмейстер"
  // },
  // {
  //   name: "Остап Бендер",
  //   rank: "Гроссмейстер"
  // }
];

window.addEventListener('resize', () => {
  const screenWidth = document.documentElement.clientWidth;

  if (screenWidth <= 425) {
    headerCaption.classList.remove('text_align_center')
  } else {
    !headerCaption.classList.contains('text_align_center') && headerCaption.classList.add('text_align_center')
  }
});

function addStage(number, description) {
  const stagesTemplate = document.querySelector('#stages-template').content;
  const stagesItem = stagesTemplate.querySelector('.stages__item').cloneNode(true);

  stagesItem.querySelector('.stages__number').textContent = number;
  stagesItem.querySelector('.stages__description').textContent = description;

  return stagesItem;
};

stages.forEach(function (item) {
  stagesContainer.append(addStage(item.number, item.description));
});

stagesContainer.children[2].classList.add('two-rows')
stagesContainer.children[6].classList.add('two-cols')

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

const carousel = (carousel, items, nextBtn, prevBtn, isAuto, counter) => {
  const slides = Array.from(items);
  const carouselWidth = carousel.clientWidth;
  const itemWidth = items[0].clientWidth;
  const slideCount = Math.ceil((slides.length * itemWidth) / carouselWidth);
  const itemsShown = Math.floor(carouselWidth / itemWidth);

  let slideIndex = 0;

  if (counter) {
    counter.textContent = `${itemsShown}/${items.length}`;
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

const participantsCarousel = carousel(participantsContainer, participantsItems, nextParticipantBtn, prevParticipantBtn, true, participantsCounter);
