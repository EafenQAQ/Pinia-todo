<template>
  <button 
    @click="handleClick"
    class="group relative p-1.5 rounded-full hover:bg-yellow-100/50 active:bg-yellow-100 transition-all duration-200"
    :title="buttonTitle"
  >
    <div class="relative">
      <svg 
        :class="[
          'w-5 h-5 transition-all duration-300 transform',
          task.isFav ? 'text-yellow-400 scale-100 rotate-0' : 'text-gray-400 scale-95 rotate-0 group-hover:text-yellow-400'
        ]"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        :fill="task.isFav ? 'currentColor' : 'none'"
        :stroke="task.isFav ? 'none' : 'currentColor'"
        :stroke-width="task.isFav ? '0' : '2'"
      >
        <path 
          :stroke-linecap="task.isFav ? 'unset' : 'round'" 
          :stroke-linejoin="task.isFav ? 'unset' : 'round'"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    </div>
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

const emit = defineEmits(['toggle'])

const buttonTitle = computed(() => 
  props.task.isFav ? '取消标记为重要' : '标记为重要'
)

const handleClick = () => {
  emit('toggle')
}
</script>

<style scoped>
.group:active svg {
  transform: scale(0.85);
}
</style> 