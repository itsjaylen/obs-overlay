<template>
    <div class="root">
      <div class="container">
        <button @click="onClick">Random Resize</button>
        <button @click="addTarget">Add Target</button>
        <!-- Hardcoded targets -->
        <div
          v-for="(target, index) in initialTargets"
          :key="`hardcoded-${index}`"
          :class="`target target${index}`"
          v-bind:style="target.style"
        >
          {{ target.name }}
        </div>
        <!-- Dynamically added targets -->
        <div
          v-for="(target, index) in targets"
          :key="target.id"
          :class="`target dynamic-target${index}`"
          v-bind:style="target.style"
        >
          {{ `Dynamic Target ${index + 1}` }}
        </div>
        <!-- Moveable components for hardcoded targets -->
        <Moveable
          v-for="(target, index) in initialTargets"
          :key="'moveable-hardcoded-' + index"
          :target="`.target${index}`"
          :individualGroupable="true"
          :draggable="true"
          :rotatable="true"
          :resizable="true"
          :useResizeObserver="true"
          @drag="onDrag"
          @resize="onResize"
          @rotate="onRotate"
        />
        <!-- Moveable components for dynamically added targets -->
        <Moveable
          v-for="(target, index) in targets"
          :key="'moveable-dynamic-' + target.id"
          :target="`.dynamic-target${index}`"
          :individualGroupable="true"
          :draggable="true"
          :rotatable="true"
          :resizable="true"
          :useResizeObserver="true"
          @drag="onDrag"
          @resize="onResize"
          @rotate="onRotate"
        />
      </div>
    </div>
  </template>
  
  <script>
  import Moveable from "vue3-moveable";
  import { ref, watch, nextTick, onMounted } from "vue";
  
  export default {
    components: { Moveable },
    setup() {
      const initialTargets = ref([
        {
          name: "Hardcoded Target 1",
          style: { transform: "translate(100px, 100px) rotate(0deg)" },
        },
        {
          name: "Hardcoded Target 2",
          style: { transform: "translate(200px, 200px) rotate(0deg)" },
        },
        {
          name: "Hardcoded Target 3",
          style: { transform: "translate(300px, 300px) rotate(0deg)" },
        },
      ]);
  
      const targets = ref([]); // For dynamically added targets
  
      const loadTargets = () => {
        const savedTargets = JSON.parse(localStorage.getItem("targets"));
        if (savedTargets) {
          targets.value = savedTargets;
        }
      };
  
      const saveTargets = () => {
        localStorage.setItem("targets", JSON.stringify(targets.value));
      };
  
      const onClick = () => {
        const allTargets = [...document.querySelectorAll(".target")];
        const randomTarget =
          allTargets[Math.floor(Math.random() * allTargets.length)];
        const width = 50 + Math.floor(50 * Math.random());
        const height = 50 + Math.floor(50 * Math.random());
        randomTarget.style.cssText += `width: ${width}px;height: ${height}px`;
        saveTargets();
      };
  
      const onDrag = (e) => {
        e.target.style.transform = e.transform;
        saveTargets();
        console.log(e.target.style.transform)
      };
  
      const onResize = (e) => {
        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;
        e.target.style.transform = e.drag.transform;
        saveTargets();
        console.log(e.target.style.transform)
      };
  
      const onRotate = (e) => {
        e.target.style.transform = e.drag.transform;
        saveTargets();
        console.log(e.target.style.transform)
      };
  
      const addTarget = async () => {
        const randomX = 0;
        const randomY = 0;
        const randomRotate = 0;
        targets.value.push({
          id: Date.now() + Math.random(), // Unique identifier
          style: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`,
          },
        });
        await nextTick(); // Ensure the DOM is updated before initializing Moveable components
        saveTargets();
      };
  
      // Watch for changes in the targets array and update local storage
      watch(targets, saveTargets, { deep: true });
  
      onMounted(() => {
        loadTargets();
      });
  
      return {
        onClick,
        onDrag,
        onResize,
        onRotate,
        addTarget,
        initialTargets,
        targets,
      };
    },
  };
  </script>
  
  <style scoped>
  .root {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #000;
  }
  
  .target {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    cursor: move;
  }
  
  button {
    margin: 10px;
  }
  </style>
  