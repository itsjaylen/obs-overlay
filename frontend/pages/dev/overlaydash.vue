<template>
  <v-app>
    <v-main>
      <NavigationDrawer />
      <Overlay />
    </v-main>
  </v-app>
</template>

<script setup>
import Overlay from "~/components/dashboard/workspace/overlay.vue";
import NavigationDrawer from "~/components/dashboard/NavigationDrawer.vue"; 
</script>

<style scoped>
/* Ensure that there's no CSS hiding the drawer */
</style>
