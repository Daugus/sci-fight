<script lang="ts">
export default {
  data() {
    return {};
  },
  props: {
    colorfondo: String,
    rotar: Boolean,
  },
  computed: {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<template>
  <div :class="['flex', 'border', 'p-2', rotar && 'rotate-x-180']">
    <div class="bg-slate-600">
      <MenuPersonaje />
    </div>
    <div class="col rotate-x-180 m-2 border p-2">
      <div class="row m-2 w-64 border p-2">
        <div class="mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            :class="['h-2.5', 'rounded-full', 'dark:bg-gray-300', colorfondo]"
            style="width: 50%"
          ></div>
        </div>
      </div>
      <div class="row m-2 border p-2">
        <div class="mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            :class="['h-2.5', 'rounded-full', 'dark:bg-gray-300', colorfondo]"
            style="width: 80%"
          ></div>
        </div>
      </div>
      <div class="row m-2 border p-2">
        <div class="mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            :class="['h-2.5', 'rounded-full', 'dark:bg-gray-300', colorfondo]"
            style="width: 65%"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
