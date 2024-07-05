<template>
  <div class="content-wrapper full-page-background">
    <div class="animated-background">
      <div class="gradient"></div>
      <div class="content">
        <p>Test</p>
        <AboutPageLayout />
      </div>
    </div>
    <footer class="footer">
      <!-- Footer content -->
    </footer>
  </div>
</template>

<script>
import AboutPageLayout from "~/layouts/AboutPageLayout.vue";
export default {
  components: {
    AboutPageLayout,
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/main.scss";

.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */
}

.footer {
  margin-top: auto; /* Push the footer to the bottom */
}
</style>
