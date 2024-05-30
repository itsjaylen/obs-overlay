<template>
    <h1>Test</h1>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  import * as Comlink from "comlink";
  
  export default defineComponent({
    methods: {
      async get_objects() {
        // Import the worker as a module
        const Worker = await import("~/assets/object_worker.ts?worker");
        const worker = new Worker.default();
  
        // Wrap the worker with Comlink
        const workerAPI = Comlink.wrap(worker);
  
        // Call the worker functions without awaiting them immediately
        const fetchOrbitObjectsPromise = workerAPI.fetchObjects();
  
        // Handle the results when both promises are resolved
        const [fetchObjectsResult] = await Promise.all([
          fetchOrbitObjectsPromise,
        ]);
  
        // Store the object as a string in localStorage
        localStorage.setItem(
          "fetchObjectsResultObject",
          JSON.stringify(fetchObjectsResult)
        );
  
        // Retrieve the object from localStorage and parse it back to its original form
        const storedResultString = localStorage.getItem("fetchObjectsResultObject");
        const storedResultObject = JSON.parse(storedResultString);
        console.log("Retrieved Result: ", storedResultObject);
      },
    },
    mounted() {
      // Call get_objects immediately
      this.get_objects();
  
      // Set up a timer to call get_objects every 5 seconds
      setInterval(() => {
        this.get_objects();
      }, 30000);
    },
  });
  </script>
  