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
              ? 'bg-gray-800 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          Mobile network
        </button>
        <button
          @click="$emit('modeChange', 'auto')"
          :class="[
            'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
            modelValue === 'auto'
              ? 'bg-gray-800 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          Auto mode
        </button>
      </div>
    </div>

    <!-- Right actions -->
    <div class="flex items-center gap-3">
      <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
        </svg>
      </button>
      <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
defineProps({ modelValue: { type: String, default: 'mobile' } })
defineEmits(['modeChange'])
</script>
