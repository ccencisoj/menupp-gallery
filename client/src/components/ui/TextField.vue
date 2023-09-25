<script setup>
const props = defineProps({
  error: String,
  type: String,
});
</script>

<template>
  <div class="text-field">
    <input
      class="input"
      :type="props.type || 'text'"
      autocomplete="off"
      v-bind="$attrs"
    />
  </div>
</template>

<style scoped lang="scss">
.text-field {
  gap: 4px;
  width: 100%;
  display: flex;
  flex-direction: column;

  .input {
    color: #fff;
    width: 100%;
    height: 64px;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    padding: 0px 12px;
    border-radius: 20px;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    border: 1px #555 solid;
    background-color: rgba(255, 255, 255, 0.05);
  }

  .input:focus {
    border: 1px #fff solid;
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
