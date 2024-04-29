const rectWidth = 30;
const rectHeight = 30;
let numRects = 4;
const distThreshold = 10;
let rects = [];
let lastMousePos = { x: 0, y: 0 };
let isWhite = false;
let isDrawingPaused = false;
let isRedDivVisible = true;

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

  redDiv.mouseMoved(addRect);

  document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      isDrawingPaused = !isDrawingPaused;
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'r') {
      clearCanvas();
    }
  });

  // Verificar o tema armazenado no cache
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('element-theme', savedTheme);
    // Se o tema for "2" (dark mode), defina isWhite como true
    isWhite = savedTheme === '2';
  }
}

function clearCanvas() {
  rects = [];
}

function addRect() {
  const d = dist(mouseX, mouseY, lastMousePos.x, lastMousePos.y);

  if (d > distThreshold) {
    lastMousePos = { x: mouseX, y: mouseY };
  }
}

let redDivEngolida = false;

document.getElementById('redDiv').addEventListener('mouseover', function () {
  redDivEngolida = true;
});

function draw() {
  if (redDivEngolida) {
    numRects += 30;
    redDivEngolida = false;
  }

  if (!isDrawingPaused) {
    clear();

    if (!isWhite) {
      document.documentElement.style.setProperty('--swatch--light', '#F2F2F2');
    }

    const d = dist(mouseX, mouseY, lastMousePos.x, lastMousePos.y);

    if (d > distThreshold) {
      rects.unshift({ x: mouseX, y: mouseY });
      while (rects.length > numRects) {
        rects.pop();
      }
      lastMousePos = { x: mouseX, y: mouseY };
    }
    for (let i = 0; i < rects.length; i++) {
      const x = rects[i].x - rectWidth / 2;
      const y = rects[i].y - rectHeight / 2;
      blendMode(BLEND);
      fill(isWhite ? 255 : 0); // Alterado para levar em consideração o valor de isWhite
      rect(x, y, rectWidth, rectHeight);
    }
  }
}

function toggleColor() {
  isWhite = !isWhite;
}

function clearCanvas() {
  rects = [];
}

function saveArt() {
  let tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  let tempCtx = tempCanvas.getContext('2d');
  tempCtx.fillStyle = document.documentElement.style.getPropertyValue('--swatch--light');
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  tempCtx.fillStyle = '#000000';
  for (let i = 0; i < rects.length; i++) {
    const x = rects[i].x - rectWidth / 2;
    const y = rects[i].y - rectHeight / 2;
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

  Tesseract.recognize(imageURL, 'eng', { logger: (m) => console.log(m) }).then(
    ({ data: { text } }) => {
      console.log('Texto reconhecido:', text);
      if (text === null || text.trim() === '') {
        console.log('Erro: Não foi possível reconhecer texto na imagem.');
      } else {
        let lowerCaseText = text.toLowerCase();
        let regex = /kill[-\s]*bill/g;
        if (lowerCaseText.match(regex)) {
          console.log('Palavra "kill bill" ou variação identificada!');
          document.getElementById('imagem').src =
            'https://uploads-ssl.webflow.com/6617e4fc3b3950260690670d/662c69da6e0e4feedf61aaea_kill-bill.jpg';
        } else {
          console.log('Palavra "kill bill" ou variação não identificada.');
          text = corrigirErrosOrtograficos(text);
          text = normalizarPalavras(text);
          text = corrigirQuebrasDeLinha(text);
          if (text.match(regex)) {
            console.log('Palavra "kill bill" ou variação identificada após o pós-processamento!');
            document.getElementById('imagem').src =
              'https://uploads-ssl.webflow.com/6617e4fc3b3950260690670d/662c69da6e0e4feedf61aaea_kill-bill.jpg';
          } else {
            console.log(
              'Palavra "kill bill" ou variação não identificada após o pós-processamento.'
            );
          }
        }
      }
    }
  );

  function corrigirErrosOrtograficos(text) {
    return text;
  }

  function normalizarPalavras(text) {
    return text;
  }

  function corrigirQuebrasDeLinha(text) {
    return text;
  }

  localStorage.setItem('savedImage', imageURL);
}

// Load saved image from localStorage when the page loads
window.addEventListener('load', function () {
  const savedImageURL = localStorage.getItem('savedImage');
  if (savedImageURL) {
    // Display the saved image on the canvas
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

document.getElementById('baixarArteAntiga').addEventListener('click', function () {
  // Recupere a arte armazenada no cache
  const savedImageURL = localStorage.getItem('savedImage');
  if (savedImageURL) {
    // Crie um link temporário para iniciar o download
    const downloadLink = document.createElement('a');
    downloadLink.href = savedImageURL;
    downloadLink.download = 'saved_pixelart.jpg'; // Nome do arquivo para download
    // Adicione o link temporário ao corpo do documento
    document.body.appendChild(downloadLink);
    // Inicie o download
    downloadLink.click();
    // Remova o link temporário do corpo do documento
    document.body.removeChild(downloadLink);
  } else {
    // Se a arte não estiver disponível no cache, exiba uma mensagem de erro
    console.error('Não há arte armazenada no cache.');
  }
});

function toggleTheme() {
  const currentTheme = document.body.getAttribute('element-theme');
  const newTheme = currentTheme === '1' ? '2' : '1';
  document.body.setAttribute('element-theme', newTheme);

  // Salvar a escolha do tema no cache
  localStorage.setItem('theme', newTheme);
}

// Verificar se há um tema armazenado no cache e aplicá-lo ao carregar a página
window.addEventListener('load', function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('element-theme', savedTheme);
  }
});

// Adicionar um evento de clique ao botão para trocar entre light mode e dark mode e salvar a escolha no cache
const changeModeLink = document.querySelector('.change-mode');
changeModeLink.addEventListener('click', function (event) {
  event.preventDefault();
  toggleTheme();
});
