<template>
  <div>
    <h1>IndexedDB Example</h1>
    <button @click="addData">Add Data</button>
    <button @click="readData">Read Data</button>
    <button @click="updateData">Update Data</button>
    <button @click="removeData">Remove Data</button>
    <button @click="fetchAndAddData">Fetch and Add Data</button>
    <div v-if="dataList.length">
      <h2>Data in Database:</h2>
      <ul>
        <li v-for="item in dataList" :key="item.id">
          {{ item.id }}: {{ item.__key }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";

const dbRef = ref(null);
const dataList = ref([]);
const maxReconnectAttempts = 5;
let reconnectAttempts = 0;
let socket;

const connectWebSocket = () => {
  socket = new WebSocket("ws://0.0.0.0:9191/ws/");
  
  socket.onopen = () => {
    console.log("Connected to WebSocket server");
    reconnectAttempts = 0; 
  };

  socket.onmessage = (event) => {
    console.log("Received message:", event.data, "with type:", typeof event.data);
    
    if (event.data.trim() === "UpdatedKeys") {
      console.log("UpdatedKeys message received, calling fetchAndAddData and readData");
      fetchAndAddData();
      readData();
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("Disconnected from WebSocket server");
    if (reconnectAttempts < maxReconnectAttempts) {
      reconnectAttempts++;
      console.log(`Reconnecting attempt ${reconnectAttempts}...`);
      setTimeout(connectWebSocket, 1000 * reconnectAttempts); // Exponential backoff
    } else {
      console.error("Max reconnection attempts reached. Giving up.");
    }
  };
};

onMounted(async () => {
  const request = indexedDB.open("obsOverlayDB", 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("objects")) {
      db.createObjectStore("objects", { keyPath: "id" });
    }
  };

  request.onsuccess = (event) => {
    dbRef.value = event.target.result;
    fetchAndAddData();
    readData();
  };

  request.onerror = (event) => {
    console.log("Error: " + event.target.errorCode);
  };

  connectWebSocket();

  fetchAndAddData();
  readData();
});

onUnmounted(() => {
  if (socket) {
    socket.close();
  }
});

const addData = () => {
  if (!dbRef.value) {
    console.log("Database not initialized");
    return;
  }

  const db = dbRef.value;
  const transaction = db.transaction("objects", "readwrite");
  const objectStore = transaction.objectStore("objects");

  const data = { id: Date.now(), name: "Sample Data", value: Math.random() };

  const request = objectStore.add(data);

  request.onsuccess = () => {
    console.log("Data added successfully");
  };

  request.onerror = (event) => {
    console.log("Error adding data: " + event.target.errorCode);
  };
};

const readData = () => {
  console.log("readData called");
  if (!dbRef.value) {
    console.log("Database not initialized");
    return;
  }

  const db = dbRef.value;
  const transaction = db.transaction("objects", "readonly");
  const objectStore = transaction.objectStore("objects");

  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    dataList.value = event.target.result;
    console.log("Data read successfully:", dataList.value);
  };

  request.onerror = (event) => {
    console.log("Error reading data: " + event.target.errorCode);
  };
};

const updateData = () => {
  console.log("updateData called");
  if (!dbRef.value) {
    console.log("Database not initialized");
    return;
  }

  const db = dbRef.value;
  const transaction = db.transaction("objects", "readwrite");
  const objectStore = transaction.objectStore("objects");

  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const data = event.target.result;

    if (data.length === 0) {
      console.log("No data to update");
      return;
    }

    const itemToUpdate = data[0];
    itemToUpdate.name = "Updated Name";
    itemToUpdate.value = Math.random();

    const updateRequest = objectStore.put(itemToUpdate);

    updateRequest.onsuccess = () => {
      console.log("Data updated successfully");
      readData();
    };

    updateRequest.onerror = (event) => {
      console.log("Error updating data: " + event.target.errorCode);
    };
  };

  request.onerror = (event) => {
    console.log("Error reading data: " + event.target.errorCode);
  };
};

const removeData = () => {
  console.log("removeData called");
  if (!dbRef.value) {
    console.log("Database not initialized");
    return;
  }

  const db = dbRef.value;
  const transaction = db.transaction("objects", "readwrite");
  const objectStore = transaction.objectStore("objects");

  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const data = event.target.result;

    if (data.length === 0) {
      console.log("No data to remove");
      return;
    }

    const idToRemove = data[0].id;
    const deleteRequest = objectStore.delete(idToRemove);

    deleteRequest.onsuccess = () => {
      console.log("Data removed successfully");
      readData();
    };

    deleteRequest.onerror = (event) => {
      console.log("Error removing data: " + event.target.errorCode);
    };
  };

  request.onerror = (event) => {
    console.log("Error reading data: " + event.target.errorCode);
  };
};

const fetchAndAddData = async () => {
  console.log("fetchAndAddData called");
  if (!dbRef.value) {
    console.log("Database not initialized");
    return;
  }

  try {
    const response = await axios.get("http://0.0.0.0:9191/get_objects");
    console.log("Fetched data:", response.data);
    const fetchedData = response.data;

    if (!Array.isArray(fetchedData)) {
      console.error("Fetched data is not an array");
      return;
    }

    const db = dbRef.value;
    const transaction = db.transaction("objects", "readwrite");
    const objectStore = transaction.objectStore("objects");

    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      const localData = event.target.result;
      const fetchedIds = fetchedData.map((item) => item.id);

      localData.forEach((localItem) => {
        if (!fetchedIds.includes(localItem.id)) {
          objectStore.delete(localItem.id).onsuccess = () => {
            console.log("Deleted local item with id:", localItem.id);
          };
        }
      });

      fetchedData.forEach((item) => {
        if (!item.hasOwnProperty("id")) {
          console.error("Fetched item does not have an id:", item);
          return;
        }
        const request = objectStore.put(item);
        request.onsuccess = () => {
          console.log("Data fetched and added/updated successfully:", item);
        };
        request.onerror = (event) => {
          console.error("Error adding/updating fetched data:", event.target.errorCode, item);
        };
      });

      readData();
    };

    request.onerror = (event) => {
      console.error("Error reading local data:", event.target.errorCode);
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
