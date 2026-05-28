<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">

    <!-- Banner -->
    <div class="shrink-0 bg-amber-50 border-b border-amber-200 px-6 py-3 text-sm text-amber-900">
      The report page will be integrated into <strong>the dashboard page</strong>. It will no longer be accessible after June 24th, so please contact support if you require it.
    </div>

    <!-- Tabs + filters row -->
    <div class="shrink-0 flex items-center border-b border-gray-200 px-4 bg-white">
      <div class="flex items-end h-full">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['flex items-center gap-1 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap',
            activeTab === tab.id ? 'border-gray-800 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600']"
        >
          {{ tab.label }}
          <svg v-if="tab.hasDropdown" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </button>
      </div>
      <div class="w-px h-8 bg-gray-200 mx-3" />
      <div class="flex items-center gap-2 ml-auto py-2">
        <button class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"/></svg>
        </button>
        <div class="relative">
          <select class="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none appearance-none pr-7 text-gray-700">
            <option>office</option>
          </select>
          <svg class="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </div>
        <div class="relative">
          <select class="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none appearance-none pr-7 text-gray-700">
            <option>unit</option>
          </select>
          <svg class="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </div>
        <button class="flex items-center gap-1.5 border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
          <span>2026/05</span>
          <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
        </button>
      </div>
    </div>

    <!-- Content row -->
    <div class="flex flex-1 overflow-hidden">

      <!-- Left: main chart area -->
      <div class="flex-1 overflow-y-auto p-6">

        <!-- Telephone call section -->
        <div class="mb-4">
          <div class="flex items-center gap-2 mb-4">
            <h2 class="text-xl font-bold text-gray-800">Telephone call</h2>
            <button class="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
            </button>
          </div>

          <!-- Metrics row -->
          <div class="flex border border-gray-200 rounded mb-6">
            <div v-for="(metric, i) in metrics" :key="i"
              :class="['flex-1 px-6 py-4', i < metrics.length - 1 ? 'border-r border-gray-200' : '']">
              <p class="text-xs text-gray-500 mb-1">{{ metric.label }}</p>
              <p class="text-3xl font-bold text-gray-900">{{ metric.value }}</p>
            </div>
          </div>

          <!-- Line chart -->
          <div class="relative">
            <svg width="100%" viewBox="0 0 1000 280" preserveAspectRatio="xMidYMid meet" class="overflow-visible">
              <!-- Grid lines -->
              <g>
                <line v-for="i in 11" :key="i"
                  :x1="40" :y1="10 + (i - 1) * 24"
                  :x2="960" :y2="10 + (i - 1) * 24"
                  stroke="#e5e7eb" stroke-width="1" />
              </g>
              <!-- Y axis labels (right side) -->
              <g font-size="11" fill="#9ca3af" text-anchor="start">
                <text v-for="i in 11" :key="i" :x="968" :y="14 + (10 - (i-1)) * 24">{{ ((i-1) / 10).toFixed(1) }}</text>
              </g>
              <!-- Single data point: one call at day 1 (x ≈ 90) -->
              <rect x="88" y="10" width="8" height="240" fill="#22c55e" opacity="0.85" />
              <!-- X-axis line -->
              <line x1="40" y1="250" x2="960" y2="250" stroke="#d1d5db" stroke-width="1" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Right: Overall Summary sidebar -->
      <div class="w-[300px] shrink-0 border-l border-gray-200 overflow-y-auto p-4 bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-bold text-gray-800">Overall Summary</h3>
          <div class="relative">
            <select class="border border-gray-300 rounded px-2 py-1 text-xs outline-none appearance-none pr-6">
              <option>AI</option>
            </select>
            <svg class="w-3 h-3 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>

        <!-- User card -->
        <div class="bg-gray-800 rounded-lg p-4 mb-3 text-white">
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-semibold">user</span>
            <button class="text-gray-400 hover:text-white">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
            </button>
          </div>
          <p class="text-xs text-gray-400 mb-3">TOP-5</p>
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-sm">
              <span class="text-gray-400 w-4">1</span>
              <span class="flex-1 text-white">Takashi Kawakami</span>
              <span class="text-white font-semibold">1</span>
            </div>
          </div>
          <div class="mt-2 h-0.5 bg-gray-600 rounded">
            <div class="h-0.5 bg-white rounded" style="width:100%"></div>
          </div>
        </div>

        <!-- Group card -->
        <div class="bg-blue-700 rounded-lg p-4 text-white">
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-semibold">group</span>
            <button class="text-blue-300 hover:text-white">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
            </button>
          </div>
          <p class="text-xs text-blue-300 mb-3">TOP-5</p>
          <!-- Office/Unit sub-tabs -->
          <div class="flex border-b border-blue-500 mb-3">
            <button
              v-for="t in ['OFFICE','UNIT']" :key="t"
              @click="groupTab = t"
              :class="['px-3 py-1 text-xs font-semibold border-b-2 transition-colors',
                groupTab === t ? 'border-white text-white' : 'border-transparent text-blue-300 hover:text-white']"
            >{{ t }}</button>
          </div>
          <div v-if="groupTab === 'OFFICE'" class="space-y-2">
            <div class="flex items-center gap-2 text-sm">
              <span class="text-blue-300 w-4">1</span>
              <span class="flex-1 text-white">AWS Migration Test Office</span>
              <span class="text-white font-semibold">0K</span>
            </div>
          </div>
          <div v-else class="text-xs text-blue-300 py-2">No unit data</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('whole')
const groupTab = ref('OFFICE')

const tabs = [
  { id: 'individual', label: 'INDIVIDUAL USER', hasDropdown: false },
  { id: 'by-unit',    label: 'BY UNIT',          hasDropdown: false },
  { id: 'whole',      label: 'WHOLE',             hasDropdown: false },
  { id: 'by-time',    label: 'BY TIME OF DAY',    hasDropdown: true  },
]

const metrics = [
  { label: 'Number of calls',               value: '1' },
  { label: 'Connection rate',               value: '0%' },
  { label: 'Call duration',                 value: '00:00:00' },
  { label: 'MyBox number of calls',         value: '0' },
  { label: 'Number of appointments obtained', value: '0' },
]
</script>
