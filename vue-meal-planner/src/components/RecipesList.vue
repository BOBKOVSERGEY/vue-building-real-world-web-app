<script setup lang="ts">
import {computed, onMounted, ref, Ref} from 'vue'
import type { Recipe } from '@/types/spoonacular'
import RecipeTable from '@/components/RecipeTable.vue'
import { usePlannerStore } from '@/stores/planner'
import {storeToRefs} from 'pinia'
import AppLink from '@/components/AppLink.vue'
import CookingInstructions from '@/components/CookingInstructions.vue'

const { pastRecipes, futureRecipes } = storeToRefs(usePlannerStore())

interface RecipeList extends Recipe {
  date: Date;
}

const dialogVisible = ref<boolean>(false)
const selectedRecipe = ref<Recipe | null >(null)

// return a date in the future:
const addDays = (days: number): Date => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}


const openPreview = (recipe: Recipe): void => {
  selectedRecipe.value = recipe
  dialogVisible.value = true
}


const tab = ref<string>('upcoming')




onMounted(() => {
  if (futureRecipes.value.length === 0) {
    tab.value = 'past'
  }
})


</script>

<template>
  <div class="mt-15">
    <div v-if="pastRecipes.length === 0 && futureRecipes.length === 0">
      No recipes yet. Add some to your planner!
    </div>
    <div v-else>
      <v-dialog
        v-model="dialogVisible"
        class="dialog"
        scrollable
      >
        <v-card v-if="selectedRecipe">
          <cooking-instructions :id="selectedRecipe.id" />
          <v-card-actions>
            <v-btn>
              <app-link :to="`/recipes/${selectedRecipe.id}`">
                Cooking instructions
              </app-link>
            </v-btn>
            <v-spacer />
            <v-btn
              @click="dialogVisible = false"
              icon="mdi-close"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-tabs
        v-model="tab"
        color="deep-purple-accent-4"
        align-tabs="center"
      >
        <v-tab
          value="past"
          :disabled="pastRecipes.length === 0"
        >
          Past
        </v-tab>
        <v-tab
          value="upcoming"
          :disabled="futureRecipes.length === 0"
        >
          Upcoming
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item
          key="past"
          value="past"
        >
          <RecipeTable
            :recipes="pastRecipes"
            title="Past recipes"
            removable
            @open-preview="openPreview"
          />
        </v-window-item>
        <v-window-item
          key="upcoming"
          value="upcoming"
        >
          <RecipeTable
            :recipes="futureRecipes"
            title="Upcoming recipes"
            @open-preview="openPreview"
          />
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>
