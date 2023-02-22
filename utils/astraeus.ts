import { Character } from './types';

const astraeus: Character = {
  hitbox: {
    height: 201,
    width: 113,
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

export default astraeus;
