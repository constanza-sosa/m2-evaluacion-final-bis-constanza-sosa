'use strict';

console.log('>> Ready :)');

const button = document.querySelector('.button__start');
const radios = document.querySelectorAll('.app__select');
const container = document.querySelector('.app__container');
let radioValue = '';
const defaultImg = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';



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
      // do whatever you want with the checked radio
      radioValue = radios[i].value;
      console.log(radioValue);
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
  for (let i = 0; i < radioValue; i++){
    const listItem = createNewElement('li', 'card__list-item', '');
    const listItemImg1 = createNewImage('img', 'app__img', 'img__back', defaultImg, 'adalab-image');
    listItem.appendChild(listItemImg1);
    list.appendChild(listItem);
  }
  container.appendChild(list);

}

button.addEventListener('click', startGame);
