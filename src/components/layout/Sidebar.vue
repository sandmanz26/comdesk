<template>
  <aside class="w-14 bg-white border-r border-gray-200 flex flex-col items-center py-3 gap-1 z-30 shrink-0 relative">
    <!-- Logo -->
    <div class="mb-3 flex items-center justify-center">
      <div class="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
        <svg class="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
        </svg>
      </div>
    </div>

    <!-- Nav Items -->
    <nav class="flex flex-col items-center gap-1 w-full px-2">

      <!-- Dashboard (no flyout) -->
      <RouterLink to="/dashboard" custom v-slot="{ navigate, isActive }">
        <SidebarIcon :active="isActive" title="Dashboard" @click="navigate">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
          </svg>
        </SidebarIcon>
      </RouterLink>

      <!-- Call Home (WITH flyout submenu) -->
      <div
        class="relative w-full flex justify-center"
        @mouseenter="showCallMenu = true"
        @mouseleave="showCallMenu = false"
      >
        <RouterLink to="/call-home" custom v-slot="{ navigate, isActive }">
          <SidebarIcon :active="isActive || showCallMenu" title="Call Home" @click="navigate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
            </svg>
          </SidebarIcon>
        </RouterLink>

        <!-- Flyout submenu panel -->
        <Transition name="flyout">
          <div
            v-if="showCallMenu"
            class="absolute left-full top-0 z-50 w-60 bg-white border border-gray-200 shadow-lg rounded-r-md overflow-hidden"
            @mouseenter="showCallMenu = true"
            @mouseleave="showCallMenu = false"
          >
            <!-- Title -->
            <div class="px-4 pt-4 pb-2">
              <p class="text-xl font-normal text-gray-400">Call Home</p>
            </div>

            <!-- Mode items -->
            <nav>
              <button
                v-for="mode in callModes"
                :key="mode.id"
                @click="goToMode(mode.id)"
                class="w-full text-left px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors border-t border-gray-100 first:border-t-0"
              >
                {{ mode.label }}
              </button>
            </nav>
          </div>
        </Transition>
      </div>

      <!-- Customer (WITH flyout submenu) -->
      <div
        class="relative w-full flex justify-center"
        @mouseenter="showCustomerMenu = true"
        @mouseleave="showCustomerMenu = false"
      >
        <RouterLink to="/customer/master-data" custom v-slot="{ navigate, isActive }">
          <SidebarIcon :active="isActive || showCustomerMenu" title="Customer" @click="navigate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>
            </svg>
          </SidebarIcon>
        </RouterLink>

        <!-- Customer flyout panel -->
        <Transition name="flyout">
          <div
            v-if="showCustomerMenu"
            class="absolute left-full top-0 z-50 w-60 bg-white border border-gray-200 shadow-lg rounded-r-md overflow-hidden"
            @mouseenter="showCustomerMenu = true"
            @mouseleave="showCustomerMenu = false"
          >
            <div class="px-4 pt-4 pb-2">
              <p class="text-xl font-normal text-gray-400">Customer</p>
            </div>
            <nav>
              <RouterLink
                v-for="item in customerMenuItems"
                :key="item.id"
                :to="item.path"
                @click="showCustomerMenu = false"
                class="block w-full text-left px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors border-t border-gray-100"
              >
                {{ item.label }}
              </RouterLink>
            </nav>
          </div>
        </Transition>
      </div>

      <SidebarIcon title="Data">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125v-5.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v5.625m-3.75 0V11.25A2.625 2.625 0 016 8.625m0 0v10.875m0-10.875h12m0 0V8.625A2.625 2.625 0 0115.375 6H18a2.625 2.625 0 012.625 2.625v10.875m-9-10.875v10.875"/>
        </svg>
      </SidebarIcon>

      <!-- Teams (WITH flyout submenu) -->
      <div
        class="relative w-full flex justify-center"
        @mouseenter="showTeamsMenu = true"
        @mouseleave="showTeamsMenu = false"
      >
        <RouterLink to="/teams/appointment" custom v-slot="{ navigate, isActive }">
          <SidebarIcon :active="isActive || showTeamsMenu" title="Teams" @click="navigate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
            </svg>
          </SidebarIcon>
        </RouterLink>

        <Transition name="flyout">
          <div
            v-if="showTeamsMenu"
            class="absolute left-full top-0 z-50 w-60 bg-white border border-gray-200 shadow-lg rounded-r-md overflow-hidden"
            @mouseenter="showTeamsMenu = true"
            @mouseleave="showTeamsMenu = false"
          >
            <div class="px-4 pt-4 pb-2">
              <p class="text-xl font-normal text-gray-400">Teams</p>
            </div>
            <nav>
              <RouterLink
                v-for="item in teamsMenuItems"
                :key="item.id"
                :to="item.path"
                @click="showTeamsMenu = false"
                class="block w-full text-left px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors border-t border-gray-100"
              >
                {{ item.label }}
              </RouterLink>
            </nav>
          </div>
        </Transition>
      </div>

      <RouterLink to="/report" custom v-slot="{ navigate, isActive }">
        <SidebarIcon :active="isActive" title="Analytics" @click="navigate">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>
          </svg>
        </SidebarIcon>
      </RouterLink>

      <SidebarIcon title="Appointments">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
        </svg>
      </SidebarIcon>
    </nav>

    <div class="flex-1" />

    <!-- Bottom icons -->
    <div class="flex flex-col items-center gap-1 w-full px-2">
      <SidebarIcon title="Settings">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      </SidebarIcon>

      <SidebarIcon title="Support">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
        </svg>
      </SidebarIcon>

      <!-- Profile -->
      <div class="mt-2 w-8 h-8 rounded-full bg-brand-light border-2 border-brand flex items-center justify-center cursor-pointer" title="Profile">
        <svg class="w-4 h-4 text-brand" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SidebarIcon from './SidebarIcon.vue'
import { customerMenuItems } from '@/data/callHomeData.js'

import { teamsMenuItems } from '@/data/appointmentData.js'

const router = useRouter()
const showCallMenu = ref(false)
const showCustomerMenu = ref(false)
const showTeamsMenu = ref(false)

const callModes = [
  { id: 'normal', label: 'Normal call mode' },
  { id: 'auto',   label: 'Automatic distribution call mode' },
  { id: 'new',    label: 'New Call Mode' }
]

function goToMode(modeId) {
  showCallMenu.value = false
  router.push({ path: '/call-home', query: { mode: modeId } })
}
</script>

<style scoped>
/* Flyout slide-in animation */
.flyout-enter-active,
.flyout-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.flyout-enter-from,
.flyout-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}
</style>
