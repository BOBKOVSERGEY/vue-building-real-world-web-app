<script setup lang="ts">

import GetLocation from "@/components/GetLocation.vue";
import InputCheckbox from "@/components/InputCheckbox.vue";
import {ref} from "vue";
const newsletter = ref(false)
</script>

<template>
  <GetLocation />

  <div class="mt-8">
    <label class="flex items-center">
      <InputCheckbox v-model="newsletter" />
      <!-- <input
        type="checkbox"
        v-model="newsletter"
        class="rounded border-gray-400 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
      /> -->
      <span class="text-sm text-gray-700 ml-2">
            Email me news and offers
          </span>
    </label>
    <div class="mt-2">Newsletter: {{ newsletter }}</div>
  </div>
</template>

