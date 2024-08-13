import type { Target } from '../scripts/types';
import { parseTransform } from './useTransformParser';

export function useMoveable(targets: Ref<Target[]>) {
  const onDrag = (e: any) => {
    e.target.style.transform = e.transform;

    const parsedTransform = parseTransform(e.transform);

    const targetId = parseInt(e.target.classList[1].replace('target', ''));
    const targetIndex = targets.value.findIndex((target) => target.id === targetId);
    const targetName = targets.value[targetIndex]?.name || 'Unknown';

    console.log(`Target Name: ${targetName}`);
    console.log(`Translate X: ${parsedTransform.translateX}`);
    console.log(`Translate Y: ${parsedTransform.translateY}`);
    console.log(e.target.style.transform);
  };

  const onScale = (e: any) => {
    e.target.style.transform = e.drag.transform;

    const targetId = parseInt(e.target.classList[1].replace('target', ''));
    const targetIndex = targets.value.findIndex((target) => target.id === targetId);
    const targetName = targets.value[targetIndex]?.name || 'Unknown';

    const parsedTransform = parseTransform(e.drag.transform);
    if (targetIndex !== -1) {
      targets.value[targetIndex].scaleX = parseFloat(parsedTransform.scaleX || '1');
      targets.value[targetIndex].scaleY = parseFloat(parsedTransform.scaleY || '1');
    }

    console.log(`Target Name: ${targetName}`);
    console.log(`Scale X: ${parsedTransform.scaleX}`);
    console.log(`Scale Y: ${parsedTransform.scaleY}`);
  };

  const onRotate = (e: any) => {
    const targetId = parseInt(e.target.classList[1].replace('target', ''));
    const targetIndex = targets.value.findIndex((target) => target.id === targetId);
    const targetName = targets.value[targetIndex]?.name || 'Unknown';

    if (targetIndex !== -1) {
      targets.value[targetIndex].rotation += e.beforeDelta[0];
    }

    e.target.style.transform = e.drag.transform;

    const parsedTransform = parseTransform(e.drag.transform);

    console.log(`Target Name: ${targetName}`);
    console.log(`Rotation: ${parsedTransform.rotationDeg}deg`);
  };

  const toggleScalable = () => {
    targets.value.forEach((target) => {
      target.scalable = target.scalable === undefined ? true : !target.scalable;
    });
  };

  return {
    onDrag,
    onScale,
    onRotate,
    toggleScalable,
  };
}
