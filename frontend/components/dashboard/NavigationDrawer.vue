<template>
  <v-navigation-drawer>
    <v-list-item title="Elements Controller" subtitle="Stream Preview">
      <v-btn
        size="small"
        class="ma-2 d-flex justify-center"
        color="blue"
        icon="mdi-wrench"
        @click="console.log('Settings clicked')"
      ></v-btn>
    </v-list-item>
    <v-divider></v-divider>

    <v-list-item>
      <v-checkbox
        label="Overlay Enabled"
        v-model="overlayEnabled"
        @change="handleOverlayChange"
      ></v-checkbox>
    </v-list-item>

    <v-list-item>
      <v-checkbox
        label="Interactive Enabled"
        v-model="interactiveEnabled"
      ></v-checkbox>
    </v-list-item>

    <!-- Display selected target -->
    <v-list-item>
      <h3>{{ targetStore.selectedTarget }}</h3>
    </v-list-item>

    <v-list-item>
      <p>Overlay Opacity: {{ overlayOpacity }}</p>
      <v-slider
        v-model="overlayOpacity"
        min="0"
        max="1"
        step="0.01"
        thumb-label
      ></v-slider>
    </v-list-item>

    <!-- Widget item -->
    <v-list-item title="Widgets">
      <Widgets />
    </v-list-item>

    <v-list-item title="Properties">
      <v-btn color="blue">Duplicate</v-btn>

      <p>Z-Index</p>
      <v-text-field
        type="number"
        density="compact"
        counter="number"
        class="position-index"
        v-model="z_index"
        @change="console.log(z_index)"
      ></v-text-field>

      <p>X-Index</p>
      <v-text-field
        type="number"
        density="compact"
        counter="number"
        class="position-index"
        v-model="x_index"
        @change="console.log(x_index)"
      ></v-text-field>

      <p>Y-Index</p>
      <v-text-field
        type="number"
        density="compact"
        counter="number"
        class="position-index"
        v-model="y_index"
        @change="console.log(y_index)"
      ></v-text-field>

      <p>Rotation: {{ rotationValue }}</p>
      <v-slider
        v-model="rotationValue"
        :min="-180"
        :max="180"
        step="1"
        thumb-label
      ></v-slider>

      <p>Opacity: {{ targetStore.selectedTargetOpacity }}</p>
      <v-slider
        v-model="targetStore"
        @update:modelValue="targetStore"
        min="0"
        max="1"
        step="0.01"
        thumb-label
      ></v-slider>

      <p>Brightness: {{ WidgetBrightness }}</p>
      <v-slider
        v-model="WidgetBrightness"
        :min="0"
        :max="100"
        step="1"
        thumb-label
      ></v-slider>

      <v-text-field
        type="number"
        density="compact"
        counter="number"
        class="position-index"
        v-model="WidgetOpacity"
        @change="console.log(WidgetOpacity)"
      ></v-text-field>

      <!-- TODO fix this -->
      <p>Blur: {{ WidgetBlur }}</p>
      <v-slider
        v-model="WidgetBlur"
        :min="0"
        :max="100"
        step="1"
        thumb-label
      ></v-slider>

      <v-text-field
        type="number"
        density="compact"
        counter="number"
        class="position-index"
        v-model="WidgetBlur"
        @change="console.log(WidgetBlur)"
      ></v-text-field>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Widgets from "~/components/dashboard/Widgets.vue";
import { useTargetStore } from "~/stores/targetStore";

export default {
  components: {
    Widgets,
  },
  setup() {
    const targetStore = useTargetStore();
    const overlayEnabled = ref(true);
    const interactiveEnabled = ref(true);
    const overlayOpacity = ref(0);
    const z_index = ref(0);
    const x_index = ref(0);
    const y_index = ref(0);
    const rotationValue = ref(0);
    const WidgetOpacity = ref(1);
    const WidgetBrightness = ref(1);
    const WidgetBlur = ref(0);

    function handleOverlayChange() {
      console.log("Overlay Enabled:", overlayEnabled.value);
    }

    targetStore.setSelectedTarget("None");
    targetStore.setSelectedTargetOpacity(0);
    targetStore.setSelectedTargetBlur(0);

    return {
      targetStore,
      overlayEnabled,
      interactiveEnabled,
      overlayOpacity,
      z_index,
      x_index,
      y_index,
      rotationValue,
      WidgetOpacity,
      WidgetBrightness,
      WidgetBlur,
      handleOverlayChange,
    };
  },
};
</script>

<style>
.icon-spacing {
  margin-right: 10px;
}

.position-index {
  width: 80px;
}
</style>
