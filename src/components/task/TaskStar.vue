<template>
  <button 
    @click="$emit('toggle')"
    class="text-yellow-400 hover:text-yellow-500 transition-all duration-200 hover:scale-110"
    :title="buttonTitle"
  >
    <span v-if="task.isFav" class="text-lg">★</span>
    <span v-else class="text-lg">☆</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle'])

const buttonTitle = computed(() => 
  props.task.isFav ? '取消标记为重要' : '标记为重要'
)
</script> 