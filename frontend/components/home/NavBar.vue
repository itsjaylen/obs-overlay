<template>
  <v-app-bar class="custom-navbar">
    <v-toolbar-title>Overlay</v-toolbar-title>
    <v-spacer></v-spacer>

    <div class="link-container">
      <!-- Link 1 with dropdown menu -->
      <v-btn @mouseenter="menuHome = true" class="dropdown-btn">
        <span class="link-text">Home</span>
        <v-icon
          class="dropdown-icon"
          :class="{ 'rotate-icon': menuHome }"
          size="24"
          >mdi-menu-down</v-icon
        >
        <v-menu
  v-model="menuHome"
  offset-y
  activator="parent"
  :close-on-content-click="false" 
  @mouseleave="menuCloseDelay(1)"
>
          <v-list class="custom-list">
            <v-list-item
              v-for="(item, index) in items1"
              :key="index"
              @click="handleItemClick(item)"
              class="custom-list-item"
            >
              <v-list-item-title class="menu-item-text">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>

      <!-- Link 2 with dropdown menu -->
      <v-btn @mouseenter="menuOpen2 = true" class="dropdown-btn">
        <span class="link-text">Docs</span>
        <v-icon
          class="dropdown-icon"
          :class="{ 'rotate-icon': menuOpen2 }"
          size="24"
          >mdi-menu-down</v-icon
        >
        <v-menu
          v-model="menuOpen2"
          offset-y
          activator="parent"
          :close-on-content-click="false"
          @mouseleave="menuCloseDelay(2)"
        >
          <v-list class="custom-list">
            <v-list-item
              v-for="(item, index) in items2"
              :key="index"
              @click="handleItemClick(item)"
              class="custom-list-item"
            >
              <v-list-item-title class="menu-item-text">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>

      <!-- Link 3 with dropdown menu -->
      <v-btn @mouseenter="menuOpen3 = true" class="dropdown-btn">
        <span class="link-text">About</span>
        <v-icon
          class="dropdown-icon"
          :class="{ 'rotate-icon': menuOpen3 }"
          size="24"
          >mdi-menu-down</v-icon
        >
        <v-menu
          v-model="menuOpen3"
          offset-y
          activator="parent"
          :close-on-content-click="false"
          @mouseleave="menuCloseDelay(3)"
        >
          <v-list class="custom-list">
            <v-list-item
              v-for="(item, index) in items3"
              :key="index"
              @click="handleItemClick(item)"
              class="custom-list-item"
            >
              <v-list-item-title class="menu-item-text">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </div>

    <v-spacer></v-spacer>
    <LoginButton />
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginButton from '@/components/auth/LoginButton.vue';
import { items1, items2, items3, handleItemClick, menuCloseDelay } from '@/components/home/scripts/NavBarData';

// Define Timeout type as number
type Timeout = number;

export default defineComponent({
  name: 'NavBar',
  components: {
    LoginButton,
  },
  setup() {
    const menuHome = ref(false);
    const menuOpen2 = ref(false);
    const menuOpen3 = ref(false);
    let mouseLeaveTimeout: Timeout | null = null;

    const setMenuOpen = (menuNumber: number, isOpen: boolean) => {
      if (menuNumber === 1) {
        menuHome.value = isOpen;
      } else if (menuNumber === 2) {
        menuOpen2.value = isOpen;
      } else if (menuNumber === 3) {
        menuOpen3.value = isOpen;
      }
    };

    const setMouseLeaveTimeout = (timeout: Timeout | any) => {
      mouseLeaveTimeout = timeout;
    };

    return {
      items1,
      items2,
      items3,
      menuHome,
      menuOpen2,
      menuOpen3,
      handleItemClick,
      menuCloseDelay: (menuNumber: number) =>
        menuCloseDelay(menuNumber, setMenuOpen, mouseLeaveTimeout, setMouseLeaveTimeout),
    };
  },
});
</script>




<style lang="scss" scoped>
@import "./styles/NavBar.scss"; // Ensure your SCSS file is imported correctly
</style>
