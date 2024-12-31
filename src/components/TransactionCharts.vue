<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = {
  labels: ['Project', 'Commodities', 'Procurement'],
  datasets: [{
    data: [45, 35, 20],
    backgroundColor: ['#ff5722', '#2196f3', '#4a4a4a']
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