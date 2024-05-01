<template>
  <!-- Create Item -->
  <v-card class="overflow-y-auto" max-height="400">
    <v-banner
      class="justify-left text-h5 font-weight-light"
      sticky
      style="font-size: 20px"
    >
      Objects
      <v-spacer></v-spacer>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="createItem"
        >Create</v-btn
      >
    </v-banner>

    <v-dialog v-model="dialog_create" max-width="480">
      <v-card title="Create Item">
        <template v-slot:text>
          <v-btn
            prepend-icon="mdi-upload"
            class="my-2"
            text="Upload"
            @click="uploadItem"
          ></v-btn>

          <v-btn
            prepend-icon="mdi-folder"
            class="my-2"
            text="Existing N/A"
            @click="dialog_existing = true"
          ></v-btn>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="text"
            @click="dialog_create = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Upload dialog TODO split up -->
    <v-dialog v-model="dialog_upload" max-width="480">
    <v-card>
      <v-card-title>Upload item</v-card-title>
      <v-card-text>
        <v-file-input
          ref="fileInput"
          v-model="selectedFiles"
          multiple
          chips
          show-size
          accept="image/*, video/*"
          label="File input"
          variant="solo-filled"
        ></v-file-input>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="uploadFiles">Upload</v-btn>
        <v-btn text @click="dialog_upload = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

    <!-- Objects -->
    <v-list-item
      v-for="(item, index) in items"
      :key="index"
      link
      :title="item.title"
    >
      <div>
        <v-icon
          :icon="item.icon"
          @click="handleIconClick(index)"
          class="icon-spacing"
        ></v-icon>

        <v-icon
          :icon="item.isVisible ? 'mdi-eye-off' : 'mdi-eye'"
          @click="toggleVisibility(index)"
          class="icon-spacing"
        ></v-icon>

        <v-icon
          :icon="item.lockIcon"
          @click="toggleLock(index)"
          class="icon-spacing"
        ></v-icon>

        <v-icon
          icon="mdi-trash-can"
          @click="deleteItem(index)"
          class="icon-spacing"
        ></v-icon>

        <v-dialog v-model="dialog" max-width="400" persistent>
          <v-card
            text="Are you sure you want to delete this item?"
            title="Confirmation"
          >
            <template v-slot:actions>
              <v-spacer></v-spacer>
              <v-btn @click="cancelDelete"> No </v-btn>
              <v-btn @click="confirmDelete(index)"> Yes </v-btn>
            </template>
          </v-card>
        </v-dialog>
      </div>
    </v-list-item>
  </v-card>
</template>

<script>
import WidgetScript from "./WidgetScript.ts";

export default {
  ...WidgetScript,
  
};
</script>
