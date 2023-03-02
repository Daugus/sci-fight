<script lang="ts">
import { PropType } from 'vue';
import { Character } from '~~/utils/types';

export default {
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
      return (this.currentHealth / this.character.health) * 100;
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
      if (this.currentHealth <= 0) {
        this.$emit('endGame', this.playerNumber);
      }
    },
  },
};
// character.health
</script>

<template>
  <div :class="['flex', 'h-6', ' w-full ', 'overflow-visible', 'bg-red-600', playerNumber === 1 && 'rotate-x-180']">
    <div
      :class="['h-full', 'transition-all']"
      :style="`width: ${currentHealthPercentage}%; background-color: ${character.color}`"
    ></div>
  </div>
</template>

<style lang="scss"></style>
