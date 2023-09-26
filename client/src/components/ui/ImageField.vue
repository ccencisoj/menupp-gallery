<script setup>
import Plus from "components/icons/Plus.vue";
import Close from "components/icons/Close.vue";
import { ref, watch } from "vue";
import { nanoid } from "nanoid";
import axios from "axios";

const props = defineProps({
  label: String,
  clipPath: String,
  multiple: {
    type: Boolean,
    default: false,
  },
  showGrid: {
    type: Boolean,
    default: true,
  },
  gridColumns: {
    type: [String, Number],
    default: 3,
  },
  height: {
    type: String,
    default: "max-content",
  },
});

const emits = defineEmits(["changeImages"]);

const images = ref([]);
const fileInput = ref(null);

watch(images, () => {
  emits("changeImages", { images: images.value });
});

function changedFileInput(ev) {
  const files = ev.target.files;
  const loadedImages = [];

  for (let i = 0; i < files.length; i++) {
    loadedImages.push({
      id: nanoid(),
      blob: files[i],
      src: URL.createObjectURL(files[i]),
    });
  }

  images.value = loadedImages;
  ev.target.value = "";
}

function deleteImage(imageId) {
  images.value = images.value.filter((image) => image.id !== imageId);
}
</script>

<template>
  <div
    class="image-field"
    v-if="images.length === 0 || !props.showGrid"
    :style="{ height: props.height }"
    @click="fileInput.click()"
  >
    <Plus class="icon" />
    <p class="label">{{ props.label }}</p>
  </div>
  <div
    class="image-grid"
    v-if="images.length !== 0 && props.showGrid"
    :style="{ gridTemplateColumns: `repeat(${props.gridColumns}, 1fr)` }"
  >
    <div class="image-card" v-for="image in images" :key="image.id">
      <div class="image-container">
        <img
          class="mask-image"
          :src="image.src"
          alt="image"
          v-if="props.clipPath"
        />
        <img
          class="image"
          k
          :class="{ expand: !props.clipPath }"
          :style="{
            clipPath: props.clipPath || 'none',
          }"
          :src="image.src"
          alt="image"
        />
      </div>
      <button class="delete-button" @click="deleteImage(image.id)">
        <Close class="icon" />
      </button>
    </div>
  </div>
  <input
    style="display: none"
    type="file"
    ref="fileInput"
    accept="image/*"
    :multiple="props.multiple"
    @change="changedFileInput"
  />
</template>

<style scoped lang="scss">
.image-field {
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  cursor: pointer;
  align-items: center;
  border-radius: 12px;
  justify-content: center;
  flex-direction: column;
  border: 1px #fff solid;
  box-shadow: 0px 32px 64px rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.1);

  .icon {
    width: 48px;
    height: 48px;
    stroke: #fff;
  }

  .label {
    color: #fff;
    font-size: 14px;
    font-weight: 600;
  }
}

.image-field:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.image-field:active {
  background-color: rgba(255, 255, 255, 0.2);
}

.image-grid {
  gap: 12px;
  width: 100%;
  display: grid;
  aspect-ratio: 1/1;
  grid-template-columns: repeat(4, 1fr);

  .image-card {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    border-radius: 12px;
    justify-content: center;

    .image-container {
      width: 100%;
      min-height: 100%;
      display: flex;
      overflow: hidden;
      position: relative;
      align-items: center;
      border-radius: 12px;
      justify-content: center;

      .mask-image {
        width: 100%;
        height: 100%;
        filter: brightness(20%);
      }
      .image {
        width: 80%;
        height: 80%;
        position: absolute;
      }
      height: 20vh;

      .expand {
        width: 100%;
        height: 100%;
      }
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
}
</style>
