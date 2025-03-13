<template>
  <div class="mt-6 text-center text-gray-600">
    <p>{{ statsText }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  count: {
    type: Number,
    required: true
  },
  viewType: {
    type: String,
    required: true
  }
})

const statsText = computed(() => {
  const typeText = {
    myDay: '今日待办',
    important: '重要事项',
    completed: '已完成事项'
  }[props.viewType] || '任务'
  
  return `${typeText}: ${props.count} 项`
})
</script> 