<template>
  <div class="w-5 h-5 flex items-center justify-center">
    <!-- missed: red phone -->
    <svg v-if="type === 'missed'" class="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd"/>
    </svg>
    <!-- outgoing: teal phone with up-right arrow -->
    <svg v-else-if="type === 'outgoing'" class="w-4 h-4 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd"/>
      <path d="M15 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V5.56l-3.97 3.97a.75.75 0 01-1.06-1.06L18.44 4.5h-2.69A.75.75 0 0115 3.75z"/>
    </svg>
    <!-- incoming: teal phone with down-left arrow -->
    <svg v-else-if="type === 'incoming'" class="w-4 h-4 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd"/>
      <path d="M20.25 3.75a.75.75 0 00-1.06 0L15.22 7.72V5.03a.75.75 0 00-1.5 0v4.5a.75.75 0 00.75.75h4.5a.75.75 0 000-1.5h-2.69l3.97-3.97a.75.75 0 000-1.06z"/>
    </svg>
    <!-- transfer: double forward arrows -->
    <svg v-else-if="type === 'transfer'" class="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"/>
    </svg>
    <!-- fallback -->
    <svg v-else class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd"/>
    </svg>
  </div>
</template>

<script setup>
defineProps({ type: { type: String, default: '' } })
</script>
