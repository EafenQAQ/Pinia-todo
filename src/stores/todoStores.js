import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [
            {id: 1, title: "buy some milk", isFav: false, isCompleted: false}, 
            {id: 2, title: "play Gloomhaven", isFav: true, isCompleted: false}
        ],
        name: "Yoshi"
    }),
    getters: {
        favs: (state) => state.tasks.filter(task => task.isFav),
        favCount: (state) => state.tasks.filter(task => task.isFav).length,
        totalCount: (state) => state.tasks.length,
        completedCount: (state) => state.tasks.filter(task => task.isCompleted).length
    },
    actions: {
        addTask(task) {
            console.log('Adding task:', task)
            const newId = Math.max(...this.tasks.map(t => t.id), 0) + 1
            const newTask = {
                id: newId,
                title: task,
                isFav: false,
                isCompleted: false
            }
            console.log('New task object:', newTask)
            this.tasks.push(newTask)
            console.log('Updated tasks array:', this.tasks)
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id)
        },
        toggleFav(id) {
            const task = this.tasks.find(task => task.id === id)
            if (task) {
                task.isFav = !task.isFav
            }
        },
        toggleCompleted(id) {
            const task = this.tasks.find(task => task.id === id)
            if (task) {
                task.isCompleted = !task.isCompleted
            }
        }
    }
})