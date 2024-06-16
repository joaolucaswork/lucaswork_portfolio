// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Core } from '@unseenco/taxi';

import MyTransition from './transition-config';

document.addEventListener('DOMContentLoaded', () => {
  const taxi = new Core({
    transitions: {
      mine: MyTransition,
    },
  });
});
