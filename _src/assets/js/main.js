'use strict';

console.log('>> Ready :)');

const button = document.querySelector('.button__start');
const radios = document.querySelectorAll('.app__select');
const container = document.querySelector('.app__container');
let radioValue = '';
const defaultImg = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
let apiImg = '';
const getVal = localStorage.getItem('value');
let playArray = [];

getValue();

function getValue (){
  for (let i = 0; i < radios.length; i++){
    const radio = radios[i];
    radioValue = radios[i].value;
    if (radioValue === getVal) {
      radio.setAttribute('checked', true);
    } else {
      radios[0].setAttribute('checked', true);
    }
  }
}

function createNewImage(myElement, myClass, myClass2, mySrc, myAlt) {
  const newElement = document.createElement(myElement);
  newElement.classList.add(myClass);
  newElement.classList.add(myClass2);
  newElement.src = mySrc;
  newElement.alt = myAlt;
  return newElement;
}

function createNewElement(myElement, myClass, myContent) {
  const newElement = document.createElement(myElement);
  newElement.classList.add(myClass);
  const newElementContent = document.createTextNode(myContent);
  newElement.appendChild(newElementContent);
  return newElement;
}

function startGame (){
  container.innerHTML = '';
  const list = createNewElement('ul', 'card__list', '');

  for (let i = 0; i < radios.length; i++){
    if (radios[i].checked) {
      radioValue = radios[i].value;
      localStorage.setItem('value', radioValue);
      break;
    }
  }

  const endpoint = `https://raw.githubusercontent.com/Adalab/cards-data/master/${radioValue}.json`;

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < radioValue; i++){
        apiImg = data[i].image;
        const apiAlt = data[i].name;
        const apiPair = data[i].pair;

        const listItem = createNewElement('li', 'card__list-item', '');
        listItem.setAttribute('data-index', i);
        const listItemImg1 = createNewImage('img', 'app__img', 'img__back', defaultImg, 'adalab-image');
        const listItemImg2 = createNewImage('img', 'app__img', 'img__front', apiImg, apiAlt);
        listItemImg2.classList.add('hidden');
        listItemImg2.setAttribute('data-index', apiPair);

        listItem.appendChild(listItemImg1);
        listItem.appendChild(listItemImg2);
        list.appendChild(listItem);
      }
      container.appendChild(list);

      const cards = document.querySelectorAll('.card__list-item');

      for (const item of cards) {
        item.addEventListener('click', changeImg);
      }
    });
}

function changeImg (event){
  const selectedCard = event.currentTarget;
  const cardIndex = selectedCard.dataset.index;
  const imgBack = selectedCard.querySelector('.img__back');
  const imgFront = selectedCard.querySelector('.img__front');
  const imgFrontIndex = imgFront.dataset.index;
  imgBack.classList.toggle('hidden');
  imgFront.classList.toggle('hidden');
  console.log(imgFrontIndex);

  const playObject = {
    'id': cardIndex,
    'pair': imgFrontIndex,
  };

  playArray.push(playObject);

  if (playArray.length === 2){
    if(playArray[0].pair === playArray[1].pair){
      console.log('somos iguales');
      playArray = [];
    }
    else{
      const cards = document.querySelectorAll('.card__list-item');
      for (const item of cards){
        const index = item.dataset.index;
        let obj = playArray.find(data => data.id === `${index}`);
        if (obj !== undefined){
          const turnBack = () => {
            const back = cards[index].querySelector('.img__back');
            const front = cards[index].querySelector('.img__front');
            back.classList.toggle('hidden');
            front.classList.toggle('hidden');
          };
          setTimeout(turnBack, 1000);
        }
      }
      playArray = [];
    }
  }
}







function noMatch(){
  const cards = document.querySelectorAll('.card__list-item');
  for (const item of cards){
    const index = item.dataset.index;
    console.log(index);
  }
}


button.addEventListener('click', startGame);
