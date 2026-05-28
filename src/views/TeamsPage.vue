<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">

    <!-- ── Appointment ── -->
    <template v-if="section === 'appointment'">
      <!-- Toolbar -->
      <div class="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50 shrink-0">
        <select v-model="apptDisplayCount" class="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-600 outline-none cursor-pointer">
          <option value="10">display10</option>
          <option value="20">display20</option>
          <option value="50">display50</option>
        </select>
        <span class="text-xs text-gray-500">subject</span>
        <button @click="showSearchModal = true" class="flex items-center gap-1 px-2.5 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
          Search form
        </button>
        <div class="flex-1" />
        <button class="px-3 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors">to the next</button>
      </div>

      <!-- Appointment table -->
      <div class="flex-1 overflow-auto">
        <table class="text-sm w-full border-collapse whitespace-nowrap">
          <thead class="sticky top-0 z-10 bg-white">
            <tr class="border-b-2 border-gray-300">
              <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-white border-r border-gray-200 w-16">#</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700 bg-white border-r border-gray-200 min-w-[200px]">Planned titles</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700 bg-white border-r border-gray-200 min-w-[160px]">Registration time</th>
              <th class="px-4 py-3 text-center font-semibold text-gray-700 bg-white border-r border-gray-200 min-w-[280px]">customer name</th>
              <th class="px-4 py-3 text-center font-semibold text-gray-700 bg-white border-r border-gray-200 min-w-[180px]">place</th>
              <th class="px-4 py-3 text-right font-semibold text-gray-700 bg-white min-w-[320px]">Scheduled date and time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in apptPagedRows" :key="row.id" class="border-b border-gray-100 hover:bg-blue-50 transition-colors">
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

      <AppointmentSearchModal v-if="showSearchModal" @close="showSearchModal = false" />
    </template>

    <!-- ── Activity History ── -->
    <template v-else-if="section === 'activity-history'">
      <!-- Toolbar -->
      <div class="flex items-center gap-2 px-3 py-2 border-b border-gray-200 bg-white shrink-0">
        <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"/></svg>
        </button>
        <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
        </button>
        <input type="text" v-model="activitySearch" placeholder="search" class="flex-1 max-w-xs border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-400 text-gray-700 placeholder-gray-400" />
        <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-amber-400 hover:bg-amber-500 rounded transition-colors">
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"/></svg>
          edit
        </button>
      </div>

      <!-- Column headers -->
      <div class="flex-1 overflow-auto">
        <table class="text-xs whitespace-nowrap border-collapse min-w-full">
          <thead class="sticky top-0 z-10 bg-white">
            <tr class="border-b-2 border-gray-200">
              <th class="px-2 py-2.5 w-8 bg-white border-r border-gray-100"></th>
              <th class="px-2 py-2.5 w-8 bg-white border-r border-gray-100"></th>
              <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white border-r border-gray-100 min-w-[150px]">Call date and time</th>
              <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white border-r border-gray-100 min-w-[80px]">Call duration</th>
              <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white border-r border-gray-100 min-w-[100px]">name</th>
              <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white border-r border-gray-100 min-w-[130px]">Destination number</th>
              <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white border-r border-gray-100 min-w-[110px]">Caller ID</th>
              <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white border-r border-gray-100 min-w-[140px]">project</th>
              <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white border-r border-gray-100 min-w-[80px]">Respo...</th>
              <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white border-r border-gray-100 min-w-[80px]">status</th>
              <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white border-r border-gray-100 min-w-[80px]">user</th>
              <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white border-r border-gray-100 min-w-[100px]">Recall scheduled</th>
              <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white min-w-[160px]">Call memo</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in filteredActivity"
              :key="row.id"
              :class="['border-b border-gray-100 hover:bg-blue-50 transition-colors', row.selected ? 'bg-blue-50' : '']"
            >
              <!-- Radio -->
              <td class="px-2 py-2 border-r border-gray-100">
                <input type="radio" name="activity-select" :checked="row.selected" class="accent-blue-600" @change="selectRow(row.id)" />
              </td>
              <!-- Call type icon -->
              <td class="px-2 py-2 border-r border-gray-100">
                <CallTypeIcon :type="row.type" />
              </td>
              <!-- Date/time -->
              <td class="px-3 py-2 border-r border-gray-100 text-blue-600 font-medium">{{ row.dateTime }}</td>
              <td class="px-3 py-2 border-r border-gray-100 text-gray-600">{{ row.duration }}</td>
              <!-- Name -->
              <td class="px-3 py-2 border-r border-gray-100">
                <button v-if="row.name" class="text-blue-500 hover:underline max-w-[100px] truncate text-left block">{{ row.name }}</button>
              </td>
              <!-- Destination number -->
              <td class="px-3 py-2 border-r border-gray-100">
                <div class="flex items-center gap-1">
                  <span class="text-gray-700">{{ row.destinationNumber }}</span>
                  <button class="text-gray-400 hover:text-gray-600" title="Copy">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z"/><path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z"/></svg>
                  </button>
                </div>
              </td>
              <td class="px-3 py-2 border-r border-gray-100 text-gray-600">{{ row.callerId }}</td>
              <td class="px-3 py-2 border-r border-gray-100 text-gray-600 max-w-[140px] truncate">{{ row.project }}</td>
              <td class="px-3 py-2 border-r border-gray-100 text-gray-600 max-w-[80px] truncate">{{ row.respondent }}</td>
              <td class="px-3 py-2 border-r border-gray-100 text-gray-600 max-w-[80px] truncate">{{ row.status }}</td>
              <td class="px-3 py-2 border-r border-gray-100 text-gray-600 max-w-[80px] truncate">{{ row.user }}</td>
              <td class="px-3 py-2 border-r border-gray-100 text-gray-600">{{ row.recallScheduled }}</td>
              <td class="px-3 py-2 text-gray-600 max-w-[160px] truncate">{{ row.memo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ── Other sections placeholder ── -->
    <div v-else class="flex-1 flex items-center justify-center text-gray-400 text-sm">
      {{ sectionLabel }} — coming soon
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { appointmentRows } from '@/data/appointmentData.js'
import { activityRows as rawActivityRows } from '@/data/activityData.js'
import AppointmentSearchModal from '@/components/teams/AppointmentSearchModal.vue'
import CallTypeIcon from '@/components/teams/CallTypeIcon.vue'

const route = useRoute()
const section = computed(() => route.params.section || 'appointment')

const sectionLabels = {
  'appointment':         'Appointment',
  'activity-history':    'Activity History',
  'recall-list':         'Recall list',
  'information-sharing': 'Information sharing board',
}
const sectionLabel = computed(() => sectionLabels[section.value] || section.value)

// Appointment
const showSearchModal = ref(false)
const apptDisplayCount = ref('10')
const apptPagedRows = computed(() => appointmentRows.slice(0, parseInt(apptDisplayCount.value)))

// Activity History
const activitySearch = ref('')
const activityData = ref(rawActivityRows.map(r => ({ ...r })))

const filteredActivity = computed(() => {
  if (!activitySearch.value) return activityData.value
  const q = activitySearch.value.toLowerCase()
  return activityData.value.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.destinationNumber.includes(q) ||
    r.project.toLowerCase().includes(q)
  )
})

function selectRow(id) {
  activityData.value.forEach(r => r.selected = r.id === id)
}
</script>
