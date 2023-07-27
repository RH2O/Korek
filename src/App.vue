<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>

  <header>
    <div class="wrapper">
      <nav class="navbar  element">
        <div class="container">
                   <!-- <RouterLink to="/about">About</RouterLink> -->
        <RouterLink class="navbar-brand" to="/">Where In The World?</RouterLink>
        <button @click="toggleDark()" class="dark-button">
          <i v-if="isDark" class="fa-solid fa-moon"></i>
          <i v-else class="fa-regular fa-moon"></i>
          Dark Mode
        </button>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

.dark-button {
  /* Add your dark mode styles here */
  background-color: transparent;
  padding: 8px;
  border: none;
  outline: none;
}

.dark-button i{
  padding-right: 10px;
  padding-bottom: 5px;
  transform: rotate(-20deg);
}

</style>
