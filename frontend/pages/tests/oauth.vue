<template>
  <div id="app">
    <button @click="loginWithTwitch">Login with Twitch</button>
    <div v-if="userData">
      <h2>User Data:</h2>
      <pre>{{ userData }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userData: null
    };
  },
  methods: {
    async loginWithTwitch() {
      const clientId = 'ea452mngoohmtr5ra018ma95l4chyn';
      const redirectUri = 'http://localhost:3000/tests/oauth'; // Replace with your redirect URI
      const responseType = 'token';
      const scope = 'user:read:email';

      // Redirect user to Twitch login
      window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    },
    async fetchUserData(accessToken) {
      try {
        const response = await axios.get('https://api.twitch.tv/helix/users', {
          headers: {
            'Client-ID': 'ea452mngoohmtr5ra018ma95l4chyn',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log(response.data)
        this.userData = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  },
  created() {
    // Check if window object is available (for client-side rendering)
    if (typeof window !== 'undefined') {
      // Check if there's an access token in the URL (coming back from Twitch)
      const urlParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = urlParams.get('access_token');
      if (accessToken) {
        // Save access token to local storage
        localStorage.setItem('twitch_access_token', accessToken);
        // Call method to fetch user data using the access token
        console.log(accessToken);
        this.fetchUserData(accessToken);
      } else {
        // Check if access token is already in local storage
        const storedAccessToken = localStorage.getItem('twitch_access_token');
        if (storedAccessToken) {
          // Call method to fetch user data using the stored access token
          console.log(storedAccessToken);
          this.fetchUserData(storedAccessToken);
        }
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
