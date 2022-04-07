import './style.css';
// import scoreData from './modules/scoreData.js';

const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
const GAME_ID = 'tUMR5efC78aWw5jlBs6s';

const getScores = async () => {
  const resp = await fetch(`${BASE_URL}games/${GAME_ID}/scores`);
  return resp.json();
};

const addScore = async (username, score) => {
  const resp = await fetch(`${BASE_URL}games/${GAME_ID}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: username,
      score,
    }),
  });
  return resp.json();
};

// const listShow = document.querySelector('.scors');
// const display = () => {
//   getScores();
//   addScore();
//   result.forEach((list) => {
//     const li = `<div class="score">
//                     <p>${user} :</p>
//                     <p class="number">${score}</p>
//                   </div>`;
//     listShow.innerHTML += li;
//   });
// };

// display();

const initializeScoreboard = async () => {
  const scoreboard = document.querySelector('.scors');
  const scores = await getScores();
  scoreboard.innerHTML = '';
  scores.result.forEach(({ user, score }) => {
    const scoreLi = document.createElement('div');
    scoreLi.className = 'score';
    scoreLi.innerHTML = ` <p>${user} :</p>
                        <p class="number">${score}</p>`;
    scoreboard.appendChild(scoreLi);
  });
};

const addToScoreBoard = async (usernameValue, scoreValue) => {
  const username = usernameValue.trim();
  const score = parseInt(scoreValue.trim(), 10);
  if (!username || !score) return false;
  const response = await addScore(username, score);
  if (response.message) return false;
  return true;
};

const setDisabledState = (element, state) => {
  element.disabled = !!state;
};

const clearInput = (...inputs) => inputs.forEach((input) => { input.value = ''; });

const refreshBtn = document.querySelector('refresh-btn');
refreshBtn.addEventListener('click', initializeScoreboard);
refreshBtn.click();

const formElem = document.querySelector('form');
const userInput = document.querySelector('.name');
const scoreInput = document.querySelector('.score');
formElem.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitInput = formElem.querySelector('input[type=submit]');
  setDisabledState(submitInput, true);
  const success = await addToScoreBoard(userInput.value, scoreInput.value);
  if (success) initializeScoreboard();
  clearInput(userInput, scoreInput);
  setDisabledState(submitInput, false);
});
