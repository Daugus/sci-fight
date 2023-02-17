<script lang="ts"></script>

<template>
  <section>
    <div class="appear"></div>
    <div class="idle"></div>
    <div class="move"></div>
    <div class="attack"></div>
    <div class="hit"></div>
    <div class="death"></div>
  </section>
</template>

<style lang="scss">
section {
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 2rem;
}

// GENERAL
div {
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

// APARICION --
.appear {
  animation: appear 1s steps(8) /*Numero de sprites que hay en la iamgen*/ infinite;
  width: 486px; // Ancho completo de la imagen entre el nuemro de sprites
  height: 500px; // Alto completo de la imagen
  background: url('/src/img/characters/astraeus/appear.png'); // Cambiar ultima parte de la URL dependiendo de la variable
}

@keyframes appear {
  0% {
    background-position: 0px;
  }
  100% {
    background-position: -4492px; // Ancho completo de la imagen
  }
}

// ESTATICO
.idle {
  animation: idle 0.75s steps(5) /*Numero de sprites que hay en la imagen*/ infinite;
  width: 551.4px; // Ancho del sprite mas ancho
  height: 201px; // Alto completo de la imagen
  background: url('/src/img/characters/astraeus/idle.png'); // Cambiar ultima parte de la URL dependiendo de la variable
}

@keyframes idle {
  0% {
    background-position: 0px;
  }
  100% {
    background-position: -2757px; // Ancho completo de la imagen
  }
}

// MOVIMIENTO
.move {
  animation: move 0.5s steps(5) /*Numero de sprites que hay en la imagen*/ infinite;
  width: 551.4px; // Ancho del sprite mas ancho
  height: 201px; // Alto completo de la imagen
  background: url('/src/img/characters/astraeus/move.png'); // Cambiar ultima parte de la URL dependiendo de la variable
}

@keyframes move {
  0% {
    background-position: 0px;
  }
  100% {
    background-position: -2757px; // Ancho completo de la imagen
  }
}

// ATAQUE
.attack {
  animation: attack 1s steps(8) /*Numero de sprites que hay en la imagen*/ infinite;
  width: 550px; // Ancho del sprite mas ancho
  height: 220px; // Alto completo de la imagen
  background: url('/src/img/characters/astraeus/attack.png'); // Cambiar ultima parte de la URL dependiendo de la variable
}

@keyframes attack {
  0% {
    background-position: 0px;
  }
  100% {
    background-position: -4411px; // Ancho completo de la imagen
  }
}

// GOLPEADO
.hit {
  animation: hit 0.3s steps(2) /*Numero de sprites que hay en la imagen*/ infinite;
  width: 551.5px; // Ancho del sprite mas ancho
  height: 182px; // Alto completo de la imagen
  background: url('/src/img/characters/astraeus/hit.png'); // Cambiar ultima parte de la URL dependiendo de la variable
}

@keyframes hit {
  0% {
    background-position: 0px;
  }
  100% {
    background-position: -1103px; // Ancho completo de la imagen
  }
}

// MUERTE
.death {
  animation: death 1s steps(6) /*Numero de sprites que hay en la imagen*/ infinite;
  width: 551.3px; // Ancho del sprite mas ancho
  height: 286px; // Alto completo de la imagen
  background: url('/src/img/characters/astraeus/death.png'); // Cambiar ultima parte de la URL dependiendo de la variable
}

@keyframes death {
  0% {
    background-position: 0px;
  }
  100% {
    background-position: -3308px; // Ancho completo de la imagen
  }
}
</style>
