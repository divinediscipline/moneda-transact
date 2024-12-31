<script setup lang="ts">
import { ref } from "vue";
import NewTransactionModal from "../components/NewTransactionModal.vue";
import { onMounted } from "vue";
import { useSummary } from "../composables/useSummary";
import DashboardContent from "../components/DashboardContent.vue";
import Sidebar from "../components/Sidebar.vue"
import Header from '../components/Header.vue'

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const { loading, error, summaryData, fetchSummary } = useSummary();

onMounted(() => {
  fetchSummary();
});
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen">
    <Sidebar/>
    <div class="flex-1">
      <Header class="border-b"/>
      <div class=" flex-grow h-screen">
        <header class="bg-white">
          <div
            class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
          >
            <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              @click="openModal"
              class="px-4 py-2 bg-primary text-white rounded-md transition duration-300"
            >
              New Transaction
            </button>
          </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div v-if="loading" class="text-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"
            ></div>
          </div>

          <div v-else-if="error" class="text-center py-12">
            <p class="text-red-600">{{ error }}</p>
            <button
              @click="fetchSummary"
              class="mt-4 text-blue-600 hover:text-blue-800"
            >
              Try again
            </button>
          </div>

          <DashboardContent v-else :summary-data="summaryData" />

          <NewTransactionModal :is-open="isModalOpen" @close="closeModal" />
        </main>
      </div>
    </div>
  </div>
</template>

