<template>
  <header class="bg-white border-b border-gray-200 px-5 py-2.5 flex items-center justify-between shrink-0 z-10">
    <!-- Logo + Mode buttons -->
    <div class="flex items-center gap-4">
      <RouterLink to="/dashboard" class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-full bg-brand flex items-center justify-center">
          <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
        </div>
        <span class="text-brand font-semibold text-base tracking-tight">comdesk lead</span>
      </RouterLink>

      <div class="flex items-center gap-1 bg-gray-100 rounded-full p-0.5">
        <button
          @click="$emit('modeChange', 'mobile')"
          :class="[
            'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
            modelValue === 'mobile'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >IP line</button>
        <button
          @click="$emit('modeChange', 'auto')"
          :class="[
            'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
            modelValue === 'auto'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >Auto mode</button>
      </div>
    </div>

    <!-- Right actions -->
    <div class="flex items-center gap-3">
      <!-- Calendar -->
      <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
        </svg>
      </button>

      <!-- Bell + notification dropdown -->
      <div class="relative" ref="bellRef">
        <button
          @click="showNotifications = !showNotifications"
          class="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
          :class="showNotifications ? 'bg-gray-100 text-gray-600' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
          </svg>
        </button>

        <!-- Notification dropdown -->
        <Transition name="notif">
          <div
            v-if="showNotifications"
            class="absolute right-0 top-full mt-1 w-[520px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <div
              v-for="(n, i) in notifications"
              :key="i"
              class="flex items-start gap-3 px-4 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <!-- Icon -->
              <div v-if="n.type === 'error'" class="w-8 h-8 rounded flex items-center justify-center bg-red-500 shrink-0 mt-0.5">
                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div v-else class="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 shrink-0 mt-0.5">
                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"/>
                </svg>
              </div>
              <!-- Message -->
              <p class="flex-1 text-sm text-gray-700 leading-relaxed">{{ n.message }}</p>
              <!-- Timestamp -->
              <span class="text-xs text-blue-500 whitespace-nowrap mt-0.5 shrink-0">{{ n.timestamp }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Click-outside backdrop -->
    <div v-if="showNotifications" class="fixed inset-0 z-40" @click="showNotifications = false" />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { notifications } from '@/data/notificationData.js'

defineProps({ modelValue: { type: String, default: 'mobile' } })
defineEmits(['modeChange'])

const showNotifications = ref(false)
</script>

<style scoped>
.notif-enter-active, .notif-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.notif-enter-from, .notif-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
