<template>
    <v-container class="my-5">
      <v-row>
        <v-col cols="12" class="text-center">
          <h2 class="mb-4">Key Features</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="feature in features"
          :key="feature.title"
          cols="12"
          md="4"
          class="mb-4"
        >
          <v-card class="text-center pa-4 feature-card">
            <v-icon size="48" color="primary">{{ feature.icon }}</v-icon>
            <h3 class="my-3">{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        features: [
          {
            icon: "mdi-palette",
            title: "Real-time Customization",
            description:
              "Easily customize your overlays in real-time to match your stream's style.",
          },
          {
            icon: "mdi-widget",
            title: "Interactive Elements",
            description:
              "Add interactive elements like alerts and widgets to engage your audience.",
          },
          {
            icon: "mdi-integration",
            title: "Easy Integration",
            description:
              "Seamlessly integrate with OBS and other streaming software with minimal setup.",
          },
          {
            icon: "mdi-template",
            title: "Pre-made Templates",
            description:
              "Choose from a variety of pre-made templates to get started quickly.",
          },
          {
            icon: "mdi-puzzle",
            title: "Custom Widgets",
            description:
              "Create and customize your own widgets to make your stream unique.",
          },
          {
            icon: "mdi-security",
            title: "Secure and Reliable",
            description:
              "Our service ensures that your overlays are secure and reliable for your streaming needs.",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  .my-5 {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
  .mb-4 {
    margin-bottom: 4rem;
  }
  .feature-card {
    background-color: #0d026d; /* Example background color */
    border-radius: 8px;
    /* Add more styles as needed */
  }
  </style>
  