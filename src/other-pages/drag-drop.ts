// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Muuri from 'muuri';

export const Dragdrop = () => {
  let grid;

  function initializeGrid() {
    if (!grid) {
      const grid = new Muuri('.proposal_contain', {
        dragEnabled: true,
        fillGaps: true,
        alignRight: false,
        alignBottom: false,
        items: '.proposal-contain',
      });
    }
  }

  function destroyGrid() {
    if (grid) {
      grid.destroy();
      grid = null;
    }
  }

  function checkScreenWidth() {
    if (window.innerWidth > 1024) {
      initializeGrid();
    } else {
      destroyGrid();
    }
  }

  // Verifica o tamanho da tela ao carregar a página
  checkScreenWidth();

  // Adiciona um listener para verificar mudanças no tamanho da tela
  window.addEventListener('resize', checkScreenWidth);
};
