import * as Comlink from "comlink";
export interface WorkerAPI {
  fetchObjects: () => Promise<any[]>;
}

export async function fetchObjectsFromWorker() {
  try {
    const Worker = await import("~/assets/object_worker.ts?worker");
    const worker = new Worker.default();
    const workerAPI = Comlink.wrap<WorkerAPI>(worker);

    const fetchObjectsResult = await workerAPI.fetchObjects();

    return fetchObjectsResult;
  } catch (error) {
    console.error("Error fetching objects from worker:", error);
    return [];
  }
}
