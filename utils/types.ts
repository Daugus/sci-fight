export type hitbox = {
  height: number;
  width: number;
};

export type attack = {
  hitbox: hitbox;
  damage: number;
  cooldown: number;
};

export type speed = {
  space: number;
  time: number;
};

export type Character = {
  name: string;
  hitbox: hitbox;
  attack: attack;
  speed: speed;
  health: number;
};
