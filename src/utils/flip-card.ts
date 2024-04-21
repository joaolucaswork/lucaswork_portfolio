// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

export const flipCard = () => {
  gsap.registerPlugin(Flip);

  $('.grid_img-wrapper').on('click', function () {
    const state = Flip.getState('.grid_img');

    const mainImg = $('.grid_img-main img');
    $(this).find('img').appendTo($('.grid_img-main'));
    mainImg.appendTo($(this));

    Flip.from(state, {
      duration: 0,
    });
  });
};
