<template>
    <v-card>
      <v-card-title class="headline grey lighten-2">Info Panel</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <p>This is an example info panel using Vuetify.</p>
            </v-col>
            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p>You can add more content here...</p>
            </v-col>
            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p>Let's add a button:</p>
              <v-btn color="primary" @click="handleButtonClick">Click Me</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    name: "Info",
    methods: {
      handleButtonClick() {
        // Handle button click logic here
        alert("Button clicked!");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles for the component */
  .v-card-title {
    margin-bottom: 1rem; /* Example custom style */
  }
  
  .v-card-text {
    padding: 1rem; /* Example custom style */
  }
  
  .v-btn {
    margin-top: 1rem; /* Example custom style */
  }
  </style>
  