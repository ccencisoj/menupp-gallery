<script setup>
import { ref } from "vue";

const slide = ref("2");
const carousel = ref(null);
</script>

<template>
  <q-carousel v-model="slide" class="carousel" animated height="auto">
    <q-carousel-slide class="carousel-item" name="1"> 1 </q-carousel-slide>
    <q-carousel-slide class="carousel-item" name="2"> 2 </q-carousel-slide>
    <q-carousel-slide class="carousel-item" name="3"> 3 </q-carousel-slide>
    <q-carousel-slide class="carousel-item" name="4"> 4 </q-carousel-slide>
  </q-carousel>
  <button @click="slide = '2'">Siguiente</button>
  <button @click="slide = '1'">Anterior</button>
</template>

<style scoped lang="scss">
.carousel {
  width: 100%;
  max-height: 2000px;
  background-color: #f00;

  .carousel-item {
    height: 200px;
  }

  .carousel-item:nth-child(1) {
    height: 100px;
  }
}
</style>

<style>
body {
  background-color: #fff;
  background-image: none;
}
</style>
