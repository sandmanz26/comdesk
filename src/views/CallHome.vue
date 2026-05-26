<template>
  <div class="flex flex-1 h-full overflow-hidden">

    <!-- ============================================================
         LEFT PANEL: Mode Selector (~280px)
    ============================================================= -->
    <div class="w-[272px] shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div class="px-4 py-3 border-b border-gray-200">
        <h2 class="text-sm font-semibold text-gray-800">Call Home</h2>
      </div>
      <nav class="py-1">
        <button
          v-for="mode in callModes"
          :key="mode.id"
          @click="selectMode(mode.id)"
          :class="[
            'w-full text-left px-4 py-2.5 text-sm transition-colors',
            selectedMode === mode.id
              ? 'bg-gray-100 text-gray-800 font-medium'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          ]"
        >
          {{ mode.label }}
        </button>
      </nav>
    </div>

    <!-- ============================================================
         CENTER PANEL: Contact form + Customer List (flex-1)
    ============================================================= -->
    <div class="flex-1 flex flex-col overflow-hidden bg-white border-r border-gray-200 min-w-0">
      <div class="flex-1 overflow-y-auto">

        <!-- ── NEW CALL MODE (auto/new): Project + Phone input header ── -->
        <div v-if="selectedMode !== 'normal'" class="border-b border-gray-200">
          <!-- Selected project bar -->
          <div class="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
            <span class="text-sm text-gray-700">
              Selected project:
              <span :class="selectedProject ? 'text-blue-600 font-medium' : 'text-gray-600'">
                {{ selectedProject ? selectedProject.name : 'Project not selected' }}
              </span>
            </span>
            <button
              @click="showProjectModal = true"
              class="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-300 rounded px-2.5 py-1.5 hover:bg-gray-100 transition-colors"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
              </svg>
              Project Selection
            </button>
          </div>
          <!-- Phone number input -->
          <div class="px-4 py-3 border-b border-gray-200">
            <div class="flex items-center gap-0 border-2 border-blue-500 rounded overflow-hidden">
              <button class="px-3 py-2 bg-gray-50 border-r border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-100">+</button>
              <input
                v-model="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                class="flex-1 px-3 py-2 text-sm outline-none bg-white text-gray-700 placeholder-gray-400"
              />
              <button
                @click="phoneNumber = ''"
                class="px-3 py-2 bg-gray-50 border-l border-gray-300 text-sm text-gray-600 hover:bg-gray-100"
              >
                Reset
              </button>
            </div>
          </div>
          <!-- Empty state area -->
          <div class="h-6 bg-gray-50" />
        </div>

        <!-- ── CONTACT FORM ── -->
        <div class="px-0">
          <!-- Star rating badge (normal mode only) -->
          <div v-if="selectedMode === 'normal'" class="flex justify-end px-4 pt-3 pb-1">
            <div class="star-badge">
              <span v-for="i in 5" :key="i" class="text-white text-sm">★</span>
            </div>
          </div>

          <!-- Name header row (non-normal modes) -->
          <div v-if="selectedMode !== 'normal'" class="flex border-b border-gray-200">
            <div class="w-1/2 px-3 py-2 border-r border-gray-200">
              <span class="text-base font-bold text-gray-800">Name</span>
            </div>
            <div class="w-1/2 px-3 py-2">
              <span class="text-sm text-gray-500">in kana</span>
            </div>
          </div>

          <!-- Remarks textarea row -->
          <div class="border-b border-gray-200">
            <div class="flex">
              <div class="w-[130px] shrink-0 px-3 py-2 bg-gray-50 border-r border-gray-200 flex items-start">
                <span class="text-xs text-gray-700 font-medium">remarks</span>
              </div>
              <div class="flex-1 p-1">
                <textarea
                  v-model="formData.remarks"
                  rows="2"
                  class="w-full text-sm outline-none resize-none p-1.5 text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          <!-- 2-column form grid -->
          <table class="w-full border-collapse">
            <tbody>
              <tr v-for="(row, ri) in formFields" :key="ri" class="border-b border-gray-200">
                <!-- Left field -->
                <td class="w-[130px] px-3 py-2 bg-gray-50 border-r border-gray-200 text-xs font-medium text-gray-700 align-top whitespace-nowrap">
                  {{ row[0].label }}
                </td>
                <td class="px-2 py-1.5 border-r border-gray-200">
                  <input
                    v-model="formData[row[0].key]"
                    type="text"
                    class="w-full text-sm outline-none px-1 py-0.5 text-gray-700 bg-transparent"
                  />
                </td>
                <!-- Right field -->
                <template v-if="row[1]">
                  <td class="w-[130px] px-3 py-2 bg-gray-50 border-r border-gray-200 text-xs font-medium text-gray-700 align-top whitespace-nowrap">
                    {{ row[1].label }}
                  </td>
                  <td class="px-2 py-1.5">
                    <input
                      v-model="formData[row[1].key]"
                      type="text"
                      class="w-full text-sm outline-none px-1 py-0.5 text-gray-700 bg-transparent"
                    />
                  </td>
                </template>
                <template v-else>
                  <td class="bg-gray-50 border-r border-gray-200" />
                  <td />
                </template>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Keep button -->
        <div class="flex justify-end px-4 py-2.5 border-t border-gray-200">
          <button class="px-4 py-1.5 text-sm border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors">
            keep
          </button>
        </div>

        <!-- ── CUSTOMER LIST SECTION ── -->
        <div class="border-t border-gray-300">
          <!-- Search bar -->
          <div class="flex items-center gap-2 px-3 py-2 border-b border-gray-200 bg-gray-50">
            <span class="text-sm font-semibold text-gray-700 w-10">{{ customerTotal }}</span>
            <div class="flex items-center gap-1 flex-1 border border-gray-300 rounded bg-white px-2 py-1">
              <svg class="w-3.5 h-3.5 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
              </svg>
              <input v-model="searchQuery" type="text" placeholder="Search form" class="flex-1 text-xs outline-none text-gray-700 placeholder-gray-400 min-w-0" />
            </div>
            <button class="w-5 h-5 flex items-center justify-center text-blue-500">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
              </svg>
            </button>
            <button class="px-2.5 py-1 text-xs border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50">ALL</button>
            <button
              @click="showProjectModal = true"
              class="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-300 rounded px-2.5 py-1.5 hover:bg-gray-100 transition-colors ml-auto"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
              </svg>
              Project Selection
            </button>
          </div>

          <!-- Customer table -->
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left px-3 py-2 font-medium text-gray-600 text-xs">
                  customer name
                  <span class="text-gray-400 ml-0.5">↑</span>
                </th>
                <th class="text-right px-3 py-2 font-medium text-gray-600 text-xs">
                  count<span class="text-gray-400 ml-0.5">↑</span>
                </th>
                <th class="text-right px-3 py-2 font-medium text-gray-600 text-xs">
                  Last call date<span class="text-gray-400 ml-0.5">↑</span>
                </th>
                <th class="text-right px-3 py-2 font-medium text-gray-600 text-xs">
                  status<span class="text-gray-400 ml-0.5">↑</span>
                </th>
                <th class="text-right px-3 py-2 font-medium text-gray-600 text-xs">
                  remarks<span class="text-gray-400 ml-0.5">↑</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="customers.length === 0">
                <td colspan="5" class="px-3 py-8 text-center text-sm text-gray-400">No customers found</td>
              </tr>
              <tr
                v-for="(c, i) in customers"
                :key="i"
                class="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <td class="px-3 py-2 text-sm text-blue-600">{{ c.name }}</td>
                <td class="px-3 py-2 text-sm text-right text-gray-600">{{ c.count }}</td>
                <td class="px-3 py-2 text-sm text-right text-gray-600">{{ c.lastCallDate }}</td>
                <td class="px-3 py-2 text-sm text-right text-gray-600">{{ c.status }}</td>
                <td class="px-3 py-2 text-sm text-right text-gray-600">{{ c.remarks }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ============================================================
         RIGHT PANEL: Phone Controls + History (~460px)
    ============================================================= -->
    <div class="w-[460px] shrink-0 bg-white flex flex-col overflow-hidden">

      <!-- Phone controls + Date row -->
      <div class="flex border-b border-gray-200 shrink-0">

        <!-- Phone control section -->
        <div class="flex-1 p-2 flex flex-col gap-1.5 border-r border-gray-200 bg-gray-50">
          <!-- Main call action buttons -->
          <div class="flex gap-1.5">
            <button
              @click="callState = 'active'"
              :class="[
                'flex-1 py-3 rounded-lg flex items-center justify-center transition-colors',
                callState === 'active' ? 'bg-brand' : 'bg-brand hover:bg-brand-dark'
              ]"
              title="Answer / Call"
            >
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"/>
              </svg>
            </button>
            <button
              class="flex-1 py-3 rounded-lg flex items-center justify-center bg-amber-400 hover:bg-amber-500 transition-colors"
              title="Hold"
            >
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd"/>
              </svg>
            </button>
            <button
              class="flex-1 py-3 rounded-lg flex items-center justify-center bg-red-300 hover:bg-red-400 transition-colors"
              title="Hang up"
            >
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5zM15.75 3.75a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>

          <!-- Line selectors row -->
          <div class="flex items-center gap-1">
            <div class="w-7 h-7 bg-white border border-gray-300 rounded flex items-center justify-center shrink-0 text-gray-500 text-xs cursor-pointer hover:bg-gray-50">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <button
              @click="callState = 'idle'"
              class="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600"
              title="Close manual"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <span class="text-xs text-gray-500 mr-1">manual</span>
            <div v-for="n in 4" :key="n"
              class="flex items-center gap-0.5 px-1.5 py-0.5 border border-gray-300 rounded text-xs text-gray-600 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <svg class="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              {{ n }}
            </div>
          </div>

          <!-- Prohibited + MyBox -->
          <div class="flex gap-1.5">
            <button class="flex items-center gap-1 px-2 py-1 text-xs border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 flex-1">
              <svg class="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="9"/>
                <path stroke-linecap="round" d="M4.929 4.929l14.142 14.142"/>
              </svg>
              Prohibited
            </button>
            <button class="flex items-center gap-1 px-2 py-1 text-xs border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 flex-1">
              <svg class="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>
              </svg>
              MyBox
            </button>
          </div>

          <!-- Track navigation (orange) -->
          <div class="flex gap-1.5">
            <button class="flex-1 py-1.5 rounded flex items-center justify-center bg-amber-500 hover:bg-amber-600 transition-colors">
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z"/>
              </svg>
            </button>
            <button class="flex-1 py-1.5 rounded flex items-center justify-center bg-amber-500 hover:bg-amber-600 transition-colors">
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z"/>
              </svg>
            </button>
          </div>

          <!-- Sending a mobile -->
          <button class="flex items-center gap-2 px-2 py-1 text-xs text-gray-600 border border-gray-200 rounded bg-white hover:bg-gray-50 transition-colors">
            <svg class="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"/>
            </svg>
            Sending a mobile
          </button>
        </div>

        <!-- Date display section (blue bg) -->
        <div class="w-[120px] shrink-0 bg-sky-400 flex flex-col items-center justify-center p-3 relative">
          <button class="absolute top-2 right-2 text-white opacity-80 hover:opacity-100">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
            </svg>
          </button>
          <p class="text-white text-xs font-medium opacity-90">{{ todayLabel.weekday }},</p>
          <p class="text-white text-3xl font-bold leading-tight">{{ todayLabel.month }}</p>
          <p class="text-white text-3xl font-bold leading-tight">{{ todayLabel.day }}</p>
        </div>
      </div>

      <!-- Counters -->
      <div class="flex border-b border-gray-200 shrink-0">
        <div class="flex-1 flex flex-col items-center py-2 border-r border-gray-200">
          <span class="text-xl font-semibold text-gray-700">{{ callStats.calls }}</span>
          <span class="text-xs text-gray-400">calls</span>
        </div>
        <div class="flex-1 flex flex-col items-center py-2">
          <span class="text-xl font-semibold text-gray-700">{{ callStats.appointments }}</span>
          <span class="text-xs text-gray-400">appointments</span>
        </div>
      </div>

      <!-- Keep button -->
      <button class="w-full py-2.5 bg-sky-400 hover:bg-sky-500 text-white text-sm font-medium transition-colors shrink-0">
        keep
      </button>

      <!-- Respondent / Status area -->
      <div class="flex border-b border-gray-200 shrink-0">
        <div class="flex-1 border-r border-gray-200">
          <div class="px-3 py-2 border-b border-gray-100">
            <span class="text-xs font-medium text-gray-600">Respondent</span>
          </div>
          <div class="h-24" />
        </div>
        <div class="flex-1">
          <div class="px-3 py-2 border-b border-gray-100">
            <span class="text-xs font-medium text-gray-600">status</span>
          </div>
          <div class="h-24" />
        </div>
      </div>

      <!-- Recall / Appointment buttons -->
      <div class="flex border-b border-gray-200 shrink-0">
        <button class="flex-1 py-2.5 text-sm text-gray-600 border-r border-gray-200 hover:bg-gray-50 transition-colors">
          Recall
        </button>
        <button class="flex-1 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          Appointment
        </button>
      </div>

      <!-- Call details memo -->
      <div class="shrink-0 px-3 py-2 border-b border-gray-200">
        <span class="text-xs font-semibold text-gray-700">Call details memo</span>
      </div>
      <div class="bg-sky-50 mx-2 my-1.5 rounded h-10 shrink-0" />

      <!-- History tabs -->
      <div class="flex border-b border-gray-200 shrink-0">
        <button
          v-for="tab in historyTabs"
          :key="tab"
          @click="activeHistoryTab = tab"
          :class="[
            'flex-1 py-2 text-sm transition-colors',
            activeHistoryTab === tab
              ? 'bg-blue-600 text-white font-medium'
              : 'text-gray-500 hover:bg-gray-50'
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- History table -->
      <div class="flex-1 overflow-y-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50">
              <th class="text-left px-2 py-2 font-medium text-gray-600">type</th>
              <th class="text-left px-2 py-2 font-medium text-gray-600">Date and time</th>
              <th class="text-left px-2 py-2 font-medium text-gray-600">Creator</th>
              <th class="text-left px-2 py-2 font-medium text-gray-600">Call duration</th>
              <th class="text-left px-2 py-2 font-medium text-gray-600">Respo...</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="historyRows.length === 0">
              <td colspan="5" class="px-2 py-6 text-center text-gray-400 text-xs">No history</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Project Selection Modal -->
    <ProjectSelectionModal
      v-if="showProjectModal"
      @close="showProjectModal = false"
      @select="onProjectSelect"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProjectSelectionModal from '@/components/callhome/ProjectSelectionModal.vue'
