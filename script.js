'use strict';

// Selectin Elements

let scoreOne = document.querySelector('#score--0');
let scoreTwo = document.querySelector('#score--1');
let playerOne = document.querySelector('.player--0');
let playerTwo = document.querySelector('.player--1');
let playerOneCurrentScore = document.querySelector('#current--0');
let playerTwoCurrentScore = document.querySelector('#current--1');
let dice = document.querySelector('.dice');
let rollDice = document.querySelector('.btn--roll');
let hold = document.querySelector('.btn--hold');
let newGame = document.querySelector('.btn--new');

let currScore, activePlayer, scores, playing;
const initialState = () => {
  currScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
  dice.classList.add('hidden');

  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;
  playerOneCurrentScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;
};

initialState();
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

// Initial State Of The Game

// Rolling the dice
let displayDice = num => {
  dice.classList.remove('hidden');
  dice.src = `dice-${num}.png`;
};

rollDice.addEventListener('click', () => {
  if (playing) {
    let diceNum = Math.trunc(Math.random() * 6) + 1;
    displayDice(diceNum);

    // Checking if 1

    if (diceNum !== 1) {
      currScore += diceNum;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold Functionality

hold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// New Game Fuctionality

newGame.addEventListener('click', initialState);
