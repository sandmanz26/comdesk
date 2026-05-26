<template>
  <div class="flex h-screen overflow-hidden bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden min-w-0">
      <TopBar v-model="networkMode" @modeChange="networkMode = $event" />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import TopBar from '@/components/layout/TopBar.vue'

const networkMode = ref('mobile')
</script>
