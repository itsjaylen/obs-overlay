<template>
  <div class="root">
    <div class="container">
      <button @click="toggleScalable">Toggle Scalable</button>
      <button @click="fetchObject">Fetch Object</button>
      <button @click="fetchTargets">Fetch Targets</button>
      <button @click="addTarget">Add Target</button>
      <div
        v-for="target in targets"
        :key="target.id"
        :class="`target target${target.id}`"
        :style="{
          transform: `rotate(${target.rotation}deg) scale(${target.scaleX}, ${target.scaleY})`,
        }"
        @click="onTargetClick(target.id)"
      >
        <v-img aspect-ratio="16/9" cover :src="target.image" />
      </div>
      <Moveable
        v-for="target in targets"
        :key="target.id"
        :target="`.target${target.id}`"
        :individualGroupable="true"
        :draggable="target.draggable ?? true"
        :throttleDrag="target.throttleDrag ?? 1"
        :edgeDraggable="target.edgeDraggable ?? false"
        :startDragRotate="target.startDragRotate ?? 0"
        :throttleDragRotate="target.throttleDragRotate ?? 0"
        :scalable="target.scalable ?? true"
        :keepRatio="target.keepRatio ?? false"
        :throttleScale="target.throttleScale ?? 0"
        :renderDirections="
          target.renderDirections ?? [
            'nw',
            'n',
            'ne',
            'w',
            'e',
            'sw',
            's',
            'se',
          ]
        "
        :rotatable="target.rotatable ?? true"
        :throttleRotate="target.throttleRotate ?? 0"
        :rotationPosition="target.rotationPosition ?? 'top'"
        @drag="onDrag"
        @scale="onScale"
        @rotate="onRotate"
      />
      <div v-if="selectedTarget" class="popup">
        Selected: {{ selectedTarget.name }}
      </div>
    </div>
  </div>
</template>

<script>  
import Moveable from "vue3-moveable";
import axios from "axios";

class ImageObject {
  constructor(data) {
    this.__key = data.__key || "";
    this.clientrotation = parseFloat(data.clientrotation) || 0;
    this.clientx = parseFloat(data.clientx) || 0;
    this.clienty = parseFloat(data.clienty) || 0;
    this.draggable = data.draggable === "true";
    this.edgedraggable = data.edgedraggable === "true";
    this.id = parseInt(data.id) || 0;
    this.keepratio = data.keepratio === "true";
    this.renderdirections = data.renderdirections || [];
    this.rotatable = data.rotatable === true || data.rotatable === "true";
    this.rotationposition = parseFloat(data.rotationposition) || 0;
    this.scalable = data.scalable === true || data.scalable === "true";
    this.scalex = parseFloat(data.scalex) || 1;
    this.scaley = parseFloat(data.scaley) || 1;
    this.startdragrotate = parseFloat(data.startdragrotate) || 0;
    this.throttledrag = parseFloat(data.throttledrag) || 0;
    this.throttledragrotate = parseFloat(data.throttledragrotate) || 0;
    this.throttlerotate = parseFloat(data.throttlerotate) || 0;
    this.throttlescale = parseFloat(data.throttlescale) || 0;
    this.type_ = data.type_ || "";
    this.visible = data.visible === true || data.visible === "true";
  }
}

