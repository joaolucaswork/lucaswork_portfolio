/* const rectWidth = 30;
const rectHeight = 30;
let numRects = 4;
const distThreshold = 10;
let selectedColor = '#000000'; // preto como cor padrão
let rects = [];
let lastMousePos = { x: 0, y: 0 };
let isWhite = false;
let isDrawingPaused = false;
let isRedDivVisible = true;
let gameStarted = false;
let snakes = [];
function updateGameStatus() {
  // Obtenha a div de notificação
  let notificationDiv = document.getElementById('notification');

  if (isDrawingPaused) {
    // Se o jogo estiver pausado, atualize o texto da div de notificação
    notificationDiv.innerText = 'GAME PAUSED';
  } else if (rects.length === 0) {
    // Se o canvas foi limpo, atualize o texto da div de notificação
    notificationDiv.innerText = 'CANVA CLEARED';
  } else if (gameStarted) {
    // Se o jogo estiver em andamento e o canvas não foi limpo, atualize o texto da div de notificação
    notificationDiv.innerText = 'GAME ON';
  } else {
    // Se o jogo ainda não começou, atualize o texto da div de notificação
    notificationDiv.innerText = 'O jogo ainda não começou.';
  }
}

function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);

  cnv.parent('canvas-parent');
  cnv.style('display', 'block');
  cnv.style('position', 'absolute');
  cnv.style('inset', '0');
  cnv.style('z-index', '-1');

  lastMousePos = { x: mouseX, y: mouseY };

  const changeModeLink = select('#change-mode');

  changeModeLink.mouseClicked(toggleColor);

  const clearCanvasButton = select('#clear-canvas');

  clearCanvasButton.mouseClicked(clearCanvas);

  const shareArtButton = select('#shareArt');

  shareArtButton.mouseClicked(saveArt);

  const redDiv = select('#redDiv');

  redDiv.touchMoved(addRect); // Usar touchMoved para detectar movimentos de toque

  redDiv.mouseMoved(addRect);

  // Adicione um evento de clique para o botão snakeSize
  const snakeSizeButton = document.getElementById('snakeSize');
  snakeSizeButton.addEventListener('click', function () {
    // Aumente a quantidade de retângulos
    numRects += 5;
  });

  document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      if (!gameStarted) {
        startGame();
        updateGameStatus();
      } else {
        isDrawingPaused = !isDrawingPaused;
        updateGameStatus();
      }
    } else if (event.key === 'r' || event.key === 'R') {
      clearCanvas();
      isDrawingPaused = false;
    }
  });

  const clearButton = document.getElementById('clearBtn');
  clearButton.addEventListener('click', function () {
    clearCanvas();
  });

  function addRectTouch() {
    for (let i = 0; i < touches.length; i++) {
      let touch = touches[i];
      let { x } = touch;
      let { y } = touch;
      let snake = {
        x: x,
        y: y,
        dx: random(-5, 5),
        dy: random(-5, 5),
      };
      snakes.push(snake);
    }
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('element-theme', savedTheme);
    isWhite = savedTheme === '2';
  }
  function isMobileDevice() {
    return (
      typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1
    );
  }
  if (isMobileDevice()) {
    startGame();
    numRects = 10;
  }
}

function clearCanvas() {
  rects = [];
}

function addRect() {
  // Se estiver em um dispositivo móvel, use touches para obter os toques atuais
  for (let i = 0; i < touches.length; i++) {
    const touch = touches[i];
    const d = dist(touch.x, touch.y, mouseX, mouseY);

    if (d > distThreshold) {
      rects.unshift({ x: touch.x, y: touch.y, color: color(selectedColor) });
      while (rects.length > numRects) {
        rects.pop();
      }
    }
  }
}

let redDivEngolida = false;

document.getElementById('redDiv').addEventListener('mouseover', function () {
  redDivEngolida = true;
});

document.getElementById('colorPicker').addEventListener('input', function (event) {
  selectedColor = event.target.value;
});

function updateSquareCounter() {
  const squareCounter = document.getElementById('square-counter');
  squareCounter.innerText = rects.length.toString();
}

function draw() {
  if (redDivEngolida) {
    numRects += 30;
    redDivEngolida = false;
  }

  if (!isWhite) {
    document.documentElement.style.setProperty('--swatch--light', '#F2F2F2');
  }

  if (!isDrawingPaused && gameStarted) {
    clear();

    for (let i = 0; i < snakes.length; i++) {
      let snake = snakes[i];
      snake.x += snake.dx;
      snake.y += snake.dy;

      const x = snake.x - rectWidth / 2;
      const y = snake.y - rectHeight / 2;
    }

    // Desenhe os retângulos em ordem reversa, para que os mais recentes sejam desenhados por último
    for (let i = rects.length - 1; i >= 0; i--) {
      const x = rects[i].x - rectWidth / 2;
      const y = rects[i].y - rectHeight / 2;
      blendMode(BLEND);
      noStroke();
      fill(rects[i].color); // use a cor do retângulo ao desenhar
      rect(x, y, rectWidth, rectHeight);
    }

    const d = dist(mouseX, mouseY, lastMousePos.x, lastMousePos.y);

    if (d > distThreshold) {
      rects.unshift({ x: mouseX, y: mouseY, color: color(selectedColor) }); // use a função color() do p5.js para criar um objeto de cor
      while (rects.length > numRects) {
        rects.pop();
      }
      lastMousePos = { x: mouseX, y: mouseY };
      updateSquareCounter(); // Chame a função para atualizar o contador de quadrados
    }
  }
}

function toggleColor() {
  isWhite = !isWhite;
}

function clearCanvas() {
  rects = [];
  updateGameStatus();
}

// Obtenha a cor de fundo atual da página
let { backgroundColor } = window.getComputedStyle(document.body, null);

// Se a cor de fundo for 'rgb(0, 0, 0)', que é equivalente a preto
if (backgroundColor === 'rgb(0, 0, 0)') {
  // Defina o valor do colorPicker para branco
  document.getElementById('colorPicker').value = '#FFFFFF';
}

function saveArt() {
  let tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  let tempCtx = tempCanvas.getContext('2d');

  let { backgroundColor } = window.getComputedStyle(document.body, null);

  // Altere a cor de fundo com base no valor de isWhite
  tempCtx.fillStyle = backgroundColor;
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  for (let i = 0; i < rects.length; i++) {
    const x = rects[i].x - rectWidth / 2;
    const y = rects[i].y - rectHeight / 2;
    tempCtx.fillStyle = rects[i].color.toString(); // use a cor original do retângulo
    tempCtx.fillRect(x, y, rectWidth, rectHeight);
  }

  tempCtx.fillStyle = '#FFFFFF';
  tempCtx.textAlign = 'center';
  tempCtx.textBaseline = 'middle';
  tempCtx.font = '56px Arial';
  tempCtx.fillText('', width / 2, height / 2);

  let imageURL = tempCanvas.toDataURL('image/jpg');
  let canvasArts = document.querySelector('.canva-arts');
  let ctx = canvasArts.getContext('2d');
  ctx.clearRect(0, 0, canvasArts.width, canvasArts.height);
  let img = new Image();

  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvasArts.width, canvasArts.height);
  };

  img.src = imageURL;
  let downloadBtn = document.getElementById('baixarArte');
  downloadBtn.href = imageURL;
  downloadBtn.download = 'my_art.jpg';

  localStorage.setItem('savedImage', imageURL);
}

window.addEventListener('load', function () {
  const savedImageURL = localStorage.getItem('savedImage');
  if (savedImageURL) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.getElementById('canvaMain');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = savedImageURL;
  }
});

function toggleTheme() {
  const currentTheme = document.body.getAttribute('element-theme');
  const newTheme = currentTheme === '1' ? '2' : '1';
  document.body.setAttribute('element-theme', newTheme);

  localStorage.setItem('theme', newTheme);
}

window.addEventListener('load', function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('element-theme', savedTheme);
  }
});

const changeModeLink = document.querySelector('.change-mode');
changeModeLink.addEventListener('click', function (event) {
  event.preventDefault();
  toggleTheme();
});

function startGame() {
  gameStarted = true;
  updateGameStatus();
}
 */
