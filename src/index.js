import './style.css';
import { scoreData } from './modules/scoreData';

const listShow = document.querySelector('.scors');
const display = () => {
  scoreData.map((list) => {
    const li = `<div class="score">
                    <p>${list.name} :</p>
                    <p class="number">${list.score}</p>
                  </div>`;
    listShow.innerHTML += li;
  })
}

display();
 