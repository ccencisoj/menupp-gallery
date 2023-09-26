<script setup>
import { useRouter } from "vue-router";
import { useWindowSize } from "@vueuse/core";
import Button from "src/components/ui/Button.vue";

const router = useRouter();
const { width } = useWindowSize();
</script>

<template>
  <q-page class="page">
    <header class="header">
      <p class="title">Tu espacio personal para tus imagenes</p>
      <p class="description">Sube y almacena tus imágenes de forma gratuita</p>
      <Button v-if="width > 600" @click="router.push('/auth/signIn')"
        >Probar ahora</Button
      >
    </header>
    <main class="main">
      <img
        v-if="width > 600"
        class="gallery-screen"
        src="/images/gallery-screen-desktop.png"
        alt="gallery screen"
      />
      <img
        v-if="width <= 600"
        class="gallery-screen"
        src="/images/gallery-screen-mobile.png"
        alt="gallery screen"
      />
    </main>
  </q-page>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  align-items: center;
  padding-bottom: 10vh;
  flex-direction: column;
  box-sizing: border-box;

  .header {
    width: 100%;
    z-index: 100;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;

    .title {
      color: #fff;
      font-size: 3.6em;
      font-weight: 600;
      text-align: center;
    }

    .description {
      color: #ccc;
      font-size: 1.8em;
      font-weight: 300;
      text-align: center;
      margin-bottom: 12px;
    }
  }

  .main {
    top: -48px;
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;

    .gallery-screen {
      width: 90%;
      max-width: 1500px;
      border-radius: 24px;
      // box-shadow: 0px -32px 64px rgba(255, 255, 255, 0.05),
      //   0px 32px 64px rgba(255, 255, 255, 0.05);
    }
  }
}

@media Only screen And (max-width: 1100px) {
  .page {
    .header {
      font-size: 80%;
      margin-top: 2vh;
    }

    .main {
      top: -32px;
    }
  }
}

@media Only screen And (max-width: 900px) {
  .page {
    .header {
      font-size: 70%;
    }
    .main {
      .gallery-screen {
        width: calc(90%);
      }
    }
  }
}

@media Only screen And (max-width: 800px) {
  .page {
    .header {
      font-size: 60%;
    }
    .main {
      top: -12px;
      .gallery-screen {
        width: 100%;
      }
    }
  }
}

@media Only screen And (max-width: 600px) {
  .page {
    padding-bottom: 0vh;

    .header {
      padding: 0px 24px;
      align-items: start;
      box-sizing: border-box;

      .title {
        width: 90%;
        font-size: 32px;
        text-align: left;
        line-height: 120%;
        margin-bottom: 12px;
      }

      .description {
        width: 90%;
        font-size: 16px;
        text-align: left;
      }
    }
    .main {
      top: -80px;
      .gallery-screen {
        width: 100%;
      }
    }
  }
}

@media Only screen And (max-width: 500px) {
  .page {
    .header {
      margin-top: 4vh;
      padding: 0px 8px;
    }

    .main {
      top: -64px;
    }
  }
}
</style>
