<script lang="ts" setup>
import AppLink from '@/components/AppLink.vue'



</script>
<template>
  <v-layout>
    <v-container class="main">
      <v-app-bar flat>
        <v-btn
          id="hamburger-activator"
          icon="mdi-menu"
        />
        <v-menu activator="#hamburger-activator">
          <v-list>
            <v-list-item>
              <v-btn
                flat
                block
              >
                <AppLink to="/">
                  Home
                </AppLink>
              </v-btn>
              <v-btn
                flat
                block
              >
                <AppLink to="/recipes">
                  Recipe
                </AppLink>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-app-bar-title>
          <v-icon icon="mdi-silverware-fork-knife" />
          <RouterLink :to="{ name: '/'}">
            Meal planner
          </RouterLink>
        </v-app-bar-title>
      </v-app-bar>
      <main>
        <router-view />
      </main>
    </v-container>
    <v-footer app>
      <span class="text-light-green">My Meal Planner</span>&nbsp;- &copy; {{ new Date().getFullYear() }}
    </v-footer>
  </v-layout>
</template>


