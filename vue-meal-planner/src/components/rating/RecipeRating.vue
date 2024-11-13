<script setup lang="ts">
import { useRatingStore } from '@/stores/rating'
import {ref} from 'vue'

const ratingStore = useRatingStore()

const props = defineProps<{
  id: number
  readonly?: boolean
}>()

const rating = ref<number>(ratingStore.getRatingById(props.id))

const saveRating = () => {
  ratingStore.saveRating({ id: props.id, rating: rating.value })
}
</script>

<template>
  <div class="flex items-center">
    <v-rating
      v-model="rating"
      color="light-green"
      :readonly="readonly"
      half-increments
      item-aria-label="This item is rated {0} of {1}"
      hover
      @click="saveRating"
    />
  </div>
</template>
