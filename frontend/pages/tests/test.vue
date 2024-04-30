<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
  components: { Moveable },
  setup() {
    const maxWidth = "auto";
    const maxHeight = "auto";
    const minWidth = "auto";
    const minHeight = "auto";
    const resizable = true;
    const draggable = true;
    const rotatable = true;
    const keepRatio = false;
    const throttleResize = 1;
    const renderDirections = ["nw", "n", "ne", "w", "e", "sw", "s", "se"];
    const targetRef = ref(null);
    const onResize = (event) => {
      event.target.style.width = `${event.width}px`;
      event.target.style.height = `${event.height}px`;
      event.target.style.transform = event.drag.transform;
    };
    const onDrag = (event) => {
      event.target.style.transform = event.transform;
    };
    const onScale = (event) => {
      event.target.style.transform = event.drag.transform;
    };
    return {
      targetRef,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      resizable,
      draggable,
      rotatable,
      keepRatio,
      throttleResize,
      renderDirections,
      onResize,
      onDrag,
      onScale,
    };
  },
};
</script>
<template>
  <div class="root">
    <div class="container">
      <div
        class="target"
        ref="targetRef"
        :style="`max-width: ${maxWidth};max-height: ${maxHeight};min-width: ${minWidth};min-height: ${minHeight};`"
      >
        <v-img
          cover
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        ></v-img>
      </div>
      <Moveable
        :target="targetRef"
        :resizable="resizable"
        :draggable="draggable"
        :rotatable="rotatable"
        :keepRatio="keepRatio"
        :throttleResize="throttleResize"
        :renderDirections="renderDirections"
        @resize="onResize"
        @drag="onDrag"
        @scale="onScale"
      />
    </div>
  </div>
</template>
