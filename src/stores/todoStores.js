import { defineStore } from "pinia";
import { ref, watch, computed } from 'vue'

// 从 localStorage 获取初始数据
const getInitialTasks = () => {
    const savedTasks = localStorage.getItem('pinia-todo-tasks')
    return savedTasks ? JSON.parse(savedTasks) : [
        {id: 1, title: "buy some milk", isFav: false, isCompleted: false}, 
        {id: 2, title: "play Gloomhaven", isFav: true, isCompleted: false}
    ]
}

export const useTaskStore = defineStore('taskStore', () => {
    // 状态
    const tasks = ref(getInitialTasks())
    const name = ref('Yoshi')

    // 监听任务变化并保存到 localStorage
    watch(
        tasks,
        (newTasks) => {
            localStorage.setItem('pinia-todo-tasks', JSON.stringify(newTasks))
        },
        { deep: true }
    )

    // Getters
    const favs = computed(() => tasks.value.filter(task => task.isFav))
    const favCount = computed(() => tasks.value.filter(task => task.isFav).length)
    const totalCount = computed(() => tasks.value.length)
    const completedCount = computed(() => tasks.value.filter(task => task.isCompleted).length)

    // Actions
    function addTask(title) {
        const newId = Math.max(...tasks.value.map(t => t.id), 0) + 1
        const newTask = {
            id: newId,
            title,
            isFav: false,
            isCompleted: false
        }
        tasks.value.push(newTask)
    }

    function deleteTask(id) {
        tasks.value = tasks.value.filter(task => task.id !== id)
    }

    function toggleFav(id) {
        const task = tasks.value.find(task => task.id === id)
        if (task) {
            task.isFav = !task.isFav
        }
    }

    function toggleCompleted(id) {
        const task = tasks.value.find(task => task.id === id)
        if (task) {
            task.isCompleted = !task.isCompleted
        }
    }

    // 清除所有数据
    function clearAllTasks() {
        tasks.value = []
        localStorage.removeItem('pinia-todo-tasks')
    }

    // 重置为默认数据
    function resetToDefault() {
        tasks.value = [
            {id: 1, title: "buy some milk", isFav: false, isCompleted: false}, 
            {id: 2, title: "play Gloomhaven", isFav: true, isCompleted: false}
        ]
    }

    return {
        // 状态
        tasks,
        name,
        // Getters
        favs,
        favCount,
        totalCount,
        completedCount,
        // Actions
        addTask,
        deleteTask,
        toggleFav,
        toggleCompleted,
        clearAllTasks,
        resetToDefault
    }
})