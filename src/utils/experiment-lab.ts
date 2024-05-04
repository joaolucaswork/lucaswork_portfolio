export const experimentLab = () => {
  const rectWidth: number = 30;
  const rectHeight: number = 30;
  let numRects: number = 4;
  const distThreshold: number = 10;
  let rects: { x: number; y: number }[] = [];
  let lastMousePos: { x: number; y: number } = { x: 0, y: 0 };
  let isWhite: boolean = false;
  let isDrawingPaused: boolean = false;
  const isRedDivVisible: boolean = true;
  let gameStarted: boolean = false;

  function setup(): void {
    const cnv: p5.Renderer = createCanvas(windowWidth, windowHeight);

    cnv.parent('canvas-parent');
    cnv.style('display', 'block');
    cnv.style('position', 'absolute');
    cnv.style('inset', '0');
    cnv.style('z-index', '-1');

    lastMousePos = { x: mouseX, y: mouseY };

    const changeModeLink: p5.Element = select('#change-mode');

    changeModeLink.mouseClicked(toggleColor);

    const clearCanvasButton: p5.Element = select('#clear-canvas');

    clearCanvasButton.mouseClicked(clearCanvas);

    const shareArtButton: p5.Element = select('#shareArt');

    shareArtButton.mouseClicked(saveArt);

    const redDiv: p5.Element = select('#redDiv');

    redDiv.mouseMoved(addRect);

    document.addEventListener('keydown', function (event: KeyboardEvent): void {
      if (event.code === 'Space') {
        if (!gameStarted) {
          startGame();
        } else {
          isDrawingPaused = !isDrawingPaused;
        }
      } else if (event.key === 'r') {
        clearCanvas();
        isDrawingPaused = false;
      }
    });

    const savedTheme: string | null = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.setAttribute('element-theme', savedTheme);
      isWhite = savedTheme === '2';
    }
    const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const screenWidth: number = window.innerWidth;
    if (isMobile && screenWidth >= 478) {
      startGame();
    }
  }

  function clearCanvas(): void {
    rects = [];
  }

  function addRect(): void {
    const d: number = dist(mouseX, mouseY, lastMousePos.x, lastMousePos.y);

    if (d > distThreshold) {
      lastMousePos = { x: mouseX, y: mouseY };
    }
  }

  let redDivEngolida: boolean = false;

  document.getElementById('redDiv').addEventListener('mouseover', function (): void {
    redDivEngolida = true;
  });

  function draw(): void {
    if (redDivEngolida) {
      numRects += 30;
      redDivEngolida = false;
    }

    if (!isDrawingPaused && gameStarted) {
      clear();

      if (!isWhite) {
        document.documentElement.style.setProperty('--swatch--light', '#F2F2F2');
      }

      const d: number = dist(mouseX, mouseY, lastMousePos.x, lastMousePos.y);

      if (d > distThreshold) {
        rects.unshift({ x: mouseX, y: mouseY });
        while (rects.length > numRects) {
          rects.pop();
        }
        lastMousePos = { x: mouseX, y: mouseY };
      }
      for (let i: number = 0; i < rects.length; i++) {
        const x: number = rects[i].x - rectWidth / 2;
        const y: number = rects[i].y - rectHeight / 2;
        blendMode(BLEND);
        fill(isWhite ? 255 : 0);
        rect(x, y, rectWidth, rectHeight);
      }
    }
  }

  function toggleColor(): void {
    isWhite = !isWhite;
  }

  function clearCanvas(): void {
    rects = [];
  }

  function saveArt(): void {
    const tempCanvas: HTMLCanvasElement = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx: CanvasRenderingContext2D | null = tempCanvas.getContext('2d');
    if (tempCtx) {
      tempCtx.fillStyle = document.documentElement.style.getPropertyValue('--swatch--light');
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      tempCtx.fillStyle = '#000000';
      for (let i: number = 0; i < rects.length; i++) {
        const x: number = rects[i].x - rectWidth / 2;
        const y: number = rects[i].y - rectHeight / 2;
        tempCtx.fillRect(x, y, rectWidth, rectHeight);
      }

      tempCtx.fillStyle = '#FFFFFF';
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.font = '56px Arial';
      tempCtx.fillText('', width / 2, height / 2);

      const imageURL: string = tempCanvas.toDataURL('image/jpg');
      const canvasArts: HTMLCanvasElement = document.querySelector('.canva-arts');
      const ctx: CanvasRenderingContext2D | null = canvasArts.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasArts.width, canvasArts.height);
        const img: HTMLImageElement = new Image();

        img.onload = function (): void {
          ctx.drawImage(img, 0, 0, canvasArts.width, canvasArts.height);
        };

        img.src = imageURL;
        const downloadBtn: HTMLElement | null = document.getElementById('baixarArte');
        if (downloadBtn) {
          downloadBtn.href = imageURL;
          downloadBtn.download = 'my_art.jpg';
        }

        Tesseract.recognize(imageURL, 'eng', { logger: (m: any) => console.log(m) }).then(
          ({ data: { text } }: any) => {
            console.log('Texto reconhecido:', text);
            if (text === null || text.trim() === '') {
              console.log('Erro: Não foi possível reconhecer texto na imagem.');
            } else {
              const lowerCaseText: string = text.toLowerCase();
              const regex: RegExp = /kill[-\s]*bill/g;
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
                  console.log(
                    'Palavra "kill bill" ou variação identificada após o pós-processamento!'
                  );
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
      }
    }

    function corrigirErrosOrtograficos(text: string): string {
      return text;
    }

    function normalizarPalavras(text: string): string {
      return text;
    }

    function corrigirQuebrasDeLinha(text: string): string {
      return text;
    }

    localStorage.setItem('savedImage', imageURL);
  }

  window.addEventListener('load', function (): void {
    const savedImageURL: string | null = localStorage.getItem('savedImage');
    if (savedImageURL) {
      const img: HTMLImageElement = new Image();
      img.onload = function (): void {
        const canvas: HTMLCanvasElement = document.getElementById('canvaMain');
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        }
      };
      img.src = savedImageURL;
    }
  });

  document.getElementById('baixarArteAntiga').addEventListener('click', function (): void {
    const savedImageURL: string | null = localStorage.getItem('savedImage');
    if (savedImageURL) {
      const downloadLink: HTMLAnchorElement = document.createElement('a');
      downloadLink.href = savedImageURL;
      downloadLink.download = 'saved_pixelart.jpg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.error('Não há arte armazenada no cache.');
    }
  });

  function toggleTheme(): void {
    const currentTheme: string | null = document.body.getAttribute('element-theme');
    const newTheme: string = currentTheme === '1' ? '2' : '1';
    document.body.setAttribute('element-theme', newTheme);

    localStorage.setItem('theme', newTheme);
  }

  window.addEventListener('load', function (): void {
    const savedTheme: string | null = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.setAttribute('element-theme', savedTheme);
    }
  });

  const changeModeLink: HTMLElement | null = document.querySelector('.change-mode');
  if (changeModeLink) {
    changeModeLink.addEventListener('click', function (event: Event): void {
      event.preventDefault();
      toggleTheme();
    });
  }

  function startGame(): void {
    gameStarted = true;
  }
};
