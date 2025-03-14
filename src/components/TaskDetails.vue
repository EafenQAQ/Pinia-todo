<template>
    <div 
      class="flex items-between justify-between gap-5 m-5 p-5 bg-gray-200 max-w-md w-full rounded:"
      >
        <p>{{ task.title }}</p>

        <div class="">
            <i class="material-icons">delete</i>
            <i class="material-icons">favorite</i>
        </div>
    </div>
</template>

<script setup>
defineProps({
    task: {
        type: Object,
        default: () => {},
    }

}) 

</script>

