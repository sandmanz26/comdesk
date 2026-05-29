import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import CallHome from '@/views/CallHome.vue'
import CustomerPage from '@/views/CustomerPage.vue'
import TeamsPage from '@/views/TeamsPage.vue'
import ReportPage from '@/views/ReportPage.vue'
import ManagePage from '@/views/ManagePage.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/call-home', name: 'CallHome', component: CallHome },
  { path: '/customer/:section?', name: 'Customer', component: CustomerPage },
  { path: '/teams/:section?', name: 'Teams', component: TeamsPage },
  { path: '/report', name: 'Report', component: ReportPage },
  { path: '/manage/:section?', name: 'Manage', component: ManagePage },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
