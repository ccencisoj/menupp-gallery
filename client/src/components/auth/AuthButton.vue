<script setup>
import ChevronRight from "../icons/ChevronRight.vue";

const props = defineProps({
  label: String,
  logoSrc: String,
});
</script>

<template>
  <button class="auth-button" v-bind="$attrs">
    <img class="logo" :src="props.logoSrc" />
    <p class="label">{{ props.label }}</p>
    <ChevronRight class="arrow" />
  </button>
</template>

<style scoped lang="scss">
.auth-button {
  gap: 8px;
  width: 100%;
  height: 64px;
  display: flex;
  padding: 0px 16px;
  position: relative;
  align-items: center;
  flex-direction: row;
  border-radius: 12px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.1);

  .logo {
    width: 32px;
    height: 32px;
  }

  .label {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }

  .arrow {
    right: 12px;
    width: 24px;
    height: 24px;
    stroke: #999;
    position: absolute;
  }
}

.auth-button:active {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
