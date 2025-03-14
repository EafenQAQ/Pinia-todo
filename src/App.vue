<template>
  <main class="font-Raleway flex flex-col items-center justify-center w-full">
    <header class="w-full">
      <div class="bg-gray-200 flex flex-1 w-full items-center h-[125px] gap-5 justify-center">
        <img 
          class="max-w-[60px] rotate-350"
          src="./assets/pinia-logo.svg" alt="Logo">
        <h1 class="text-5xl rotate-2 font-semibold font-fragility text-gray-500">Pinia todo</h1>
      </div>
    </header>
    <!-- 导航按钮 -->
    <div>
      <button 
        @click="filter = 'all'"
        class="m-4 py-2 px-4 rounded-md shadow-outline hover:shadow-inner cursor-pointer"
        :class="{ 'bg-Pina': filter === 'all' }"
      >All</button>
      <button 
        :class="{ 'bg-Pina': filter === 'fav' }"
        @click="filter = 'fav'"
        class="m-4 py-2 px-4 rounded-md shadow-outline hover:shadow-inner cursor-pointer"
      >Fav</button>
    </div>
    <!-- taskDetails -->
    
    <div v-if="filter === 'all'" class="felx flex-col text-center justify-center w-full">
      <div
      v-for="task in taskStore.tasks" :key="task.id"
      class="flex flex-col items-center justify-center w-full"
      >
       <TaskDetails :task="task" />
     </div>
         <p>全部代办事项： {{ taskStore.totalCount }}</p>
    </div>
   <!-- FavTasks -->
   <div v-if="filter === 'fav'" class="felx flex-col text-center justify-center w-full">
     <div
       v-for="task in taskStore.favs" :key="task.id"
       class="flex flex-col items-center justify-center w-full"
     >
       <TaskDetails :task="task" />
     </div>
     <p>收藏事项： {{ taskStore.favCount }}</p>
   </div>
   
  </main>
</template>

<script setup>
import { ref } from 'vue';
import TaskDetails from './components/TaskDetails.vue';
import { useTaskStore } from './stores/todoStores';

const taskStore = useTaskStore();

const filter = ref('all');
</script>

<style>

</style>