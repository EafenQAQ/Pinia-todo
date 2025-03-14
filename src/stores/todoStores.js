import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [
            {id: 1, title: "buy some milk", isFav: false}, 
            {id: 2, title: "play Gloomhaven", isFav:true}
        ],
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
    }
})