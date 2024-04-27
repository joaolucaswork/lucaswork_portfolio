const rectWidth = 30; // largura do quadrado
const rectHeight = 30; // altura do quadrado
let numRects = 4; // quantidade de quadrados pretos
const distThreshold = 10; // distância mínima do mouse para adicionar um novo quadrado
// VARIABLES
let rects = []; // array para armazenar os quadrados
let lastMousePos = { x: 0, y: 0 }; // última posição do mouse
let isWhite = false; // variável para controlar se a cor é branca
let isDrawingPaused = false; // variável para controlar se o desenho está pausado
let isRedDivVisible = true; // variável para controlar se a redDiv está visível

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

  // Adiciona um manipulador de eventos de clique para o botão com ID "clear-canvas"

  const clearCanvasButton = select('#clear-canvas');

  clearCanvasButton.mouseClicked(clearCanvas);

  // Adiciona um manipulador de eventos de clique para o botão com ID "shareArt"

  const shareArtButton = select('#shareArt');

  shareArtButton.mouseClicked(saveArt);

  // Adiciona um manipulador de eventos de mouseover para a div com ID "redDiv"

  const redDiv = select('#redDiv');

  redDiv.mouseMoved(addRect);

  // Adiciona um manipulador de eventos de teclado para capturar a tecla Enter

  document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      isDrawingPaused = !isDrawingPaused; // inverte o estado de pausa do desenho
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'r') {
      clearCanvas(); // Chama a função clearCanvas() quando a tecla "r" é pressionada
    }
  });
}

function clearCanvas() {
  rects = []; // Limpa o array de quadrados
}

// Função para adicionar um novo quadrado quando o mouse passar pela div

function addRect() {
  // Calcula a distância entre a posição atual do mouse e a última posição armazenada do mouse

  const d = dist(mouseX, mouseY, lastMousePos.x, lastMousePos.y);

  // Adiciona um novo quadrado apenas se a distância for maior do que o limite

  if (d > distThreshold) {
    lastMousePos = { x: mouseX, y: mouseY }; // Atualiza a última posição do mouse
  }
}

let redDivEngolida = false; // Variável para controlar se a redDiv foi engolida

// Adicione um event listener para o evento de mouseover na redDiv
document.getElementById('redDiv').addEventListener('mouseover', function () {
  redDivEngolida = true; // Atualiza a variável para true quando o mouse passa sobre a redDiv
});

function draw() {
  // Verifica se a div "redDiv" foi engolida
  if (redDivEngolida) {
    numRects += 30; // Adiciona um quadrado
    redDivEngolida = false; // Redefine a variável para false
  }
  // Verifica se o desenho não está pausado

  if (!isDrawingPaused) {
    // Limpa o canvas

    clear();

    // Define a cor de fundo usando a variável CSS

    if (!isWhite) {
      document.documentElement.style.setProperty('--swatch--light', '#F2F2F2'); // cor padrão
    }

    // Calcula a distância entre a posição atual do mouse e a última posição armazenada do mouse

    const d = dist(mouseX, mouseY, lastMousePos.x, lastMousePos.y);

    // Se a distância for maior do que o limite, adiciona uma nova posição do mouse ao histórico de quadrados

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
      const x = rects[i].x - rectWidth / 2;

      const y = rects[i].y - rectHeight / 2;

      // Remover o modo de mistura para garantir que os quadrados sejam desenhados corretamente com o fundo branco

      blendMode(BLEND); // volta ao modo de mistura padrão

      fill(isWhite ? 255 : 0); // branco ou preto dependendo do estado

      rect(x, y, rectWidth, rectHeight);
    }
  }
}

// Evento de clique no toggle

function toggleColor() {
  isWhite = !isWhite; // inverte o estado da cor
}

// Função para limpar o canvas

function clearCanvas() {
  rects = []; // Limpa o array de quadrados
}

// Função para salvar a arte

