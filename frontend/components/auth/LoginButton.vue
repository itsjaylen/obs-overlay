<template>
  <div class="login-container">
    <v-btn prepend-icon="mdi-login" class="login-button" @click="loginWithTwitch">
      Sign In
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    loginWithTwitch() {
      const clientId = "ea452mngoohmtr5ra018ma95l4chyn";
      const redirectUri = "http://localhost:3000/tests/oauth"; // Replace with your redirect URI
      const responseType = "token";
      const scope = "user:read:email";

      // Redirect user to Twitch login
      window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    },
  },
};
</script>

<style src="./LoginButton.scss"></style>
