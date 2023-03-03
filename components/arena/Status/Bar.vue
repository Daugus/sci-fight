<script lang="ts">
export default {
  data() {
    return {};
  },
  props: {
    playerNumber: { required: true, type: Number },
    character: { required: true, type: Character },
  },
  computed: {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<template>
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
    <div class="h-full transition-all"></div>
    <!-- :style="`width: ${currentHealthPercentage}%; background-color: ${character.color}`" -->
  </div>
</template>

<style lang="scss"></style>
