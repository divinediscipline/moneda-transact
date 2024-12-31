<script setup lang="ts">

interface Transaction {
  transaction_type: string;
  value_usd: number;
  count: number
}

import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { getTransactionTypeCounts } from "@/utils/validators"

const props = defineProps<{
  transactionTypeSummary: Transaction[];
}>();

const label_sequence = ['Services', 'Commodities', 'Procurement']
const dataSequence = getTransactionTypeCounts(props.transactionTypeSummary, label_sequence)

ChartJS.register(ArcElement, Tooltip, Legend)


const chartData = {
  labels: label_sequence,
  datasets: [{
    data: dataSequence,
    backgroundColor: ['#CC5500', '#007ACC', '#4D3626']
  }]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}
</script>

<template>
  <div class="grid grid-cols-2 gap-6 overfow-hidden">
    <div class="bg-white p-6 rounded-lg overflow-auto">
      <h2 class="text-lg font-semibold mb-4">Transaction by product</h2>
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
    <div class="bg-white rounded-lg p-6 shadow-sm">
        <h3 class="text-lg font-medium mb-4">Transaction by awarding companies</h3>
        <div class="grid grid-cols-4 gap-2" style="height: 200px;">
          <!-- Placeholder for treemap - would use a proper chart library in production -->
          <div class="bg-purple-400 col-span-2 row-span-2"></div>
          <div class="bg-pink-400 col-span-2"></div>
          <div class="bg-purple-600"></div>
          <div class="bg-teal-400"></div>
        </div>
      </div>
</div>
</template>