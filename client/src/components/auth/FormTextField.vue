<script setup>
import FormLabel from "src/components/auth/FormLabel.vue";
import FormError from "src/components/auth/FormError.vue";
import TextField from "src/components/ui/TextField.vue";

const props = defineProps({
  label: String,
  error: String,
});
</script>

<template>
  <div class="form-text-field">
    <FormLabel>{{ props.label }}</FormLabel>
    <TextField v-bind="$attrs" />
    <FormError>{{ props.error }}</FormError>
  </div>
</template>

<style scoped lang="scss">
.form-text-field {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
