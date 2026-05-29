<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <!-- Sub-tabs + Account Addition Request -->
    <div class="flex items-center px-4 py-3 border-b border-gray-200 shrink-0">
      <div class="flex items-center gap-1">
        <button
          v-for="tab in subTabs" :key="tab.id"
          @click="activeTab = tab.id"
          :class="['px-4 py-1.5 text-sm rounded transition-colors border',
            activeTab === tab.id
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50']"
        >{{ tab.label }}</button>
      </div>
      <div class="flex-1" />
      <button class="px-4 py-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded transition-colors">
        Account Addition Request
      </button>
    </div>

    <template v-if="activeTab === 'user-management'">
      <!-- Toolbar -->
      <div class="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200 shrink-0">
        <button class="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Select display column
        </button>
        <div class="flex-1" />
        <div class="relative">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
          <input v-model="search" type="text" placeholder="Please search by user name, office name, or unit name."
            class="pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded outline-none focus:border-blue-400 w-80 text-gray-700 placeholder-gray-400 bg-white" />
        </div>
        <span class="text-sm text-gray-600">{{ currentPage }}</span>
        <span class="text-sm text-gray-400">({{ filteredUsers.length }} items)</span>
        <span class="text-sm text-gray-500">Number of items displayed</span>
        <div class="relative">
          <select v-model="perPage" class="border border-gray-300 rounded px-2 py-1.5 text-xs outline-none appearance-none pr-7">
            <option :value="20">20 items</option>
            <option :value="50">50 items</option>
            <option :value="100">100 items</option>
          </select>
          <svg class="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </div>
      </div>

      <!-- Table -->
      <div class="flex-1 overflow-auto">
        <table class="w-full text-sm border-collapse">
          <thead class="sticky top-0 z-10 bg-white border-b-2 border-gray-200">
            <tr>
              <th class="px-4 py-3 w-12 bg-white"></th>
              <th @click="setSort('name')" class="px-4 py-3 text-left font-semibold text-gray-700 bg-white cursor-pointer select-none hover:text-gray-900">
                User Name <span class="text-gray-400">♦</span>
              </th>
              <th @click="setSort('office')" class="px-4 py-3 text-left font-semibold text-gray-700 bg-white cursor-pointer select-none hover:text-gray-900">
                Office <span class="text-gray-400">♦</span>
              </th>
              <th @click="setSort('unit')" class="px-4 py-3 text-left font-semibold text-gray-700 bg-white cursor-pointer select-none hover:text-gray-900">
                Unit <span class="text-gray-400">♦</span>
              </th>
              <th @click="setSort('userType')" class="px-4 py-3 text-left font-semibold text-gray-700 bg-white cursor-pointer select-none hover:text-gray-900">
                User Type <span class="text-gray-400">♦</span>
              </th>
              <th class="px-4 py-3 text-right font-semibold text-gray-700 bg-white w-16">edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in sortedUsers" :key="user.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td class="px-4 py-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </td>
              <td class="px-4 py-3">
                <p class="font-medium text-gray-800">{{ user.name }}</p>
                <p class="text-xs text-gray-400">@{{ user.email }}</p>
              </td>
              <td class="px-4 py-3 text-gray-500">{{ user.office }}</td>
              <td class="px-4 py-3 text-gray-500">{{ user.unit }}</td>
              <td class="px-4 py-3 text-gray-600">{{ user.userType }}</td>
              <td class="px-4 py-3 text-right">
                <button class="text-green-500 hover:text-green-700 transition-colors">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"/></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- Group Management placeholder -->
    <div v-else class="flex-1 flex items-center justify-center text-gray-400 text-sm">
      Group Management — coming soon
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { users as rawUsers } from '@/data/userData.js'

const subTabs = [
  { id: 'user-management',  label: 'User Management' },
  { id: 'group-management', label: 'Group Management' },
]
const activeTab = ref('user-management')
const search = ref('')
const sortCol = ref('name')
const sortDir = ref('asc')
const perPage = ref(50)
const currentPage = ref(1)

const filteredUsers = computed(() => {
  if (!search.value) return rawUsers
  const q = search.value.toLowerCase()
  return rawUsers.filter(u =>
    u.name.toLowerCase().includes(q) ||
    u.office.toLowerCase().includes(q) ||
    u.unit.toLowerCase().includes(q)
  )
})

function setSort(col) {
  if (sortCol.value === col) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else { sortCol.value = col; sortDir.value = 'asc' }
}

const sortedUsers = computed(() => {
  const dir = sortDir.value === 'asc' ? 1 : -1
  return [...filteredUsers.value].sort((a, b) => String(a[sortCol.value]).localeCompare(String(b[sortCol.value])) * dir)
})
</script>
