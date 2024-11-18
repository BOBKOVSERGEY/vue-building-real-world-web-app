<script lang="ts" setup>
  import { useUserStore } from '@/stores/user'
  import { useAppStore } from '@/stores/app'
  import { useSupabaseClient } from '@/composables/supabase'
  import { onMounted } from 'vue'
  import AppMenu from '@/components/AppMenu.vue'
  import { storeToRefs } from 'pinia'

  const userStore = useUserStore()
  const appStore = useAppStore()

  const { dialog } = storeToRefs(appStore)

  onMounted(async () => {
    const { data } = await useSupabaseClient.auth.getSession()

    if (data && data.session && data.session.user) {
      await userStore.insertProfile(data.session)
      userStore.setUserSession(data.session)
    }

    useSupabaseClient.auth.onAuthStateChange((_, _session) => {
      userStore.setUserSession(_session)
    })
  })
</script>
<template>
  <v-app>
    <app-menu />
    <v-main>
      <router-view />
      <v-dialog v-model="dialog.visible" :fullscreen="dialog.fullscreen">
        <v-card>
          <v-card-title>{{ dialog.title }}</v-card-title>
          <v-card-text><p v-html="dialog.contents" /> </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="appStore.hideDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>
