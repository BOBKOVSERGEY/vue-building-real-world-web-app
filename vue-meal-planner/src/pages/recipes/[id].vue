<script setup lang="ts">
import { useRoute } from 'vue-router'

import CookingInstructions from '@/components/CookingInstructions.vue'

const route = useRoute()


const recipeId = Number(route.params.id)
</script>

<template>
  <div>
    <CookingInstructions
      :id="recipeId"
      :active-panel="1"
    />
  </div>
</template>