export default {
  components: { Moveable },
  setup() {
    const targets = ref([
      {
        id: 1,
        name: "Target1",
        rotation: 15,
        scaleX: 0.1,
        scaleY: 0.1,
        image: "http://0.0.0.0:9191/assets/577c423817e67.image-2584788091.jpg",
      },
    ]);

    const objects = ref([]);
    const selectedTarget = ref(null);

    const toggleScalable = () => {
      targets.value.forEach((target) => {
        target.scalable =
          target.scalable === undefined ? true : !target.scalable;
      });
    };

    function parseTransform(transform) {
      const rotationMatch = transform.match(/rotate\(([^)]+)deg\)/);
      const translationMatch = transform.match(/translate\(([^)]+)\)/);
      const scaleMatch = transform.match(/scale\(([^)]+)\)/);

      let rotationDeg = null;
      let translateX = null;
      let translateY = null;
      let scaleX = null;
      let scaleY = null;

      if (rotationMatch) {
        rotationDeg = rotationMatch[1];
      }

      if (translationMatch) {
        const translateValues = translationMatch[1].split(",");
        if (translateValues.length === 2) {
          translateX = translateValues[0].trim();
          translateY = translateValues[1].trim();
        }
      }

      if (scaleMatch) {
        const scaleValues = scaleMatch[1].split(",");
        if (scaleValues.length === 2) {
          scaleX = scaleValues[0].trim();
          scaleY = scaleValues[1].trim();
        }
      }

      return {
        rotationDeg,
        translateX,
        translateY,
        scaleX,
        scaleY,
      };
    }

    const onDrag = (e) => {
      // Apply new transform style
      e.target.style.transform = e.transform;

      // Parse transform details
      const parsedTransform = parseTransform(e.transform);

      const targetId = parseInt(e.target.classList[1].replace("target", ""));
      const targetIndex = targets.value.findIndex(
        (target) => target.id === targetId
      );
      const targetName = targets.value[targetIndex].name;

      // Log details
      console.log(`Target Name: ${targetName}`);
      console.log(`Translate X: ${parsedTransform.translateX}`);
      console.log(`Translate Y: ${parsedTransform.translateY}`);
      console.log(e.target.style.transform);
    };

    const onScale = (e) => {
      e.target.style.transform = e.drag.transform;

      const targetId = parseInt(e.target.classList[1].replace("target", ""));
      const targetIndex = targets.value.findIndex(
        (target) => target.id === targetId
      );
      const targetName = targets.value[targetIndex].name;

      // Update scale in targets array
      const parsedTransform = parseTransform(e.drag.transform);
      targets.value[targetIndex].scaleX = parsedTransform.scaleX;
      targets.value[targetIndex].scaleY = parsedTransform.scaleY;

      console.log(`Target Name: ${targetName}`);
      console.log(`Scale X: ${parsedTransform.scaleX}`);
      console.log(`Scale Y: ${parsedTransform.scaleY}`);
    };

    const onRotate = (e) => {
      const targetId = parseInt(e.target.classList[1].replace("target", ""));
      const targetIndex = targets.value.findIndex(
        (target) => target.id === targetId
      );
      const targetName = targets.value[targetIndex].name;

      // Update rotation in targets array
      targets.value[targetIndex].rotation += e.beforeDelta[0];

      // Apply new transform style
      e.target.style.transform = e.drag.transform;

      // Parse transform details
      const parsedTransform = parseTransform(e.drag.transform);

      // Log rotation details
      console.log(`Target Name: ${targetName}`);
      console.log(`Rotation: ${parsedTransform.rotationDeg}deg`);
    };

    const fetchTargets = () => {
      console.log("Targets:", targets.value);
      targets.value.forEach((target, index) => {
        console.log(`Target ${index + 1}:`, target.id);
      });
    };

    const fetchObject = () => {
      console.log("Component is mounted!");

      // Fetch data using Axios
      axios
        .get("http://0.0.0.0:9191/get_objects")
        .then((response) => {
          // Handle the response data
          objects.value = response.data.map((obj) => new ImageObject(obj));
          console.log("Data fetched:", objects.value);
          objects.value.forEach((obj) => {
            console.log(obj.__key);
          });
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error fetching data:", error);
        });
    };

    const addTarget = () => {
      const newId = targets.value.length
        ? targets.value[targets.value.length - 1].id + 1
        : 1;
      const newTarget = {
        id: newId,
        name: `Target${newId}`,
        rotation: 60,
        scaleX: 0.1,
        scaleY: 0.1,
        image:
          "http://0.0.0.0:9191/assets/a83b628d80bcbe4f-profile_image-70x70.png",
      };
      targets.value.push(newTarget);
    };

    const onTargetClick = (targetId) => {
      // Deselect the previously selected target
      if (selectedTarget.value) {
        selectedTarget.value.selected = false;
      }

      // Select the new target
      selectedTarget.value = targets.value.find(
        (target) => target.id === targetId
      );
      selectedTarget.value.selected = true;
      console.log(`Selected target:`, selectedTarget.value);
    };

    return {
      targets,
      objects,
      selectedTarget,
      onDrag,
      onScale,
      onRotate,
      toggleScalable,
      fetchObject,
      fetchTargets,
      addTarget,
      onTargetClick,
    };
  },
};
</script>

<style>
button {
  margin: 10px;
}

.popup {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 5px;
  z-index: 1000;
}
</style>
