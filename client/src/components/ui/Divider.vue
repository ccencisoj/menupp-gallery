<script setup>
const props = defineProps({
  centeredText: String,
});
</script>

<template>
  <div class="divider">
    <div class="line"></div>
    <div class="text" v-if="!!props.centeredText">{{ props.centeredText }}</div>
    <div class="line"></div>
  </div>
</template>

<style scoped lang="scss">
.divider {
  width: 100%;
  display: flex;
  margin: 24px 0px;
  align-items: center;
  flex-direction: row;

  .line {
    flex: 1;
    height: 0.1px;
    background-color: #555;
  }

  .text {
    color: #fff;
    font-size: 16px;
    padding: 0px 12px;
    box-sizing: border-box;
  }
}
</style>
