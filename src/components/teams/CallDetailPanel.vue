<template>
  <div class="flex flex-col border-l border-gray-200 bg-white overflow-hidden">
    <!-- Top bar -->
    <div class="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 shrink-0">
      <div class="flex-1" />
      <button class="flex items-center gap-1.5 px-3 py-1 text-xs border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/></svg>
        URL sharing
      </button>
      <button @click="$emit('close')" class="ml-3 text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <!-- Content row -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left column -->
      <div class="w-[300px] shrink-0 flex flex-col border-r border-gray-100 overflow-y-auto">
        <!-- Date/info card -->
        <div class="px-4 pt-4 pb-3 border-b border-gray-100">
          <p class="text-sm font-medium text-gray-700 mb-3">{{ formatDateHeader(row.dateTime) }}</p>
          <div class="space-y-1.5">
            <div class="flex items-center gap-2 text-xs text-gray-400">
              <span class="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-xs leading-none shrink-0"></span>
              <span>-</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-gray-400">
              <span class="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-xs leading-none shrink-0"></span>
              <span>-</span>
            </div>
          </div>
        </div>
        <!-- Call memo -->
        <div class="px-4 pt-3 flex-1">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">Call memo</span>
            <button class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"/></svg>
            </button>
          </div>
          <p class="text-xs text-gray-500">{{ row.memo }}</p>
        </div>
      </div>

      <!-- Right column: tabs -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Tab headers -->
        <div class="flex items-center border-b border-gray-200 shrink-0 px-2 pt-1">
          <button v-for="tab in tabs" :key="tab.id"
            @click="activeTab = tab.id"
            :class="['flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors',
              activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700']">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path v-if="tab.id === 'summary'" stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
              <path v-else-if="tab.id === 'call-text'" stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
            </svg>
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab content -->
        <div class="flex-1 overflow-y-auto">

          <!-- Summary tab -->
          <div v-if="activeTab === 'summary'" class="p-4">
            <div class="flex items-center gap-2 mb-3">
              <div class="relative flex-1">
                <select class="w-full border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-400 appearance-none pr-8">
                  <option>Summary prompt</option>
                </select>
                <svg class="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </div>
              <button class="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 shrink-0">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>
                change
              </button>
            </div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-gray-700">Summary Results</span>
              <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Prompt used: Standard prompt</span>
            </div>
            <p class="text-xs text-gray-700 leading-relaxed whitespace-pre-line">{{ summaryText }}</p>
          </div>

          <!-- Call text tab -->
          <div v-else-if="activeTab === 'call-text'" class="p-4">
            <div class="flex items-center justify-end gap-2 mb-4">
              <button class="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/></svg>
              </button>
              <button class="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/></svg>
              </button>
              <button class="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"/></svg>
              </button>
            </div>
            <div class="space-y-4">
              <div v-for="msg in transcript" :key="msg.id">
                <p class="text-xs text-gray-400 mb-1" :class="msg.side === 'right' ? 'text-right' : 'text-left'">{{ msg.time }}</p>
                <div :class="['flex', msg.side === 'right' ? 'justify-end' : 'justify-start']">
                  <div v-if="msg.side === 'left'" class="mr-2 shrink-0">
                    <span class="text-xs text-gray-500 font-medium block mb-1">{{ msg.speaker }}</span>
                    <div class="bg-gray-100 rounded-lg px-3 py-2 max-w-[280px]">
                      <p class="text-xs text-gray-700">{{ msg.text }}</p>
                    </div>
                  </div>
                  <div v-else class="text-right">
                    <span class="text-xs text-gray-500 font-medium block mb-1">{{ msg.speaker }}</span>
                    <div class="bg-blue-500 rounded-lg px-3 py-2 max-w-[280px] inline-block">
                      <p class="text-xs text-white text-left">{{ msg.text }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Voice analysis tab -->
          <div v-else-if="activeTab === 'voice-analysis'" class="p-4 space-y-3">
            <div class="flex gap-3">
              <!-- Score card -->
              <div class="w-[160px] shrink-0 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center">
                <span class="text-xs text-gray-400 mb-2">Overall score</span>
                <span class="text-4xl font-bold text-gray-800 leading-none">61 points</span>
                <span class="text-sm text-gray-500 mt-1">B rank</span>
              </div>
              <!-- Personality grid card -->
              <div class="flex-1 border border-gray-200 rounded-lg overflow-hidden">
                <div class="grid grid-cols-2 border-b border-gray-100">
                  <div class="px-3 py-2 border-r border-gray-100">
                    <p class="text-xs font-medium text-gray-600">Active listening</p>
                    <p class="text-xs text-gray-400 leading-tight">High listening ratio, low overlap, low speaking speed</p>
                  </div>
                  <div class="px-3 py-2">
                    <p class="text-xs font-medium text-gray-600">driven type</p>
                    <p class="text-xs text-gray-400 leading-tight">Speak ratio/overlap/speech speed</p>
                  </div>
                </div>
                <div class="grid grid-cols-3 border-b border-gray-100 text-xs text-gray-500">
                  <div class="px-3 py-2 border-r border-gray-100">Passionate type</div>
                  <div class="px-3 py-2 border-r border-gray-100">Supporter type</div>
                  <div class="px-3 py-2">Leader type</div>
                </div>
                <div class="grid grid-cols-3 relative text-xs text-gray-500">
                  <div class="px-3 py-2 border-r border-gray-100">Calm type</div>
                  <div class="px-3 py-2 border-r border-gray-100">Counselor type</div>
                  <div class="px-3 py-2 relative">
                    Expert Type
                    <span class="absolute right-4 bottom-2 w-2.5 h-2.5 rounded-full bg-red-500 block"></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats + evaluation -->
            <div class="flex gap-3">
              <!-- Stats -->
              <div class="flex-1 border border-gray-200 rounded-lg p-3">
                <div v-for="s in voiceStats" :key="s.label" class="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                  <span class="text-xs text-gray-600">{{ s.label }}</span>
                  <span class="text-xs font-semibold text-gray-800">{{ s.value }}</span>
                </div>
              </div>
              <!-- Evaluation -->
              <div class="flex-1 border border-gray-200 rounded-lg p-3 overflow-y-auto max-h-[240px]">
                <p class="text-xs font-semibold text-gray-700 mb-2">[comprehensive evaluation]</p>
                <div class="space-y-1 text-xs text-gray-600 leading-relaxed">
                  <p><span class="font-medium">• Score:</span> 61 points / B rank</p>
                  <p><span class="font-medium">• type:</span> Expert type</p>
                  <p><span class="font-medium">• Your strengths:</span> A calm and persuasive way of speaking</p>
                  <p><span class="font-medium">• Top priority areas for improvement:</span> Improve the clarity of your voice</p>
                  <p class="mt-2 font-medium">[Specific Action Plan]</p>
                  <p><span class="font-medium">Problem 1: Lack of vocal clarity.</span></p>
                  <p>• <span class="font-medium">analysis:</span> The HNR (Hearing Noise Ratio) value is low, suggesting that clarity may be insufficient due to speaking too quickly or lack of articulation.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Audio player -->
    <div class="shrink-0 bg-gray-900 px-4 py-2">
      <!-- Speaker tracks -->
      <div class="space-y-1 mb-2">
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-400 w-48 truncate shrink-0">{{ row.user || 'User' }} (former carrier number)</span>
          <div class="flex-1 h-3 rounded overflow-hidden bg-gray-700 relative">
            <div class="absolute inset-y-0 left-0 w-2/3 bg-purple-500 opacity-70 rounded"
              style="background: repeating-linear-gradient(90deg, #a855f7 0px, #a855f7 3px, #7c3aed 4px, #7c3aed 6px)"></div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-400 w-48 truncate shrink-0">{{ row.destinationNumber }}</span>
          <div class="flex-1 h-3 rounded overflow-hidden bg-gray-700 relative">
            <div class="absolute inset-y-0 left-0 w-1/3 bg-green-400 opacity-70 rounded"
              style="background: repeating-linear-gradient(90deg, #4ade80 0px, #4ade80 3px, #16a34a 4px, #16a34a 6px)"></div>
          </div>
        </div>
      </div>
      <!-- Controls -->
      <div class="flex items-center gap-3">
        <button class="text-white hover:text-gray-300">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 000-1.69L9.54 5.98A.998.998 0 008 6.82z"/></svg>
        </button>
        <button class="text-gray-400 hover:text-white">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/><text x="7" y="15" font-size="6" fill="currentColor">15</text></svg>
        </button>
        <button class="text-gray-400 hover:text-white">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/></svg>
        </button>
        <span class="text-xs text-gray-400">0:00 / 1:29</span>
        <div class="flex-1" />
        <button class="text-xs text-gray-400 hover:text-white px-1">1x</button>
        <button class="text-gray-400 hover:text-white">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
        </button>
        <button class="text-gray-400 hover:text-white">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ row: { type: Object, required: true } })
