// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import pagemap from 'pagemap';

gsap.registerPlugin(ScrollTrigger);

export const proposalAnimations = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      start: 'top 80%',
      end: 'bottom 20%',
    },
  });
  tl.fromTo(
    '.wrap',
    { y: 500, alpha: 0 },
    { y: 0, duration: 1, ease: 'power4.out', stagger: 0.2, alpha: 1 }
  );

  window.Webflow ||= [];
  window.Webflow.push(async () => {
    pagemap(document.querySelector('#map'), {
      viewport: null,
      styles: {
        'header,footer,section,article': 'rgba(0,0,0,0.08)',
        'h1,a': 'rgba(0,0,0,0.10)',
        'h2,h3,h4': 'rgba(0,0,0,0.08)',
      },
      back: 'rgba(0,0,0,0.02)',
      view: 'rgba(0,0,0,0.05)',
      drag: 'rgba(0,0,0,0.10)',
      interval: null,
    });
  });

  document.addEventListener('DOMContentLoaded', () => {});
};
