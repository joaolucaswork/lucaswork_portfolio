const rectWidth = 30;
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

function updateGameStatus() {
  // Obtenha a div de notificação
  let notificationDiv = document.getElementById('notification');

  if (isDrawingPaused) {
    // Se o jogo estiver pausado, atualize o texto da div de notificação
    notificationDiv.innerText = "GAME PAUSED";
  } else if (rects.length === 0) {
    // Se o canvas foi limpo, atualize o texto da div de notificação
    notificationDiv.innerText = "CANVA CLEARED";
  } else if (gameStarted) {
    // Se o jogo estiver em andamento e o canvas não foi limpo, atualize o texto da div de notificação
    notificationDiv.innerText = "GAME ON";
  } else {
    // Se o jogo ainda não começou, atualize o texto da div de notificação
    notificationDiv.innerText = "O jogo ainda não começou.";
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

  redDiv.mouseMoved(addRect);
  
  document.getElementById('baixarArteAntiga').addEventListener('click', function () {
  const savedImageURL = localStorage.getItem('savedImage');
  if (savedImageURL) {
    const downloadLink = document.createElement('a');
    downloadLink.href = savedImageURL;
    downloadLink.download = 'saved_pixelart.jpg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } else {
    console.error('Não há arte armazenada no cache.');
  }
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

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('element-theme', savedTheme);
    isWhite = savedTheme === '2';
  }
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const screenWidth = window.innerWidth;
  if (isMobile && screenWidth >= 478) {
    startGame();
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

document.getElementById('colorPicker').addEventListener('input', function(event) {
  selectedColor = event.target.value;
});


function draw() {
  if (redDivEngolida) {
    numRects += 30;
    redDivEngolida = false;
  }

  if (!isDrawingPaused && gameStarted) {
    clear();

    if (!isWhite) {
      document.documentElement.style.setProperty('--swatch--light', '#F2F2F2');
    }
    
  for (let i = 0; i < rects.length; i++) {
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
}

for (let i = 0; i < rects.length; i++) {
  const x = rects[i].x - rectWidth / 2;
  const y = rects[i].y - rectHeight / 2;
  blendMode(BLEND);
  fill(rects[i].color); // use o objeto de cor ao desenhar
  rect(x, y, rectWidth, rectHeight);
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
let backgroundColor = window.getComputedStyle(document.body, null).backgroundColor;

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
  
  let backgroundColor = window.getComputedStyle(document.body, null).backgroundColor;
  
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

</script>

<script>
const copyClipboard = () => {
  const copyButton = document.getElementById('copyClipboard');
  const infoClip = document.getElementById('infoClip');
  if (copyButton && infoClip) {
    copyButton.addEventListener('click', function () {
      // Seleciona o texto do botão
      const buttonText = copyButton.textContent;
      navigator.clipboard.writeText(buttonText)
      .then(() => {
        infoClip.textContent = '✓ Copied';
      })
      .catch(err => {
        console.error('Erro ao copiar texto:', err);
      });
    });
  }
};
copyClipboard();


