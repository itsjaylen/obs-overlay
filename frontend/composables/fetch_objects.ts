import * as Comlink from "comlink";
export interface WorkerAPI {
    fetchObjects: () => Promise<any[]>;
  }

  export async function fetchObjectsFromWorker() {
    try {
      // Import the worker as a module
      const Worker = await import("~/assets/object_worker.ts?worker");
      const worker = new Worker.default();
  
      // Wrap the worker with Comlink
      const workerAPI = Comlink.wrap<WorkerAPI>(worker);
  
      // Fetch objects from the worker
      const fetchObjectsResult = await workerAPI.fetchObjects();
  
      // Return the fetched objects
      return fetchObjectsResult;
    } catch (error) {
      console.error("Error fetching objects from worker:", error);
      return []; // Return an empty array in case of error
    }
  }
