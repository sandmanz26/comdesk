<template>
  <div class="flex flex-col h-full overflow-hidden bg-white">

    <!-- Sub-tabs -->
    <div class="flex items-center gap-2 px-4 py-2.5 border-b border-gray-200 bg-white shrink-0">
      <button
        @click="activeTab = 'forbidden'"
        :class="activeTab === 'forbidden'
          ? 'bg-amber-500 text-white'
          : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'"
        class="px-4 py-1.5 text-sm font-medium rounded transition-colors"
      >Forbidden number</button>
      <button
        @click="activeTab = 'banned'"
        :class="activeTab === 'banned'
          ? 'bg-amber-500 text-white'
          : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'"
        class="px-4 py-1.5 text-sm font-medium rounded transition-colors"
      >Banned Customers</button>

      <!-- Right: CSV buttons -->
      <div class="flex-1" />
      <button class="flex items-center gap-1.5 px-4 py-1.5 text-sm text-white bg-sky-500 hover:bg-sky-600 rounded transition-colors">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
        </svg>
        CSV Export
      </button>
      <button class="flex items-center gap-1.5 px-4 py-1.5 text-sm text-white bg-sky-500 hover:bg-sky-600 rounded transition-colors">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
        </svg>
        CSV Import
      </button>
    </div>

    <!-- Toolbar -->
    <div class="flex items-center gap-2 px-4 py-1.5 border-b border-gray-200 bg-gray-50 shrink-0">
      <select v-model="displayCount" class="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-600 outline-none cursor-pointer">
        <option value="100">display100</option>
        <option value="50">display50</option>
        <option value="20">display20</option>
      </select>
      <span class="text-xs text-gray-500">subject</span>
      <button class="px-3 py-1 text-xs text-white bg-red-400 hover:bg-red-500 rounded transition-colors">ban lifted</button>
      <button class="flex items-center gap-1 px-3 py-1 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
        search
      </button>
      <div class="flex-1" />
      <span class="text-xs text-gray-500">Display: ({{ displayRows.length }} results)</span>
    </div>

    <!-- Table: Forbidden number -->
    <div v-if="activeTab === 'forbidden'" class="flex-1 overflow-auto">
      <table class="text-sm w-full border-collapse">
        <thead class="sticky top-0 z-10 bg-white">
          <tr class="border-b-2 border-gray-200">
            <th class="px-3 py-3 w-10 bg-white">
              <input type="checkbox" class="rounded w-3.5 h-3.5" @change="toggleAll" />
            </th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 bg-white border-b border-gray-200">telephone number</th>
            <th class="px-4 py-3 text-center font-semibold text-gray-700 bg-white border-b border-gray-200 w-48">Registered users</th>
            <th class="px-4 py-3 text-center font-semibold text-gray-700 bg-white border-b border-gray-200 w-56">Registration date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in pagedRows"
            :key="i"
            class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <td class="px-3 py-3">
              <input type="checkbox" v-model="row.selected" class="rounded w-3.5 h-3.5" />
            </td>
            <td class="px-4 py-3 text-gray-800 font-mono">{{ row.phone }}</td>
            <td class="px-4 py-3 text-center text-gray-600">{{ row.registeredUser }}</td>
            <td class="px-4 py-3 text-center text-gray-600">{{ row.registrationDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table: Banned Customers -->
    <div v-else class="flex-1 overflow-auto">
      <table class="text-sm w-full border-collapse">
        <thead class="sticky top-0 z-10 bg-white">
          <tr class="border-b-2 border-gray-200">
            <th class="px-3 py-3 w-10 bg-white">
              <input type="checkbox" class="rounded w-3.5 h-3.5" />
            </th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 bg-white border-b border-gray-200">Customer name</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 bg-white border-b border-gray-200 w-40">Telephone</th>
            <th class="px-4 py-3 text-center font-semibold text-gray-700 bg-white border-b border-gray-200 w-48">Registered users</th>
            <th class="px-4 py-3 text-center font-semibold text-gray-700 bg-white border-b border-gray-200 w-56">Registration date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in bannedCustomers"
            :key="i"
            class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <td class="px-3 py-3"><input type="checkbox" class="rounded w-3.5 h-3.5" /></td>
            <td class="px-4 py-3 text-gray-800">{{ row.name }}</td>
            <td class="px-4 py-3 text-gray-600 font-mono">{{ row.phone }}</td>
            <td class="px-4 py-3 text-center text-gray-600">{{ row.registeredUser }}</td>
            <td class="px-4 py-3 text-center text-gray-600">{{ row.registrationDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { forbiddenNumbers, bannedCustomers } from '@/data/banListData.js'

const activeTab = ref('forbidden')
const displayCount = ref('100')

const rows = ref(forbiddenNumbers.map(r => ({ ...r, selected: false })))

const displayRows = computed(() =>
  activeTab.value === 'forbidden' ? rows.value : bannedCustomers
)

const pagedRows = computed(() =>
  rows.value.slice(0, parseInt(displayCount.value))
)

function toggleAll(e) {
  rows.value.forEach(r => r.selected = e.target.checked)
}
</script>
