type hitbox = {
  height: number;
  width: number;
};

type attack = {
  hitbox: hitbox;
  damage: number;
  delayMsList: number[];
  durationMs: number;
  cooldownMs: number;
};

type speed = {
  space: number;
  time: number;
};

type Character = {
  name: string;
  hitbox: hitbox;
  attack: attack;
  speed: speed;
  health: number;
  color: string;
  appear: number;
};

type state = 'hit' | 'idle' | 'move' | 'attack' | 'appear' | 'death';

export { hitbox, Character, state };
