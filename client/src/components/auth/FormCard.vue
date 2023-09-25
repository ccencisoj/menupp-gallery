<template>
  <div class="form-card">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.form-card {
  width: 100%;
  display: flex;
  padding: 16px 16px;
  border-radius: 24px;
  flex-direction: column;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
