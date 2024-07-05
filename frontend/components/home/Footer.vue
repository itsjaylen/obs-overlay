<template>
  <v-footer class="bg-indigo-lighten-1 text-center d-flex flex-column">
    <div>
      <a
        href="https://github.com/example"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-btn icon="mdi-github" class="mx-4" variant="text"></v-btn>
        <p>Contribute</p>
      </a>
    </div>

    <v-divider></v-divider>

    <div>{{ currentYear }} — <strong>Vuetify</strong></div>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
