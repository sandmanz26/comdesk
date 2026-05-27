<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40" @click="$emit('close')" />

      <div class="relative bg-white rounded-lg shadow-xl w-[580px] max-h-[600px] flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 class="text-base font-medium text-gray-800 flex-1 text-center">{{ title }}</h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- List -->
        <div class="flex-1 overflow-y-auto border-b border-gray-200">
          <!-- Full list row -->
          <div
            class="px-5 py-3 text-sm cursor-pointer select-none border-b border-gray-100"
            :class="selected === '__all__' ? 'bg-gray-200 font-semibold text-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            @click="selected = '__all__'"
          >
            Full list
          </div>
          <!-- Item rows -->
          <div
            v-for="(item, i) in items"
            :key="i"
            class="px-5 py-3 text-sm cursor-pointer select-none border-b border-gray-50"
            :class="selected === item ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'"
            @click="selected = item"
          >
            {{ item }}
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 px-6 py-4 bg-white shrink-0">
          <button
            @click="$emit('close')"
            class="flex items-center gap-1.5 px-5 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
            </svg>
            cancel
          </button>
          <button
            @click="$emit('select', selected); $emit('close')"
            class="flex items-center gap-1.5 px-6 py-2 text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded transition-colors"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
            search
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  items: { type: Array, required: true },
})

defineEmits(['close', 'select'])

const selected = ref('__all__')
</script>
