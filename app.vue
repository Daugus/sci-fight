<template>
  <header class="absolute top-1 z-50 text-2xl">
    <ul class="mx-auto flex w-screen items-center justify-center gap-5">
      <li><NuxtLink to="/">Menú</NuxtLink></li>
      <li><NuxtLink to="/arena">Arena</NuxtLink></li>
    </ul>
  </header>

  <div class="flex h-screen items-center justify-center text-2xl">
    <NuxtPage />
  </div>
</template>
