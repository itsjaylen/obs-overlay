import { fetchImageObjectByKey } from "../scripts/objects_database";
import {
  ImageObject,
  type ImageObjectData,
  type Target,
} from "../scripts/types";
import { fetchObjectsFromWorker } from "./useFetch";
export function useTargets() {
  const targets = ref<Target[]>([
    {
      id: 1,
      name: "Target1",
      clientrotation: 15,
      scaleX: 0.1,
      scaleY: 0.1,
      image: "http://0.0.0.0:9191/assets/577c423817e67.image-2584788091.jpg",
      rotation: 0,
      opacity: 1,
      blur: 0,
    },
  ]);

  const objects = ref<ImageObject[]>([]);
  const selectedTargetId = ref<number | null>(null);

  const fetchObject = async () => {
    console.log("Component is mounted!");
    try {
      const fetchedObjects = await fetchObjectsFromWorker();
      console.log("Fetched objects:", fetchedObjects);

      objects.value = fetchedObjects.map(
        (obj: ImageObjectData) => new ImageObject(obj)
      );
      console.log("Data fetched:", objects.value);

      objects.value.forEach((obj) => {
        console.log(`Object: ${JSON.stringify(obj, null, 2)}`);

        const newId = targets.value.length
          ? targets.value[targets.value.length - 1].id + 1
          : 1;
        const newTarget: Target = {
          id: newId,
          name: `Target${newId}`,
          clientrotation: obj.clientrotation,
          scaleX: obj.scalex,
          scaleY: obj.scaley,
          image: `http://0.0.0.0:9191/assets/${obj.__key}`,
          rotation: obj.clientrotation,
          opacity: obj.opacity,
          blur: 0,
        };
        console.log(`Adding target: ${JSON.stringify(newTarget, null, 2)}`);
        targets.value.push(newTarget);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTargets = () => {
    console.log("Targets:", targets.value);
    targets.value.forEach((target, index) => {
      console.log(`Target ${index + 1}:`, target.id);
    });
  };

  const addTarget = () => {
    const newId = targets.value.length
      ? targets.value[targets.value.length - 1].id + 1
      : 1;
    const newTarget: Target = {
      id: newId,
      name: `Target${newId}`,
      clientrotation: 60,
      scaleX: 0.1,
      scaleY: 0.1,
      image:
        "http://0.0.0.0:9191/assets/a83b628d80bcbe4f-profile_image-70x70.png",
      rotation: 0,
      opacity: 1,
      blur: 0,
    };
    console.log(`Adding new target: ${JSON.stringify(newTarget, null, 2)}`);
    targets.value.push(newTarget);
  };

  const targetStore = useTargetStore();

  const getFilenameFromUrl = (url: string) => {
    const match = RegExp(/[^/]+\.[^/]+$/).exec(url);
    return match ? match[0] : "No file found";
  };

  // Main function that handles on click target tasks.
  const onTargetClick = async (targetId: number) => {
    selectedTargetId.value = targetId;
    const imageUrl = getTargetById(targetId)?.image;
    const target = getTargetById(targetId);

    if (target) {
      console.log("Target before update:", target.opacity);
      console.log("Target after update:", target.opacity);
    }

    const filename = imageUrl ? getFilenameFromUrl(imageUrl) : "No image found";
    console.log(filename);
    targetStore.setSelectedTarget(filename);

    const img = await fetchImageObjectByKey(filename);
    console.log(`Image Opacity: ${img?.opacity}`);
    targetStore.setSelectedTargetOpacity(img?.opacity ?? 1);
    targetStore.setSelectedTargetBlur(img?.blur ?? 0);


    const temp = targetStore.selectedTarget;
    console.log(`Temp:${temp}`)

  };

  const getTargetById = (targetId: number): Target | undefined => {
    return targets.value.find((target) => target.id === targetId);
  };

  const updateOpacity = (targetId: number, newOpacity: number) => {
    const target = targets.value.find((t) => t.id === targetId);
    if (target) {
      console.log("Before update:", target.opacity);
      target.opacity = newOpacity;
      console.log("After update:", target.opacity);
    }
  };

  return {
    targets,
    objects,
    selectedTargetId,
    fetchObject,
    fetchTargets,
    addTarget,
    onTargetClick,
    getTargetById,
    updateOpacity,
  };
}
