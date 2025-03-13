<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-center space-x-8">
        <router-link 
          to="/my-day"
          class="py-4 px-3 text-gray-700 hover:text-pink-500 font-medium cursor-pointer"
          :class="{ 'text-pink-500 border-b-2 border-pink-500': route.path === '/my-day' }"
        >
          我的一天
        </router-link>
        <router-link 
          to="/important"
          class="py-4 px-3 text-gray-700 hover:text-pink-500 font-medium cursor-pointer"
          :class="{ 'text-pink-500 border-b-2 border-pink-500': route.path === '/important' }"
        >
          重要事项
        </router-link>
        <router-link 
          to="/completed"
          class="py-4 px-3 text-gray-700 hover:text-pink-500 font-medium cursor-pointer"
          :class="{ 'text-pink-500 border-b-2 border-pink-500': route.path === '/completed' }"
        >
          已完成事项
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script> 