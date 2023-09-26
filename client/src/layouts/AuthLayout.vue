<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <q-layout>
    <q-page-container>
      <header class="header">
        <img
          class="logo"
          src="/logos/gallery.svg"
          alt="logo"
          @click="router.push('/')"
        />
        <div class="auth-options">
          <div
            class="auth-option"
            v-if="router.currentRoute.value.path === '/auth/signIn'"
          >
            <p class="label">¿No tienes una cuenta?</p>
            <router-link to="/auth/signUp">Crear cuenta</router-link>
          </div>
          <div
            class="auth-option"
            v-if="router.currentRoute.value.path === '/auth/signUp'"
          >
            <p class="label">¿Ya tienes una cuenta?</p>
            <router-link to="/auth/signIn">Iniciar sesion</router-link>
          </div>
        </div>
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

  .auth-options {
    .auth-option {
      display: flex;
      align-items: flex-end;
      flex-direction: column;

      .label {
        color: #999;
        font-size: 1.1em;
        font-weight: 500;
      }
    }
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
        font-size: 90%;
      }
    }
  }
}
</style>
