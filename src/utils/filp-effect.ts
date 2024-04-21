// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

export const flipEffect = () => {
  gsap.registerPlugin(Flip);

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
};
