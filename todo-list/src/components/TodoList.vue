<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

import ListItem from "@/components/ListItem.vue";

type Item = {
  title: string,
  checked?: boolean
}

const listItems: Ref<Item[]> = ref([
  { title: 'Make a todo list app', checked: true },
  { title: 'Predict the weather', checked: false },
  { title: 'Play some tunes', checked: false },
  { title: 'Let\'s get cooking', checked: false },
  { title: 'Pump some iron', checked: false },
  { title: 'Track my expenses', checked: false },
  { title: 'Organize a game night', checked: false },
  { title: 'Learn a new language', checked: false },
  { title: 'Publish my work' }
]);

const updateItem = (item: Item): void => {
  const updatedItem = findItemInList(item)
  if(updatedItem) {
    toggleItemChecked(updatedItem)
  }
}

const findItemInList = (item: Item): Item | undefined => {
  return listItems.value.find(
      (itemInList: Item) => itemInList.title === item.title
  )

}
const toggleItemChecked = (item: Item): void => {
  item.checked = !item.checked
}
</script>

<template>
  <ul>
    <li
        :key="key"
        v-for="(item, key) in listItems" >
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