import { callModes, formFields } from '@/data/callHomeData.js'

const selectedMode = ref('normal')
const showProjectModal = ref(false)
const selectedProject = ref(null)
const phoneNumber = ref('')
const searchQuery = ref('')
const callState = ref('idle')
const activeHistoryTab = ref('History')
const historyTabs = ['History', 'Recall', 'Appointment']
const customers = ref([])
const customerTotal = ref(100)

const historyRows = ref([])

const callStats = ref({ calls: 0, appointments: 0 })

const formData = ref({
  remarks: '', postCode: '', prefectures: '', address1: '', address2: '',
  addressKana: '', tel1: '', tel2: '', tel3: '', tel4: '', fax: '',
  url: '', formerCompany: '', leadSource: ''
})

const todayLabel = computed(() => {
  const d = new Date()
  return {
    weekday: d.toLocaleDateString('en-US', { weekday: 'long' }),
    month: d.toLocaleDateString('en-US', { month: 'long' }),
    day: d.toLocaleDateString('en-US', { day: 'numeric' }) + 'th'
  }
})

function selectMode(id) {
  selectedMode.value = id
}

function onProjectSelect(project) {
  selectedProject.value = project
}
</script>

<style scoped>
.star-badge {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 6px 20px 6px 12px;
  background-color: #1e3a8a;
  clip-path: polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%);
}
</style>
