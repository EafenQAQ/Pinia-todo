<template>
  <input 
    type="checkbox"
    :checked="task.isCompleted"
    @change="$emit('toggle')"
    class="w-5 h-5 text-pink-500 rounded focus:ring-pink-500 transition-all duration-200 hover:scale-110"
  >
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle'])
</script> 