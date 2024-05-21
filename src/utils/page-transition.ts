// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import barba from '@barba/core';
import anime from 'animejs';
import gsap from 'gsap';

export const pageTransition = () => {
  const SlideupPara = anime.timeline({
    loop: false,
    autoplay: true, // Autoplay desativado para controlar manualmente
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

  function resetWebflow(data) {
    const dom = $(new DOMParser().parseFromString(data.next.html, 'text/html')).find('html');
    // reset webflow interactions
    $('html').attr('data-wf-page', dom.attr('data-wf-page'));
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require('ix2').init();
    // reset w--current class
    $('.w--current').removeClass('w--current');
    $('a').each(function () {
      if ($(this).attr('href') === window.location.pathname) {
        $(this).addClass('w--current');
      }
    });
    // reset scripts
    dom.find('[data-barba-script]').each(function () {
      let codeString = $(this).text();
      if (codeString.includes('DOMContentLoaded')) {
        const newCodeString = codeString.replace(
          /window\.addEventListener\("DOMContentLoaded",\s*\(\s*event\s*\)\s*=>\s*{\s*/,
          ''
        );
        codeString = newCodeString.replace(/\s*}\s*\);\s*$/, '');
      }
      const script = document.createElement('script');
      script.type = 'text/javascript';
      if ($(this).attr('src')) script.src = $(this).attr('src');
      script.text = codeString;
      document.body.appendChild(script).remove();
    });
  }

  barba.hooks.enter((data) => {
    gsap.set(data.next.container, { position: 'fixed', top: 0, left: 0, width: '100%' });
    const SlideupPara = anime.timeline({
      loop: false,
      autoplay: true, // Autoplay desativado para controlar manualmente
    });

    SlideupPara.add({
      targets: '.is--slideup .title-container',
      translateY: [60, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1800,
      delay: (el, i) => 0 + 110 * i,
    });
  });

  barba.hooks.after((data) => {
    gsap.set(data.next.container, { position: 'relative' });
    $(window).scrollTop(0);
    resetWebflow(data);
  });

  barba.init({
    preventRunning: true,
    transitions: [
      {
        sync: true,
        enter(data) {
          const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } });
          tl.to(data.current.container, { opacity: 0, scale: 0.9 });
          tl.from(data.next.container, { y: '100vh' }, '<');
          return tl;
        },
      },
    ],
  });
};
