<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Toolbar -->
    <div class="flex items-center gap-2 px-4 py-2.5 border-b border-gray-200 bg-white shrink-0">
      <!-- Search input -->
      <div class="relative">
        <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35"/></svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="pl-8 pr-3 py-1.5 border border-gray-300 rounded text-sm outline-none focus:border-blue-400 w-48"
        />
      </div>

      <!-- Edit button -->
      <button class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-amber-400 hover:bg-amber-500 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"/></svg>
        edit
      </button>

      <!-- Delete button -->
      <button class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-red-400 hover:bg-red-500 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
        delete
      </button>

      <div class="flex-1" />

      <!-- Right tabs -->
      <div class="flex items-center gap-1">
        <button
          @click="activeTab = 'keywords'"
          :class="['px-3 py-1.5 text-sm font-medium rounded transition-colors',
            activeTab === 'keywords' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700 border border-gray-200']"
        >Keyword settings</button>
        <button
          @click="activeTab = 'history'"
          :class="['px-3 py-1.5 text-sm font-medium rounded transition-colors',
            activeTab === 'history' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700 border border-gray-200']"
        >Detection history</button>
      </div>
    </div>

    <!-- Keyword settings table -->
    <div v-if="activeTab === 'keywords'" class="flex-1 overflow-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="sticky top-0 z-10 bg-white border-b-2 border-gray-200">
          <tr>
            <th class="px-4 py-2.5 w-10 bg-white">
              <input type="checkbox" class="accent-blue-600" @change="toggleAll" :checked="allSelected" />
            </th>
            <th class="px-4 py-2.5 text-left font-semibold text-gray-700 bg-white">keyword</th>
            <th class="px-4 py-2.5 text-left font-semibold text-gray-600 bg-white">Applicable range</th>
            <th class="px-4 py-2.5 text-left font-semibold text-gray-600 bg-white">Detection destination</th>
            <th class="px-4 py-2.5 text-left font-semibold text-gray-600 bg-white">Notification destination</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in filteredRows" :key="row.id"
            @click="row.selected = !row.selected"
            :class="['border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer',
              row.selected ? 'bg-blue-50' : '']"
          >
            <td class="px-4 py-2.5" @click.stop>
              <input type="checkbox" v-model="row.selected" class="accent-blue-600" />
            </td>
            <td class="px-4 py-2.5 font-semibold text-gray-800">{{ row.keyword }}</td>
            <td class="px-4 py-2.5 text-gray-600">{{ row.applicableRange }}</td>
            <td class="px-4 py-2.5 text-gray-600">{{ row.detectionDestination }}</td>
            <td class="px-4 py-2.5 text-gray-500">{{ row.notificationDestination }}</td>
          </tr>
          <tr v-if="filteredRows.length === 0">
            <td colspan="5" class="px-4 py-8 text-center text-gray-400 text-sm">No keywords found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Detection history -->
    <div v-else class="flex-1 flex items-center justify-center text-gray-400 text-sm">
      Detection history — coming soon
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { keywordRows } from '@/data/keywordData.js'

const activeTab = ref('keywords')
const searchQuery = ref('')
const rows = ref(keywordRows.map(r => ({ ...r })))

const filteredRows = computed(() => {
  if (!searchQuery.value.trim()) return rows.value
  const q = searchQuery.value.toLowerCase()
  return rows.value.filter(r =>
    r.keyword.toLowerCase().includes(q) ||
    r.notificationDestination.toLowerCase().includes(q)
  )
})

const allSelected = computed(() => rows.value.length > 0 && rows.value.every(r => r.selected))

function toggleAll(e) {
  rows.value.forEach(r => { r.selected = e.target.checked })
}
</script>
