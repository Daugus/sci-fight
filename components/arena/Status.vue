<script lang="ts">
import { PropType } from 'vue';
import { Character } from '~~/utils/types';

export default {
  emits: ['endGame'],
  data() {
    return {
      currentHealth: 0,
      death: false,
    };
  },
  props: {
    playerNumber: { required: true, type: Number },
    character: { required: true, type: Object as PropType<Character> },
    enemy: { required: true, type: Object as PropType<Character> },
    attack: { required: true, type: Object as PropType<{ receiver: number }> },
    ended: { required: true, type: Boolean },
  },
  computed: {
    currentHealthPercentage() {
      return this.currentHealth > 0 ? (this.currentHealth / this.character.health) * 100 : 0;
    },
    playerClasses() {
      let classes = [];
      if (this.playerNumber === 1) {
        classes.push('left-[6.7%]');
      } else {
        classes.push('right-[6.7%]', 'rotate-x-180');
      }
    },
  },
  mounted() {
    this.currentHealth = this.character.health;
  },
  watch: {
    attack() {
      if (this.ended || this.attack.receiver !== this.playerNumber || this.currentHealth <= 0) return;
      this.currentHealth -= this.enemy.attack.damage / this.enemy.attack.delayMsList.length;
    },
    currentHealth() {
      if (this.currentHealth <= 0) this.$emit('endGame', this.playerNumber);
      console.log(`${this.playerNumber}: ${this.currentHealth}`);
    },
  },
};
</script>

<template>
  <!-- Vida maxima restante -->
  <div
    :class="[
      'absolute',
      'bg-[#262626]',
      'w-[42.1%]',
      'h-[1.5rem]',
      `${playerNumber == 1 ? 'left-[6.7%]' : 'right-[6.7%]'}`,
      playerNumber === 2 && 'rotate-x-180',
      'top-[30%]',
    ]"
  >
    <div
      class="h-full transition-all"
      :style="`width: ${currentHealthPercentage}%; background-color: ${character.color}`"
    ></div>
  </div>

  <!-- Cooldown: Ataque -->
  <div
    :class="[
      'rounded-r-xl',
      'overflow-hidden',
      'absolute',
      'bg-[#262626]',
      'w-[27.5%]',
      'h-[1.5rem]',
      `${playerNumber == 1 ? 'left-[6.7%]' : 'right-[6.7%]'}`,
      playerNumber === 2 && 'rotate-x-180',
      'top-[45%]',
    ]"
  >
    <div
      class="h-full bg-[#ffc42e] transition-all"
      :style="`width: ${currentHealthPercentage}%`"
    ></div>
  </div>

  <!-- Cooldown: Defensa -->
  <div
    :class="[
      'rounded-r-xl',
      'overflow-hidden',
      'absolute',
      'bg-[#262626]',
      'w-[27.5%]',
      'h-[1.5rem]',
      `${playerNumber == 1 ? 'left-[6.7%]' : 'right-[6.7%]'}`,
      playerNumber === 2 && 'rotate-x-180',
      'top-[58%]',
    ]"
  >
    <div
      class="h-full bg-white transition-all"
      :style="`width: ${currentHealthPercentage}%`"
    ></div>
  </div>

  <!-- Preview character -->
  <div
    :class="[`character-preview-player-${playerNumber}`, 'absolute', 'flex', 'justify-center', 'items-center', 'overflow-hidden', 'bg-[#262626bf]']"
  >
    <div class="relative mt-12 flex h-full w-full items-center justify-center">
      <div :class="[`${character.name}-idle`, 'absolute', playerNumber === 2 && 'rotate-x-180']"></div>
    </div>
  </div>

  <!-- Asset -->
  <img
    :class="['z-[100]', 'absolute', 'w-[49%]', playerNumber === 2 && 'rotate-x-180 right-0']"
    src="/src/img/assets/health_bar.png"
  />
</template>

<style lang="scss">
.character-preview-player-1 {
  inset: 27% 93.5% 26% 2%;
}

.character-preview-player-2 {
  inset: 27% 2% 26% 93.5%;
}
</style>
