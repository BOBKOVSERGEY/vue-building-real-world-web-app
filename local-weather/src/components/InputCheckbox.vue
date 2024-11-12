<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const proxyValue = defineModel()
</script>
<template>
  <input
      type="checkbox"
      v-model="proxyValue"
      class="rounded border-gray-400 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
  />
</template>
