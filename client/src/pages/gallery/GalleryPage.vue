<script setup>
import axios from "axios";
import { ref } from "vue";
import { nanoid } from "nanoid";
import { functions } from "boot/functions";
import { auth, storage } from "boot/firebase";
import { useAuth } from "@vueuse/firebase";
import Sparkles from "components/emojis/Sparkles.vue";
import WavingHand from "components/emojis/WavingHand.vue";
import ImageCard from "components/gallery/ImageCard.vue";
import ImageField from "src/components/ui/ImageField.vue";
import {
  ref as storageRef,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const images = ref([]);
const uploading = ref(false);
const { user } = useAuth(auth);

getStoredImages().then(
  (storedImages) => (images.value = storedImages.reverse())
);

async function getStoredImages() {
  const folder = storageRef(storage, `users/${user.value.uid}/images`);
  const items = (await listAll(folder)).items;

  let images = [];
  for (const item of items) {
    images.push(
      new Promise(async (resolve) => {
        resolve({
          id: item.name.split(".")[0],
          src: await getDownloadURL(item),
          ref: item,
        });
      })
    );
  }
  return await Promise.all(images);
}

async function onImageField(ev) {
  uploading.value = true;

  for (const image of ev.images) {
    await functions.uploadImage(image.blob).then(async (response) => {
      const bucketImage = storageRef(storage, response.data.image.path);

      images.value.unshift({
        id: bucketImage.name.split(".")[0],
        src: await getDownloadURL(bucketImage),
        ref: bucketImage,
      });
    });
  }
  uploading.value = false;
}

async function deleteImage(delImage) {
  images.value = images.value.filter((image) => image.id !== delImage.id);
  await deleteObject(storageRef(delImage.ref));
}
</script>

<template>
  <q-page class="page">
    <div class="container">
      <header class="header">
        <div class="title-container">
          <p class="title">
            {{
              user && user.displayName
                ? `Bienvenido, ${user.displayName.split(" ")[0]}`
                : "Bienvenido"
            }}
          </p>
          <Sparkles class="emoji" />
          <WavingHand class="emoji" />
        </div>
        <ImageField
          multiple
          height="20vh"
          :show-grid="false"
          label="Subir imagenes"
          @changeImages="onImageField"
          data-test-id="input:select-images"
        />
      </header>
      <main class="main">
        <div class="image-list" data-test-id="container:image-list">
          <ImageCard
            v-for="image in images"
            :key="image.id"
            :image="image"
            @delete="deleteImage(image)"
          />
        </div>
      </main>
    </div>
  </q-page>
  <div class="loading-modal" v-if="uploading">
    <q-spinner color="white" size="64px"> </q-spinner>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  align-items: center;
  padding-bottom: 10vh;
  box-sizing: border-box;
  flex-direction: column;

  .container {
    width: 1000px;
    display: flex;
    margin-top: 2vh;
    flex-direction: column;

    .header {
      width: 100%;
      display: flex;
      margin-bottom: 16px;
      flex-direction: column;

      .title-container {
        width: 100%;
        display: flex;
        position: relative;
        align-items: center;

        .title {
          display: block;
          color: #fff;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
          max-width: 80%;
          overflow: hidden;
          text-wrap: nowrap;
          text-overflow: ellipsis;
          text-transform: capitalize;
        }
        .emoji {
          top: -4px;
          width: 32px;
          margin-left: 8px;
          position: relative;
        }
      }
    }

    .main {
      widows: 100%;
      display: flex;
      flex-direction: column;

      .image-list {
        gap: 12px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
}

.loading-modal {
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 1000;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
}

@media Only screen And (max-width: 1048px) {
  .page {
    .container {
      width: calc(100% - 48px);
    }
  }
}

@media Only screen And (max-width: 800px) {
  .page {
    .container {
      .main {
        .image-list {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    }
  }
}

@media Only screen And (max-width: 600px) {
  .page {
    .container {
      .header {
        .title-container {
          .title {
            font-size: 24px;
          }
          .emoji {
            width: 24px;
          }
        }
      }
      .main {
        .image-list {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  }
}

@media Only screen And (max-width: 500px) {
  .page {
    .container {
      margin-top: 3vh;
      width: calc(100% - 16px);

      .header {
        .title-container {
          .title {
            font-size: 22px;
          }
          .emoji {
            width: 22px;
          }
        }
      }
    }
  }
}

@media Only screen And (max-width: 350px) {
  .page {
    .container {
      .main {
        .image-list {
          grid-template-columns: repeat(1, 1fr);
        }
      }
    }
  }
}
</style>
