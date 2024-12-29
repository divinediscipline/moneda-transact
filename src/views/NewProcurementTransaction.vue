<template>
  <div class="p-6">
    <div class="flex items-center mb-8">
      <button 
        @click="$router.back()" 
        class="flex items-center text-primary-600 hover:text-primary-700"
      >
        <ArrowLeftIcon class="w-4 h-4 mr-1" />
        BACK
      </button>
    </div>

    <h1 class="text-2xl font-semibold mb-8">New Procurement Transaction</h1>

    <div class="bg-gray-100 rounded-lg p-2 mb-8">
      <div class="flex space-x-4">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex items-center px-4 py-2 rounded-lg',
            activeTab === tab.id 
              ? 'bg-white' 
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          <component :is="tab.icon" class="w-5 h-5 mr-2" />
          {{ tab.name }}
        </button>
      </div>
    </div>

    <TransitionGroup
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <AwardingCompanyForm v-if="activeTab === 'awarding'" />
      <SuppliersForm v-else />
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowLeftIcon, BuildingOfficeIcon, UserGroupIcon } from '@heroicons/vue/24/outline'
import AwardingCompanyForm from '@/components/procurement/AwardingCompanyForm.vue'
import SuppliersForm from '@/components/procurement/SuppliersForm.vue'

const activeTab = ref('awarding')

const tabs = [
  {
    id: 'awarding',
    name: 'Awarding Company',
    icon: BuildingOfficeIcon
  },
  {
    id: 'suppliers',
    name: 'Suppliers',
    icon: UserGroupIcon
  }
]
</script>