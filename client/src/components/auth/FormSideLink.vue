<script setup>
import ChevronRight from "components/icons/ChevronRight.vue";

const props = defineProps({
  label: String,
  to: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="form-side-link">
    <router-link class="link" :to="props.to"
      >{{ props.label }}
      <ChevronRight class="icon" />
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.form-side-link {
  width: 100%;
  display: flex;
  margin-top: 12px;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;

  .link {
    color: #999;
    display: flex;
    font-size: 14px;
    align-items: center;
    flex-direction: row;
    text-decoration: none;

    .icon {
      width: 24px;
      height: 24px;
      stroke: #999;
    }
  }
}
</style>
