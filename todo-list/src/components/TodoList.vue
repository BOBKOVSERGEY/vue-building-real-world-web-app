<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import type {Ref} from 'vue'

import ListItem from "@/components/ListItem.vue";

type Item = {
  title: string,
  checked?: boolean
}

const storageItems: Ref<Item[]> = ref([]);

const initListItems = (): void => {
  if (storageItems.value?.length === 0) {
    const listItems = [
      { title: 'Make a todo list app', checked: true },
      { title: 'Predict the weather', checked: false },
      { title: 'Read some comics', checked: false },
      { title: 'Let\'s get cooking', checked: false },
      { title: 'Pump some iron', checked: false },
      { title: 'Track my expenses', checked: false },
      { title: 'Organise a game night', checked: false },
      { title: 'Learn a new language', checked: false },
      { title: 'Publish my work' }
    ]
    setToStorage(listItems)
    storageItems.value = listItems
  }
}

const sortedList = computed((): Item[] =>
    [...storageItems.value].sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0))
)

const setToStorage = (items: Item[]): void => {
  localStorage.setItem('list-items', JSON.stringify(items))
}

const getFromStorage = (): Item[] | [] => {
  const stored = localStorage.getItem('list-items')
  if (stored) {
    return JSON.parse(stored)
  }
  return []
}

const updateItem = (item: Item): void => {
  const updatedItem = findItemInList(item)
  if (updatedItem) {
    toggleItemChecked(updatedItem)
    console.log(storageItems.value)
    setToStorage(storageItems.value)
  }
}

const findItemInList = (item: Item): Item | undefined => {
  return storageItems.value.find(
      (itemInList: Item) => itemInList.title === item.title
  )

}
const toggleItemChecked = (item: Item): void => {
  item.checked = !item.checked
}

onMounted(() => {
  storageItems.value = getFromStorage()
  initListItems()
})

</script>

<template>
  <ul>
    <li
        :key="key"
        v-for="(item, key) in sortedList">
      <ListItem
          :is-checked="item.checked"
          @click.prevent="updateItem(item)"
      >
        {{ item.title }}
      </ListItem>
    </li>
  </ul>
</template>
<style scoped>
ul {
  list-style: none;
}

li {
  margin: 0.4rem 0;
}
</style>