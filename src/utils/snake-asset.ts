// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const snakeAsset = () => {
  // CONSTANTS
  const rectSize = 50; // tamanho do quadrado
  let numRects = 0; // quantidade de quadrados pretos
  const distThreshold = 35; // distância mínima do mouse para adicionar um novo quadrado

  // VARIABLES
  let rects = []; // array para armazenar os quadrados
  let lastMousePos = { x: 0, y: 0 }; // última posição do mouse
  let isWhite = false; // variável para controlar se a cor é branca
  let gameStarted = false; // variável para controlar se o jogo começou

  function setup() {
    const cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('canvas-parent');
    cnv.style('display', 'block');
    cnv.style('position', 'absolute');
    cnv.style('inset', '0');
    cnv.style('z-index', '-1');
    lastMousePos = { x: mouseX, y: mouseY };

    // Adiciona um manipulador de eventos de clique para o link com ID "change-mode"
    const changeModeLink = select('#change-mode');
    changeModeLink.mouseClicked(toggleColor);
  }

  function draw() {
    // clear the canvas
    clear();

    // Set background color using CSS variable
    if (!isWhite) {
      document.documentElement.style.setProperty('--swatch--light', '#F2F2F2'); // cor padrão
    }

    // calculate distance between current mouse position and last stored mouse position.
    const d = dist(mouseX, mouseY, lastMousePos.x, lastMousePos.y);

    // Se a distância for maior do que o limite, adicione uma nova posição do mouse ao histórico de quadrados
    if (d > distThreshold) {
      // Adiciona um novo quadrado com a posição atual do mouse
      rects.unshift({ x: mouseX, y: mouseY });
      // Remove quadrados extras se necessário
      while (rects.length > numRects) {
        rects.pop();
      }
      lastMousePos = { x: mouseX, y: mouseY };
    }

    // Desenha os quadrados
    for (let i = 0; i < rects.length; i++) {
      const x = rects[i].x - rectSize / 2;
      const y = rects[i].y - rectSize / 2;

      // Aplica o modo de mistura para inverter as cores ao passar sobre um elemento preto
      blendMode(DIFFERENCE);
      fill(isWhite ? 255 : 0); // branco ou preto dependendo do estado
      rect(x, y, rectSize, rectSize);
      blendMode(BLEND); // volta ao modo de mistura padrão
    }
  }

  // resize canvas when window is resized
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  // Evento de clique no toggle
  function toggleColor() {
    isWhite = !isWhite; // inverte o estado da cor
  }

  // Adiciona um manipulador de eventos de clique para o botão com ID "start-game"
  const startGameButton = document.getElementById('start-game');
  startGameButton.addEventListener('click', startGame);

  // Função para iniciar o jogo
  function startGame() {
    // Oculta o botão de iniciar o jogo
    startGameButton.style.display = 'none';

    // Adiciona contador
    document.getElementById('contador').innerText = '3';
    setTimeout(function () {
      document.getElementById('contador').innerText = '2';
    }, 1000);
    setTimeout(function () {
      document.getElementById('contador').innerText = '1';
    }, 2000);
    setTimeout(function () {
      document.getElementById('contador').innerText = 'Go!!';
      // Inicia o jogo após o contador terminar
      setTimeout(function () {
        gameStarted = true; // indica que o jogo começou
        numRects = 5; // define o número de retângulos para 5
        rects = []; // reinicia o array de retângulos
        setup(); // Chama a função setup para inicializar o jogo
      }, 0); // espera 1 segundo após "Go"
    }, 3000); // espera 3 segundos após "1"
  }
};
