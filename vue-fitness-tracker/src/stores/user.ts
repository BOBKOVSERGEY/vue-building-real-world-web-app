import { defineStore } from 'pinia'
import { UserSession } from '@/types/user'
import { useSupabaseClient } from '@/composables/supabase'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()

  const session = ref<UserSession | null>(null)

  const login = async (email: string, callback?: Function): Promise<void> => {
    const { error } = await useSupabaseClient.auth.signInWithOtp({ email })

    if (error) {
      console.error('Login error:', error.message)
      throw new Error('Login failed')
    }

    if (typeof callback === 'function') callback()
  }

  const logout = async (callback?: Function): Promise<void> => {
    const { error } = await useSupabaseClient.auth.signOut()

    if (error) {
      console.error('Logout error:', error?.message)
      throw new Error('Logout failed')
    }
    await router.push('/login')
    if (typeof callback === 'function') callback()
  }

  const insertProfile = async (session: UserSession | any): Promise<void> => {
    try {
      const { error } = await useSupabaseClient
        .from('profiles')
        .upsert({ id: session.user.id, email_address: session.user.email, updated_at: new Date() })
        .select()

      if (error) throw error
    } catch (error: any) {
      console.error(error.message)
      return error
    }
  }

  const setUserSession = (data: any): void => {
    session.value = data
  }

  const userIsLoggedIn = computed(() => {
    if (session.value?.expires_at) {
      const expiresAt = new Date(0).setUTCSeconds(session.value.expires_at)
      const now = new Date().getSeconds()
      return now < expiresAt
    }
    return false
  })

  return {
    session,
    login,
    logout,
    insertProfile,
    setUserSession,
    userIsLoggedIn,
  }
})
