import { type ImageObjectData, ImageObject } from "./objects_types";
import { addOrUpdateImageObject, openDatabase } from "./objects_database";

async function getImageObjects(): Promise<ImageObject[]> {
  const db = await openDatabase();
  return new Promise<ImageObject[]>((resolve, reject) => {
    const transaction = db.transaction("images", "readonly");
    const store = transaction.objectStore("images");
    const request = store.getAll();

    request.onsuccess = () => {
      const objects = request.result.map(
        (obj: ImageObjectData) => new ImageObject(obj)
      );
      resolve(objects);
    };

    request.onerror = () => {
      reject(
        request.error ??
          new DOMException("Unknown error occurred", "UnknownError")
      );
    };
  });
}

export async function get_objects() {
  try {
    const workerObjects: ImageObjectData[] = await fetchObjectsFromWorker();

    const imageObjects = workerObjects.map(
      (obj: ImageObjectData) => new ImageObject(obj)
    );

    await Promise.all(imageObjects.map(addOrUpdateImageObject));
    console.log("ImageObjects have been stored in IndexedDB.");

    const storedObjects = await getImageObjects();
    console.log("Stored Image Objects: ", storedObjects);
  } catch (error) {
    console.error(error);
  }
}
