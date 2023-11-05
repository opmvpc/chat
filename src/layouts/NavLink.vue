<script setup>
import { RouterLink } from "vue-router";
defineProps({
  url: {
    type: String,
    required: false,
    default: "",
  },
  text: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <li class="nav-item">
    <RouterLink
      class="text-lg font-bold hover:text-purple-300/80 transition-colors"
      :class="{ 'text-purple-100/40 cursor-not-allowed': isDisabled }"
      aria-current="page"
      :to="url"
      :disabled="isDisabled"
      :aria-disabled="isDisabled"
      >{{ text }}</RouterLink
    >
  </li>
</template>

<style scoped lang="postcss">
.router-link-active,
.router-link-exact-active {
  @apply text-purple-400;
}
</style>
