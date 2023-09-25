<script setup>
import Button from "src/components/ui/Button.vue";
import { useRouter } from "vue-router";
import { useWindowSize } from "@vueuse/core";

const router = useRouter();
const { width } = useWindowSize();
</script>

<template>
  <q-layout>
    <q-page-container>
      <header class="header">
        <img
          class="logo"
          src="/logos/gallery.svg"
          alt="logo"
          @click="router.push('/2')"
        />
        <Button v-if="width <= 600" @click="router.push('/auth/signIn')"
          >Probar ahora</Button
        >
      </header>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 24px 24px;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: space-between;

  .logo {
    width: 140px;
    cursor: pointer;
  }
}

@media Only screen And (max-width: 500px) {
  .header {
    padding: 12px 8px;
  }
}

@media Only screen And (max-width: 450px) {
  .header {
    .auth-options {
      .auth-option {
        font-size: 85%;
      }
    }
  }
}
</style>
