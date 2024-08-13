<template>
  <div>
    <h1>IndexedDB Example with Moveable</h1>
    <div v-if="dataList.length">
      <h2>Data in Database:</h2>
      <div class="container">
        <div
          v-for="item in dataList"
          :key="item.id"
          :class="`target target${item.id}`"
          :style="`transform: translate(0px, 0px) rotate(${item.clientRotation}deg);`"
        >
          <v-img :src="baseImageUrl + item.__key" />
          <div class="moveable-label">{{ item.name }}</div>
        </div>
        <Moveable
          v-for="item in dataList"
          :key="item.id"
          :target="`.target${item.id}`"
          :draggable="draggable"
          :throttleDrag="throttleDrag"
          :edgeDraggable="edgeDraggable"
          :startDragRotate="startDragRotate"
          :throttleDragRotate="throttleDragRotate"
          :scalable="scalable"
          :keepRatio="keepRatio"
          :throttleScale="throttleScale"
          :renderDirections="renderDirections"
          :rotatable="rotatable"
          :throttleRotate="throttleRotate"
          :rotationPosition="rotationPosition"
          @drag="onDrag"
          @scale="onScale"
          @rotate="onRotate"
        >
          <template #default="{ target }">
            <div v-if="target" class="moveable-label">
              {{ item.name }}
            </div>
          </template>
        </Moveable>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import Moveable from "vue3-moveable";

const dbRef = ref(null);
const dataList = ref([]);
const maxReconnectAttempts = 5;
let reconnectAttempts = 0;
let socket;

const baseImageUrl = "http://0.0.0.0:9191/assets/";

const connectWebSocket = () => {
  socket = new WebSocket("ws://0.0.0.0:9191/ws/");

  socket.onopen = () => {
    console.log("Connected to WebSocket server");
    reconnectAttempts = 0;
  };

  socket.onmessage = (event) => {
    if (event.data.trim() === "UpdatedKeys") {
      fetchAndAddData();
      readData();
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    if (reconnectAttempts < maxReconnectAttempts) {
      reconnectAttempts++;
      setTimeout(connectWebSocket, 1000 * reconnectAttempts); 
    }
  };
};

onMounted(() => {
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
});

onUnmounted(() => {
  if (socket) {
    socket.close();
  }
});

const addData = () => {
  if (!dbRef.value) {
    return;
  }

  const db = dbRef.value;
  const transaction = db.transaction("objects", "readwrite");
  const objectStore = transaction.objectStore("objects");

  const data = {
    id: Date.now(),
    name: "Sample Data",
    value: Math.random(),
    __key: "sample.jpg",
    clientRotation: 0 
  };

  const request = objectStore.add(data);

  request.onsuccess = () => {
    readData();
  };

  request.onerror = (event) => {
    console.log("Error adding data: " + event.target.errorCode);
  };
};

const readData = () => {
  if (!dbRef.value) {
    return;
  }

  const db = dbRef.value;
  const transaction = db.transaction("objects", "readonly");
  const objectStore = transaction.objectStore("objects");

  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    dataList.value = event.target.result;
  };

  request.onerror = (event) => {
    console.log("Error reading data: " + event.target.errorCode);
  };
};

const updateData = () => {
  if (!dbRef.value) {
    return;
  }

  const db = dbRef.value;
  const transaction = db.transaction("objects", "readwrite");
  const objectStore = transaction.objectStore("objects");

  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const data = event.target.result;

    if (data.length === 0) {
      return;
    }

    const itemToUpdate = data[0];
    itemToUpdate.name = "Updated Name";
    itemToUpdate.value = Math.random();

    const updateRequest = objectStore.put(itemToUpdate);

    updateRequest.onsuccess = () => {
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
  if (!dbRef.value) {
    return;
  }

  const db = dbRef.value;
  const transaction = db.transaction("objects", "readwrite");
  const objectStore = transaction.objectStore("objects");

  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const data = event.target.result;

    if (data.length === 0) {
      return;
    }

    const idToRemove = data[0].id;
    const deleteRequest = objectStore.delete(idToRemove);

    deleteRequest.onsuccess = () => {
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
  if (!dbRef.value) {
    return;
  }

  try {
    const response = await axios.get("http://0.0.0.0:9191/get_objects");
    const fetchedData = response.data;

    if (!Array.isArray(fetchedData)) {
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
          objectStore.delete(localItem.id);
        }
      });

      fetchedData.forEach((item) => {
        if (!item.hasOwnProperty("id")) {
          return;
        }
        const request = objectStore.put(item);
        request.onerror = (event) => {
          console.error(
            "Error adding/updating fetched data:",
            event.target.errorCode,
            item
          );
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

const draggable = true;
const throttleDrag = 1;
const edgeDraggable = false;
const startDragRotate = 0;
const throttleDragRotate = 0;
const scalable = true;
const keepRatio = false;
const throttleScale = 0;
const renderDirections = ["nw", "n", "ne", "w", "e", "sw", "s", "se"];
const rotatable = true;
const throttleRotate = 0;
const rotationPosition = "top";

const onDrag = (e) => {
  e.target.style.transform = e.transform;
};

const onScale = (e) => {
  e.target.style.transform = e.drag.transform;
};

const onRotate = (e) => {
  e.target.style.transform = e.drag.transform;
};
</script>

<style scoped>
.container {
  position: relative;
}

.target {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  text-align: center;
  line-height: 100px;
  position: absolute;
}

.moveable-label {
  position: absolute;
  top: -20px;
  left: 0;
  width: 100%;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
}
</style>
