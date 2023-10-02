<script setup>
const props = defineProps({
  type: String,
  color: String,
  secondary: Boolean,
  disabled: Boolean,
  showLoading: Boolean,
  fullWidth: Boolean,
});

const emits = defineEmits(["click"]);
</script>

<template>
  <button
    class="button"
    :style="{ '--color': props.color }"
    :disabled="props.disabled"
    :class="{
      secondary: props.secondary,
      disabled: props.disabled,
      fullWidth: props.fullWidth,
    }"
    :type="props.type || 'button'"
    @click="emits('click', $event)"
    v-bind="$attrs"
  >
    <q-spinner
      class="spinner"
      v-if="props.showLoading"
      color="white"
      size="24px"
    />
    <p class="label">
      <slot></slot>
    </p>
  </button>
</template>

<style scoped lang="scss">
.button {
  --color: #{$primary};
  width: max-content;
  height: 56px;
  display: flex;
  padding: 0px 48px;
  box-sizing: border-box;
  border-radius: 32px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background-color: var(--color);

  .spinner {
    margin-right: 4px;
  }

  .label {
    color: #fff;
    font-size: 14px;
    font-weight: 600;
  }
}

.button:active {
  filter: brightness(80%);
}

.secondary {
  --color: #4f354c;
}

.disabled {
  opacity: 0.4;
}
.fullWidth {
  width: 100%;
}

@media Only screen And (max-width: 500px) {
  .button {
    padding: 0px 32px;
  }
}
</style>
