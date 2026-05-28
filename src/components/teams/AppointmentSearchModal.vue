<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-start justify-center pt-16">
      <div class="absolute inset-0 bg-black/30" @click="$emit('close')" />

      <div class="relative bg-white rounded-lg shadow-xl w-[600px] flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between px-8 py-5 border-b border-gray-100">
          <h2 class="text-2xl font-normal text-gray-800 flex-1 text-center">Appointment Search</h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <div class="px-8 py-6 space-y-5">

          <!-- customer name -->
          <div class="flex items-start gap-4">
            <label class="text-sm font-medium text-gray-700 w-36 pt-1.5 leading-tight">customer<br>name</label>
            <input type="text" v-model="form.customerName" class="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-400" />
          </div>

          <!-- place -->
          <div class="flex items-center gap-4">
            <label class="text-sm font-medium text-gray-700 w-36">place</label>
            <input type="text" v-model="form.place" class="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-400" />
          </div>

          <!-- Registration date range -->
          <div class="flex items-start gap-4">
            <label class="text-sm font-medium text-gray-700 w-36 pt-1.5 leading-tight">Registration<br>date</label>
            <div class="flex-1">
              <DateRangeInputs v-model:from="form.regFrom" v-model:to="form.regTo" />
            </div>
          </div>

          <!-- Scheduled date and time range -->
          <div class="flex items-start gap-4">
            <label class="text-sm font-medium text-gray-700 w-36 pt-1.5 leading-tight">Scheduled<br>date and<br>time</label>
            <div class="flex-1">
              <DateRangeInputs v-model:from="form.schedFrom" v-model:to="form.schedTo" />
            </div>
          </div>

          <!-- Creator -->
          <div class="flex items-center gap-4">
            <label class="text-sm font-medium text-gray-700 w-36">Creator</label>
            <input type="text" v-model="form.creator" class="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-400" />
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 px-8 py-4 border-t border-gray-100">
          <button @click="clearForm" class="px-5 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Clear search criteria
          </button>
          <button @click="$emit('close')" class="flex items-center gap-1.5 px-6 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
            search
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive } from 'vue'
import DateRangeInputs from './DateRangeInputs.vue'

defineEmits(['close'])

const form = reactive({
  customerName: '', place: '', creator: '',
  regFrom: { date: '', time: '', extra: '' },
  regTo:   { date: '', time: '', extra: '' },
  schedFrom: { date: '', time: '', extra: '' },
  schedTo:   { date: '', time: '', extra: '' },
})

function clearForm() {
  Object.assign(form, {
    customerName: '', place: '', creator: '',
    regFrom: { date: '', time: '', extra: '' },
    regTo:   { date: '', time: '', extra: '' },
    schedFrom: { date: '', time: '', extra: '' },
    schedTo:   { date: '', time: '', extra: '' },
  })
}
</script>
