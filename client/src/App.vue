<script setup>
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import { ref, watch, onMounted } from "vue";

const showSplashScreen = ref(true);

onMounted(() => {
  setTimeout(() => {
    showSplashScreen.value = false;
  }, 800);
});
</script>

<template>
  <router-view />
  <div class="splash-screen" :class="{ hide: !showSplashScreen }">
    <img class="logo" src="/logos/gallery.svg" alt="logo" />
  </div>
</template>

<style scoped lang="scss">
.splash-screen {
  top: 0px;
  left: 0px;
  opacity: 1;
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  align-items: center;
  visibility: visible;
  transition: all 300ms ease;
  justify-content: center;
  background-image: url("/images/dark-background.png");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  background-attachment: fixed;

  .logo {
    width: 160px;
    position: absolute;
    transition: all 300ms;
  }
}

.splash-screen.hide {
  opacity: 0;
  visibility: hidden;
}

@media Only screen And (max-width: 450px) {
  .splash-screen {
    .logo {
      width: 140px;
    }
  }
}
</style>
