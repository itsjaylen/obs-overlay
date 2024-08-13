<template>
  <div>
    <!-- Image with dynamic styles -->
    <v-img
      :width="300"
      aspect-ratio="16/9"
      cover
      :src="imageSrc"
      :style="{
        filter: `blur(${blur}px) brightness(${brightness}) contrast(${contrast}%) grayscale(${grayscale}%) hue-rotate(${hueRotate}deg) invert(${invert}%) saturate(${saturate}%) sepia(${sepia}%) drop-shadow(${dropShadowOffsetX}px ${dropShadowOffsetY}px ${dropShadowBlur}px rgba(0, 0, 0, 0.5))`,
        opacity: opacity,
      }"
    ></v-img>

    <!-- File input for changing image -->
    <input type="file" @change="onFileChange" accept="image/*" class="mt-4" />

    <!-- Sliders for dynamic adjustments with value display -->
    <div class="slider-group">
      <v-slider
        v-model="blur"
        min="0"
        max="20"
        step="0.1"
        thumb-label
        label="Blur (px)"
        class="mt-4"
      ></v-slider>
      <div>Blur: {{ blur }} px</div>
    </div>

    <div class="slider-group">
      <v-slider
        v-model="opacity"
        min="0"
        max="1"
        step="0.01"
        thumb-label
        label="Opacity"
        class="mt-4"
      ></v-slider>
      <div>Opacity: {{ opacity }}</div>
    </div>

    <div class="slider-group">
      <v-slider
        v-model="brightness"
        min="0"
        max="2"
        step="0.01"
        label="Brightness"
        class="mt-4"
      ></v-slider>
      <div>Brightness: {{ brightness }}</div>
    </div>

    <div class="slider-group">
      <v-slider
        v-model="contrast"
        min="0"
        max="200"
        step="1"
        label="Contrast (%)"
        class="mt-4"
      ></v-slider>
      <div>Contrast: {{ contrast }}%</div>
    </div>

    <div class="slider-group">
      <v-slider
        v-model="grayscale"
        min="0"
        max="100"
        step="1"
        label="Grayscale (%)"
        class="mt-4"
      ></v-slider>
      <div>Grayscale: {{ grayscale }}%</div>
    </div>

    <div class="slider-group">
      <v-slider
        v-model="hueRotate"
        min="0"
        max="360"
        step="1"
        label="Hue Rotate (deg)"
        class="mt-4"
      ></v-slider>
      <div>Hue Rotate: {{ hueRotate }}°</div>
    </div>

    <div class="slider-group">
      <v-slider
        v-model="invert"
        min="0"
        max="100"
        step="1"
        label="Invert (%)"
        class="mt-4"
      ></v-slider>
      <div>Invert: {{ invert }}%</div>
    </div>

    <div class="slider-group">
      <v-slider
        v-model="saturate"
        min="0"
        max="200"
        step="1"
        label="Saturate (%)"
        class="mt-4"
      ></v-slider>
      <div>Saturate: {{ saturate }}%</div>
    </div>

    <div class="slider-group">
      <v-slider
        v-model="sepia"
        min="0"
        max="100"
        step="1"
        label="Sepia (%)"
        class="mt-4"
      ></v-slider>
      <div>Sepia: {{ sepia }}%</div>
    </div>

    <div class="slider-group">
      <v-slider
        v-model="dropShadowOffsetX"
        min="-20"
        max="20"
        step="1"
        label="Drop Shadow Offset X (px)"
        class="mt-4"
      ></v-slider>
      <div>Drop Shadow Offset X: {{ dropShadowOffsetX }} px</div>
    </div>

    <div class="slider-group">
      <v-slider
        v-model="dropShadowOffsetY"
        min="-20"
        max="20"
        step="1"
        label="Drop Shadow Offset Y (px)"
        class="mt-4"
      ></v-slider>
      <div>Drop Shadow Offset Y: {{ dropShadowOffsetY }} px</div>
    </div>

    <div class="slider-group">
      <v-slider
        v-model="dropShadowBlur"
        min="0"
        max="20"
        step="1"
        label="Drop Shadow Blur (px)"
        class="mt-4"
      ></v-slider>
      <div>Drop Shadow Blur: {{ dropShadowBlur }} px</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const imageSrc = ref("http://0.0.0.0:9191/assets/577c423817e67.image-2584788091.jpg");

const blur = ref(0);
const opacity = ref(1);
const brightness = ref(1);
const contrast = ref(100);
const grayscale = ref(0);
const hueRotate = ref(0);
const invert = ref(0);
const saturate = ref(100);
const sepia = ref(0);
const dropShadowOffsetX = ref(0);
const dropShadowOffsetY = ref(0);
const dropShadowBlur = ref(0);

function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageSrc.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
</script>

<style>
.slider-group {
  margin-bottom: 1rem;
}

.slider-group div {
  margin-top: 0.5rem;
}
</style>