defineEmits(['close'])

const activeTab = ref('summary')

const tabs = [
  { id: 'summary',       label: 'summary' },
  { id: 'call-text',     label: 'Call text' },
  { id: 'voice-analysis', label: 'Voice analysis' },
]

function formatDateHeader(dt) {
  if (!dt) return ''
  const d = new Date(dt.replace(' ', 'T'))
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const y = d.getFullYear(), mo = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0'), mi = String(d.getMinutes()).padStart(2, '0')
  return `${y}/${mo}/${day} (${days[d.getDay()]}) ${h}:${mi}`
}

const summaryText = `## 1. Summary of the conversation
A customer and a representative from the calling party made a call and were checking the voice recording using the old carrier number. As the conversation progressed, no new information was provided or conclusions were reached, and the call time was announced to end.

## 2. Main topics and points
- Important topics and keywords discussed:
  - Old carrier number
  - Voice recording check
- Decisions made and facts confirmed:
  - The call is scheduled to end (in 1 minute).
- Other special notes to record:
  - None in particular.

## 3. Current system and services
- Services and operational flow currently used:
  - The old carrier's voice recording check process was mentioned.

## 4. Customer reaction and sentiment
- Positive reactions, concerns, and points of emphasis:
  - The conversation seemed to be progressing without any particular problems.

## 5. Next Action
- What to do next:
  - Share the results of the voice recording check with relevant parties.`

