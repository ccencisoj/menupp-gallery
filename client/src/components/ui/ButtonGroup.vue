<template>
  <div class="button-group">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.button-group {
  gap: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
