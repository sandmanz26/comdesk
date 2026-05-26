<template>
  <div class="relative flex items-center justify-center" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="-rotate-90">
      <!-- Background track -->
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke="trackColor"
        :stroke-width="strokeWidth"
      />
      <!-- Progress arc -->
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke="progressColor"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        stroke-linecap="round"
        class="transition-all duration-700"
      />
    </svg>
    <!-- Center label -->
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <span class="font-semibold leading-tight" :style="{ fontSize: valueFontSize + 'px', color: value > 0 ? progressColor : '#9CA3AF' }">
        {{ value }}<span class="text-xs font-normal"> %</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  size: { type: Number, default: 90 },
  strokeWidth: { type: Number, default: 8 },
  progressColor: { type: String, default: '#0BBFA3' },
  trackColor: { type: String, default: '#E5E7EB' }
})

const center = computed(() => props.size / 2)
const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - props.value / 100))
const valueFontSize = computed(() => props.size < 80 ? 14 : 18)
</script>
