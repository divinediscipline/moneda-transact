<script setup lang="ts">
import { ref } from "vue";
import {
  ArrowLeftIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CheckCircleIcon,
  StopCircleIcon,
} from "@heroicons/vue/24/outline";
import AwardingCompanyForm from "@/components/procurement/AwardingCompanyForm.vue";
import SuppliersForm from "@/components/procurement/SuppliersForm.vue";
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";

const activeTab = ref("awarding");
const isAwardingComplete = ref(false);

const tabs = [
  {
    id: "awarding",
    name: "Awarding Company",
    icon: StopCircleIcon,
  },
  {
    id: "suppliers",
    name: "Suppliers",
    icon: StopCircleIcon,
  },
];

const handleAwardingComplete = () => {
  isAwardingComplete.value = true;
  activeTab.value = "suppliers";
};
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen">
    <Sidebar />
    <div class="flex-1">
      <Header class="border-b" />
      <div class="p-6">
        <div class="flex items-center mb-8">
          <button
            @click="$router.back()"
            class="flex items-center text-sm text-primary hover:text-primary-700"
          >
            <ArrowLeftIcon class="w-4 h-4 mr-1" />
            BACK
          </button>
        </div>

        <h1 class="text-2xl font-semibold mb-8">New Procurement Transaction</h1>

        <div class="mx-auto max-w-4xl mt-8">
          <div class="bg-gray-100 rounded-t-lg p-2 mb-8">
            <div class="flex justify-around space-x-4">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'flex items-center px-4 py-2',
                  activeTab === tab.id
                    ? 'border-b-4 border-primary'
                    : 'text-gray-500 hover:text-gray-700',
                ]"
              >
                <component :is="tab.icon" class="w-5 h-5 mr-2" />
                {{ tab.name }}
                <CheckCircleIcon
                  v-if="tab.id === 'awarding' && isAwardingComplete"
                  class="w-5 h-5 ml-2 text-green-500"
                />
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
            <AwardingCompanyForm
              v-if="activeTab === 'awarding'"
              @complete="handleAwardingComplete"
            />
            <SuppliersForm v-else-if="activeTab === 'suppliers'" />
          </TransitionGroup>

        </div>
      </div>
    </div>
  </div>
</template>
