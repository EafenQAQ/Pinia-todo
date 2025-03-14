<template>
    <div >
      <form class="flex flex-1 justify-center gap-2 items-center" @submit.prevent="handleSubmit">
        <input 
        v-model="newTask"
          class="w-full px-4 outline-none border-2 border-Pina p-2 focus:rounded-md focus:shadow-xl hover:shadow-xl rounded-2xl ease-in duration-150"
          type="text" placeholder="今天要做点什么..."
        >
        <button><i class="material-icons bg-Pina text-white h-[50%] rounded-xl cursor-pointer hover:transform hover:scale-120 ease-in-out duration-150">add</i></button>
      </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/todoStores';
import { uid } from 'uid';

const taskStore = useTaskStore();
const newTask = ref('');
const handleSubmit =() => {
  if(newTask.value !== '') {
    taskStore.addTask({
        title: newTask.value,
        isFav: false,
        id: uid(),
    })
    newTask.value = '';
}
}

</script>
