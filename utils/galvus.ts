import Character from './types';

const galvus: Character = {
  name: 'galvus',

  hitbox: {
    height: 186,
    width: 94,
  },
  attack: {
    hitbox: {
      height: 50,
      width: 520,
    },
    cooldown: 0,
    damage: 40,
  },
  speed: {
    space: 120,
    time: 1.5,
  },
  health: 100,
  color: '#23313d',
};

export default galvus;
