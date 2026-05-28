<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div class="absolute inset-0 bg-black/30" @click="$emit('close')" />
      <div class="relative bg-white rounded-lg shadow-xl w-[680px] flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="flex items-center px-6 py-4 border-b border-gray-100">
          <div class="flex-1" />
          <h2 class="text-base font-semibold text-gray-800">Edit History</h2>
          <div class="flex-1 flex justify-end">
            <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Call info -->
        <div class="px-6 py-4 border-b border-gray-100">
          <p class="font-semibold text-gray-900 text-base mb-2">{{ row.name || '(no name)' }}</p>
          <div class="flex items-center gap-2 text-sm text-gray-500 mb-0.5">
            <CallTypeIcon :type="row.type" />
            <span>Out of Office&nbsp;&nbsp;{{ formatDate(row.dateTime) }}</span>
          </div>
          <p class="text-sm text-gray-500 mb-0.5">User:&nbsp;&nbsp;{{ row.user }}</p>
          <p class="text-sm text-gray-500">Recipient number: {{ row.destinationNumber }}</p>
        </div>

        <!-- Form -->
        <div class="px-6 py-5">
          <div class="flex items-center gap-6 mb-4">
            <div class="flex items-center gap-3">
              <label class="text-sm text-gray-600 shrink-0">Respondent</label>
              <div class="relative">
                <select v-model="form.respondent" class="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-400 min-w-[180px] appearance-none pr-8">
                  <option value="">-</option>
                  <option value="The person himself">The person himself</option>
                  <option value="Absent">Absent</option>
                </select>
                <svg class="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <label class="text-sm text-gray-600 shrink-0">status</label>
              <div class="relative">
                <select v-model="form.status" class="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-400 min-w-[180px] appearance-none pr-8">
                  <option value="">-</option>
                  <option value="Test state newline">Test state newline</option>
                  <option value="Out of service">Out of service</option>
                  <option value="appointment">appointment</option>
                  <option value="absence">absence</option>
                </select>
                <svg class="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
          </div>
          <textarea v-model="form.memo" rows="4" class="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-400 resize-none" />
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-4 px-6 py-4 border-t border-gray-100">
          <button @click="$emit('close')" class="px-5 py-2 text-sm text-blue-500 hover:text-blue-600 transition-colors">cancel</button>
          <button @click="save" class="px-6 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors">keep</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive } from 'vue'
import CallTypeIcon from './CallTypeIcon.vue'

const props = defineProps({ row: { type: Object, required: true } })
const emit = defineEmits(['close', 'save'])

const form = reactive({
  respondent: props.row.respondent,
  status: props.row.status,
  memo: props.row.memo,
})

function formatDate(dt) {
  if (!dt) return ''
  return dt.substring(0, 16).replace('-', '/').replace('-', '/')
}

function save() {
  emit('save', { ...form })
  emit('close')
}
</script>
