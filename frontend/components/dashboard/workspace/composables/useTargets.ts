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
    },
  ]);

  const objects = ref<ImageObject[]>([]);
  const selectedTargetId = ref<number | null>(null);

  const fetchObject = async () => {
    console.log("Component is mounted!");

    try {
      const fetchedObjects = await fetchObjectsFromWorker();
      objects.value = fetchedObjects.map(
        (obj: ImageObjectData) => new ImageObject(obj)
      );
      console.log("Data fetched:", objects.value);

      objects.value.forEach((obj) => {
        console.log(`Object: ${JSON.stringify(obj, null, 2)}`);

        // Transform the ImageObject into a Target and append it to the targets array
        const newId = targets.value.length
          ? targets.value[targets.value.length - 1].id + 1
          : 1;
        const newTarget: Target = {
          id: newId,
          name: `Target${newId}`,
          clientrotation: 0,
          scaleX: 1,
          scaleY: 1,
          image: `http://0.0.0.0:9191/assets/${obj.__key}`,
        };
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
    };
    targets.value.push(newTarget);
  };

  const onTargetClick = (targetId: number) => {
    selectedTargetId.value = targetId;
    console.log(`Selected target:`, getTargetById(targetId)?.name);
  };

  const getTargetById = (targetId: number): Target | undefined => {
    return targets.value.find((target) => target.id === targetId);
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
  };
}
