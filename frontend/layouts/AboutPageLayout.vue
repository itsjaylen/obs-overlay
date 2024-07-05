<template>
    <v-app>
      <v-main>
        <div class="container">
          <AnimatedBackground />
          <InfoPanel />
          <NavBar />
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import NavBar from "@/components/home/NavBar.vue";
  import InfoPanel from "@/components/about/InfoPanel.vue";
  import AnimatedBackground from "@/components/animations/AnimatedBackground.vue";
  
  export default {
    components: {
      NavBar,
      InfoPanel,
      AnimatedBackground,
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center items horizontally */
    justify-content: center; /* Center items vertically */
    height: 100vh; /* Make the container full height of the viewport */
  }
  
  /* Adjust spacing between components if needed */
  .container > * {
    margin-bottom: 20px; /* Adds space between each component */
  }
  </style>
  