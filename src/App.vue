<template>
  <main class="min-h-screen bg-gray-100">
    <header class="w-full">
      <div class="bg-gray-200 flex flex-1 w-full items-center h-[125px] gap-5 justify-center">
        <img 
          class="max-w-[60px] rotate-350"
          src="./assets/pinia-logo.svg" alt="Logo">
        <h1 class="text-5xl rotate-2 font-semibold font-fragility text-gray-500">Pinia todo</h1>
      </div>
    </header>
    
    <NavBar />
    <Transition name="fade" mode="out-in">
      <router-view></router-view>
    </Transition>
  </main>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap');

.font-Raleway {
  font-family: 'Raleway', sans-serif;
}

.font-fragility {
  font-family: 'Fragility', cursive;
}

/* 路由过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>