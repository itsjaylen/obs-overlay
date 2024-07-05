<template>
    <div id="app">
      <LoginButton v-if="!userData"/>
      <div v-else>
        <h2>User Data:</h2>
        <pre>{{ userData }}</pre>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  import LoginButton from '~/components/auth/LoginButton.vue';
  
  export default defineComponent({
    components: {
      LoginButton
    },
    data() {
      return {
        userData: null as Record<string, any> | null
      };
    },
    async created() {
      if (process.client) {
        const storedAccessToken = localStorage.getItem('twitch_access_token');
        if (storedAccessToken) {
          await this.fetchUserData(storedAccessToken);
        }
      }
    },
    methods: {
      async fetchUserData(accessToken: string) {
        try {
          const response = await axios.get('https://api.twitch.tv/helix/users', {
            headers: {
              'Client-ID': 'ea452mngoohmtr5ra018ma95l4chyn',
              'Authorization': `Bearer ${accessToken}`
            }
          });
          this.userData = response.data.data[0];
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    }
  });
  </script>
  
  <style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  