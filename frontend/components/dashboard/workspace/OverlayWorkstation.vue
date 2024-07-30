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
          transform: `rotate(${target.clientrotation}deg) scale(${target.scaleX}, ${target.scaleY})`,
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
      <div v-if="selectedTargetId !== null" class="popup">
        Selected: {{ getTargetById(selectedTargetId)?.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./scripts/OverlayWorkstationScript.ts"></script>
