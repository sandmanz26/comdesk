<template>
  <div class="flex flex-col flex-1 overflow-hidden bg-white">
    <UserManagement      v-if="section === 'user-management'" />
    <WorkgroupManagement v-else-if="section === 'workgroup-management'" />
    <AccessManagement    v-else-if="section === 'access-management'" />
    <div v-else class="flex-1 flex items-center justify-center text-gray-400 text-sm">
      {{ sectionLabel }} — coming soon
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import UserManagement      from '@/components/manage/UserManagement.vue'
import WorkgroupManagement from '@/components/manage/WorkgroupManagement.vue'
import AccessManagement    from '@/components/manage/AccessManagement.vue'

const route = useRoute()
const section = computed(() => route.params.section || 'user-management')

const sectionLabels = {
  'user-management':          'User Management',
  'workgroup-management':     'Workgroup Management',
  'access-management':        'Access Management',
  'activity-result-settings': 'Activity Result Settings',
  'list-item-settings':       'List item settings',
  'omnichannel-settings':     'Omnichannel settings',
  'integration-management':   'Integration Management',
  'pipeline-management':      'Pipeline Management',
  'keyword-settings':         'Keyword settings',
  'summary-prompt-settings':  'Summary prompt settings',
  'tenant-settings':          'Tenant settings',
}
const sectionLabel = computed(() => sectionLabels[section.value] || section.value)
</script>
