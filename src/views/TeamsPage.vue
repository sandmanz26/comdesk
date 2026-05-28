<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">

    <!-- Toolbar -->
    <div class="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50 shrink-0">
      <select v-model="displayCount" class="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-600 outline-none cursor-pointer">
        <option value="10">display10</option>
        <option value="20">display20</option>
        <option value="50">display50</option>
        <option value="100">display100</option>
      </select>
      <span class="text-xs text-gray-500">subject</span>
      <button class="flex items-center gap-1 px-2.5 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
        Search form
      </button>
      <div class="flex-1" />
      <button class="px-3 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors">to the next</button>
    </div>

    <!-- Appointment table -->
    <div v-if="section === 'appointment'" class="flex-1 overflow-auto">
      <table class="text-sm w-full border-collapse">
        <thead class="sticky top-0 z-10 bg-white">
          <tr class="border-b-2 border-gray-300">
            <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-white border-r border-gray-200 w-16">#</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 bg-white border-r border-gray-200 min-w-[180px]">Planned titles</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 bg-white border-r border-gray-200 min-w-[160px]">Registration time</th>
            <th class="px-4 py-3 text-center font-semibold text-gray-700 bg-white border-r border-gray-200 min-w-[260px]">customer name</th>
            <th class="px-4 py-3 text-center font-semibold text-gray-700 bg-white border-r border-gray-200 min-w-[160px]">place</th>
            <th class="px-4 py-3 text-right font-semibold text-gray-700 bg-white min-w-[300px]">Scheduled date and time</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in pagedRows"
            :key="row.id"
            class="border-b border-gray-100 hover:bg-blue-50 transition-colors"
          >
            <td class="px-3 py-3 text-gray-600 border-r border-gray-100">{{ row.id }}</td>
            <td class="px-4 py-3 border-r border-gray-100">
              <button class="text-blue-500 hover:underline text-left">{{ row.title }}</button>
            </td>
            <td class="px-4 py-3 text-gray-600 border-r border-gray-100">{{ row.registrationTime }}</td>
            <td class="px-4 py-3 text-center text-gray-600 border-r border-gray-100">{{ row.customerName }}</td>
            <td class="px-4 py-3 text-center text-gray-600 border-r border-gray-100">{{ row.place }}</td>
            <td class="px-4 py-3 text-right text-gray-600">{{ row.scheduledDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Placeholder for other sections -->
    <div v-else class="flex-1 flex items-center justify-center text-gray-400 text-sm">
      {{ sectionLabel }} — coming soon
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { appointmentRows } from '@/data/appointmentData.js'

const route = useRoute()
const section = computed(() => route.params.section || 'appointment')
const displayCount = ref('10')

const sectionLabels = {
  'appointment': 'Appointment',
  'activity-history': 'Activity History',
  'recall-list': 'Recall list',
  'information-sharing': 'Information sharing board',
}
const sectionLabel = computed(() => sectionLabels[section.value] || section.value)

const pagedRows = computed(() =>
  appointmentRows.slice(0, parseInt(displayCount.value))
)
</script>
