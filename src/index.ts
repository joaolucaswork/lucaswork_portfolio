/* eslint-disable @typescript-eslint/no-unused-vars */
import p5 from 'p5';

import { snakeGame } from '$utils/game-code/snake-game';
import { pageTransition } from '$utils/page-transition';
import { sliderDefault } from '$utils/slider-default';

snakeGame();
pageTransition();
sliderDefault();
