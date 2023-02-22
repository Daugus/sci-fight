import { Character } from './types';

const quasar: Character = {
  hitbox: {
    height: 140,
    width: 135,
  },
  attack: {
    hitbox: {
      height: 50,
      width: 0,
    },
    cooldown: 0,
    damage: 0,
  },
  speed: {
    space: 0,
    time: 0,
  },
  health: 0,
};

export default quasar;
