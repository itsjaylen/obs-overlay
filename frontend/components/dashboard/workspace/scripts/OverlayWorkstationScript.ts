import { defineComponent, ref, onMounted } from "vue";
import { useTargetStore } from "@/stores/targetStore" // Ensure this import path is correct
import { useTargets } from "../composables/useTargets";
import { useMoveable } from "../composables/useMoveable";
import Moveable from "vue3-moveable";
import { get_objects } from "./objects";

export default defineComponent({
  components: { Moveable },
  setup() {
    const targetStore = useTargetStore(); // Access Pinia store here
  const sliderValue = ref(1); // Ensure this is defined
    const {
      targets,
      objects,
      fetchObject,
      fetchTargets,
      addTarget,
      onTargetClick,
      getTargetById,
      updateOpacity,
    } = useTargets();

    const { onDrag, onScale, onRotate, toggleScalable } = useMoveable(targets);
    const selectedOpacity = ref(1);
    

    onMounted(async () => {
      fetchObject();
      get_objects();

      const delay = 2000;
      const targetId = 2;
      const newOpacity = 0.1;

      setTimeout(() => {
        updateOpacity(targetId, newOpacity);
        console.log(`Opacity of target ${targetId} changed to ${newOpacity}`);
      }, delay);
    });

    function handleSliderChange(value: number) {
      console.log('Slider value:', value);
      updateOpacity(5, value);
      console.log()
    }

    return {
      selected: targetStore.selectedTarget?.toString() ?? '', // Convert number to string if needed
      sliderValue,
      targets,
      objects,
      onDrag,
      onScale,
      onRotate,
      toggleScalable,
      fetchObject,
      fetchTargets,
      addTarget,
      onTargetClick,
      getTargetById,
      selectedOpacity,
      handleSliderChange,
      selectedTargetID: targetStore.selectedTargetID, // Access Pinia store property here
    };
  },
});
