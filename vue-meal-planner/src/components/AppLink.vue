<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps({
  to: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <router-link
    :to="to"
    class="text-light-blue"
  >
    <slot />
  </router-link>
</template>
