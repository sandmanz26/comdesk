<template>
  <div class="flex flex-1 overflow-hidden bg-white">
    <!-- Left sub-nav -->
    <div class="w-60 shrink-0 border-r border-gray-200 overflow-y-auto py-4">
      <nav class="mb-4">
        <button
          v-for="item in integrationNavItems" :key="item.id"
          @click="activeNav = item.id"
          :class="['flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-gray-100',
            activeNav === item.id ? 'text-gray-800 font-medium bg-gray-50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700']"
        >
          <!-- Zapier icon -->
          <span v-if="item.icon === 'zapier'" class="w-5 h-5 flex items-center justify-center bg-orange-500 rounded text-white text-xs font-bold">Z</span>
          <!-- Cloud icon (Salesforce) -->
          <span v-else-if="item.icon === 'cloud'" class="w-5 h-5 flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 10A4.5 4.5 0 0111 5.5c1.47 0 2.78.71 3.6 1.8A3.5 3.5 0 0118 10.5c0 .17-.01.34-.03.5H18a3 3 0 010 6H6.5a4 4 0 010-8z"/></svg>
          </span>
          <!-- Orange circle (HubSpot) -->
          <span v-else-if="item.icon === 'orange'" class="w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs font-bold">H</span>
          <!-- Yellow circle (Kintone) -->
          <span v-else-if="item.icon === 'yellow'" class="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xs font-bold">K</span>
          {{ item.label }}
        </button>
      </nav>

      <p class="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">APIs</p>
    </div>

    <!-- Main content -->
    <div class="flex-1 overflow-y-auto p-6">

      <!-- Zapier -->
      <template v-if="activeNav === 'zapier'">
        <!-- Header row -->
        <div class="flex items-center gap-3 mb-4">
          <span class="text-yellow-400 text-xl">★</span>
          <span class="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded">#Installed</span>
          <span class="w-6 h-6 flex items-center justify-center bg-orange-500 rounded text-white text-xs font-bold">Z</span>
          <h2 class="text-lg font-semibold text-gray-800">Zapier</h2>
        </div>

        <!-- Add button -->
        <button class="w-10 h-10 border-2 border-gray-300 rounded flex items-center justify-center text-gray-500 hover:bg-gray-50 text-xl mb-5">+</button>

        <!-- Info box -->
        <div class="bg-gray-100 rounded p-4 max-w-xl mb-6 text-sm">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-gray-500 w-36 shrink-0">Tenant</span>
            <span class="text-gray-700">: {{ zapierInfo.tenant }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-500 w-36 shrink-0">Integration API Key</span>
            <span class="text-gray-700">: {{ zapierInfo.apiKey }}</span>
          </div>
        </div>

        <!-- Trigger settings -->
        <h3 class="text-base font-semibold text-gray-700 mb-3">Trigger settings</h3>
        <div class="space-y-3 max-w-2xl">
          <div
            v-for="trigger in zapierTriggers" :key="trigger.id"
            class="border border-gray-200 rounded p-4"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <p class="font-semibold text-gray-800 text-sm">{{ trigger.title }}</p>
                <p class="text-sm text-gray-500 mt-0.5">{{ trigger.description }}</p>
                <a href="#" class="text-blue-500 text-xs mt-1 inline-block hover:underline">INTEGRATION TEST</a>
              </div>
              <div class="flex items-center gap-2 ml-4 shrink-0">
                <button class="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"/></svg>
                </button>
                <button class="text-gray-400 hover:text-red-500 transition-colors">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
                </button>
                <span class="text-xs text-gray-400 ml-2">Created on {{ trigger.createdOn }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Other integrations placeholder -->
      <template v-else>
        <h2 class="text-lg font-semibold text-gray-800 mb-4">{{ integrationNavItems.find(i => i.id === activeNav)?.label }}</h2>
        <p class="text-sm text-gray-400">No configuration available.</p>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { integrationNavItems, zapierTriggers, zapierInfo } from '@/data/integrationData.js'

const activeNav = ref('zapier')
</script>
