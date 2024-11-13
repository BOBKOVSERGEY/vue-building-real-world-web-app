<script setup lang="ts">
import { ref} from 'vue'
import type { Ref } from 'vue'
import CalendarCard from '@/components/CalendarCard.vue'
import {RecipeResults} from '@/types/spoonacular'
import RecipeSearch from '@/components/RecipeSearch.vue'
import { usePlannerStore } from '@/stores/planner'
import { useCacheStore } from '@/stores/cache'
import {useRecipeInformation} from '@/composables/recipeApi'

const store = usePlannerStore()
const cacheStore = useCacheStore()

interface Props {
  date: Date
  days?: number,
  recipes: []
}
const props = withDefaults(defineProps<Props>(), {
  days: 7,
  recipes: () => []
})

interface Today {
  id: number;
  title: string;
  readyInMinutes: number;
}

interface Card {
  date: Date;
  content: string;
  today: Today[];
}

const generateCards = (startDate: Date, numberOfDays: number): Card[] => {
  const cards: Card[] = []
  const currentDate = new Date(startDate)

  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(currentDate.getTime())
    const content = `Card ${i + 1}`
    const recipesThisDay = props.recipes?.filter((recipe: any) => {
      const recipeDate = new Date(recipe.date).setHours(0, 0, 0, 0)
      return recipeDate === date.setHours(0, 0, 0, 0)
    }) as Today[]

    cards.push({ date, content, today: recipesThisDay })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return cards
}

const cards = ref<Card[]>(generateCards(props.date, props.days))

const dialogVisible: Ref<boolean> = ref(false)
const dateSelected: Ref<Date | null> = ref(null)

const recipeDialogOpen = (card: Card): void => {
  dateSelected.value = card.date
  dialogVisible.value = true
}

const recipeDialogClose = (): void => {
  dateSelected.value = null
  dialogVisible.value = false
}

const preloadRecipe = async (id: number): Promise<void> => {
  const cacheKey = `recipe-details-${id}`

  if(!cacheStore.cachedData(cacheKey)) {
    const data = (await useRecipeInformation(id.toString())) as Recipe
    cacheStore.cacheData(cacheKey, data)
  }
}

const insertRecipeOnDay = (recipe: RecipeResults): void => {
  if (dateSelected.value) {
    preloadRecipe(recipe.id)

    store.addRecipe({ ...recipe, date: dateSelected.value })

    recipeDialogClose()
  }
}

/* const removeRecipeFromDay = (recipe: { id: number }, date: Date): void => {
  cards.value = cards.value.map((card) => {
    if (card.date.getTime() === date.getTime()) {
      return {
        ...card,
        today: card.today.filter((today) => today.id !== recipe.id),
      }
    }
    return card
  })
} */
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Upcoming days
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="card in cards"
        :key="card.date.toString()"
      >
        <td class="py-4">
          <CalendarCard
            :card="card"
            @day-selected="recipeDialogOpen"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-dialog
    v-model="dialogVisible"
    scrollable
  >
    <v-card>
      <v-card-title> Search for a recipe to add to this day </v-card-title>
      <RecipeSearch @recipe-selected="insertRecipeOnDay" />
      <v-card-actions>
        <v-btn
          color="primary"
          block
          @click="recipeDialogClose"
        >
          Close Dialog
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
