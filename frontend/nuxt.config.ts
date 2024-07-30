// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  css: ["vuetify/styles/main.sass", "@mdi/font/css/materialdesignicons.css"],

  build: {
    transpile: ["vuetify"],
  },

  modules: [],

  // TODO fix later
  plugins: ["~/plugins/debug.ts"],

  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '',
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: '',
      debugMode: process.env.DEBUG_MODE === 'true'
    },
  },
});