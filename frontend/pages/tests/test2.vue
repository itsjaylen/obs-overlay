<script>
import Moveable from "vue3-moveable";

export default {
  components: { Moveable },
  setup() {
    const onDrag = (e) => {
      console.log(e.dist);
    };
    const onRender = (e) => {
      console.log(e.transform);
      e.target.style.cssText += e.cssText;
    };
    const clientRotation = 30;
    const clientX = 250;
    const clientY = 250;
    return { onDrag, onRender, clientRotation, clientX, clientY };
  },
};
</script>

<template>
  <div class="root">
    <div class="container">
      <div
        class="target"
        :style="`transform: translate(${clientX}px, ${clientY}px) rotate(${clientRotation}deg);`"
      >
        <v-img
          cover
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        ></v-img>
      </div>
      <Moveable
        :target="'.target'"
        :resizable="true"
        :preventClickDefault="true"
        :draggable="true"
        @drag="onDrag"
        @render="onRender"
      />
    </div>
  </div>
</template>
