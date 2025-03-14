import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loding: false,
    }),
    getters: {
        favs() {
            return this.tasks.filter(task => task.isFav)
        },
        favCount() {
            return this.tasks.reduce((previewValue, currentValue) => {
                return currentValue.isFav ? previewValue + 1 : previewValue;
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length;
        }
    },
    actions: {
        async getTasks() {
            this.loding = true;
            try {
                const data = await axios.get('http://localhost:300/tasks');
                this.tasks = data.data;
            } catch(err) {
                console.log(err);
            }
            this.loding = false;
        },
        async addTask(task) {
            this.tasks.push(task);
            try {
                await axios.post('http://localhost:300/tasks', task);
            } catch(err) {
                console.log(err);
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find(t => t.id === id);
            task.isFav = !task.isFav;
            try {
                await axios.patch('http://localhost:300/tasks/' + id, { isFav: task.isFav })
            } catch(err) {
                console.log(err);
            }
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter((t) => {
                return t.id !== id;
            });

            try {
                await axios.delete('http://localhost:300/tasks/' + id)
            } catch(err) {
                console.log(err);
            }
            
        }
    }
})