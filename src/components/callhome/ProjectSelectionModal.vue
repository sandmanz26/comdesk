<template>
  <div class="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4" @click.self="$emit('close')">
    <div class="absolute inset-0 bg-black/30" @click="$emit('close')" />
    <div class="relative bg-white rounded-lg shadow-xl w-full max-w-lg z-10 overflow-hidden">
      <!-- Modal header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 class="text-base font-semibold text-gray-800">Project Selection</h2>
        <button @click="$emit('close')" class="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Scrollable project list -->
      <div class="overflow-y-auto max-h-[480px]">
        <div v-for="group in groups" :key="group.id">
          <!-- Group header -->
          <button
            @click="group.collapsed = !group.collapsed"
            class="w-full flex items-center justify-between px-6 py-3 bg-gray-100 hover:bg-gray-200 transition-colors border-b border-gray-200"
          >
            <span class="text-sm font-semibold text-gray-700">{{ group.name }}</span>
            <svg
              :class="['w-4 h-4 text-gray-500 transition-transform', group.collapsed ? 'rotate-180' : '']"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
            </svg>
          </button>

          <!-- Projects -->
          <div v-if="!group.collapsed">
            <button
              v-for="project in group.projects"
              :key="project.id"
              @click="selectProject(project)"
              class="w-full flex items-center gap-4 px-6 py-3 border-b border-gray-100 hover:bg-blue-50 transition-colors text-left"
            >
              <!-- Project name -->
              <span class="text-sm text-blue-600 hover:underline flex-1 truncate">{{ project.name }}</span>

              <!-- Count -->
              <span class="text-xs text-gray-500 w-20 text-right shrink-0">
                <template v-if="project.total !== null">{{ project.called }} / {{ project.total }}</template>
                <template v-else>{{ project.called }}</template>
              </span>

              <!-- Progress bar -->
              <div class="w-32 shrink-0">
                <div class="relative h-5 bg-gray-200 rounded overflow-hidden">
                  <div
                    class="absolute left-0 top-0 h-full bg-blue-500 transition-all"
                    :style="{ width: project.percent + '%' }"
                  />
                  <span class="absolute inset-0 flex items-center justify-center text-xs font-medium"
                    :class="project.percent > 50 ? 'text-white' : 'text-gray-600'">
                    {{ project.percent }}%
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { workgroups } from '@/data/callHomeData.js'

const emit = defineEmits(['close', 'select'])
const groups = reactive(workgroups.map(g => ({ ...g, collapsed: false })))

function selectProject(project) {
  emit('select', project)
  emit('close')
}
</script>
