<script setup lang="ts">

import { useFormatDate } from '@/composables/formatters'
import {Recipe} from '@/types/spoonacular'
import AppLink from '@/components/AppLink.vue'

const emits = defineEmits(['daySelected', 'recipeRemoved'])

interface Today {
  id: number
  title: string
  readyInMinutes: number
}

interface Card {
  date: Date;
  today: Today[]
}



defineProps<{
  card: Card
}>()

const addRecipeToDay = (card: Card): void => {
  emits('daySelected', card)
}

const recipeRemoved = (recipe: Today, date: Date): void => {
  emits('recipeRemoved', recipe, date)
}


</script>

<template>
  <div>
    <v-sheet class="d-flex justify-space-between">
      <v-sheet class="ma-2 pa-2">
        <h2 class="text-h2">
          {{ useFormatDate(card.date) }}
        </h2>
      </v-sheet>
      <v-sheet class="ma-2 pa-2">
        <v-btn
          @click="addRecipeToDay(card)"
          icon="mdi-plus"
        />
      </v-sheet>
    </v-sheet>
    <v-col>
      <v-card
        v-for="today in card.today"
        :key="today.id"
        class="my-4"
      >
        <v-card-title>
          <app-link
            :to="`/recipes/${today.id}`"
          >
            {{ today.title }}
          </app-link>
        </v-card-title>
        <v-card-text>
          {{ today.readyInMinutes }} minutes
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text=""
            icon="mdi-trash-can-outline"
            @click="recipeRemoved(today, card.date)"
          />
        </v-card-actions>
      </v-card>
    </v-col>
  </div>
</template>
