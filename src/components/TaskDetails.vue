<template>
    <div 
      class="flex items-between justify-between gap-5 my-2 py-2 px-4 ring-1 ring-gray-200 shadow-md shadow-gray-200
      rounded-md max-w-md w-full"
      >
        <h2 class="font-semibold">{{ task.title }}</h2>

        <div class="">
            <i @click="taskStore.deleteTask(task.id)" class="material-icons cursor-pointer hover:text-Pina">delete</i>
            <i 
              @click="taskStore.toggleFav(task.id)" 
              class="material-icons cursor-pointer hover:text-Pina ease-in duration-200"
              :class="{ 'text-red-500': task.isFav }"
            >favorite</i>
        </div>
    </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/todoStores';
const taskStore = useTaskStore();

const props = defineProps({
    task: {
        type: Object,
        default: () => ({}),
    }
});


</script>

