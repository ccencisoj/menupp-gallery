<script setup>
import { onMounted, ref } from "vue";
import Close from "src/components/icons/Close.vue";
import MoreIcon from "components/icons/More.vue";
import Button from "src/components/ui/Button.vue";
import Dropdown from "src/components/ui/Dropdown.vue";
import ButtonGroup from "src/components/ui/ButtonGroup.vue";

const props = defineProps({
  image: Object,
});

const emits = defineEmits(["delete"]);

const uploadingProgress = ref(100);
const hrefDownload = ref(null);

function downloadImage() {
  hrefDownload.value.click();
}

const showModal = ref(false);
const modal = ref(null);
const modalContent = ref(null);

onMounted(() => {
  modalContent.value.addEventListener("click", (ev) => {
    ev.stopPropagation();
  });
  modal.value.addEventListener("click", (ev) => {
    if (!modalContent.value?.contains(ev.target)) {
      showModal.value = false;
    }
  });
});
</script>

<template>
  <div class="image-card" @click="showModal = true" data-test-id="card:image">
    <img
      class="image"
      :src="props.image?.src"
      alt="image"
      loading="lazy"
      :style="{ opacity: uploadingProgress === 100 ? 1 : 0.1 }"
    />
    <div class="circular-progress" v-if="uploadingProgress != 100">
      <q-circular-progress
        :value="uploadingProgress"
        size="48px"
        color="primary"
      />
    </div>
    <!-- <button
      class="delete-button"
      @click="emits('delete')"
      data-test-id="button:delete"
    >
      <Close class="icon" />
    </button> -->
  </div>
  <a
    :href="props.image?.src"
    :download="`${props.image?.id}.png`"
    style="display: none"
    ref="hrefDownload"
  ></a>
  <div
    class="image-modal"
    :class="{ show: showModal, hide: !showModal }"
    ref="modal"
  >
    <div class="modal-content" ref="modalContent">
      <img class="image" :src="props.image?.src" alt="image" loading="lazy" />
      <div class="dropdown">
        <Dropdown>
          <template #view>
            <button class="more-button" data-test-id="button:more">
              <MoreIcon class="icon" />
            </button>
          </template>
          <template #content>
            <div class="menu">
              <ButtonGroup>
                <Button
                  primary
                  fullWidth
                  @click="downloadImage()"
                  data-test-id="button:download"
                  >Descargar</Button
                >
                <Button
                  color="#f00"
                  fullWidth
                  @click="emits('delete')"
                  data-test-id="button:delete"
                  >Eliminar</Button
                >
              </ButtonGroup>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-card {
  width: 100%;
  display: flex;
  overflow: hidden;
  aspect-ratio: 1/1;
  position: relative;
  border-radius: 12px;
  align-items: center;
  justify-content: center;

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1);
    transition: all 200ms;
  }
  .circular-progress {
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
  }

  .delete-button {
    top: -4px;
    right: -4px;
    width: 24px;
    display: flex;
    aspect-ratio: 1/1;
    border-radius: 50%;
    position: absolute;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);

    .icon {
      width: 16px;
      height: 16px;
      stroke: $primary;
      stroke-width: 2;
    }
  }

  .delete-button:active {
    transform: scale(0.9);
  }
}

@media Only screen And (min-width: 640px) {
  .image-card:hover {
    cursor: pointer;
    filter: brightness(80%);

    .image {
      transform: scale(1.1);
    }
  }
}

.image-card:active {
  cursor: pointer;
  filter: brightness(60%);

  .image {
    transform: scale(1);
  }
}

.image-modal {
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 10000;
  cursor: zoom-out;
  position: fixed;
  user-select: none;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);

  .modal-content {
    cursor: default;
    .image {
      max-height: 75vh;
      max-width: 70vw;
      object-fit: contain;
    }

    .dropdown {
      top: 12px;
      right: 24px;

      position: absolute;
      .more-button {
        width: 48px;
        height: 48px;
        display: flex;
        cursor: pointer;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        border: 1px #360056 solid;
        background-color: #261d2d;

        .icon {
          stroke: #999;
          stroke-width: 2;
        }
      }

      .more-button:active {
        filter: brightness(140%);
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
  }
}
.image-modal.hide {
  opacity: 0;
  visibility: hidden;
  transition: all 200ms ease;

  .modal-content {
    .image {
      transform: scale(0.8);
      transition: all 200ms;
    }
  }
}
.image-modal.show {
  opacity: 1;
  visibility: visible;
  transition: all 200ms ease;

  .modal-content {
    .image {
      transform: scale(1);
      transition: all 200ms;
    }
  }
}

@media Only screen And (max-width: 1000px) {
  .image-modal {
    .modal-content {
      .image {
        max-height: 80vh;
        max-width: 90vw;
      }
    }
  }
}

@media Only screen And (max-width: 500px) {
  .image-modal {
    .modal-content {
      .image {
        max-height: 70vh;
        max-width: 100vw;
      }
    }
  }
}
</style>
