import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import CallHome from '@/views/CallHome.vue'
import CustomerPage from '@/views/CustomerPage.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/call-home', name: 'CallHome', component: CallHome },
  { path: '/customer/:section?', name: 'Customer', component: CustomerPage }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
