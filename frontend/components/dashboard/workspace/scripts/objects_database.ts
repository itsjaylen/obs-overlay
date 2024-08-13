import type { ImageObject } from "./objects_types";

// Open or create IndexedDB database and object store
export function openDatabase(): Promise<IDBDatabase> {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("ImageObjectDB", 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images", { keyPath: "__key" });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(
        request.error ??
          new DOMException("Unknown error occurred", "UnknownError")
      );
    };
  });
}

// Get ImageObject instance from IndexedDB
async function getImageObject(key: string): Promise<ImageObject | undefined> {
  const db = await openDatabase();
  return new Promise<ImageObject | undefined>((resolve, reject) => {
    const transaction = db.transaction("images", "readonly");
    const store = transaction.objectStore("images");
    const request = store.get(key);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(
        request.error ??
          new DOMException("Unknown error occurred", "UnknownError")
      );
    };
  });
}

export async function fetchImageObjectByKey(
  key: string
): Promise<ImageObject | undefined> {
  try {
    const imageObject = await getImageObject(key);
    return imageObject;
  } catch (error) {
    console.error("Error fetching ImageObject: ", error);
    return undefined;
  }
}

// Merge two ImageObject instances
function mergeImageObjects(
  existing: ImageObject,
  incoming: ImageObject
): ImageObject {
  return { ...existing, ...incoming };
}

// Add or Update ImageObject instance in IndexedDB
export async function addOrUpdateImageObject(
  imageObject: ImageObject
): Promise<void> {
  const db = await openDatabase();
  const existingImageObject = await getImageObject(imageObject.__key);

  // Merge the existing object with the new one, if it exists
  const mergedImageObject = existingImageObject
    ? mergeImageObjects(existingImageObject, imageObject)
    : imageObject;

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction("images", "readwrite");
    const store = transaction.objectStore("images");
    const request = store.put(mergedImageObject);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(
        request.error ??
          new DOMException("Unknown error occurred", "UnknownError")
      );
    };
  });
}
