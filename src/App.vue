<template>
  <main class="min-h-screen bg-gray-100">
    <header class="w-full bg-gray-200 flex flex-1 items-center h-[125px] justify-center ">
      <div class="logo-title-container flex items-center gap-5 hover:cursor-pointer" @click="triggerShake">
        <img 
          class="max-w-[60px] rotate-350 logo"
          src="./assets/pinia-logo.svg" alt="Logo">
        <h1 class="text-5xl rotate-2 font-semibold font-fragility text-gray-500 title">Pinia todo</h1>
      </div>
    </header>
    
    <NavBar />
    <Transition name="fade" mode="out-in">
      <router-view></router-view>
    </Transition>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import shakeSound from '@/assets/sound/shake-sound.mp3'

const triggerShake = () => {
  const logoTitleContainer = document.querySelector('.logo-title-container')
  logoTitleContainer.classList.add('shake-animation')
  setTimeout(() => {
    logoTitleContainer.classList.remove('shake-animation')
  }, 500) // 动画持续时间

  // 播放抖动音效
  const audio = new Audio(shakeSound);
  audio.play();
}
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

@keyframes shake {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-10px, -10px); }
  75% { transform: translate(10px, 10px); }
}

.shake-animation {
  animation: shake 1s ease-in-out;
}
</style>