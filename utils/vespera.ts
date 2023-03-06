import { Character } from './types';

const vespera: Character = {
  name: 'vespera',

  hitbox: {
    height: 176,
    width: 192.2,
  },
  attack: {
    hitbox: {
      height: 50,
      width: 400,
    },
    delayMsList: [0],
    durationMs: 500,
    cooldownMs: 1200,
    damage: 30,
  },
  speed: {
    space: 120,
    time: 1.5,
  },
  health: 180,
  color: '#ba9db5 ',
  appear: 900,
};

export default vespera;
