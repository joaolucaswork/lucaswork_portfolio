// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
};
