<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '@/stores/user'
  import { useAppStore } from '@/stores/app'

  const userStore = useUserStore()
  const appStore = useAppStore()

  const { userIsLoggedIn } = storeToRefs(userStore)

  const { drawer } = storeToRefs(appStore)

  const goToPage = (page: string): void => {
    appStore.navigateToPage(page)
  }
</script>

<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list v-if="userIsLoggedIn" dense>
      <v-list-item @click="userStore.logout()">
        <template #prepend>
          <v-icon icon="mdi-account-arrow-right" />
        </template>
        <v-list-item-title>Log out</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-list v-else dense>
      <v-list-item @click="goToPage('/login')">
        <template #prepend>
          <v-icon icon="mdi-account" />
        </template>
        <v-list-item-title>Login</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
