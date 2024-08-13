import { defineComponent, ref, onMounted } from "vue";
import { useTargets } from "../composables/useTargets";
import { useMoveable } from "../composables/useMoveable";
import Moveable from "vue3-moveable";
import { get_objects } from "./objects";

export default defineComponent({
  components: { Moveable },
  data() {
    return {
      sliderValue: 1, 
      selected: "test",
    };
  },
  setup() {
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
    const selectedTargetId = ref<number | null>(null);

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
    }

    return {
      targets,
      objects,
      selectedTargetId,
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
    };
  },
});
