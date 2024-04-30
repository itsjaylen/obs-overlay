<template>
  <v-navigation-drawer>
    <v-list-item
      title="Elements Controller"
      subtitle="Stream Preview"
    ></v-list-item>
    <v-divider></v-divider>

    <v-list-item>
      <v-checkbox
        label="Overlay Enabled"
        v-model="overlayEnabled"
        @change="handleOverlayChange"
      >
      </v-checkbox>
    </v-list-item>

    <v-list-item>
      <v-checkbox label="Interactive Enabled" v-model="interactiveEnabled">
      </v-checkbox>
    </v-list-item>

    <v-list-item>
      <p>Opacity: {{ overlayOpacity }}</p>
      <v-slider
        v-model="overlayOpacity"
        :min="0"
        :max="100"
        step="1"
        thumb-label
      ></v-slider>
    </v-list-item>

    <!-- Widget item -->
    <v-list-item link title="Widgets">
      <Widgets />
    </v-list-item>

    <v-list-item title="Properties">
      <v-btn color="blue">Duplicate</v-btn>

      <!-- Add functionality -->

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

      <p>Opacity: {{ WidgetOpacity }}</p>
      <v-slider
        v-model="WidgetOpacity"
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

<script>
import Widgets from "~/components/dashboard/Widgets.vue";
export default {
  components: {
    Widgets
  },
  data() {
    return {
      overlayEnabled: true,
      interactiveEnabled: true,
      overlayOpacity: 0,
      z_index: 0,
      x_index: 0,
      y_index: 0,
      rotationValue: 0,
      WidgetOpacity: 0,
      WidgetBlur: 0,
    };
  },
  methods: {
    handleOverlayChange() {
      console.log("Overlay Enabled:", this.overlayEnabled);
    },
  },
  computed: {
    lockIcon() {
      console.log("LOCKED");
      return this.isLocked ? "mdi-lock" : "mdi-lock-open-variant";
    },
  },
};
</script>

<style>
.icon-spacing {
  margin-right: 10px;
  /* Adjust the value to increase/decrease the space */
}

.position-index {
  width: 80px;
}
</style>
