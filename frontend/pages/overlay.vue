<template>
  <div class="container" v-for="(widgetobject, index) in WidgetObjects" :key="index">
  <div class="target" ref="target">
    <v-img
      cover
      :src="widgetobject.objectName"
    ></v-img>
  </div>

  <Moveable
    className="moveable"
    v-bind:target="['.target']"
    v-bind:draggable="true"
    v-bind:scalable="true"
    v-bind:rotatable="true"
    @drag="(event) => onDrag(event, index)"
    @scale="(event) => onScale(event, index)"
    @rotate="(event) => onRotate(event, index)"
  />
</div>

</template>

<script>
import OverlayScript from "~/components/overlay/OverlayScript";

export default {
  ...OverlayScript,
};
</script>
