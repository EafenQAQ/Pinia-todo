<template>
  <div class="w-full max-w-2xl mx-auto p-4">
    <div v-if="filter === 'myDay'" class="mb-6">
      <form @submit.prevent="handleSubmit" class="flex gap-2">
        <input 
          v-model="newTask"
          type="text" 
          placeholder="Add a new task..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
        >
        <button 
          type="submit"
          class="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          Add Task
        </button>
      </form>
    </div>

    <div class="space-y-4">
      <div v-for="task in filteredTasks" :key="task.id" 
        class="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div class="flex items-center gap-3">
          <input 
            type="checkbox"
            :checked="task.isCompleted"
            @change="taskStore.toggleCompleted(task.id)"
            class="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
          >
          <button 
            @click="taskStore.toggleFav(task.id)"
            class="text-yellow-400 hover:text-yellow-500"
          >
            <span v-if="task.isFav">★</span>
            <span v-else>☆</span>
          </button>
          <span :class="{'line-through text-gray-400': task.isCompleted}">{{ task.title }}</span>
        </div>
        <button 
          @click="taskStore.deleteTask(task.id)"
          class="text-red-500 hover:text-red-600"
        >
          Delete
        </button>
      </div>
    </div>

    <div class="mt-6 text-center text-gray-600">
      <p>显示任务: {{ filteredTasks.length }} 项</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/todoStores'

const props = defineProps({
  filter: {
    type: String,
    default: 'myDay'
  }
})

const taskStore = useTaskStore()
const newTask = ref('')

const filteredTasks = computed(() => {
  switch (props.filter) {
    case 'completed':
      return taskStore.tasks.filter(task => task.isCompleted)
    case 'important':
      return taskStore.tasks.filter(task => task.isFav)
    case 'myDay':
    default:
      return taskStore.tasks.filter(task => !task.isCompleted)
  }
})

const handleSubmit = () => {
  if (newTask.value.trim()) {
    taskStore.addTask(newTask.value.trim())
    newTask.value = ''
  }
}
</script> 