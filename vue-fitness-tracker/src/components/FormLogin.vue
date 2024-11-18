<script setup lang="ts">
  import { ref } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { useAppStore } from '@/stores/app'

  const userStore = useUserStore()
  const appStore = useAppStore()

  const email = ref<string>('')
  const login = () => {
    if (email.value === '') {
      appStore.showDialog({
        title: 'Email is required',
        contents: 'We use the email address to send you a one time password login link. Please enter your email address.',
      })
    } else {
      userStore.login(email.value)
      appStore.showDialog({
        title: 'One Time Password login',
        contents: `We've sent a one time password login the the following email address: <strong>${email.value}</strong>. Using the link in the email, you can proceed to the app and you can close this browser window. If this is not the correct email address, please try again.`,
        fullscreen: true,
      })
    }
  }

</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            autofocus
            label="Email"
            type="email"
          />
          <v-btn color="primary" type="submit">Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
