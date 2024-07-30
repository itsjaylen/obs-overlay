<template>
  <div>
    <OverlayWorkstation />
  </div>
</template>

<style lang="scss">
@import "./styles/styles.scss";
</style>

<script lang="ts">
import OverlayWorkstation from './OverlayWorkstation.vue';

export default defineComponent({
  name: "Overlay",
  components: {
    OverlayWorkstation
  },
  setup() {
    onMounted(() => {
    });
  },
});
</script>
