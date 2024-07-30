import { useTargets } from "../composables/useTargets";
import { useMoveable } from "../composables/useMoveable";
import Moveable from "vue3-moveable";
import { get_objects } from "./objects";

export default defineComponent({
  components: { Moveable },
  setup() {
    const {
      targets,
      objects,
      selectedTargetId,
      fetchObject,
      fetchTargets,
      addTarget,
      onTargetClick,
      getTargetById,
    } = useTargets();
    const { onDrag, onScale, onRotate, toggleScalable } = useMoveable(targets);

    onMounted(() => {
      fetchObject();
      get_objects();
    });

    onUnmounted(() => {
      console.log("Component unmounted");
    });

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
    };
  },
});
