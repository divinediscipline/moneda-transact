<script setup lang="ts">
import { useRoute } from 'vue-router'
import horseIcon from '@/assets/icons/horse.png'
import dashboardIcon from '@/assets/icons/dashboard.png'
import transactionIcon from '@/assets/icons/transaction.png' 
import logoutIcon from '@/assets/icons/logout.png'

const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};

</script>

<template>
  <div class="h-screen w-64 bg-black text-white p-6 flex flex-col">
    <!-- Logo -->
    <div class="mb-12 flex justify-center">
      <img :src="horseIcon" alt="Horse Logo" class="w-12 h-12" />
    </div>

    <!-- Navigation -->
    <nav class="flex-1">
      <router-link to="/"  :class="[
          'flex items-center space-x-3 p-3 rounded-lg mb-2',
          isActive('/') ? 'bg-primary' : 'hover:bg-gray-800'
        ]">
        <img :src="dashboardIcon" alt="Dashboard Icon" class="w-6 h-6" />
        <span>Dashboard</span>
      </router-link>

      <router-link to="/transactions" :class="[
          'flex items-center space-x-3 p-3 rounded-lg mb-2',
          isActive('/procurement/new') ? 'bg-primary' : 'hover:bg-gray-800'
        ]">
        <img :src="transactionIcon" alt="Transaction Icon" class="w-6 h-6" />
        <span>Transactions</span>
      </router-link>
    </nav>

    <!-- Logout -->
    <button class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800">
      <img :src="logoutIcon" alt="Logout Icon" class="w-6 h-6" />
      <span>Logout</span>
    </button>
  </div>
</template>