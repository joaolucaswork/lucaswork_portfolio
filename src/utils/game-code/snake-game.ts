// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gsap } from 'gsap';

export const snakeGame = () => {
  const container = document.getElementById('container');
  const redDiv = document.getElementById('redDiv');
  const counterText = document.querySelector('.big-counter');

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  let counter = 0;
  let trophyIndex = 0;
  let gameStarted = false; // Controla se o jogo foi iniciado

  // Oculta a redDiv inicialmente
  redDiv.style.display = 'none';
  // Adiciona um event listener para o evento de tecla pressionada no documento
  document.addEventListener('keydown', function () {
    if (!gameStarted) {
      startGame();
    }
  });

  // Trocar texto

  // Função para mover a div vermelha
  function moveRedDiv() {
    const newX = Math.random() * (containerWidth - redDiv.offsetWidth);
    const newY = Math.random() * (containerHeight - redDiv.offsetHeight);
    gsap.to(redDiv, { x: newX, y: newY, duration: 0 });

    // Incrementa o contador e atualiza o conteúdo do texto
    counter += 1;
    counterText.textContent = counter; // Atualiza o texto do contador, garantindo que não seja menor que zero

    // Verifica se o contador atinge um certo ponto (por exemplo, 10) e adiciona a classe "show" ao ícone do próximo troféu
    // Função para mover a div vermelha
    // Verifica se o contador atinge um certo ponto (por exemplo, 10) e adiciona a classe "show" ao ícone do próximo troféu
    if (counter % 10 === 0) {
      const trophyIcons = document.querySelectorAll('.trophy-icon');
      if (trophyIndex < trophyIcons.length) {
        trophyIcons[trophyIndex].classList.add('show');
        trophyIndex += 1;
      }
    }
  }
  redDiv.addEventListener('mouseenter', moveRedDiv);
  function startGame() {
    redDiv.style.display = 'block';
    redDiv.addEventListener('mouseenter', moveRedDiv);
    gameStarted = true;
  }
};
