<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
  components: { Moveable },
  setup() {
    const draggable = true;
    const throttleDrag = 1;
    const edgeDraggable = false;
    const startDragRotate = 0;
    const throttleDragRotate = 0;
    const scalable = true;
    const keepRatio = false;
    const throttleScale = 0;
    const snappable = true;
    const bounds = { left: 0, top: 0, right: 0, bottom: 0, position: "css" };
    const targetRef = ref(null);
    const moveableRef = ref(null);
    const onDrag = (e) => {
      e.target.style.transform = e.transform;
    };
    const onScale = (e) => {
      e.target.style.transform = e.drag.transform;
    };
    const onBound = (e) => {
      console.log(e);
    };
    return {
      targetRef,
      moveableRef,
      draggable,
      throttleDrag,
      edgeDraggable,
      startDragRotate,
      throttleDragRotate,
      scalable,
      keepRatio,
      throttleScale,
      snappable,
      bounds,
      onDrag,
      onScale,
      onBound,
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
        style="width: 200px; height: 150px; transform: scale(1.5, 1)"
      >
        Target
      </div>
      <Moveable
        ref="moveableRef"
        :target="targetRef"
        :draggable="draggable"
        :throttleDrag="throttleDrag"
        :edgeDraggable="edgeDraggable"
        :startDragRotate="startDragRotate"
        :throttleDragRotate="throttleDragRotate"
        :scalable="scalable"
        :keepRatio="keepRatio"
        :throttleScale="throttleScale"
        :snappable="snappable"
        :bounds="bounds"
        @drag="onDrag"
        @scale="onScale"
        @bound="onBound"
      />
    </div>
  </div>
</template>
