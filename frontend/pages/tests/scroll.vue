<template>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn @click="scrollTo('item-1')">Go to Item 1</v-btn>
          <v-btn @click="scrollTo('item-2')">Go to Item 2</v-btn>
          <v-btn @click="scrollTo('item-3')">Go to Item 3</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card ref="item-1" class="my-5" id="item-1">
            <v-card-text>Item 1</v-card-text>
          </v-card>
          <v-card ref="item-2" class="my-5" id="item-2">
            <v-card-text>Item 2</v-card-text>
          </v-card>
          <v-card ref="item-3" class="my-5" id="item-3">
            <v-card-text>Item 3</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const itemRefs = {
    'item-1': ref(null),
    'item-2': ref(null),
    'item-3': ref(null)
  }
  
  const scrollTo = (itemId) => {
    const element = itemRefs[itemId].value
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      })
    }
  }
  </script>
  
  <style scoped>
  .my-5 {
    margin: 2rem 0;
  }
  </style>
  