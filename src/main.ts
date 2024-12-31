import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Dashboard from './views/Dashboard.vue'
import Transaction from './views/Transaction.vue'
import NewProcurementTransaction from './views/NewProcurementTransaction.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard },
    {
      path: '/procurement/new',
      component: NewProcurementTransaction
    }
    
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#root')