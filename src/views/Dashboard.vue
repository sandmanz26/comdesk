<template>
  <div class="flex flex-col h-full overflow-hidden">
    <!-- Top Header Bar -->
    <header class="bg-white border-b border-gray-200 px-5 py-2.5 flex items-center justify-between shrink-0">
      <!-- Logo + Mode buttons -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-full bg-brand flex items-center justify-center">
            <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
          </div>
          <span class="text-brand font-semibold text-base tracking-tight">comdesk lead</span>
        </div>

        <div class="flex items-center gap-1 bg-gray-100 rounded-full p-0.5">
          <button
            @click="activeMode = 'mobile'"
            :class="[
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
              activeMode === 'mobile'
                ? 'bg-gray-800 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Mobile network (app)
          </button>
          <button
            @click="activeMode = 'auto'"
            :class="[
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
              activeMode === 'auto'
                ? 'bg-gray-800 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Auto mode
          </button>
        </div>
      </div>

      <!-- Right actions -->
      <div class="flex items-center gap-3">
        <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
          </svg>
        </button>
        <button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors relative">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto">
      <!-- Filter bar -->
      <div class="px-6 pt-5 pb-3 flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <div class="flex items-center gap-2">
          <FilterDropdown label="User" />
          <FilterDropdown label="Workgroup" />
          <FilterDropdown label="project" />
          <button class="date-input">2026/04/26</button>
          <button class="date-input">2026/05/26</button>
        </div>
      </div>

      <div class="px-6 pb-6 space-y-5">
        <!-- KPI Section -->
        <section>
          <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">KPI for the day</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <!-- Card 1: Power Lines -->
            <div class="kpi-card">
              <p class="kpi-title">Total number of power lines</p>
              <div class="space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-1.5 text-xs text-gray-500">
                    <PhoneOutIcon class="w-4 h-4 text-brand" />
                    <span>Send</span>
                  </div>
                  <span class="text-2xl font-semibold text-gray-700">{{ kpi.powerLines.send }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-1.5 text-xs text-gray-500">
                    <PhoneInIcon class="w-4 h-4 text-red-500" />
                    <span>Incoming call</span>
                  </div>
                  <span class="text-2xl font-semibold text-gray-700">{{ kpi.powerLines.incomingCall }}</span>
                </div>
              </div>
            </div>

            <!-- Card 2: Connections -->
            <div class="kpi-card">
              <p class="kpi-title">Number of connections</p>
              <div class="flex items-center justify-between gap-2">
                <div>
                  <p class="text-xs text-gray-500 mb-1 leading-tight">Number of<br/>connections</p>
                  <span class="text-2xl font-semibold text-gray-700">{{ kpi.connections.count }}</span>
                </div>
                <div class="flex flex-col items-center">
                  <p class="text-xs text-gray-500 mb-1">Connection rate</p>
                  <CircularGauge
                    :value="kpi.connections.rate"
                    :size="82"
                    :stroke-width="7"
                    progress-color="#0BBFA3"
                    track-color="#E5E7EB"
                  />
                </div>
              </div>
            </div>

            <!-- Card 3: Custom KPIs -->
            <div class="kpi-card">
              <p class="kpi-title flex items-center gap-1">
                Custom KPIs
                <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </p>
              <div class="flex items-center justify-between gap-2">
                <div>
                  <p class="text-xs text-gray-500 mb-1">numerical values</p>
                  <span class="text-2xl font-semibold text-gray-700">{{ kpi.customKpis.numericalValues }}</span>
                </div>
                <div class="flex flex-col items-center">
                  <p class="text-xs text-gray-500 mb-0.5 text-center leading-tight">rate</p>
                  <p class="text-xs text-brand mb-1 text-center leading-tight">({{ kpi.customKpis.rateLabel }})</p>
                  <CircularGauge
                    :value="kpi.customKpis.rate"
                    :size="82"
                    :stroke-width="7"
                    progress-color="#0BBFA3"
                    track-color="#E5E7EB"
                  />
                </div>
              </div>
            </div>

            <!-- Card 4: Appointment -->
            <div class="kpi-card">
              <p class="kpi-title flex items-center gap-1">
                Appointment
                <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </p>
              <div class="flex items-center justify-center h-16">
                <span class="kpi-value-lg text-4xl">{{ kpi.appointment }}</span>
              </div>
            </div>

            <!-- Card 5: Total Call Time -->
            <div class="kpi-card">
              <p class="kpi-title">Total call time (average)</p>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-1.5">
                    <PhoneOutIcon class="w-4 h-4 text-brand" />
                    <span class="text-xs text-gray-500">Send</span>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-semibold text-gray-700">{{ kpi.callTime.send.current }}</div>
                    <div class="text-xs text-gray-400">({{ kpi.callTime.send.previous }})</div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-1.5">
                    <PhoneInIcon class="w-4 h-4 text-red-500" />
                    <span class="text-xs text-gray-500">Incoming call</span>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-semibold text-gray-700">{{ kpi.callTime.incoming.current }}</div>
                    <div class="text-xs text-gray-400">({{ kpi.callTime.incoming.previous }})</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 6: Post Processing Time -->
            <div class="kpi-card">
              <p class="kpi-title">Total post-processing time (average)</p>
              <div class="flex flex-col items-center justify-center h-16">
                <span class="text-3xl font-semibold text-gray-700">{{ kpi.postProcessingTime.current }}</span>
                <span class="text-sm text-gray-400">({{ kpi.postProcessingTime.previous }})</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Daily Data Table -->
        <section>
          <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Daily data</h2>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-200 bg-gray-50">
                    <th class="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">date</th>
                    <th class="text-right px-4 py-3 font-medium text-gray-600 whitespace-nowrap">Call duration</th>
                    <th class="text-right px-4 py-3 font-medium text-gray-600 whitespace-nowrap">Post-processing time</th>
                    <th class="text-right px-4 py-3 font-medium text-gray-600 whitespace-nowrap">Number of calls</th>
                    <th class="text-right px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                      <span>Number of</span><br/><span>connections</span>
                    </th>
                    <th class="text-right px-4 py-3 font-medium text-gray-600 whitespace-nowrap">Average talk time</th>
                    <th class="text-right px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                      <span>Average post-</span><br/><span>processing time</span>
                    </th>
                    <th class="text-right px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                      <span>Average response</span><br/><span>time</span>
                    </th>
                    <th class="text-right px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                      <span>Number of</span><br/><span>appointments secured</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, i) in dailyRows"
                    :key="i"
                    :class="['border-b border-gray-100 hover:bg-gray-50 transition-colors', row.isWeekend ? '' : '']"
                  >
                    <td :class="['px-4 py-3 whitespace-nowrap font-medium', row.isWeekend ? 'text-red-400' : 'text-gray-700']">
                      {{ row.date }}
                    </td>
                    <td class="px-4 py-3 text-right text-gray-600">{{ row.callDuration }}</td>
                    <td class="px-4 py-3 text-right text-gray-600">{{ row.postProcessingTime }}</td>
                    <td class="px-4 py-3 text-right text-gray-600">{{ row.numberOfCalls }}</td>
                    <td class="px-4 py-3 text-right text-gray-600">{{ row.numberOfConnections }}</td>
                    <td class="px-4 py-3 text-right text-gray-600">{{ row.averageTalkTime }}</td>
                    <td class="px-4 py-3 text-right text-gray-600">{{ row.averagePostProcessingTime }}</td>
                    <td class="px-4 py-3 text-right text-gray-600">{{ row.averageResponseTime }}</td>
                    <td class="px-4 py-3 text-right">
                      <span :class="row.appointmentsSecured !== null ? 'text-brand font-medium' : 'text-gray-400'">
                        {{ row.appointmentsSecured !== null ? row.appointmentsSecured : '-' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CircularGauge from '@/components/dashboard/CircularGauge.vue'
import FilterDropdown from '@/components/ui/FilterDropdown.vue'
import PhoneOutIcon from '@/components/icons/PhoneOutIcon.vue'
import PhoneInIcon from '@/components/icons/PhoneInIcon.vue'
import { kpiData, dailyData } from '@/data/dashboardData.js'

const activeMode = ref('mobile')
const kpi = kpiData
const dailyRows = dailyData
</script>
