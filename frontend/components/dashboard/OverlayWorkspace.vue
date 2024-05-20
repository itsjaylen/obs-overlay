<template>
  <div class="root">
    <div class="container">
      <v-img
        v-for="target in targets"
        :key="target.id"
        :src="target.imageUrl"
        alt="Image"
        :class="'target target' + target.id"
        :style="{
          transform: getTargetTransform(target.id),
          visibility: target.visible ? 'visible' : 'hidden',
        }"
      ></v-img>
      <Moveable
        :target="'.target'"
        :individualGroupable="true"
        :draggable="draggable"
        :throttleDrag="throttleDrag"
        :edgeDraggable="edgeDraggable"
        :startDragRotate="startDragRotate"
        :throttleDragRotate="throttleDragRotate"
        :scalable="scalable"
        :keepRatio="keepRatio"
        :throttleScale="throttleScale"
        :renderDirections="renderDirections"
        :rotatable="rotatable"
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
import OverlayWorkspaceScript from "./OverlayWorkspaceScipt.ts";

export default {
  ...OverlayWorkspaceScript,
};
</script>
