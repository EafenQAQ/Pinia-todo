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
          class="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors cursor-pointer"
        >
          {{ addButtonText }}
        </button>
      </form>
    </div>

    <div class="space-y-4 relative">
      <TransitionGroup 
        name="task-list"
        tag="div"
        class="relative"
      >
        <div v-for="task in filteredTasks" :key="task.id" 
          class="flex items-center justify-between p-4 bg-white rounded-lg shadow task-item"
          :class="[taskItemClasses(task), { 'shake-animation': taskToDelete === task.id }]"
          @dblclick="editTask(task)"
          @mousedown="startLongPress(task)"
          @touchstart="startLongPress(task)"
          @mouseup="cancelLongPress"
          @mouseleave="cancelLongPress"
          @touchend="cancelLongPress"
        >
          <div class="flex items-center gap-3">
            <TaskCheckbox 
              :task="task" 
              @toggle="taskChecked(task)"
            />
            <TaskStar 
              :task="task" 
              @toggle="handleStarToggle(task)"
            />
            <span v-if="editingTask !== task.id" :class="taskTextClasses(task)">{{ task.title }}</span>
            <input v-else v-model="task.title" @blur="saveTask(task)" @keyup.enter="saveTask(task)" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500">
          </div>
          <DeleteButton @delete="handleDelete(task.id)" />
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
import checkSound from '@/assets/sound/check-sound.mp3'
import deleteSound from '@/assets/sound/delete-sound.mp3'

const props = defineProps({
  filter: {
    type: String,
    default: 'myDay'
  }
})

const router = useRouter()
const taskStore = useTaskStore()
const newTask = ref('')
const taskToDelete = ref(null)
const editingTask = ref(null) // 用于跟踪正在编辑的任务
const longPressTimeout = ref(null) // 用于跟踪长按定时器

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
}

const handleDelete = async (taskId) => {
  taskToDelete.value = taskId
  await new Promise(resolve => setTimeout(resolve, 400)) // 等待抖动动画
  taskStore.deleteTask(taskId)
  taskToDelete.value = null

  const deleteAudio = new Audio(deleteSound);
  deleteAudio.play();
}

const taskChecked = (task) => {
  taskStore.toggleCompleted(task.id);
  const checkAudio = new Audio(checkSound);
  checkAudio.play();
  console.log('checked!');
}

// 编辑任务
const editTask = (task) => {
  editingTask.value = task.id
}

const saveTask = (task) => {
  editingTask.value = null
  taskStore.updateTask(task)
}

// 长按事件处理
const startLongPress = (task) => {
  longPressTimeout.value = setTimeout(() => {
    editTask(task)
  }, 500) // 长按时间阈值（500毫秒）
}

const cancelLongPress = () => {
  clearTimeout(longPressTimeout.value)
  longPressTimeout.value = null
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
.task-item {
  transition: all 0.3s ease;
  position: relative;
}

.task-list-enter-active {
  transition: all 0.3s ease-out;
}

.task-list-leave-active {
  transition: all 0.5s ease-in;
  position: absolute;
  width: 100%;
}

.task-list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.task-list-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.task-list-move {
  transition: transform 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake-animation {
  animation: shake 0.4s ease-in-out;
}
</style>