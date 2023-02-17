import { Character } from './types';

// TODO: sizes
const characters: Character[] = [
  {
    name: 'galvus',

    health: 100,

    hitbox: {
      height: 10,
      width: 5,
    },
    weight: 80,
    speed: 120,

    attack: {
      damage: 40,
      hitbox: {
        height: 10,
        width: 5,
      },
      cooldown: 800,
    },
  },
  {
    name: 'quasar',

    health: 120,

    hitbox: {
      height: 10,
      width: 5,
    },
    weight: 100,
    speed: 100,

    attack: {
      damage: 20,
      hitbox: {
        height: 10,
        width: 5,
      },
      cooldown: 400,
    },
  },
  {
    name: 'astraeus',

    health: 140,

    hitbox: {
      height: 10,
      width: 5,
    },
    weight: 130,
    speed: 80,

    attack: {
      damage: 30,
      hitbox: {
        height: 10,
        width: 5,
      },
      cooldown: 600,
    },
  },
  {
    name: 'vespera',

    health: 120,

    hitbox: {
      height: 10,
      width: 5,
    },
    weight: 60,
    speed: 120,

    attack: {
      damage: 30,
      hitbox: {
        height: 10,
        width: 5,
      },
      cooldown: 800,
    },
  },
];

export default characters;
