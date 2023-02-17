<template>
  <header class="absolute w-full py-5 text-2xl">
    <ul class="flex justify-center gap-2">
      <li><NuxtLink to="/">Index</NuxtLink></li>
      <li><NuxtLink to="/ejemplo">Ejemplo</NuxtLink></li>
    </ul>
  </header>

  <div class="flex h-screen items-center justify-center text-2xl">
    <NuxtPage />
  </div>
</template>

<style lang="scss">
.router-link-active {
  @apply font-bold;
}
</style>

