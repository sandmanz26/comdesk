<template>
  <div class="flex items-stretch gap-0">
    <!-- From inputs -->
    <div class="flex-1 flex flex-col gap-0 border border-gray-300 rounded-l overflow-hidden">
      <input type="date" :value="from.date" @input="$emit('update:from', { ...from, date: $event.target.value })"
        class="px-2 py-1.5 text-xs border-b border-gray-200 outline-none focus:bg-blue-50 w-full" />
      <input type="time" :value="from.time" @input="$emit('update:from', { ...from, time: $event.target.value })"
        class="px-2 py-1.5 text-xs border-b border-gray-200 outline-none focus:bg-blue-50 w-full" />
      <input type="text" :value="from.extra" @input="$emit('update:from', { ...from, extra: $event.target.value })"
        class="px-2 py-1.5 text-xs outline-none focus:bg-blue-50 w-full" />
    </div>

    <!-- Middle divider with ⇌ -->
    <div class="flex items-center justify-center w-8 bg-gray-100 border-t border-b border-gray-300 text-gray-500 text-xs font-medium shrink-0">
      ⇌
    </div>

    <!-- To inputs -->
    <div class="flex-1 flex flex-col gap-0 border border-gray-300 rounded-r overflow-hidden">
      <input type="date" :value="to.date" @input="$emit('update:to', { ...to, date: $event.target.value })"
        class="px-2 py-1.5 text-xs border-b border-gray-200 outline-none focus:bg-blue-50 w-full" />
      <input type="time" :value="to.time" @input="$emit('update:to', { ...to, time: $event.target.value })"
        class="px-2 py-1.5 text-xs border-b border-gray-200 outline-none focus:bg-blue-50 w-full" />
      <input type="text" :value="to.extra" @input="$emit('update:to', { ...to, extra: $event.target.value })"
        class="px-2 py-1.5 text-xs outline-none focus:bg-blue-50 w-full" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  from: { type: Object, default: () => ({ date: '', time: '', extra: '' }) },
  to:   { type: Object, default: () => ({ date: '', time: '', extra: '' }) },
})
defineEmits(['update:from', 'update:to'])
</script>