const transcript = [
  { id: 1, time: '00:04', speaker: `${props.row.user || 'User'} (former carrier number)`, side: 'right', text: 'This is <Personal Information - Name>.' },
  { id: 2, time: '00:04', speaker: props.row.destinationNumber, side: 'left', text: 'ah.' },
  { id: 3, time: '00:09', speaker: `${props.row.user || 'User'} (former carrier number)`, side: 'right', text: 'We will use your old carrier number to check your voice recordings.' },
  { id: 4, time: '00:14', speaker: `${props.row.user || 'User'} (former carrier number)`, side: 'right', text: 'I will end the call in one minute.' },
  { id: 5, time: '00:16', speaker: `${props.row.user || 'User'} (former carrier number)`, side: 'right', text: 'This is the user\'s side.' },
  { id: 6, time: '00:20', speaker: props.row.destinationNumber, side: 'left', text: 'This is the receiving customer\'s side of the call.' },
]

const voiceStats = [
  { label: 'Speaking: Listening', value: '63:37' },
  { label: 'Number of times', value: '2 times' },
  { label: 'Speech speed (user)', value: '6.42 words/sec' },
  { label: 'Speaking speed (other party)', value: '4.94 words/second' },
  { label: 'Number of filler injections', value: '10 times' },
  { label: 'Intonation (user)', value: '13.1' },
  { label: 'Intonation (on the other party)', value: '29.3' },
]
</script>
