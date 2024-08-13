export const useTargetStore = defineStore("target", () => {
  const selectedTarget = ref<string | null>(null);
  const selectedTargetOpacity = ref<number>(1);
  const selectedTargetBlur = ref<number>(0.0);

  function setSelectedTarget(target: string) {
    selectedTarget.value = target;
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
    selectedTargetOpacity,
    selectedTargetBlur,
    setSelectedTarget,
    setSelectedTargetOpacity,
    setSelectedTargetBlur,
  };
});
