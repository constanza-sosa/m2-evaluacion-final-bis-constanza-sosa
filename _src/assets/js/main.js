'use strict';

console.log('>> Ready :)');

const button = document.querySelector('.button__start');
const radios = document.querySelectorAll('.app__select');
const container = document.querySelector('.app__container');
let radioValue = '';



function createNewImage(myElement, myClass, mySrc, myAlt) {
  const newElement = document.createElement(myElement);
  newElement.classList.add(myClass);
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
    const listItem = createNewElement('li', 'card__list', '');
    const listItemImg1 = createNewImage('img', 'img__front', 'mySrc', 'myAlt1');
    listItem.appendChild(listItemImg1);
    list.appendChild(listItem);
  }
  container.appendChild(list);

}

// for (const radio of radios){
//   // console.log(radio.value);
//   // radio.addEventListener('click', startGame);
// }
button.addEventListener('click', startGame);
