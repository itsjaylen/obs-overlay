<script>
import Moveable from "vue3-moveable";

export default {
  components: { Moveable },
  setup() {
    const onDrag = (e) => {
  const [x, y, z] = e.dist;
  console.log(`x: ${x}, y: ${y}, z: ${z}`);
};



const onRender = (e) => {
  const { transform } = e;
  const [x, y, z] = transform.match(/translate\(([^px]*)px, ([^px]*)px\)/).slice(1, 4);
  console.log(`Transform - x: ${x}, y: ${y}, z: ${z}`);
  e.target.style.cssText += e.cssText;
};

    const clientRotation = 30;
    const clientX = 0;
    const clientY = 0;
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
