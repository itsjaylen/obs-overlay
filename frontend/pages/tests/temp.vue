<template>
    <v-slider
      v-model="sliderValue"
      :min="min"
      :max="max"
      :step="step"
      label="Slider Value"
      @update:modelValue="handleSliderChange"
    ></v-slider>
    <p>Slider Value: {{ sliderValue }}</p>
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'MyComponent',
    setup() {
      // Define the slider value with a type
      const sliderValue = ref<number>(0);
  
      // Define other slider properties if needed
      const min = 0;
      const max = 100;
      const step = 1;
  
      // Function to handle slider value change
      const handleSliderChange = (value: number) => {
        console.log('Slider value changed to:', value);
        // Add your logic here
      };
  
      return {
        sliderValue,
        min,
        max,
        step,
        handleSliderChange
      };
    }
  });
  </script>
  