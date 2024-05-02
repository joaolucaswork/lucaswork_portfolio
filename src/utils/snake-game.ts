// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gsap } from 'gsap';
import { Howl } from 'howler';

export const snakeGame = () => {
  const container = document.getElementById('container');
  const redDiv = document.getElementById('redDiv');
  const counterText = document.querySelector('.big-counter');
  const toggleSoundButton = document.getElementById('toggleSoundButton');
  const startGameButton = document.getElementById('start-game'); // Adicionando o botão "start-game"

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  let counter = 0;
  let trophyIndex = 0;
  let soundEnabled = true; // Controla se o som está ativado ou desativado
  let gameStarted = false; // Controla se o jogo foi iniciado

  // Oculta a redDiv inicialmente
  redDiv.style.display = 'none';

  // Função para reproduzir o som quando o botão é clicado
  function playButtonClickSound() {
    const buttonClickSound = new Howl({
      src: [''],
      volume: 0, // Volume baixo
      html5: true,
      format: ['mp3'],
    });
    buttonClickSound.play(); // Inicia a reprodução do áudio
  }

  // Adiciona um manipulador de eventos de clique ao botão "start-game"
  startGameButton.addEventListener('click', startGame);

  // Adiciona um event listener para o evento de tecla pressionada no documento
  document.addEventListener('keydown', function () {
    if (!gameStarted) {
      startGame();
    }
  });

  // Trocar texto
  const textSound = document.querySelector('.button-s');
  const originalText = textSound.textContent;
  let soundTextEnabled = true; // Controla se o texto "I want sound" está atualmente exibido

  // Adiciona um event listener de clique ao elemento com a classe ".text-sound"
  textSound.addEventListener('click', function () {
    soundTextEnabled = !soundTextEnabled; // Inverte o estado do texto

    // Alterna entre os textos "I want sound" e o texto original
    if (soundTextEnabled) {
      textSound.textContent = originalText;
    } else {
      textSound.textContent = 'I want sound';
    }
  });

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

        // Reproduz o som do troféu se o som estiver ativado
      }
    }

    // Verifica se o contador atinge 100 e mostra o vídeo com a classe "bg-akira"
    if (counter === 50) {
      const akiraVideo = document.querySelector('.akira-bg_video');
      akiraVideo.style.display = 'block';
      // Se você quiser iniciar o vídeo automaticamente, você pode usar akiraVideo.play();

      // Verifica se o atributo "element-theme" do elemento body é 1 e muda para 2
      const bodyElement = document.body;
      if (bodyElement.getAttribute('element-theme') === '1') {
        bodyElement.setAttribute('element-theme', '2');
      }
    }
  }

  // Adiciona event listeners
  redDiv.addEventListener('mouseenter', moveRedDiv);

  // Função para iniciar o jogo
  function startGame() {
    // Exibe a redDiv ao iniciar o jogo
    redDiv.style.display = 'block';

    // Adiciona um evento de mouseenter à redDiv apenas quando o jogo é iniciado
    redDiv.addEventListener('mouseenter', moveRedDiv);

    // Reproduz o som quando o botão é clicado
    playButtonClickSound();

    // Define gameStarted como true para indicar que o jogo foi iniciado
    gameStarted = true;
  }

  // Adiciona um event listener ao botão de alternar som
  toggleSoundButton.addEventListener('click', function () {
    soundEnabled = !soundEnabled; // Inverte o estado do som
    if (!soundEnabled) {
      // Se o som estiver desativado, pare todos os sons
      Howler.mute(true);
    } else {
      // Se o som estiver ativado, desmute todos os sons
      Howler.mute(false);
    }
  });
};
