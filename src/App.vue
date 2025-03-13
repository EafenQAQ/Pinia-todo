<template>
  <main class="font-Raleway flex flex-col items-center justify-center">
    <header class="w-full">
      <div class="bg-gray-200 flex flex-1 w-full items-center h-[125px] gap-5 justify-center">
        <img 
          class="max-w-[60px] rotate-350"
          src="./assets/pinia-logo.svg" alt="Logo">
        <h1 class="text-5xl rotate-2 font-semibold font-fragility text-gray-500">Pinia todo</h1>
      </div>
    </header>
   
  </main>
</template>

<script setup>
import { useTaskStore } from './stores/todoStores';

const taskStore = useTaskStore();
</script>

<style>

</style>