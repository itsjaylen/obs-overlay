<template>
  <div class="root">
    <div class="container">
      <button @click="addTarget">Add Target</button>
      <div
        v-for="target in targets"
        :key="target.label"
        class="target"
        :class="target.class"
        :style="target.style"
      >
        <v-img :src="target.image" aspect-ratio="16/9" cover />
      </div>
      <Moveable
        v-for="target in targets"
        :key="target.label"
        :target="'.' + target.class"
        :draggable="target.draggable"
        :throttleDrag="throttleDrag"
        :edgeDraggable="edgeDraggable"
        :startDragRotate="startDragRotate"
        :throttleDragRotate="throttleDragRotate"
        :scalable="target.scalable"
        :keepRatio="keepRatio"
        :throttleScale="throttleScale"
        :renderDirections="renderDirections"
        :rotatable="target.rotatable"
        :throttleRotate="throttleRotate"
        :rotationPosition="rotationPosition"
        @drag="onDrag"
        @scale="onScale"
        @rotate="onRotate"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Moveable from "vue3-moveable";
import { VImg } from 'vuetify/lib/components/VImg';

export default {
  components: { Moveable, VImg },
  setup() {
    // Configuration options
    const options = {
      throttleDrag: 1,
      edgeDraggable: false,
      startDragRotate: 0,
      throttleDragRotate: 0,
      throttleScale: 0,
      renderDirections: ["nw", "n", "ne", "w", "e", "sw", "s", "se"],
      throttleRotate: 0,
      rotationPosition: "top",
    };

    // Keep ratio
    const keepRatio = ref(false);

    // Targets array with additional properties
    const targets = ref([
      {
        label: "Target1",
        class: "bg-red",
        style: { left: "29%", top: "22%", transform: "rotate(5deg)" },
        draggable: true,
        scalable: true,
        rotatable: true,
        image: "http://0.0.0.0:9191/assets/577c423817e67.image-2584788091.jpg",
      },
      {
        label: "Target2",
        class: "bg-blue",
        style: {
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) rotate(0deg)",
        },
        draggable: true,
        scalable: true,
        rotatable: true,
        image: "http://0.0.0.0:9191/assets/577c423817e67.image-2584788091.jpg",
      },
      {
        label: "Target3",
        class: "bg-teal",
        style: { left: "50%", top: "80%", transform: "rotate(0deg)" },
        draggable: true,
        scalable: true,
        rotatable: true,
        image: "http://0.0.0.0:9191/assets/577c423817e67.image-2584788091.jpg",
      },
      {
        label: "Target4",
        class: "bg-pink",
        style: { left: "70%", top: "80%", transform: "rotate(0deg)" },
        draggable: true,
        scalable: true,
        rotatable: true,
        image: "http://0.0.0.0:9191/assets/577c423817e67.image-2584788091.jpg",
      },
    ]);

    // Method to add a new target
    const addTarget = () => {
      const newIndex = targets.value.length + 1;
      targets.value.push({
        label: `Target${newIndex}`,
        class: `bg-new-${newIndex}`,
        style: {
          left: `${Math.random() * 80}%`,
          top: `${Math.random() * 80}%`,
          transform: "rotate(0deg)",
        },
        draggable: true,
        scalable: true,
        rotatable: true,
        image: "http://0.0.0.0:9191/assets/577c423817e67.image-2584788091.jpg",
      });
    };

    // Event handlers
    const onDrag = (e) => {
      e.target.style.transform = e.transform;
      console.log("Drag Event", {
        target: e.target,
        transform: e.transform,
        delta: e.delta,
        dist: e.dist,
        translate: e.translate,
      });
    };

    const onScale = (e) => {
      e.target.style.transform = e.transform;
      console.log("Scale Event", {
        target: e.target,
        transform: e.transform,
        delta: e.delta,
        dist: e.dist,
        scale: e.scale,
      });
    };

    const onRotate = (e) => {
      e.target.style.transform = e.transform;
      console.log("Rotate Event", {
        target: e.target,
        transform: e.transform,
        delta: e.delta,
        dist: e.dist,
        rotate: e.rotate,
      });
    };

    return {
      ...options,
      keepRatio,
      targets,
      addTarget,
      onDrag,
      onScale,
      onRotate,
    };
  },
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
}

.container {
  position: relative;
  width: 80%;
  height: 80%;
}

button {
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.target {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid #0099ff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg-new-1 {
  background-color: #ff7f7f;
}
.bg-new-2 {
  background-color: #7fff7f;
}
.bg-new-3 {
  background-color: #7f7fff;
}
.bg-new-4 {
  background-color: #ff7fff;
}
</style>
