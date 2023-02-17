<script lang="ts">
export default {
  data() {
    return {
      testData: '',
    };
  },
  mounted() {
    this.testMethod('hola');
  },
  computed: {
    testComputed() {
      return `computed ${this.testData} computed`;
    },
  },
  methods: {
    testMethod(str: string) {
      this.testData = str;
    },
  },
};
</script>

<template>
  <div>
    <h1 class="text-blue-800">
      página de index
      <span>test sass</span>
    </h1>

    <br />

    <input
      type="text"
      v-model="testData"
      class="rounded-xl border-2 p-2"
    />

    <pre>data: {{ testData }}</pre>
    <pre>computed: {{ testComputed }}</pre>
  </div>
</template>

<style lang="scss">
h1 {
  span {
    color: red;
  }
}
</style>
