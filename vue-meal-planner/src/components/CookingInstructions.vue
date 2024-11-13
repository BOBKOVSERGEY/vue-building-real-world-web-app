<script setup lang="ts">
import type {Recipe} from '@/types/spoonacular'
import {onMounted, ref} from 'vue'
import {useRecipeInformation} from '@/composables/recipeApi'
import AppLoader from '@/components/AppLoader.vue'
import { useCacheStore } from '@/stores/cache'
import RecipeRating from '@/components/rating/RecipeRating.vue'

const store = useCacheStore()
interface Props {
  id: number
  activePanel?: number
}
const props = withDefaults(defineProps<Props>(), {
  activePanel: 0
})

const recipe = ref<Recipe | null>(null)

const getRecipeDetails = async (id: number): Promise<void> => {
  const cacheKey = `recipe-details-${id}`

  if (store.cachedData(cacheKey)) {
    recipe.value = store.cachedData(cacheKey) as Recipe
  } else {
    const data = (await useRecipeInformation(id.toString())) as Recipe
    store.cacheData(cacheKey, data)
    recipe.value = data
  }

}

const panel = ref<number | null>(props.activePanel)

onMounted(() => {
  getRecipeDetails(props.id)
})
</script>

<template>
  <div>
    <AppLoader v-if="!recipe" />
    <v-container
      fluid
      v-else
    >
      <v-col>
        <v-img
          :src="recipe.image"
          cover
          v-if="recipe.image"
        />
        <h1 class="text-h3 ma-4">
          {{ recipe.title }}
        </h1>
        <recipe-rating :id="recipe.id" />
        <v-chip
          class="ma-2 my-4"
          color="primary"
          :key="cuisine"
          v-for="cuisine in recipe.cuisines"
        >
          {{ cuisine }}
        </v-chip>
        <v-expansion-panels
          variant="accordion"
          v-model="panel"
        >
          <v-expansion-panel>
            <v-expansion-panel-title class="text-h5">
              Summary
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div
                v-html="recipe.summary"
                class="text-body-1"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title class="text-h5">
              Instructions
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div
                v-html="recipe.instructions"
                class="text-body-1 p-5"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-container>
  </div>
</template>
