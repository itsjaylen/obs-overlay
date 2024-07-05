<template>
  <v-app class="full-page-background">
    <NavBar />
    <v-main>
      <v-container fluid class="content-wrapper">
        <div class="animated-background">
          <div class="gradient"></div>
          <div class="content">
            <!-- Include Demo component here -->

            <Features />
            <slot></slot>
            <div style="height: 200vh"></div>
          </div>
        </div>
        <AnimatedCircles />
        <div class="cursor-light" ref="cursorLight"></div>
        <!-- Spotlight div -->
      </v-container>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/home/NavBar.vue";
import AnimatedCircles from "~/components/animations/AnimatedBackground.vue";
import Demo from "~/components/home/Demo.vue";
import Footer from "~/components/home/Footer.vue";
import Features from "~/components/home/Features.vue";

export default {
  components: {
    NavBar,
    AnimatedCircles,
    Demo,
    Footer,
    Features,
  },
  mounted() {
    // Add event listener for mouse movement
    document.addEventListener("mousemove", this.handleMouseMove);
  },
  beforeDestroy() {
    // Remove event listener when component is destroyed
    document.removeEventListener("mousemove", this.handleMouseMove);
  },
  methods: {
    handleMouseMove(event) {
      // Update spotlight position based on mouse coordinates
      const cursorLight = this.$refs.cursorLight;
      cursorLight.style.left = `${event.pageX}px`;
      cursorLight.style.top = `${event.pageY}px`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/HomePage.scss";

.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */
}

.footer {
  margin-top: auto; /* Push the footer to the bottom */
}
</style>
