const stagesContainer = document.querySelector('.stages__plan');
const participantsContainer = document.querySelector('.participants__list');
const participantsCounter = document.querySelector('.participants__counter');
const nextParticipantBtn = document.querySelector(".carousel-btns_type_next");
const prevParticipantBtn = document.querySelector(".carousel-btns_type_prev");

let currentIndex = 0;
let prevIndex;

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

function carousel(carousel, items, nextBtn, prevBtn, gap, isAuto,) {
  const slides = Array.from(items);
  const slideCount = slides.length;
  let slideIndex = 0;
  
  prevBtn.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    slide();
  });
  
  nextBtn.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slideCount;
    slide();
  });
  
  const slide = () => {
    const itemWidth = slides[0].clientWidth;
      
    const slideOffset = -slideIndex * (itemWidth + gap);
    console.log(slideOffset)
    carousel.style.transform = `translateX(${slideOffset}px)`;
  }
  
  window.addEventListener('load', () => {
    slide();
  });
}

const participantsItems = document.querySelectorAll(".participants__item");

carousel(participantsContainer, participantsItems, nextParticipantBtn, prevParticipantBtn, 20);