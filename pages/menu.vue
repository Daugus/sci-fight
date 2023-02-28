<script lang="ts">
export default {
  data() {
    return {};
  },
  props: {},
  computed: {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<template>
  <div class="flex h-screen w-screen flex-col justify-center overflow-hidden align-middle">
    <div class="relative flex w-full justify-between">
      <MenuCharacterSelection :rotate="false" />
      <MenuCharacterSelection :rotate="true" />
    </div>
  </div>
</template>

<style lang="scss"></style>
