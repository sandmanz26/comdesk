<template>
  <div class="flex flex-col h-full overflow-hidden bg-white">

    <!-- Toolbar -->
    <div class="flex items-center gap-1.5 px-4 py-2 border-b border-gray-200 bg-gray-50 shrink-0 flex-wrap">
      <span class="text-xs text-gray-600 mr-1">Display: {{ selectedItems }} / {{ totalItems }} items</span>

      <button class="flex items-center gap-1 px-2.5 py-1 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Project Registration
      </button>
      <button class="flex items-center gap-1 px-2.5 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5"/></svg>
        List details
      </button>
      <button class="flex items-center gap-1 px-2.5 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd"/></svg>
        Disable
      </button>
      <button class="flex items-center gap-1 px-2.5 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd"/></svg>
        Activate
      </button>
      <button class="flex items-center gap-1 px-2.5 py-1 text-xs border border-amber-400 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/></svg>
        edit
      </button>
      <button class="flex items-center gap-1 px-2.5 py-1 text-xs border border-amber-400 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/></svg>
        division
      </button>
      <button class="flex items-center gap-1 px-2.5 py-1 text-xs text-white bg-red-400 hover:bg-red-500 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.499.058l.346-9z" clip-rule="evenodd"/></svg>
        delete
      </button>
      <button class="flex items-center gap-1 px-2.5 py-1 text-xs border border-amber-400 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"/></svg>
        distribution
      </button>
      <button class="flex items-center gap-1 px-2.5 py-1 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
        Import status
      </button>
    </div>

    <!-- Two-panel -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left: Workgroup list -->
      <div class="w-60 border-r border-gray-200 overflow-y-auto shrink-0 bg-white">
        <div class="text-xs font-semibold text-gray-500 px-3 py-2 bg-gray-50 border-b border-gray-200">Workgroup</div>
        <div
          v-for="wg in projectWorkgroups" :key="wg.id"
          class="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
          @click="toggleWorkgroup(wg.id)"
        >
          <input type="checkbox" :checked="selectedIds.includes(wg.id)" class="rounded w-3.5 h-3.5 pointer-events-none" readonly />
          <span class="text-xs text-gray-700 truncate">{{ wg.name }}</span>
        </div>
      </div>

      <!-- Right: Project table -->
      <div class="flex-1 overflow-auto">
        <table class="text-xs whitespace-nowrap border-collapse min-w-full">
          <thead class="sticky top-0 z-10 bg-white">
            <tr class="border-b-2 border-gray-300">
              <th class="px-2 py-2 w-8 bg-gray-50 border-r border-gray-200">
                <input type="checkbox" class="rounded w-3.5 h-3.5" />
              </th>
              <th class="px-3 py-2 text-left font-medium text-gray-500 bg-gray-50 border-r border-gray-200 min-w-[60px]">ID</th>
              <th class="px-3 py-2 text-left font-medium text-gray-500 bg-gray-50 border-r border-gray-200 min-w-[320px]">Project Name</th>
              <th class="px-3 py-2 text-left font-medium text-gray-500 bg-gray-50 border-r border-gray-200 min-w-[110px]">Registration date</th>
              <th class="px-3 py-2 text-left font-medium text-gray-500 bg-gray-50 border-r border-gray-200 min-w-[140px]">Number of items in the list</th>
              <th class="px-3 py-2 text-left font-medium text-gray-500 bg-gray-50 border-r border-gray-200 min-w-[100px]">Distributed</th>
              <th class="px-3 py-2 text-left font-medium text-gray-500 bg-gray-50 border-r border-gray-200 min-w-[100px]">Digestion rate</th>
              <th class="px-3 py-2 text-left font-medium text-gray-500 bg-gray-50 min-w-[200px]">Assign User</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="wgId in selectedIds" :key="wgId">
              <!-- Group header -->
              <tr class="bg-gray-50">
                <td colspan="8" class="px-4 py-2 text-xs font-medium text-gray-700 border-b border-gray-200">
                  {{ workgroupName(wgId) }}
                </td>
              </tr>
              <!-- Project rows -->
              <tr
                v-for="proj in (projectsByWorkgroup[wgId] || [])"
                :key="proj.id"
                class="border-b border-gray-100 hover:bg-blue-50 transition-colors"
              >
                <td class="px-2 py-2 border-r border-gray-100">
                  <input type="checkbox" class="rounded w-3.5 h-3.5" />
                </td>
                <td class="px-3 py-2 border-r border-gray-100 text-gray-600">{{ proj.id }}</td>
                <td class="px-3 py-2 border-r border-gray-100">
                  <span class="text-emerald-500 mr-1">✓</span>
                  <button class="text-gray-700 hover:text-blue-600 text-left">{{ proj.name }}</button>
                </td>
                <td class="px-3 py-2 border-r border-gray-100 text-gray-600">{{ proj.registrationDate }}</td>
                <td class="px-3 py-2 border-r border-gray-100 text-right text-gray-700 font-medium">{{ proj.items }}</td>
                <td class="px-3 py-2 border-r border-gray-100">
                  <div class="flex items-center gap-1">
                    <span class="text-gray-700">{{ proj.distributed }}</span>
                    <button class="text-gray-400 hover:text-blue-500 transition-colors">
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>
                    </button>
                  </div>
                </td>
                <td class="px-3 py-2 border-r border-gray-100">
                  <div class="relative w-20 h-4 bg-gray-200 rounded overflow-hidden">
                    <div
                      class="absolute inset-y-0 left-0 bg-blue-500 transition-all"
                      :style="{ width: proj.digestionRate + '%' }"
                    />
                    <span class="absolute inset-0 flex items-center justify-center text-[10px] font-medium" :class="proj.digestionRate > 50 ? 'text-white' : 'text-gray-600'">
                      {{ proj.digestionRate }}%
                    </span>
                  </div>
                </td>
                <td class="px-3 py-2 text-gray-600 leading-relaxed">
                  <div v-for="(user, i) in proj.assignUsers" :key="i" class="leading-tight">{{ user }}<span v-if="i < proj.assignUsers.length - 1">,</span></div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <!-- Empty state -->
        <div v-if="selectedIds.length === 0" class="flex-1 flex items-center justify-center p-12 text-gray-400 text-sm">
          Select a workgroup to view projects
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { projectWorkgroups, projectsByWorkgroup } from '@/data/projectData.js'

const selectedIds = ref([])

function toggleWorkgroup(id) {
  const idx = selectedIds.value.indexOf(id)
  if (idx === -1) selectedIds.value.push(id)
  else selectedIds.value.splice(idx, 1)
}

function workgroupName(id) {
  return projectWorkgroups.find(w => w.id === id)?.name || ''
}

const totalItems = computed(() =>
  selectedIds.value.reduce((sum, id) => {
    const projs = projectsByWorkgroup[id] || []
    return sum + projs.reduce((s, p) => s + p.items, 0)
  }, 0)
)
const selectedItems = ref(0)
</script>
