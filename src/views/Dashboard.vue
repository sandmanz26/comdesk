<template>
  <div class="flex flex-col h-full overflow-hidden">
    <!-- Filter bar -->
    <div class="px-6 pt-5 pb-3 flex items-center justify-between bg-gray-100 shrink-0">
      <h1 class="text-2xl font-semibold text-gray-800">Dashboard</h1>
      <div class="flex items-center gap-2">
        <FilterDropdown label="User" />
        <FilterDropdown label="Workgroup" />
        <FilterDropdown label="project" />
        <button class="date-input">2026/04/26</button>
        <button class="date-input">2026/05/26</button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
      <!-- KPI Section -->
      <section>
        <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 pt-2">KPI for the day</h2>
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
                <CircularGauge :value="kpi.connections.rate" :size="82" :stroke-width="7" progress-color="#0BBFA3" track-color="#E5E7EB" />
              </div>
            </div>
          </div>

          <!-- Card 3: Custom KPIs -->
          <div class="kpi-card">
            <p class="kpi-title flex items-center gap-1">
              Custom KPIs
              <GearIcon class="w-3.5 h-3.5 text-gray-400" />
            </p>
            <div class="flex items-center justify-between gap-2">
              <div>
                <p class="text-xs text-gray-500 mb-1">numerical values</p>
                <span class="text-2xl font-semibold text-gray-700">{{ kpi.customKpis.numericalValues }}</span>
              </div>
              <div class="flex flex-col items-center">
                <p class="text-xs text-gray-500 mb-0.5 text-center leading-tight">rate</p>
                <p class="text-xs text-brand mb-1 text-center leading-tight">({{ kpi.customKpis.rateLabel }})</p>
                <CircularGauge :value="kpi.customKpis.rate" :size="82" :stroke-width="7" progress-color="#0BBFA3" track-color="#E5E7EB" />
              </div>
            </div>
          </div>

          <!-- Card 4: Appointment -->
          <div class="kpi-card">
            <p class="kpi-title flex items-center gap-1">
              Appointment
              <GearIcon class="w-3.5 h-3.5 text-gray-400" />
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
                  <th class="text-right px-4 py-3 font-medium text-gray-600 whitespace-nowrap"><span>Number of</span><br/><span>connections</span></th>
                  <th class="text-right px-4 py-3 font-medium text-gray-600 whitespace-nowrap">Average talk time</th>
                  <th class="text-right px-4 py-3 font-medium text-gray-600 whitespace-nowrap"><span>Average post-</span><br/><span>processing time</span></th>
                  <th class="text-right px-4 py-3 font-medium text-gray-600 whitespace-nowrap"><span>Average response</span><br/><span>time</span></th>
                  <th class="text-right px-4 py-3 font-medium text-gray-600 whitespace-nowrap"><span>Number of</span><br/><span>appointments secured</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in dailyRows" :key="i" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td :class="['px-4 py-3 whitespace-nowrap font-medium', row.isWeekend ? 'text-red-400' : 'text-gray-700']">{{ row.date }}</td>
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
</template>

<script setup>
import CircularGauge from '@/components/dashboard/CircularGauge.vue'
import FilterDropdown from '@/components/ui/FilterDropdown.vue'
import PhoneOutIcon from '@/components/icons/PhoneOutIcon.vue'
import PhoneInIcon from '@/components/icons/PhoneInIcon.vue'
import GearIcon from '@/components/icons/GearIcon.vue'
import { kpiData, dailyData } from '@/data/dashboardData.js'

const kpi = kpiData
const dailyRows = dailyData
</script>
