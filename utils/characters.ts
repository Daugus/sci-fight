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
    /* Nombre */
    name: 'quasar',

    /* Caracteristicas del personaje */
    hitbox: {
      height: 140,
      width: 135,
    },
    weight: 100,
    speed: 100,

    /* Caracteristicas en combate */
    health: 120,

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
    /* Nombre */
    name: 'astraeus',

    /* Caracteristicas del personaje */
    hitbox: {
      height: 201,
      width: 113,
    },
    weight: 130,
    speed: 80,

    /* Caracteristicas en combate */
    health: 140,

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
    /* Nombre */
    name: 'vespera',

    /* Caracteristicas del personaje */
    hitbox: {
      height: 176,
      width: 192.2,
    },
    weight: 60,
    speed: 120,

    /* Caracteristicas en combate */
    health: 120,

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
