<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div class="px-6 pt-5 pb-3 flex items-center justify-between bg-gray-100 shrink-0">
      <h1 class="text-2xl font-semibold text-gray-800">{{ sectionTitle }}</h1>
    </div>
    <div class="flex-1 flex items-center justify-center text-gray-400 text-sm">
      {{ sectionTitle }} — coming soon
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { customerMenuItems } from '@/data/callHomeData.js'

const route = useRoute()
const sectionTitle = computed(() => {
  const found = customerMenuItems.find(i => i.path === '/customer/' + route.params.section)
  return found ? found.label : 'Customer'
})
</script>
