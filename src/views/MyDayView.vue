<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-6 text-gray-800">我的一天</h1>
    <TodoList :filter="'myDay'" />
  </div>
</template>

<script setup>
import TodoList from '../components/TodoList.vue'
</script> 