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
    cooldownMs: 0,
    damage: 30,
  },
  speed: {
    space: 120,
    time: 1.5,
  },
  health: 120,
  color: '#ba9db5 ',
};

export default vespera;
