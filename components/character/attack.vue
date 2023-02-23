<script lang="ts">
export default {
  data() {
    return { index: 0 };
  },
  props: {
    playerNumber: Number,
    color: String,
  },
  mounted() {
    const hurtbox = document.querySelector(`#attackP${this.playerNumber}`);

    if (!hurtbox) return;

    const rect = hurtbox.getBoundingClientRect();
    this.$emit(`getRect`, rect, this.playerNumber);
  },

  watch: {},
};
</script>

<template>
  <div
    class="attack"
    :id="`attackP${playerNumber}`"
  >
    Attack
  </div>
</template>

<style lang="scss"></style>
