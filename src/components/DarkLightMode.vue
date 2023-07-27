<template>
    <button @click="toggleDarkMode">Toggle Dark Mode</button>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const isDarkMode = ref(false);
  
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
  }
  
  watch(isDarkMode, (newValue) => {
    if (newValue) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  });
  </script>
  
  <style>
  /* Styles for the dark mode toggle button can go here */
  </style>
  