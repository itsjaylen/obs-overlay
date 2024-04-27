<!-- TODO break apart into components -->

<template>
  <div id="twitch-embed">
    <TwitchPlayer />
  </div>

  <v-app>
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
        <widgets />
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

      <v-list-item link title="List Item 2"></v-list-item>
      <v-list-item @click="pressTest" title="List Item 3"></v-list-item>

      <template v-model="testpress" v-slot:append>
        <div class="pa-2" v-if="testpress">
          <v-btn block>
            {{ buttontext }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import TwitchPlayer from "~/components/embeds/TwitchEmbed.vue";
import widgets from "~/components/dashboard/Widgets.vue";
export default {
  components: {
    TwitchPlayer,
    widgets,
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
      testpress: false,
      buttontext: "text",
    };
  },
  methods: {
    handleOverlayChange() {
      console.log("Overlay Enabled:", this.overlayEnabled);
      // You can perform any actions based on the state of the checkbox here
    },

    pressTest() {
      console.log("called");
      this.testpress = true;
      this.buttontext = "hello";
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
