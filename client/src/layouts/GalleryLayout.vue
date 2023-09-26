<script setup>
import { auth } from "boot/firebase";
import { deleteUser, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { useAuth } from "@vueuse/firebase";
import Dropdown from "components/ui/Dropdown.vue";
import Button from "components/ui/Button.vue";
import ButtonGroup from "src/components/ui/ButtonGroup.vue";

const router = useRouter();
const { user } = useAuth(auth);
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
        <Dropdown>
          <template #view>
            <div class="user-card">
              <div class="image-container">
                <img class="image" :src="user?.photoURL" alt="profile photo" />
              </div>
            </div>
          </template>
          <template #content>
            <div class="menu">
              <ButtonGroup>
                <Button secondary="" fullWidth @click="signOut(auth)"
                  >Cerrar sesión</Button
                >
                <Button color="#f00" fullWidth @click="deleteUser(user)"
                  >Eliminar cuenta</Button
                >
              </ButtonGroup>
            </div>
          </template>
        </Dropdown>
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

  .user-card {
    cursor: pointer;
    .image-container {
      width: 48px;
      height: 48px;
      display: flex;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      border: 1px #360056 solid;
      background-color: rgba(255, 255, 255, 0.1);

      .image {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }

    .image-container:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }

    .image-container:active {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .menu {
    width: 300px;
    z-index: 1000;
    padding: 12px 12px;
    position: relative;
    border-radius: 12px;
    box-sizing: border-box;
    background-color: #261d2d;
    box-shadow: 0px 32px 64px rgba(0, 0, 0, 0.3);
  }
}

@media Only screen And (max-width: 500px) {
  .header {
    padding: 12px 8px;
  }
}
</style>
