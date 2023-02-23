<template>
  <div class="border p-8 text-center">
    <h1 class="p-4">SCI-FIGHT</h1>

    <!-- Selección de personajes -->
    <div class="flex justify-around border p-2">
      <MenuFicha
        colorfondo="bg-red-500"
        :rotar="false"
      ></MenuFicha>
      <MenuFicha
        colorfondo="bg-blue-700"
        :rotar="true"
      ></MenuFicha>
    </div>
    <div class="m-2 flex justify-center gap-96 border p-2">
      <div class="row m-2 border p-2">nombre</div>
      <div class="row m-2 border p-2">nombre</div>
    </div>
    <div class="flex justify-around border">
      <div class="m-2 border p-2">
        <img
          src="/src/img/wad.png"
          alt=""
        />
      </div>
      <div class="m-2 border p-2">
        <img
          src="/src/img/flechas.png"
          alt=""
        />
      </div>
    </div>
    <div class="mt-10 mb-10 border">
      <button class="w-96 rounded bg-green-300 p-2 shadow-xl">Jugar</button>
    </div>
  </div>
</template>
<style></style>
