import { Transition } from '@unseenco/taxi';

export default class MyTransition extends Transition {
  /**
   * Handle the transition leaving the previous page.
   * @param { { from: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onLeave({ from, trigger, done }) {
    if (from) {
      from.style.transition = 'opacity 0.5s';
      from.style.opacity = 0;

      from.addEventListener(
        'transitionend',
        () => {
          done();
        },
        { once: true }
      );
    } else {
      done();
    }
  }

  /**
   * Handle the transition entering the next page.
   * @param { { to: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onEnter({ to, trigger, done }) {
    if (to) {
      to.style.opacity = 0;
      to.style.transition = 'opacity 0.5s';

      requestAnimationFrame(() => {
        to.style.opacity = 1;
      });

      to.addEventListener(
        'transitionend',
        () => {
          done();
        },
        { once: true }
      );
    } else {
      done();
    }
  }
}
