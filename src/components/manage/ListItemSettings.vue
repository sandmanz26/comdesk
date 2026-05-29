<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Tabs -->
    <div class="flex items-end border-b border-gray-200 shrink-0 px-2">
      <button
        v-for="tab in tabs" :key="tab.id"
        @click="activeTab = tab.id"
        :class="['px-4 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap',
          activeTab === tab.id ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-700']"
      >{{ tab.label }}</button>
      <div class="flex-1 border-b-2 border-transparent" />
      <button class="mb-1 w-6 h-6 flex items-center justify-center text-sm text-white bg-blue-500 rounded hover:bg-blue-600">+</button>
    </div>

    <!-- List Item Management tab -->
    <div v-if="activeTab === 'list-items'" class="flex-1 overflow-auto">
      <table class="w-full border-collapse" style="font-size:11px">
        <thead class="sticky top-0 z-10 bg-white border-b border-gray-300">
          <tr>
            <th class="px-2 py-2 w-10 text-left font-semibold text-gray-600 bg-white border-r border-gray-200">edit</th>
            <th class="px-2 py-2 w-12 text-left font-semibold text-gray-600 bg-white border-r border-gray-200">valid</th>
            <th class="px-2 py-2 text-left font-semibold text-gray-600 bg-white border-r border-gray-200 min-w-[200px]">Display label</th>
            <th class="px-2 py-2 text-left font-semibold text-gray-600 bg-white border-r border-gray-200 min-w-[180px]">Item name</th>
            <th class="px-2 py-2 text-left font-semibold text-gray-600 bg-white border-r border-gray-200 min-w-[90px]">category</th>
            <th class="px-2 py-2 text-left font-semibold text-gray-600 bg-white border-r border-gray-200 min-w-[140px]">Data type</th>
            <th class="px-2 py-2 text-left font-semibold text-gray-600 bg-white min-w-[200px]"></th>
          </tr>
        </thead>
        <tbody>
          <!-- Standard Items group -->
          <tr class="bg-gray-100 border-b border-gray-200">
            <td colspan="7" class="px-2 py-1.5 text-xs font-semibold text-gray-600">Standard Items</td>
          </tr>
          <tr v-for="item in standardItems" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="px-2 py-1.5 border-r border-gray-100">
              <button class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"/></svg>
              </button>
            </td>
            <td class="px-2 py-1.5 border-r border-gray-100">
              <button :class="['relative inline-flex w-8 h-5 rounded-full transition-colors', item.valid ? 'bg-blue-500' : 'bg-gray-300']">
                <span :class="['absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform', item.valid ? 'translate-x-3.5' : 'translate-x-0.5']" />
              </button>
            </td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-700 truncate max-w-[200px]">{{ item.displayLabel }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 truncate max-w-[180px]">{{ item.itemName }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-500">{{ item.category }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600">{{ item.dataType }}</td>
            <td class="px-2 py-1.5 text-gray-400 truncate max-w-[200px]">{{ item.options }}</td>
          </tr>

          <!-- Custom Fields group -->
          <tr class="bg-gray-100 border-b border-gray-200">
            <td colspan="7" class="px-2 py-1.5 text-xs font-semibold text-gray-600">Custom Fields</td>
          </tr>
          <tr v-for="item in customFields" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="px-2 py-1.5 border-r border-gray-100">
              <button v-if="item.category !== 'Initial item'" class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
              </button>
              <button v-else class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"/></svg>
              </button>
            </td>
            <td class="px-2 py-1.5 border-r border-gray-100">
              <button :class="['relative inline-flex w-8 h-5 rounded-full transition-colors', item.valid ? 'bg-blue-500' : 'bg-gray-300']">
                <span :class="['absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform', item.valid ? 'translate-x-3.5' : 'translate-x-0.5']" />
              </button>
            </td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-700 truncate max-w-[200px]">{{ item.displayLabel }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 truncate max-w-[180px]">{{ item.itemName }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-500">{{ item.category }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600">{{ item.dataType }}</td>
            <td class="px-2 py-1.5 text-gray-400 truncate max-w-[200px]">{{ item.options }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Other tabs: reuse ActivityResultSettings logic inline -->
    <div v-else class="flex-1 flex items-center justify-center text-gray-400 text-sm">
      {{ tabs.find(t => t.id === activeTab)?.label }} — select List Item Management tab to view fields
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { standardItems, customFields } from '@/data/listItemData.js'

const tabs = [
  { id: 'respondent', label: 'Activity results (respondent)' },
  { id: 'status',     label: 'Activity results (status)' },
  { id: 'list-items', label: 'List Item Management' },
]
const activeTab = ref('list-items')
</script>
