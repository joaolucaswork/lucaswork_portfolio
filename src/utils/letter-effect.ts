// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const SlideupPara = anime.timeline({
  loop: false,
  autoplay: false, // Autoplay desativado para controlar manualmente
});

SlideupPara.add({
  targets: '.is--slideup .title-container',
  translateY: [60, 0],
  translateZ: 0,
  opacity: [0, 1],
  easing: 'easeOutExpo',
  duration: 1800,
  delay: (el, i) => 500 + 110 * i,
});
