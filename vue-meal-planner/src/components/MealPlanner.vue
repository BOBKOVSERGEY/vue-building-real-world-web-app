<script setup lang="ts">

import CalendarDays from '@/components/CalendarDays.vue'

</script>

<template>
  <div>
    <CalendarDays
      :date="new Date()"
      :days="7"
    />
  </div>
</template>
