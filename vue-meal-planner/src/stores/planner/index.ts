import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import {computed, ref} from 'vue'

interface Recipe {
  id: number
  date: Date
}

export const usePlannerStore = defineStore('planner', () => {

  const recipes = ref<Recipe[] | any>(useLocalStorage('planner', []))

  const pastRecipes = computed(() => {
    const sorted = recipesSortedByDate()
    return sorted.filter((recipe: RecipeList) => {
      const date = new Date(recipe.date)
      return date < new Date()
    }) as RecipeList[]
  })

  const futureRecipes = computed(() => {
    const sorted = recipesSortedByDate()
    return sorted.filter((recipe: RecipeList) => {
      const date = new Date(recipe.date)
      return date >= new Date()
    }) as RecipeList[]
  })


  const addRecipe = (recipe: Recipe): void => {
    recipes.value.push(recipe)
  }

  const removeRecipeByIdDate = (options: { id: number, date: Date }): void => {
    const { id, date } = options

    const recipeIndex: number = recipes.value.findIndex((recipe: Recipe) =>
      recipe.id === id
      && new Date(recipe.date).setHours(0, 0, 0, 0)
      === new Date(date).setHours(0, 0, 0, 0))

    recipes.value.splice(recipeIndex, 1)
  }

  const recipesSortedByDate = () => {
    return recipes.value?.sort((a: { date : Date }, b: { date: Date }) => {
      return new Date(a.date).getTime() < new Date(b.date).getTime() ? -1 : 1
    })

  }


  return {
    recipes,
    addRecipe,
    removeRecipeByIdDate,
    pastRecipes,
    futureRecipes
  }
})
