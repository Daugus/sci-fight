<script lang="ts">
import { PropType } from 'vue';
import { Character } from '~~/utils/types';

export default {
  emits: ['endGame', 'enableParry', 'enableAttack'],
  data() {
    return {
      currentHealth: 0,
      death: false,

      parryCooldownDuration: 1000,
      parryCooldownProgress: 100,

      attackCooldownDuration: 1000,
      attackCooldownProgress: 100,
    };
  },
  props: {
    playerNumber: { required: true, type: Number },
    character: { required: true, type: Object as PropType<Character> },
    enemy: { required: true, type: Object as PropType<Character> },
    attack: { required: true, type: Object as PropType<{ receiver: number }> },
    ended: { required: true, type: Boolean },

    playerParry: { required: true, type: Boolean },
    playerAttack: { required: true, type: Boolean },
  },
  computed: {
    currentHealthPercentage() {
      return this.currentHealth > 0 ? (this.currentHealth / this.character.health) * 100 : 0;
    },
    playerClasses() {
      return this.playerNumber === 1 ? 'left-[6.7%]' : 'right-[6.7%] rotate-x-180';
    },

    currentParryPercentage() {
      return `${this.parryCooldownProgress}%`;
    },
    parryCooldownDurationMs() {
      return `${this.parryCooldownDuration}ms`;
    },

    currentAttackPercentage() {
      return `${this.attackCooldownProgress}%`;
    },
    attackCooldownDurationMs() {
      return `${this.attackCooldownDuration}ms`;
    },
  },
  mounted() {
    this.currentHealth = this.character.health;
    this.attackCooldownDuration = this.character.attack.cooldownMs;
  },
  watch: {
    attack() {
      if (this.ended || this.attack.receiver !== this.playerNumber || this.currentHealth <= 0) return;
      this.currentHealth -= this.enemy.attack.damage / this.enemy.attack.delayMsList.length;
    },
    currentHealth() {
      if (this.currentHealth <= 0) this.$emit('endGame', this.playerNumber);
    },

    playerParry() {
      if (this.playerParry) {
        this.parryCooldownProgress = 0;
        this.parryCooldownDuration = 300;
      } else {
        this.parryCooldownProgress = 100;
        this.parryCooldownDuration = 1000;

        setTimeout(() => this.$emit('enableParry', this.playerNumber), 1000);
      }
    },

    playerAttack() {
      if (this.playerAttack) {
        this.attackCooldownProgress = 0;
        this.attackCooldownDuration = 300;
      } else {
        this.attackCooldownProgress = 100;
        this.attackCooldownDuration = this.character.attack.cooldownMs;

        setTimeout(() => this.$emit('enableAttack', this.playerNumber), this.character.attack.cooldownMs);
      }
    },
  },
};
</script>

<template>
  <!-- Asset -->
  <img
    :class="['z-[100]', 'w-[49%]', 'top-10', playerNumber === 2 && 'rotate-x-180 right-0']"
    src="/src/img/assets/health_bar.png"
  />

  <!-- Vida maxima restante -->
  <div :class="['absolute', 'bg-[#262626]', 'top-[20%]', 'w-[42.2%]', 'h-[1.25rem]', 'rounded-r-lg', 'overflow-hidden', playerClasses]">
    <div
      class="h-full brightness-125 transition-all"
      :style="`width: ${currentHealthPercentage}%; background-color: ${character.color}`"
    ></div>
  </div>

  <!-- Cooldown: Ataque -->
  <div :class="['rounded-r-lg', 'overflow-hidden', 'absolute', 'bg-[#262626]', 'top-[43%]', 'w-[27.5%]', 'h-[1.1rem]', playerClasses]">
    <div
      class="h-full bg-[#ffc42e] opacity-75 transition-all"
      id="attack-bar"
    ></div>
  </div>

  <!-- Cooldown: Defensa -->
  <div :class="['rounded-r-lg', 'overflow-hidden', 'absolute', 'bg-[#262626]', 'top-[64.5%]', 'w-[27.5%]', 'h-[1.1rem]', playerClasses]">
    <div
      class="h-full bg-white opacity-75 transition-all"
      id="parry-bar"
    ></div>
  </div>

  <!-- Preview character -->
  <div
    :class="[`character-preview-player-${playerNumber}`, 'absolute', 'flex', 'justify-center', 'items-center', 'overflow-hidden', 'bg-[#2626269d]']"
  >
    <div class="relative mt-12 flex h-full w-full items-center justify-center">
      <div :class="[`${character.name}-idle`, 'absolute', 'cancel', playerNumber === 2 && 'rotate-x-180']"></div>
    </div>
  </div>
</template>

<style lang="scss">
.character-preview-player-1 {
  inset: 7% 93.5% 7% 2%;
}

.character-preview-player-2 {
  inset: 7% 2% 7% 93.5%;
}

.cancel {
  animation: cancel 1s infinite;
}

.transition-all {
  transition-timing-function: linear;
}

#parry-bar {
  --parry-progress: v-bind(currentParryPercentage);
  width: var(--parry-progress);
  transition: all v-bind(parryCooldownDurationMs) linear;
}

#attack-bar {
  --attack-progress: v-bind(currentAttackPercentage);
  width: var(--attack-progress);
  transition: all v-bind(attackCooldownDurationMs) linear;
}

@keyframes cancel {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 0;
  }
}
</style>
