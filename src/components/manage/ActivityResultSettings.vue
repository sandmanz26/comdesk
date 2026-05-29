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

    <!-- Toolbar -->
    <div class="flex items-center gap-2 px-4 py-2.5 border-b border-gray-200 bg-white shrink-0">
      <button class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-amber-400 hover:bg-amber-500 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"/></svg>
        edit
      </button>
      <button class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-amber-400 hover:bg-amber-500 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Add child item
      </button>
      <button class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-red-400 hover:bg-red-500 rounded transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
        delete
      </button>
      <span class="text-sm text-gray-500 ml-2">Label display text</span>
      <input v-model="labelText" type="text" class="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-400 w-36" />
      <button class="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors">change</button>
      <div class="flex-1" />
      <span class="text-sm text-gray-600">Activate</span>
      <button
        @click="activateOn = !activateOn"
        :class="['relative inline-flex w-10 h-6 rounded-full transition-colors duration-200',
          activateOn ? 'bg-blue-500' : 'bg-gray-300']"
      >
        <span :class="['absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200',
          activateOn ? 'translate-x-5' : 'translate-x-1']" />
      </button>
    </div>

    <!-- Table -->
    <div class="flex-1 overflow-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="sticky top-0 z-10 bg-white border-b-2 border-gray-200">
          <tr>
            <th class="px-4 py-2.5 w-10 bg-white"></th>
            <th class="px-4 py-2.5 w-24 text-left font-semibold text-gray-600 bg-white">valid</th>
            <th class="px-4 py-2.5 text-left font-semibold text-gray-700 bg-white">Item Labels</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="currentItems.length > 0">
            <tr
              v-for="item in displayItems"
              :key="item.id"
              @click="selectedId = item.id"
              :class="['border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer',
                selectedId === item.id ? 'bg-blue-50' : '']"
            >
              <td class="px-4 py-2.5" @click.stop>
                <input type="radio" :checked="selectedId === item.id" @change="selectedId = item.id" class="accent-blue-600" />
              </td>
              <td class="px-4 py-2.5" @click.stop>
                <button
                  @click="item.valid = !item.valid"
                  :class="['relative inline-flex w-10 h-6 rounded-full transition-colors duration-200',
                    item.valid ? 'bg-blue-500' : 'bg-gray-300']"
                >
                  <span :class="['absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200',
                    item.valid ? 'translate-x-5' : 'translate-x-1']" />
                </button>
              </td>
              <td class="px-4 py-2.5">
                <span :style="{ paddingLeft: item.depth * 20 + 'px' }">
                  <span class="text-gray-400 font-mono text-xs mr-1.5">{{ item.prefix }}</span>{{ item.label }}
                </span>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="3" class="px-4 py-8 text-center text-gray-400 text-sm">No items</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- FAB -->
    <button class="fixed bottom-6 right-6 flex items-center gap-1.5 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg text-sm transition-colors z-10">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
      addition
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { respondentItems as rawRespondents, statusItems as rawStatus, callItems as rawCall } from '@/data/activityResultData.js'

const tabs = [
  { id: 'respondents', label: 'Activity results (respondents)' },
  { id: 'status',      label: 'Activity results (status)' },
  { id: 'call',        label: 'Call item' },
]
const activeTab = ref('respondents')
const selectedId = ref(null)
const activateOn = ref(true)
const labelText = ref('応対者')

const respondents = ref(rawRespondents.map(r => ({ ...r })))
const statusItemsData = ref(rawStatus.map(r => ({ ...r })))
const callItemsData = ref(rawCall.map(r => ({ ...r })))

const currentItems = computed(() => {
  if (activeTab.value === 'respondents') return respondents.value
  if (activeTab.value === 'status') return statusItemsData.value
  return callItemsData.value
})

function getDepth(items, item) {
  if (!item.parentId) return 0
  const parent = items.find(i => i.id === item.parentId)
  return parent ? getDepth(items, parent) + 1 : 0
}

function getPrefix(items, item, depth) {
  if (depth === 0) {
    return items.some(i => i.parentId === item.id) ? '⊢' : ''
  }
  const siblings = items.filter(i => i.parentId === item.parentId)
  const isLast = siblings[siblings.length - 1].id === item.id
  return isLast ? '└─' : '├─'
}

const displayItems = computed(() => {
  const items = currentItems.value
  return items.map(item => {
    const depth = getDepth(items, item)
    return { ...item, depth, prefix: getPrefix(items, item, depth) }
  })
})
</script>
