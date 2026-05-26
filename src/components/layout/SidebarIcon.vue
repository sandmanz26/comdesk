<template>
  <button
    :title="title"
    :class="[
      'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
      active
        ? 'bg-brand-light text-brand'
        : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
    ]"
  >
    <span class="w-5 h-5 block">
      <slot />
    </span>
  </button>
</template>

<script setup>
defineProps({
  title: String,
  active: { type: Boolean, default: false }
})
</script>
