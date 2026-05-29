<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Tabs -->
    <div class="flex items-end border-b border-gray-200 shrink-0 px-4">
      <button
        v-for="tab in tabs" :key="tab.id"
        @click="activeTab = tab.id"
        :class="['px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
          activeTab === tab.id ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700']"
      >{{ tab.label }}</button>
    </div>

    <!-- Pipeline Stage Management -->
    <div v-if="activeTab === 'stages'" class="flex-1 overflow-auto relative">
      <table class="w-full border-collapse" style="font-size:11px">
        <thead class="sticky top-0 z-10 bg-white border-b border-gray-300">
          <tr>
            <th class="px-2 py-2 w-10 text-left font-semibold text-gray-600 bg-white border-r border-gray-200">edit</th>
            <th class="px-2 py-2 w-12 text-left font-semibold text-gray-600 bg-white border-r border-gray-200">valid</th>
            <th class="px-2 py-2 text-left font-semibold text-gray-600 bg-white border-r border-gray-200 min-w-[180px]">Display label</th>
            <th class="px-2 py-2 text-left font-semibold text-gray-600 bg-white border-r border-gray-200 min-w-[160px]">Field reference value</th>
            <th class="px-2 py-2 text-left font-semibold text-gray-600 bg-white border-r border-gray-200 min-w-[140px]">Data type</th>
            <th class="px-2 py-2 text-left font-semibold text-gray-600 bg-white min-w-[200px]">Data values</th>
          </tr>
        </thead>
        <tbody>
          <!-- Standard Items -->
          <tr class="bg-gray-100 border-b border-gray-200">
            <td colspan="6" class="px-2 py-1.5 text-xs font-semibold text-gray-600">Standard Items</td>
          </tr>
          <tr v-for="item in standardItems" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="px-2 py-1.5 border-r border-gray-100">
              <!-- standard items: no edit icon -->
            </td>
            <td class="px-2 py-1.5 border-r border-gray-100">
              <button v-if="item.hasToggle" :class="['relative inline-flex w-8 h-5 rounded-full transition-colors', item.valid ? 'bg-blue-500' : 'bg-gray-300']">
                <span :class="['absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform', item.valid ? 'translate-x-3.5' : 'translate-x-0.5']" />
              </button>
            </td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-700">{{ item.displayLabel }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600">{{ item.fieldRef }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600">{{ item.dataType }}</td>
            <td class="px-2 py-1.5 text-gray-400">{{ item.dataValues }}</td>
          </tr>

          <!-- Custom Fields -->
          <tr class="bg-gray-100 border-b border-gray-200">
            <td colspan="6" class="px-2 py-1.5 text-xs font-semibold text-gray-600">Custom Fields</td>
          </tr>
          <tr v-for="item in customFields" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="px-2 py-1.5 border-r border-gray-100">
              <button class="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors">
                <svg class="w-3 h-3 text-gray-600" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd"/></svg>
              </button>
            </td>
            <td class="px-2 py-1.5 border-r border-gray-100">
              <button :class="['relative inline-flex w-8 h-5 rounded-full transition-colors', item.valid ? 'bg-blue-500' : 'bg-gray-300']">
                <span :class="['absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform', item.valid ? 'translate-x-3.5' : 'translate-x-0.5']" />
              </button>
            </td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-700">{{ item.displayLabel }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600">{{ item.fieldRef }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600">{{ item.dataType }}</td>
            <td class="px-2 py-1.5 text-gray-400">{{ item.dataValues }}</td>
          </tr>
        </tbody>
      </table>

      <!-- FAB -->
      <button class="fixed bottom-6 right-6 w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-xl transition-colors z-10">+</button>
    </div>

    <!-- List display order tab -->
    <div v-else class="flex-1 flex items-center justify-center text-gray-400 text-sm">
      List display order — coming soon
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { pipelineStandardItems as standardItems, pipelineCustomFields as customFields } from '@/data/pipelineData.js'

const tabs = [
  { id: 'stages', label: 'Pipeline Stage Management' },
  { id: 'order',  label: 'List display order' },
]
const activeTab = ref('stages')
</script>
