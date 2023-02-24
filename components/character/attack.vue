<script lang="ts">
export default {
  data() {
    return { index: 0 };
  },
  props: {
    playerNumber: { required: true, type: Number },
  },
  mounted() {
    const hurtbox = document.querySelector(`#attackP${this.playerNumber}`);

    if (!hurtbox) return;

    const rect = hurtbox.getBoundingClientRect();
    this.$emit(`getRect`, rect, this.playerNumber);
  },
};
</script>

<template>
  <div
    class="attack z-20"
    :id="`attackP${playerNumber}`"
  >
    Attack {{ playerNumber }}
  </div>
</template>

<style lang="scss">
.attack {
  width: 443px;
  height: 70px;
  background-color: rgba(0, 255, 0, 0.5);
  position: absolute;
  bottom: 0;
}
</style>
