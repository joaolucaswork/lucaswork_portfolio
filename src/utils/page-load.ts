// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { Flip } from 'gsap/Flip';

export const pageLoad = () => {
  gsap.registerPlugin(CustomEase, Flip);

  // Variáveis
  const customEase =
    'M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1';
  const counter = { value: 0 };
  let loaderDuration = 10;

  // Se não for a primeira visita nesta aba
  if (sessionStorage.getItem('visited') !== null) {
    loaderDuration = 2;
    counter.value = 75;
  }
  sessionStorage.setItem('visited', 'true');

  function updateLoaderText() {
    const progress = Math.round(counter.value);
    $('.loader_number').text(progress);
  }

  function endLoaderAnimation() {
    $('.loader').fadeOut(); // Esconder o elemento de carregamento após a conclusão da animação

    // Iniciar a animação do segundo código após o término da animação de carregamento
    const imageLucas = document.querySelector('.image-lucas');
    const lucasLogo = document.querySelector('.lucas-work');

    const stateImageLucas = Flip.getState('.image-lucas');
    const stateLucasLogo = Flip.getState('.lucas-work');

    lucasLogo.classList.toggle('stacked');
    imageLucas.classList.toggle('stacked');

    Flip.from(stateImageLucas, {
      delay: 0.6,
      duration: 1,
      y: -500,
      ease: 'power4.out',
    });

    Flip.from(stateLucasLogo, {
      delay: 0.6,
      duration: 1.9,
      y: -500,
      ease: 'power2.out',
    });
  }

  const tl = gsap.timeline({
    onComplete: endLoaderAnimation,
  });

  tl.to(counter, {
    value: 100,
    onUpdate: updateLoaderText,
    duration: loaderDuration,
    ease: CustomEase.create('custom', customEase),
  });

  tl.to(
    '.loader_progress',
    {
      width: '100%',
      duration: loaderDuration,
      ease: CustomEase.create('custom', customEase),
    },
    0
  );
};
