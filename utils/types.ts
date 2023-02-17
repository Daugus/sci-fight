export type Hitbox = {
  height: number;
  width: number;
};

export type Attack = {
  damage: number;
  hitbox: Hitbox;
  cooldown: number;
};

export type Character = {
  name: string;

  health: number;

  hitbox: Hitbox;
  weight: number;
  speed: number;

  attack: Attack;
};
