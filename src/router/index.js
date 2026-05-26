import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import CallHome from '@/views/CallHome.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/call-home', name: 'CallHome', component: CallHome }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
