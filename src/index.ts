import p5 from 'p5';

import { changeColor } from '$utils/change-color';
import { codeEffects } from '$utils/code-effects';
import { flipCard } from '$utils/flip-card';
import { lazyLoad } from '$utils/lazy-load';
import { letterEffect } from '$utils/letter-effect';
import { snakeGame } from '$utils/snake-game';

codeEffects();
changeColor();
snakeGame();
lazyLoad();
letterEffect();
flipCard();
