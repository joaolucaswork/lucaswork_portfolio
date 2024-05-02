document.addEventListener('keydown', function (event) {
  if (!gameStarted) {
    startGame();
  }
  // Verifica se a tecla pressionada não é a tecla Espaço
  if (event.code !== 'Space') {
    // Adicione aqui o código que deseja executar com qualquer tecla, exceto Espaço
    // Por exemplo, para a tecla "r":
    if (event.key === 'r') {
      clearCanvas();
    }
  } else {
    // Se a tecla pressionada for a tecla Espaço, você pode adicionar um comportamento alternativo se desejar
    isDrawingPaused = !isDrawingPaused;
  }
});
