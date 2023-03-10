import { Character } from './types';

const astraeus: Character = {
  name: 'astraeus',
  hitbox: {
    height: 201,
    width: 113,
  },
  attack: {
    hitbox: {
      height: 50,
      width: 330,
    },
    delayMsList: [400],
    durationMs: 800,
    cooldownMs: 800,
    damage: 30,
  },
  speed: {
    space: 80,
    time: 1.5,
  },
  health: 210,
  color: '#5d6545',
  appear: 800,
};

export default astraeus;
