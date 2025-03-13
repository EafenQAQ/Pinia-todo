<template>
  <div class="w-full max-w-2xl mx-auto p-4">
    <div v-if="isMyDayView" class="mb-6">
      <form @submit.prevent="handleSubmit" class="flex gap-2">
        <input 
          v-model="newTask"
          type="text" 
          :placeholder="inputPlaceholder"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
        >
        <button 
          type="submit"
          class="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          {{ addButtonText }}
        </button>
      </form>
    </div>

    <div class="space-y-4">
      <TransitionGroup name="list">
        <div v-for="task in filteredTasks" :key="task.id" 
          class="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          :class="taskItemClasses(task)"
        >
          <div class="flex items-center gap-3">
            <TaskCheckbox 
              :task="task" 
              @toggle="taskStore.toggleCompleted(task.id)"
            />
            <TaskStar 
              :task="task" 
              @toggle="handleStarToggle(task)"
            />
            <span :class="taskTextClasses(task)">{{ task.title }}</span>
          </div>
          <DeleteButton @delete="taskStore.deleteTask(task.id)" />
        </div>
      </TransitionGroup>
    </div>

    <TaskStats 
      :count="filteredTasks.length" 
      :view-type="filter"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/todoStores'
import { useRouter } from 'vue-router'
import TaskCheckbox from './task/TaskCheckbox.vue'
import TaskStar from './task/TaskStar.vue'
import DeleteButton from './task/DeleteButton.vue'
import TaskStats from './task/TaskStats.vue'

const props = defineProps({
  filter: {
    type: String,
    default: 'myDay'
  }
})

const router = useRouter()
const taskStore = useTaskStore()
const newTask = ref('')

// 计算属性
const isMyDayView = computed(() => props.filter === 'myDay')
const inputPlaceholder = computed(() => '添加新的任务...')
const addButtonText = computed(() => '添加任务')

const filteredTasks = computed(() => {
  switch (props.filter) {
    case 'completed':
      return taskStore.tasks.filter(task => task.isCompleted)
    case 'important':
      return taskStore.tasks.filter(task => task.isFav)
    case 'myDay':
    default:
      return taskStore.tasks.filter(task => !task.isCompleted && !task.isFav)
  }
})

// 方法
const handleSubmit = () => {
  if (newTask.value.trim()) {
    taskStore.addTask(newTask.value.trim())
    newTask.value = ''
  }
}

const handleStarToggle = (task) => {
  taskStore.toggleFav(task.id)
  if (props.filter === 'myDay' && task.isFav) {
    // 可以添加过渡动画后再跳转
    setTimeout(() => {
      router.push('/important')
    }, 300)
  }
}

// 样式计算方法
const taskItemClasses = (task) => ({
  'opacity-75': task.isCompleted,
  'transform transition-all duration-300': true
})

const taskTextClasses = (task) => ({
  'line-through text-gray-400': task.isCompleted
})
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style> 