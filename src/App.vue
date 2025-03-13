<template>
  <main class="min-h-screen bg-gray-100">
    <header class="w-full">
      <div class="bg-gray-200 flex flex-1 w-full items-center h-[125px] gap-5 justify-center">
        <img 
          class="max-w-[60px] rotate-350"
          src="./assets/pinia-logo.svg" alt="Logo">
        <h1 class="text-5xl rotate-2 font-semibold font-fragility text-gray-500">Pinia todo</h1>
      </div>
    </header>
    
    <TodoList />
  </main>
</template>

<script setup>
import { useTaskStore } from './stores/todoStores';
import TodoList from './components/TodoList.vue';

const taskStore = useTaskStore();
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap');

.font-Raleway {
  font-family: 'Raleway', sans-serif;
}

.font-fragility {
  font-family: 'Fragility', cursive;
}
</style>