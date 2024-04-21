// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import animejs from 'animejs';

export const letterEffect = () => {
  // Journal IN
  const SlideupPara = animejs.timeline({
    loop: false,
    autoplay: false, // desativado para controlar manualmente
  });

  SlideupPara.add({
    targets: '.is--slideup .title-container',
    translateY: [60, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1800,
    delay: (el, i) => 1000 + 60 * i,
  });

  SlideupPara.play();
};
