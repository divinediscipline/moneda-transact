import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Dashboard from './views/Dashboard.vue'
import Transaction from './views/Transaction.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/transaction', component: Transaction },
    {
      path: '/procurement/new',
      component: () => import('@/views/NewProcurementTransaction.vue')
    }
    
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#root')