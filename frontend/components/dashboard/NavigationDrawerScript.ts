import { defineComponent, ref, computed, onMounted } from "vue";
import Widgets from "~/components/dashboard/Widgets.vue";

export default defineComponent({
  components: {
    Widgets,
  },
  setup() {
    // Define reactive properties
    const overlayEnabled = ref(true);
    const interactiveEnabled = ref(true);
    const overlayOpacity = ref(0);
    const z_index = ref(0);
    const x_index = ref(0);
    const y_index = ref(0);
    const rotationValue = ref(0);
    const WidgetOpacity = ref(0);
    const WidgetBlur = ref(0);
    const selectedTarget = ref("None");
    const isLocked = ref(false); // Add this line

    // Methods
    function handleOverlayChange() {
      console.log("Overlay Enabled:", overlayEnabled.value);
    }

    // Computed properties
    const lockIcon = computed(() => {
      console.log("LOCKED");
      return isLocked.value ? "mdi-lock" : "mdi-lock-open-variant";
    });

    // Lifecycle hooks
    onMounted(() => {});

    return {
      overlayEnabled,
      interactiveEnabled,
      overlayOpacity,
      z_index,
      x_index,
      y_index,
      rotationValue,
      WidgetOpacity,
      WidgetBlur,
      selectedTarget,
      handleOverlayChange,
      lockIcon,
      isLocked, // Return this if it's used in the template or methods
       // Return this so it can be called elsewhere
    };
  },
});
