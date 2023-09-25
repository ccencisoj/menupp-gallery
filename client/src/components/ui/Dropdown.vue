<script setup>
import { ref, onMounted } from "vue";

const dropdown = ref(null);
const showContent = ref(false);

onMounted(() => {
  dropdown.value.addEventListener("click", (ev) => {
    ev.stopPropagation();
  });

  document.addEventListener("click", (ev) => {
    if (!dropdown.value.contains(ev.target)) {
      showContent.value = false;
    }
  });
});
</script>

<template>
  <div class="dropdown" ref="dropdown">
    <div class="view" @click="showContent = showContent ? false : true">
      <slot name="view"></slot>
    </div>
    <div class="content" :class="{ show: showContent, hide: !showContent }">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  z-index: 1000;
  position: relative;
  .content {
    right: 0px;
    position: absolute;
    transition: all 200ms;
    top: calc(100% + 12px);
  }

  .content.hide {
    opacity: 0;
    visibility: hidden;
    transform: scale(0.6) translate(100px, -50px);
  }

  .content.show {
    opacity: 1;
    visibility: visible;
    transform: scale(1) translate(0px, 0px);
  }
}
</style>
