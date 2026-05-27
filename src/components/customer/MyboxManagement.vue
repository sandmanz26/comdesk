<template>
  <div class="flex flex-col h-full overflow-hidden bg-white">

    <!-- Action bar -->
    <div class="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50 shrink-0">
      <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>
        Workgroup Selection
      </button>
      <button class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>
        Project Selection
      </button>
      <div class="flex items-center border border-gray-300 rounded overflow-hidden bg-white ml-2">
        <div class="flex items-center px-2 py-1.5 border-r border-gray-300">
          <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
        </div>
        <input v-model="searchQuery" type="text" placeholder="search" class="px-2 py-1.5 text-xs outline-none w-36 text-gray-700 placeholder-gray-400" />
        <button class="px-3 py-1.5 text-xs text-white bg-blue-500 hover:bg-blue-600 transition-colors">search</button>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="flex items-center gap-2 px-4 py-1.5 border-b border-gray-200 bg-gray-50 shrink-0">
      <select v-model="displayCount" class="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-600 outline-none cursor-pointer">
        <option value="100">display100</option>
        <option value="50">display50</option>
        <option value="20">display20</option>
      </select>
      <span class="text-xs text-gray-500">subject</span>
      <button class="px-2.5 py-1 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors">Research change (feature)</button>
      <button class="px-2.5 py-1 text-xs text-white bg-emerald-500 hover:bg-emerald-600 rounded transition-colors">Label list</button>
      <div class="flex-1" />
      <span class="text-xs text-gray-500">Display: {{ filteredRows.length }} results</span>
    </div>

    <!-- Table -->
    <div class="flex-1 overflow-auto">
      <table class="text-xs whitespace-nowrap border-collapse min-w-full">
        <thead class="sticky top-0 z-10 bg-white">
          <tr class="border-b-2 border-gray-300">
            <th class="px-2 py-2 bg-gray-50 border-r border-gray-200 w-8">
              <input type="checkbox" class="rounded w-3 h-3" />
            </th>
            <th v-for="col in columns" :key="col.key"
              class="px-2 py-2 text-left font-medium text-gray-500 bg-gray-50 border-r border-gray-200 whitespace-nowrap"
              :class="col.minW"
            >{{ col.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in pagedRows"
            :key="row.id"
            class="border-b border-gray-100 hover:bg-blue-50 transition-colors"
          >
            <td class="px-2 py-1.5 border-r border-gray-100">
              <input type="checkbox" class="rounded w-3 h-3" />
            </td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-500 font-mono text-xs min-w-[90px]">{{ row.id }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[180px]">{{ row.project }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 min-w-[160px]">
              <button class="text-blue-500 hover:underline text-left">{{ row.name }}</button>
            </td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[100px]">{{ row.status }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 min-w-[70px]">
              <div class="flex gap-0.5">
                <span v-for="s in 5" :key="s" :class="s <= row.rate ? 'text-amber-400' : 'text-gray-300'" class="text-sm leading-none">★</span>
              </div>
            </td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-right text-gray-600 min-w-[60px]">{{ row.responses }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[130px]">{{ row.lastCallDate }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[70px]">{{ row.distribution }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[80px]">{{ row.allocation }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[110px]">{{ row.manager }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[80px]">{{ row.postCode }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[120px]">{{ row.prefectures }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[160px]">{{ row.address1 }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[100px]">{{ row.address2 }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[120px]">{{ row.telephoneNumber }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[120px]">{{ row.homePhoneNumber }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[100px]">{{ row.tel1 }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[100px]">{{ row.tel2 }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[90px]">{{ row.fax }}</td>
            <td class="px-2 py-1.5 border-r border-gray-100 min-w-[160px]">
              <a :href="row.url" class="text-blue-500 hover:underline truncate block max-w-[160px]" target="_blank">{{ row.url }}</a>
            </td>
            <td class="px-2 py-1.5 border-r border-gray-100 text-gray-600 min-w-[100px]">{{ row.salesRep }}</td>
            <td class="px-2 py-1.5 text-gray-600 min-w-[120px]">{{ row.remarks }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { myboxRows } from '@/data/myboxData.js'

const searchQuery = ref('')
const displayCount = ref('100')

const columns = [
  { key: 'id',              label: 'ID',                   minW: 'min-w-[90px]' },
  { key: 'project',         label: 'project',              minW: 'min-w-[180px]' },
  { key: 'name',            label: 'name',                 minW: 'min-w-[160px]' },
  { key: 'status',          label: 'status',               minW: 'min-w-[100px]' },
  { key: 'rate',            label: 'rate',                 minW: 'min-w-[70px]' },
  { key: 'responses',       label: 'number of responses',  minW: 'min-w-[60px]' },
  { key: 'lastCallDate',    label: 'Last call date',       minW: 'min-w-[130px]' },
  { key: 'distribution',    label: 'distribution',         minW: 'min-w-[70px]' },
  { key: 'allocation',      label: 'Allocation',           minW: 'min-w-[80px]' },
  { key: 'manager',         label: 'manager',              minW: 'min-w-[110px]' },
  { key: 'postCode',        label: 'post code',            minW: 'min-w-[80px]' },
  { key: 'prefectures',     label: 'prefectures',          minW: 'min-w-[120px]' },
  { key: 'address1',        label: 'Address 1',            minW: 'min-w-[160px]' },
  { key: 'address2',        label: 'Address 2',            minW: 'min-w-[100px]' },
  { key: 'telephoneNumber', label: 'telephone number',     minW: 'min-w-[120px]' },
  { key: 'homePhoneNumber', label: 'home phone number',    minW: 'min-w-[120px]' },
  { key: 'tel1',            label: 'Tel1',                 minW: 'min-w-[100px]' },
  { key: 'tel2',            label: 'Tel2',                 minW: 'min-w-[100px]' },
  { key: 'fax',             label: 'FAX',                  minW: 'min-w-[90px]' },
  { key: 'url',             label: 'URL',                  minW: 'min-w-[160px]' },
  { key: 'salesRep',        label: 'Sales Representative', minW: 'min-w-[100px]' },
  { key: 'remarks',         label: 'remarks',              minW: 'min-w-[120px]' },
]

const filteredRows = computed(() => {
  if (!searchQuery.value) return myboxRows
  const q = searchQuery.value.toLowerCase()
  return myboxRows.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.project.toLowerCase().includes(q) ||
    r.manager.toLowerCase().includes(q)
  )
})

const perPage = computed(() => parseInt(displayCount.value))
const pagedRows = computed(() => filteredRows.value.slice(0, perPage.value))
</script>
