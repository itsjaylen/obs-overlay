import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { useTargetStore } from "@/stores/targetStore";
import { useTargets } from "../composables/useTargets";
import { useMoveable } from "../composables/useMoveable";
import Moveable from "vue3-moveable";
import { get_objects } from "./objects";

export default defineComponent({
  components: { Moveable },
  setup() {
    const targetStore = useTargetStore();
    const sliderValue = ref(1);

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

    const selected = computed(() => {
      return targetStore.selectedTarget ? targetStore.selectedTarget.toString() : '';
    });

    watch(() => targetStore.selectedTarget, (newValue) => {
      console.log('selectedTarget changed:', newValue);
    });

    onMounted(async () => {
      fetchObject();
      get_objects();
      

      // Load the blur from database
      const delay = 2000;
      const targetId = 0;
      const newOpacity = 0.1;
    
      setTimeout(() => {
        if (targetStore.selectedTarget !== null) {
          updateOpacity(targetId, newOpacity);
          console.log(`Opacity of target ${targetId} changed to ${newOpacity}`);
        } else {
          console.error('Selected target is null');
        }
      }, delay);
    });
    

    function handleSliderChange(value: number) {
      console.log('Slider value:', value);
      console.log(targetStore.selectedTargetID);
    
      if (targetStore.selectedTargetID !== null) {
        updateOpacity(targetStore.selectedTargetID, value);
      } else {
        console.error('Selected target ID is null');
      }
    }
    


    return {
      selected,
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
      selectedTargetID: targetStore.selectedTargetID,
    };
  },
});
