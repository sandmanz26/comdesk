<template>
  <div class="flex flex-col h-full overflow-hidden">

    <!-- ── Sub navigation tabs ── -->
    <div class="flex items-center bg-white border-b border-gray-200 px-4 shrink-0">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.id"
        :to="tab.path"
        :class="[
          'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap',
          isTabActive(tab)
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]"
      >
        {{ tab.label }}
      </RouterLink>
    </div>

    <!-- ── Master Data Management content ── -->
    <div v-if="section === 'master-data'" class="flex flex-col flex-1 overflow-hidden bg-white">

      <!-- Action bar -->
      <div class="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50 shrink-0">
        <button @click="showWorkgroupModal = true" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded transition-colors">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
          </svg>
          Workgroup Selection
        </button>
        <button @click="showProjectModal = true" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded transition-colors">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
          </svg>
          Project Selection
        </button>
        <div class="flex items-center border border-gray-300 rounded overflow-hidden bg-white ml-2">
          <div class="flex items-center px-2 py-1.5 border-r border-gray-300">
            <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
          </div>
          <input v-model="searchQuery" type="text" placeholder="search" class="px-2 py-1.5 text-xs outline-none w-36 text-gray-700 placeholder-gray-400" />
          <button class="px-3 py-1.5 text-xs text-white bg-blue-500 hover:bg-blue-600 transition-colors">search</button>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="flex items-center gap-2 px-4 py-1.5 border-b border-gray-200 bg-gray-50 shrink-0 flex-wrap">
        <!-- Left buttons -->
        <button class="px-3 py-1 text-xs font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded transition-colors">add</button>
        <button @click="toggleDeleted" :class="['px-3 py-1 text-xs rounded transition-colors', showDeleted ? 'bg-blue-500 text-white border border-blue-500' : 'border border-gray-300 text-gray-600 hover:bg-gray-100']">Deleted</button>

        <select v-model="displayCount" class="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-600 outline-none cursor-pointer">
          <option value="100">display100</option>
          <option value="50">display50</option>
          <option value="20">display20</option>
        </select>

        <span class="text-xs text-gray-500">subject</span>

        <button @click="showCsvModal = true" class="flex items-center gap-1 px-2.5 py-1 text-xs border border-amber-400 text-amber-600 rounded hover:bg-amber-50 transition-colors">
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z"/></svg>
          Project Changes (CSV)
        </button>
        <button class="flex items-center gap-1 px-2.5 py-1 text-xs border border-amber-400 text-amber-600 bg-amber-50 rounded hover:bg-amber-100 transition-colors">
          Project Change
        </button>
        <button v-if="!showDeleted" class="px-3 py-1 text-xs text-white bg-red-400 hover:bg-red-500 rounded transition-colors">delete</button>
        <button v-else class="px-3 py-1 text-xs text-white bg-emerald-500 hover:bg-emerald-600 rounded transition-colors">Restoration</button>

        <!-- Spacer -->
        <div class="flex-1" />

        <!-- Pagination -->
        <div class="flex items-center gap-1 text-xs text-gray-600">
          <button class="p-1 hover:bg-gray-200 rounded" @click="prevPage" :disabled="currentPage === 1">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
          </button>
          <span class="whitespace-nowrap px-1">Page {{ currentPage }} ({{ pageInfo }})</span>
          <button class="p-1 hover:bg-gray-200 rounded" @click="nextPage">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
          </button>
        </div>

        <!-- Export -->
        <button class="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
          </svg>
          export
        </button>
      </div>

      <!-- Data Table -->
      <div class="flex-1 overflow-auto">
        <table class="text-xs whitespace-nowrap border-collapse min-w-full">
          <thead class="sticky top-0 z-10 bg-white">
            <tr class="border-b-2 border-gray-300">
              <th class="px-2 py-2 text-left font-medium text-gray-500 border-r border-gray-200 bg-gray-50">
                <input type="checkbox" @change="toggleAll" class="rounded" />
              </th>
              <th v-for="col in columns" :key="col.key"
                class="px-2 py-2 text-left font-medium text-gray-500 border-r border-gray-200 bg-gray-50 whitespace-nowrap cursor-pointer hover:bg-gray-100 select-none"
                @click="sortBy(col.key)"
              >
                {{ col.label }}
                <span v-if="sortKey === col.key" class="ml-0.5 text-gray-400">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in pagedRows"
              :key="row.id"
              :class="['border-b border-gray-100 hover:bg-blue-50 transition-colors', row.selected ? 'bg-blue-50' : '']"
            >
              <!-- Checkbox + delete -->
              <td class="px-2 py-1.5 border-r border-gray-100 align-middle">
                <div class="flex items-center gap-1">
                  <input type="checkbox" v-model="row.selected" class="rounded w-3 h-3" />
                  <button class="text-red-400 hover:text-red-600 transition-colors" title="Delete">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.499.058l.346-9z" clip-rule="evenodd"/></svg>
                  </button>
                </div>
              </td>
              <!-- Rate stars -->
              <td class="px-2 py-1.5 border-r border-gray-100 align-middle">
                <div class="flex gap-0.5">
                  <span v-for="s in 5" :key="s" :class="s <= row.rate ? 'text-amber-400' : 'text-gray-300'" class="text-sm leading-none cursor-pointer hover:text-amber-400" @click="row.rate = s">★</span>
                </div>
              </td>
              <!-- Status -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[80px] align-middle text-gray-600">{{ row.status }}</td>
              <!-- Respondent -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[80px] align-middle text-gray-600">{{ row.respondent }}</td>
              <!-- Last call date -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[90px] align-middle text-gray-600">{{ row.lastCallDate }}</td>
              <!-- Last caller -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[80px] align-middle text-gray-600">{{ row.lastCaller }}</td>
              <!-- mybox -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[70px] align-middle text-gray-600">{{ row.mybox }}</td>
              <!-- mybox representative -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[120px] align-middle text-gray-600">{{ row.myboxRepresentative }}</td>
              <!-- Prohibited -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[70px] align-middle text-gray-600">{{ row.prohibited }}</td>
              <!-- Number of calls -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[70px] align-middle text-right text-gray-600">{{ row.numberOfCalls }}</td>
              <!-- project -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[120px] align-middle text-gray-600">{{ row.project }}</td>
              <!-- UUID -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[260px] align-middle text-gray-500 font-mono text-xs">{{ row.uuid }}</td>
              <!-- type -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[90px] align-middle text-gray-600">{{ row.type }}</td>
              <!-- name -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[160px] align-middle">
                <button class="text-blue-500 hover:text-blue-700 hover:underline text-left">{{ row.name }}</button>
              </td>
              <!-- Kana -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[100px] align-middle text-gray-600">{{ row.kana }}</td>
              <!-- post code -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[80px] align-middle text-gray-600">{{ row.postCode }}</td>
              <!-- prefectures -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[80px] align-middle text-gray-600">{{ row.prefectures }}</td>
              <!-- Address 1 -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[160px] align-middle text-gray-600">{{ row.address1 }}</td>
              <!-- Address 2 -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[120px] align-middle text-gray-600">{{ row.address2 }}</td>
              <!-- Address (in kana) -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[120px] align-middle text-gray-600">{{ row.addressKana }}</td>
              <!-- Tel1 -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[100px] align-middle text-gray-600">{{ row.tel1 }}</td>
              <!-- Tel2 -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[90px] align-middle text-gray-600">{{ row.tel2 }}</td>
              <!-- Tel3 -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[90px] align-middle text-gray-600">{{ row.tel3 }}</td>
              <!-- Tel4 -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[90px] align-middle text-gray-600">{{ row.tel4 }}</td>
              <!-- FAX -->
              <td class="px-2 py-1.5 border-r border-gray-100 min-w-[90px] align-middle text-gray-600">{{ row.fax }}</td>
              <!-- URL -->
              <td class="px-2 py-1.5 align-middle min-w-[200px]">
                <a :href="row.url" class="text-blue-500 hover:underline truncate block max-w-[200px]" target="_blank">{{ row.url }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ── Project management ── -->
    <ProjectManagement v-else-if="section === 'projects'" />

    <!-- ── Mybox management ── -->
    <MyboxManagement v-else-if="section === 'mybox'" />

    <!-- ── Other sections: placeholder ── -->
    <div v-else class="flex-1 flex items-center justify-center text-gray-400 text-sm">
      {{ currentTabLabel }} — coming soon
    </div>

    <!-- Modals -->
    <ProjectChangesCsvModal v-if="showCsvModal" @close="showCsvModal = false" />
    <SelectionListModal
      v-if="showWorkgroupModal"
      title="Workgroup Selection"
      :items="projectWorkgroups.map(w => w.name)"
      @close="showWorkgroupModal = false"
    />
    <SelectionListModal
      v-if="showProjectModal"
      title="Project Selection"
      :items="allProjects"
      @close="showProjectModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { masterDataRows, deletedDataRows } from '@/data/masterData.js'
import { projectWorkgroups, allProjects } from '@/data/projectData.js'
import ProjectChangesCsvModal from '@/components/customer/ProjectChangesCsvModal.vue'
import ProjectManagement from '@/components/customer/ProjectManagement.vue'
import MyboxManagement from '@/components/customer/MyboxManagement.vue'
import SelectionListModal from '@/components/ui/SelectionListModal.vue'

const route = useRoute()
const section = computed(() => route.params.section || 'master-data')

const tabs = [
  { id: 'master-data', label: 'Master data management', path: '/customer/master-data' },
  { id: 'projects',    label: 'project management',     path: '/customer/projects' },
  { id: 'mybox',       label: 'Mybox management',       path: '/customer/mybox' },
  { id: 'ban-list',    label: 'Ban list management',    path: '/customer/ban-list' }
]

const columns = [
  { key: 'rate',                label: 'rate' },
  { key: 'status',              label: 'status' },
  { key: 'respondent',          label: 'Respondent' },
  { key: 'lastCallDate',        label: 'Last call date' },
  { key: 'lastCaller',          label: 'Last caller' },
  { key: 'mybox',               label: 'mybox' },
  { key: 'myboxRepresentative', label: 'mybox representative' },
  { key: 'prohibited',          label: 'Prohibited' },
  { key: 'numberOfCalls',       label: 'Number of calls' },
  { key: 'project',             label: 'project' },
  { key: 'uuid',                label: 'UUID' },
  { key: 'type',                label: 'type' },
  { key: 'name',                label: 'name' },
  { key: 'kana',                label: 'Kana' },
  { key: 'postCode',            label: 'post code' },
  { key: 'prefectures',         label: 'prefectures' },
  { key: 'address1',            label: 'Address 1' },
  { key: 'address2',            label: 'Address 2' },
  { key: 'addressKana',         label: 'Address (in kana)' },
  { key: 'tel1',                label: 'Tel1' },
  { key: 'tel2',                label: 'Tel2' },
  { key: 'tel3',                label: 'Tel3' },
  { key: 'tel4',                label: 'Tel4' },
  { key: 'fax',                 label: 'FAX' },
  { key: 'url',                 label: 'URL' }
]

const showDeleted = ref(false)
const showCsvModal = ref(false)
const showWorkgroupModal = ref(false)
const showProjectModal = ref(false)
const rows = ref(masterDataRows.map(r => ({ ...r })))
const searchQuery = ref('')
const displayCount = ref('100')
const currentPage = ref(1)
const sortKey = ref('')
const sortDir = ref('asc')

function toggleDeleted() {
  showDeleted.value = !showDeleted.value
}

watch(showDeleted, (val) => {
  rows.value = val
    ? deletedDataRows.map(r => ({ ...r }))
    : masterDataRows.map(r => ({ ...r }))
  currentPage.value = 1
})

function isTabActive(tab) {
  return section.value === tab.id
}

const currentTabLabel = computed(() => {
  const t = tabs.find(t => t.id === section.value)
  return t ? t.label : ''
})

const filteredRows = computed(() => {
  if (!searchQuery.value) return rows.value
  const q = searchQuery.value.toLowerCase()
  return rows.value.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.uuid.toLowerCase().includes(q) ||
    r.tel1.includes(q)
  )
})

const sortedRows = computed(() => {
  if (!sortKey.value) return filteredRows.value
  return [...filteredRows.value].sort((a, b) => {
    const va = a[sortKey.value] ?? ''
    const vb = b[sortKey.value] ?? ''
    return sortDir.value === 'asc'
      ? String(va).localeCompare(String(vb))
      : String(vb).localeCompare(String(va))
  })
})

const perPage = computed(() => parseInt(displayCount.value))
const totalPages = computed(() => Math.ceil(sortedRows.value.length / perPage.value))
const pageInfo = computed(() => {
  const start = (currentPage.value - 1) * perPage.value + 1
  const end = Math.min(currentPage.value * perPage.value, sortedRows.value.length)
  return `${start}-${end} items`
})

const pagedRows = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return sortedRows.value.slice(start, start + perPage.value)
})

function prevPage() { if (currentPage.value > 1) currentPage.value-- }
function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++ }

function sortBy(key) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

function toggleAll(e) {
  rows.value.forEach(r => r.selected = e.target.checked)
}
</script>
