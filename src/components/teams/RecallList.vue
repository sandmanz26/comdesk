<template>
  <div class="flex flex-col flex-1 overflow-hidden">
    <!-- Toolbar -->
    <div class="flex items-center gap-2 px-3 py-2 border-b border-gray-200 bg-white shrink-0">
      <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"/></svg>
      </button>
      <input
        v-model="search"
        type="text"
        placeholder="Project, Name, Phone Number, Registered User"
        class="flex-1 max-w-lg border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-400 text-gray-700 placeholder-gray-400"
      />
      <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-amber-400 hover:bg-amber-500 rounded transition-colors">
        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"/></svg>
        edit
      </button>
      <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-red-400 hover:bg-red-500 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
        Cancel the call
      </button>
    </div>

    <!-- Table -->
    <div class="flex-1 overflow-auto">
      <table class="text-xs whitespace-nowrap border-collapse min-w-full">
        <thead class="sticky top-0 z-10 bg-white">
          <tr class="border-b-2 border-gray-200">
            <th class="px-2 py-2.5 w-8 bg-white border-r border-gray-100">
              <input type="checkbox" class="accent-blue-600" @change="toggleAll" :checked="allChecked" />
            </th>
            <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white border-r border-gray-100 min-w-[110px]">Recall ID</th>
            <th @click="setSort('designatedTime')" class="px-3 py-2.5 text-left font-semibold bg-white border-r border-gray-100 min-w-[140px] cursor-pointer select-none"
              :class="sortCol === 'designatedTime' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'">
              Designated time <SortIcon :col="'designatedTime'" :current="sortCol" :dir="sortDir" />
            </th>
            <th @click="setSort('project')" class="px-3 py-2.5 text-left font-semibold bg-white border-r border-gray-100 min-w-[160px] cursor-pointer select-none"
              :class="sortCol === 'project' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'">
              project <SortIcon :col="'project'" :current="sortCol" :dir="sortDir" />
            </th>
            <th @click="setSort('name')" class="px-3 py-2.5 text-left font-semibold bg-white border-r border-gray-100 min-w-[200px] cursor-pointer select-none"
              :class="sortCol === 'name' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'">
              name <SortIcon :col="'name'" :current="sortCol" :dir="sortDir" />
            </th>
            <th @click="setSort('phone')" class="px-3 py-2.5 text-left font-semibold bg-white border-r border-gray-100 min-w-[140px] cursor-pointer select-none"
              :class="sortCol === 'phone' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'">
              telephone number <SortIcon :col="'phone'" :current="sortCol" :dir="sortDir" />
            </th>
            <th @click="setSort('registrationDate')" class="px-3 py-2.5 text-left font-semibold bg-white border-r border-gray-100 min-w-[150px] cursor-pointer select-none"
              :class="sortCol === 'registrationDate' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'">
              Registration date <SortIcon :col="'registrationDate'" :current="sortCol" :dir="sortDir" />
            </th>
            <th @click="setSort('registeredUser')" class="px-3 py-2.5 text-left font-semibold bg-white border-r border-gray-100 min-w-[90px] cursor-pointer select-none"
              :class="sortCol === 'registeredUser' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'">
              Regist... <SortIcon :col="'registeredUser'" :current="sortCol" :dir="sortDir" />
            </th>
            <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white border-r border-gray-100 min-w-[90px]">status</th>
            <th class="px-3 py-2.5 text-left font-semibold text-gray-600 bg-white min-w-[90px]">Respon...</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in sortedRows"
            :key="row.id"
            :class="['border-b border-gray-100 hover:bg-blue-50 transition-colors', row.checked ? 'bg-blue-50' : '']"
          >
            <td class="px-2 py-2 border-r border-gray-100">
              <input type="checkbox" class="accent-blue-600" v-model="row.checked" />
            </td>
            <td class="px-3 py-2 border-r border-gray-100 text-gray-700">{{ row.id }}</td>
            <td class="px-3 py-2 border-r border-gray-100 text-gray-600">{{ row.designatedTime }}</td>
            <td class="px-3 py-2 border-r border-gray-100 text-gray-600 max-w-[160px] truncate">{{ row.project }}</td>
            <td class="px-3 py-2 border-r border-gray-100">
              <button v-if="row.name" class="text-blue-500 hover:underline max-w-[200px] truncate text-left block">{{ row.name }}</button>
            </td>
            <td class="px-3 py-2 border-r border-gray-100 text-gray-600">{{ row.phone }}</td>
            <td class="px-3 py-2 border-r border-gray-100 text-gray-600">{{ row.registrationDate }}</td>
            <td class="px-3 py-2 border-r border-gray-100 text-gray-600 max-w-[90px] truncate">{{ row.registeredUser }}</td>
            <td class="px-3 py-2 border-r border-gray-100 text-gray-600 max-w-[90px] truncate">{{ row.status }}</td>
            <td class="px-3 py-2 text-gray-600 max-w-[90px] truncate">{{ row.respondent }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { recallRows } from '@/data/recallData.js'

const search = ref('')
const sortCol = ref('designatedTime')
const sortDir = ref('asc')

const rows = ref(recallRows.map(r => ({ ...r, checked: false })))

const allChecked = computed(() => rows.value.length > 0 && rows.value.every(r => r.checked))

function toggleAll(e) {
  rows.value.forEach(r => r.checked = e.target.checked)
}

function setSort(col) {
  if (sortCol.value === col) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortCol.value = col
    sortDir.value = 'asc'
  }
}

const filteredRows = computed(() => {
  if (!search.value) return rows.value
  const q = search.value.toLowerCase()
  return rows.value.filter(r =>
    r.project.toLowerCase().includes(q) ||
    r.name.toLowerCase().includes(q) ||
    r.phone.includes(q) ||
    r.registeredUser.toLowerCase().includes(q)
  )
})

const sortedRows = computed(() => {
  const col = sortCol.value
  const dir = sortDir.value === 'asc' ? 1 : -1
  return [...filteredRows.value].sort((a, b) => {
    const av = String(a[col] ?? ''), bv = String(b[col] ?? '')
    return av.localeCompare(bv) * dir
  })
})

const SortIcon = {
  props: ['col', 'current', 'dir'],
  template: `<span class="inline-block ml-0.5 text-xs">
    <template v-if="col === current">{{ dir === 'asc' ? '↑' : '↓' }}</template>
    <template v-else><span class="opacity-40">↑↓</span></template>
  </span>`
}
</script>