function saveArt() {
  // Cria um novo elemento de canvas temporário
  let tempCanvas = document.createElement('canvas');
  tempCanvas.width = width; // Define a largura do canvas temporário como a largura do canvas principal
  tempCanvas.height = height; // Define a altura do canvas temporário como a altura do canvas principal
  let tempCtx = tempCanvas.getContext('2d'); // Obtém o contexto 2D do canvas temporário

  // Preenche o canvas temporário com a cor de fundo do canvas principal
  tempCtx.fillStyle = document.documentElement.style.getPropertyValue('--swatch--light'); // Cor de fundo do canvas principal
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  // Desenha os quadrados no canvas temporário
  tempCtx.fillStyle = '#000000'; // Define a cor de preenchimento como preto
  for (let i = 0; i < rects.length; i++) {
    const x = rects[i].x - rectWidth / 2;
    const y = rects[i].y - rectHeight / 2;
    tempCtx.fillRect(x, y, rectWidth, rectHeight); // Desenha o quadrado
  }

  // Desenha o texto no centro do canvas temporário
  tempCtx.fillStyle = '#FFFFFF'; // Define a cor de preenchimento como branco
  tempCtx.textAlign = 'center'; // Define o alinhamento do texto como centralizado
  tempCtx.textBaseline = 'middle'; // Define a linha de base do texto como o centro vertical
  tempCtx.font = '56px Arial'; // Define o tamanho e a fonte do texto
  tempCtx.fillText('', width / 2, height / 2); // Desenha o texto no centro do canvas

  // Cria uma imagem a partir do canvas temporário
  let imageURL = tempCanvas.toDataURL('image/jpg');

  // Selecione o elemento canvas com a classe canva-arts
  let canvasArts = document.querySelector('.canva-arts');
  let ctx = canvasArts.getContext('2d');

  // Limpa o conteúdo existente no canvas
  ctx.clearRect(0, 0, canvasArts.width, canvasArts.height);

  // Cria uma nova imagem e a exibe no canvas
  let img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvasArts.width, canvasArts.height);
  };
  img.src = imageURL;

  // Selecione o botão de download existente pelo ID "baixarArte"
  let downloadBtn = document.getElementById('baixarArte');

  // Atribua o URL da imagem gerada ao botão de download
  downloadBtn.href = imageURL;
  downloadBtn.download = 'my_art.jpg';

  // Event listener para o botão shareArt

  // Event listener para o botão closePopup

  // Reconhecimento de texto usando Tesseract.js
  // Reconhecimento de texto usando Tesseract.js
  Tesseract.recognize(imageURL, 'eng', { logger: (m) => console.log(m) }).then(
    ({ data: { text } }) => {
      console.log('Texto reconhecido:', text);
      // Verifica se houve algum erro durante o reconhecimento
      if (text === null || text.trim() === '') {
        console.log('Erro: Não foi possível reconhecer texto na imagem.');
      } else {
        // Converter o texto para minúsculas antes de verificar
        let lowerCaseText = text.toLowerCase();
        // Define uma expressão regular para corresponder a variações de "kill bill"
        let regex = /kill[-\s]*bill/g;
        if (lowerCaseText.match(regex)) {
          console.log('Palavra "kill bill" ou variação identificada!');
          // Aqui você pode adicionar o código para exibir a imagem
          // Por exemplo:
          document.getElementById('imagem').src =
            'https://uploads-ssl.webflow.com/6617e4fc3b3950260690670d/662c69da6e0e4feedf61aaea_kill-bill.jpg';
        } else {
          console.log('Palavra "kill bill" ou variação não identificada.');
          // Realize pós-processamento para corrigir possíveis erros de identificação
          // Por exemplo:
          // Corrija erros ortográficos comuns
          text = corrigirErrosOrtograficos(text);
          // Normalize palavras para um formato padrão
          text = normalizarPalavras(text);
          // Corrija quebras de linha incorretas
          text = corrigirQuebrasDeLinha(text);
          // Verifique novamente se a palavra foi identificada após o pós-processamento
          if (text.match(regex)) {
            console.log('Palavra "kill bill" ou variação identificada após o pós-processamento!');
            // Aqui você pode adicionar o código para exibir a imagem
            // Por exemplo:
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

  // Funções de exemplo para pós-processamento do texto
  function corrigirErrosOrtograficos(text) {
    // Implemente a lógica para corrigir erros ortográficos comuns
    return text;
  }

  function normalizarPalavras(text) {
    // Implemente a lógica para normalizar palavras para um formato padrão
    return text;
  }

  function corrigirQuebrasDeLinha(text) {
    // Implemente a lógica para corrigir quebras de linha incorretas
    return text;
  }
}
