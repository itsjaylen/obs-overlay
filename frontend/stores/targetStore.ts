import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useTargetStore = defineStore('target', () => {
  const selectedTarget = ref<string | null>(null);
  const selectedTargetID = ref<number | null>(null);
  const selectedTargetOpacity = ref<number>(1);
  const selectedTargetBlur = ref<number>(0.0);

  function setSelectedTarget(target: string) {
    selectedTarget.value = target;
  }

  function setSelectedTargetID(target: number) {
    selectedTargetID.value = target;
  }

  function setSelectedTargetOpacity(opacity: number) {
    console.log(`Opacity: ${opacity}`);
    selectedTargetOpacity.value = opacity;
  }

  function setSelectedTargetBlur(blur: number) {
    selectedTargetBlur.value = blur;
  }

  return {
    selectedTarget,
    selectedTargetID,
    selectedTargetOpacity,
    selectedTargetBlur,
    setSelectedTarget,
    setSelectedTargetID,
    setSelectedTargetOpacity,
    setSelectedTargetBlur,
  };
});
