<template>
  <div class="form-container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.form-container {
  width: 450px;
  display: flex;
  flex-direction: column;
}

@media Only screen And (max-width: 1000px) {
  .form-container {
    margin-top: 5vh;
  }
}

@media Only screen And (max-width: 500px) {
  .form-container {
    width: calc(100% - 16px);
  }
}
</style>
