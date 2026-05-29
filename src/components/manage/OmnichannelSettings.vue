<template>
  <div class="flex flex-1 overflow-hidden bg-white">
    <!-- Left sub-nav -->
    <div class="w-60 shrink-0 border-r border-gray-200 overflow-y-auto py-4">
      <p class="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Channels</p>
      <nav>
        <button
          v-for="item in navItems" :key="item.id"
          @click="activeNav = item.id"
          :class="['block w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-gray-100',
            activeNav === item.id ? 'text-gray-800 font-medium bg-gray-50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700']"
        >{{ item.label }}</button>
      </nav>
    </div>

    <!-- Main content -->
    <div class="flex-1 overflow-y-auto p-6">
      <!-- SMS Settings -->
      <template v-if="activeNav === 'sms-sender'">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">SMS sender's phone number</h2>
        <button class="w-10 h-10 border-2 border-gray-300 rounded flex items-center justify-center text-gray-500 hover:bg-gray-50 text-xl mb-4">+</button>
        <p class="text-sm text-gray-400">No sender numbers configured.</p>
      </template>

      <template v-else-if="activeNav === 'sms'">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">SMS settings</h2>
        <button class="w-10 h-10 border-2 border-gray-300 rounded flex items-center justify-center text-gray-500 hover:bg-gray-50 text-xl mb-6">+</button>

        <h3 class="text-base font-semibold text-gray-700 mb-3">Template settings</h3>
        <div class="space-y-3 max-w-3xl">
          <div
            v-for="tpl in templates" :key="tpl.id"
            class="border border-gray-200 rounded p-4"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <p v-if="tpl.title" class="font-semibold text-gray-800 text-sm">{{ tpl.title }}</p>
                <p v-if="tpl.body" class="text-sm text-gray-500 mt-0.5">{{ tpl.body }}</p>
              </div>
              <div class="flex items-center gap-2 ml-4 shrink-0">
                <button class="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"/></svg>
                </button>
                <button class="text-gray-400 hover:text-red-500 transition-colors">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
                </button>
                <span class="text-xs text-gray-400 ml-2">Created on {{ tpl.createdOn }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { smsTemplates } from '@/data/omnichannelData.js'

const navItems = [
  { id: 'sms-sender', label: 'SMS (web) sender\'s phone number' },
  { id: 'sms',        label: 'SMS' },
]
const activeNav = ref('sms')
const templates = ref(smsTemplates.map(t => ({ ...t })))
</script>
