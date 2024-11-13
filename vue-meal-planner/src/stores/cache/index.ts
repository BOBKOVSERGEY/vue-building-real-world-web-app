import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCacheStore = defineStore('cache', () => {

  const cache = ref<any>([])
  const cachedData = (key: string): any => {
    try {
      return cache.value[key]
    } catch (error) {
      return undefined
    }
  }

  const cacheData = (key: string, data: any): void => {
    cache.value[key] = data
  }

  return {
    cachedData,
    cacheData
  }
})
