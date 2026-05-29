<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Toolbar / pagination -->
    <div class="flex items-center px-4 py-2 border-b border-gray-200 shrink-0 text-sm text-gray-600">
      <div class="relative">
        <select v-model="perPage" class="border border-gray-300 rounded px-2 py-1 text-sm outline-none appearance-none pr-7">
          <option :value="50">50</option>
          <option :value="100">100</option>
          <option :value="200">200</option>
        </select>
        <svg class="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </div>
      <div class="flex-1" />
      <span class="mr-4">Page {{ currentPage }} of {{ totalPages }} ({{ totalItems }} items)</span>
      <div class="flex items-center gap-0.5">
        <button @click="currentPage = 1" :disabled="currentPage === 1" class="px-1.5 py-1 rounded hover:bg-gray-100 disabled:opacity-30 text-xs">1</button>
        <button v-for="p in visiblePages" :key="p"
          @click="currentPage = p"
          :class="['px-1.5 py-1 rounded text-xs transition-colors', currentPage === p ? 'text-blue-600 font-semibold' : 'hover:bg-gray-100']"
        >{{ p }}</button>
        <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages" class="px-1.5 py-1 rounded hover:bg-gray-100 disabled:opacity-30 text-xs">›</button>
        <button @click="currentPage = totalPages" :disabled="currentPage === totalPages" class="px-1.5 py-1 rounded hover:bg-gray-100 disabled:opacity-30 text-xs">»</button>
      </div>
    </div>

    <!-- Table -->
    <div class="flex-1 overflow-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="sticky top-0 z-10 bg-white border-b-2 border-gray-200">
          <tr>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 bg-white min-w-[160px]">Date and time</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 bg-white min-w-[140px]">User Name</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 bg-white min-w-[240px]">Login ID</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 bg-white min-w-[80px]">action</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 bg-white min-w-[120px]">Access IP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in pagedLogs" :key="log.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td class="px-4 py-3 text-gray-600">{{ log.dateTime }}</td>
            <td class="px-4 py-3 text-gray-700">{{ log.userName }}</td>
            <td class="px-4 py-3 text-gray-600">{{ log.loginId }}</td>
            <td class="px-4 py-3 text-gray-600">{{ log.action }}</td>
            <td class="px-4 py-3 text-gray-600">{{ log.accessIp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { accessLogs } from '@/data/accessLogData.js'

const perPage = ref(100)
const currentPage = ref(1)
const totalItems = 1527

const totalPages = computed(() => Math.ceil(totalItems / perPage.value))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(2, Math.min(currentPage.value - 1, totalPages.value - 4))
  for (let i = start; i <= Math.min(start + 4, totalPages.value); i++) pages.push(i)
  return pages
})

const pagedLogs = computed(() => accessLogs)
</script>
