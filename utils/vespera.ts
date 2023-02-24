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
    cooldown: 0,
    damage: 0,
  },
  speed: {
    space: 120,
    time: 0,
  },
  health: 0,
};

export default vespera;
