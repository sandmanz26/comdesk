<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/40" @click="$emit('close')" />

      <!-- Modal -->
      <div class="relative bg-white rounded-lg shadow-xl w-[420px] overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 class="text-base font-medium text-gray-800">Project Changes (CSV)</h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Drop zone -->
        <div class="px-6 py-5">
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-gray-400 transition-colors"
            @dragover.prevent
            @drop.prevent="onDrop"
            @click="triggerFileInput"
          >
            <div class="text-gray-300">
              <svg class="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 5.75 5.75 0 011.344 11.095"/>
              </svg>
            </div>
            <div class="text-center">
              <p class="text-lg font-semibold text-gray-700">Drop files in here</p>
              <p class="text-sm text-gray-400 mt-0.5">or</p>
              <p class="text-sm text-gray-400 underline cursor-pointer">click here.</p>
            </div>
            <input ref="fileInput" type="file" accept=".csv" class="hidden" @change="onFileSelect" />
          </div>

          <!-- File name display -->
          <p v-if="selectedFile" class="mt-2 text-xs text-gray-500 truncate">{{ selectedFile.name }}</p>

          <!-- Addition / Delete toggle buttons -->
          <div class="flex mt-4 rounded overflow-hidden border border-gray-200">
            <button
              @click="mode = 'addition'"
              :class="['flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors', mode === 'addition' ? 'bg-amber-400 text-white' : 'bg-white text-gray-500 hover:bg-gray-50']"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              addition
            </button>
            <button
              @click="mode = 'delete'"
              :class="['flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium border-l border-gray-200 transition-colors', mode === 'delete' ? 'bg-amber-400 text-white' : 'bg-white text-gray-500 hover:bg-gray-50']"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.499.058l.346-9z" clip-rule="evenodd"/>
              </svg>
              delete
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
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
            class="flex items-center gap-1.5 px-5 py-2 text-sm text-white bg-amber-400 hover:bg-amber-500 rounded transition-colors"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            execution
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['close'])

const mode = ref('addition')
const selectedFile = ref(null)
const fileInput = ref(null)

function triggerFileInput() {
  fileInput.value?.click()
}

function onFileSelect(e) {
  selectedFile.value = e.target.files[0] || null
}

function onDrop(e) {
  selectedFile.value = e.dataTransfer.files[0] || null
}
</script>
