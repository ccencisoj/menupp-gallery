<script setup>
import { ref } from "vue";
import Close from "src/components/icons/Close.vue";

const props = defineProps({
  image: Object,
});

const emits = defineEmits(["delete"]);

const uploadingProgress = ref(100);
</script>

<template>
  <div class="image-card">
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
    <button class="delete-button" @click="emits('delete')">
      <Close class="icon" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.image-card {
  width: 100%;
  display: flex;
  aspect-ratio: 1/1;
  position: relative;
  align-items: center;
  justify-content: center;

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
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
</style>
