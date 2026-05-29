<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Toolbar -->
    <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-200 shrink-0">
      <div class="relative">
        <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
        <input v-model="search" type="text" placeholder="search"
          class="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded outline-none focus:border-blue-400 w-48 text-gray-700 placeholder-gray-400" />
      </div>
      <button class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-amber-400 hover:bg-amber-500 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"/></svg>
        edit
      </button>
      <button class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-amber-400 hover:bg-amber-500 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/></svg>
        Reproduction
      </button>
      <button class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-red-400 hover:bg-red-500 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
        delete
      </button>
    </div>

    <!-- Table -->
    <div class="flex-1 overflow-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="sticky top-0 z-10 bg-white">
          <tr class="border-b-2 border-gray-200">
            <th class="px-4 py-3 w-10 bg-white"></th>
            <th class="px-4 py-3 w-20 text-left font-semibold text-gray-600 bg-white">valid</th>
            <th @click="setSort('name')" class="px-4 py-3 text-left font-semibold text-gray-600 bg-white cursor-pointer select-none hover:text-gray-800">
              Workgroup name <span class="text-xs">{{ sortCol === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : '↑↓' }}</span>
            </th>
            <th @click="setSort('registrationDate')" class="px-4 py-3 text-left font-semibold text-gray-600 bg-white min-w-[140px] cursor-pointer select-none hover:text-gray-800">
              Registration date <span class="text-xs">{{ sortCol === 'registrationDate' ? (sortDir === 'asc' ? '↑' : '↓') : '↑↓' }}</span>
            </th>
            <th class="px-4 py-3 text-left font-semibold text-gray-600 bg-white min-w-[200px]">remarks</th>
            <th class="px-4 py-3 text-right font-semibold text-gray-600 bg-white w-20">setting</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in sortedRows"
            :key="row.id"
            @click="selectedId = row.id"
            :class="['border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer',
              selectedId === row.id ? 'bg-gray-100' : '']"
          >
            <td class="px-4 py-3" @click.stop>
              <input type="radio" :checked="selectedId === row.id" @change="selectedId = row.id" class="accent-blue-600" />
            </td>
            <td class="px-4 py-3" @click.stop>
              <button
                @click="row.valid = !row.valid"
                :class="['relative inline-flex w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none',
                  row.valid ? 'bg-blue-500' : 'bg-gray-300']"
              >
                <span :class="['absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200',
                  row.valid ? 'translate-x-5' : 'translate-x-1']" />
              </button>
            </td>
            <td class="px-4 py-3">
              <button class="text-blue-500 hover:underline text-left break-all">{{ row.name }}</button>
            </td>
            <td class="px-4 py-3 text-gray-600">{{ row.registrationDate }}</td>
            <td class="px-4 py-3 text-gray-500 text-xs">{{ row.remarks }}</td>
            <td class="px-4 py-3 text-right" @click.stop>
              <button class="text-gray-400 hover:text-gray-600 transition-colors">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- FAB -->
    <button class="fixed bottom-6 right-6 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors z-10">
      +
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { workgroupManageRows as rawRows } from '@/data/workgroupManageData.js'

const search = ref('')
const sortCol = ref('name')
const sortDir = ref('asc')
const selectedId = ref(2)
const rows = ref(rawRows.map(r => ({ ...r })))

function setSort(col) {
  if (sortCol.value === col) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else { sortCol.value = col; sortDir.value = 'asc' }
}

const filteredRows = computed(() => {
  if (!search.value) return rows.value
  const q = search.value.toLowerCase()
  return rows.value.filter(r => r.name.toLowerCase().includes(q) || r.remarks.toLowerCase().includes(q))
})

const sortedRows = computed(() => {
  const dir = sortDir.value === 'asc' ? 1 : -1
  return [...filteredRows.value].sort((a, b) => String(a[sortCol.value]).localeCompare(String(b[sortCol.value])) * dir)
})
</script>
