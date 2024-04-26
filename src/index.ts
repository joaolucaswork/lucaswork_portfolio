import p5 from 'p5';

import { changeColor } from './utils/change-color';
import { codeEffects } from './utils/code-effects';
//import { dropThings } from './utils/drop-things';
//import { flipEffect } from './utils/filp-effect';
import { flipCard } from './utils/flip-card';
import { lazyLoad } from './utils/lazy-load';
import { letterEffect } from './utils/letter-effect';
//import { pageLoad } from './utils/page-load';
//import { pageTransitions } from './utils/page-transitions';
//import { scrollCar } from './utils/scroll-carr';
//import { snakeAsset } from './utils/snake-asset';
import { snakeGame } from './utils/snake-game';

codeEffects();
changeColor();
snakeGame();
lazyLoad();
//snakeAsset();
//pageTransitions();
//pageLoad();
//dropThings();
letterEffect();
flipCard();
//flipEffect();
//scrollCar();
