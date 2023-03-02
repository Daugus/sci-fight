import { Character } from './types';

const quasar: Character = {
  name: 'quasar',

  hitbox: {
    height: 140,
    width: 135,
  },
  attack: {
    hitbox: {
      height: 50,
      width: 340,
    },
    delayMsList: [0, 400],
    durationMs: 800,
    cooldownMs: 0,
    damage: 20,
  },
  speed: {
    space: 140,
    time: 1.5,
  },
  health: 120,
  color: '#9c3333',
  appear: 3800,
};

export default quasar;
