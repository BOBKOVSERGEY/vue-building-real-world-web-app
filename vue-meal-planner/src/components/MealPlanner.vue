<script setup lang="ts">
import { storeToRefs} from 'pinia'
import CalendarDays from '@/components/CalendarDays.vue'
import { usePlannerStore } from '@/stores/planner'

const store = usePlannerStore()

const { recipes } = storeToRefs(store)



</script>

<template>
  <div>
    <CalendarDays
      :date="new Date()"
      :days="7"
      :recipes="recipes"
      :key="`recipes-${recipes.length}`"
    />
  </div>
</template>
