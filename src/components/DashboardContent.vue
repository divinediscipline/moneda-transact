<script setup lang="ts">
import type { TransactionSummary } from '../types/summary';
import TopSuppliers from './TopSuppliers.vue';
import MetricCard from './MetricCard.vue';
import TransactionCharts from './TransactionCharts.vue';
import { formatCurrency } from '../utils/formatters';
import TransactionIcon from '@/assets/icons/transaction.svg?component'
// import transactionIconss from '@/assets/icons/transaction.ico'
import StatCard from './StatCard.vue'
import BanknotesIcon from '@/assets/icons/banknotes.svg'

defineProps<{
  summaryData: TransactionSummary | null;
}>();</script>

<template>
  <div>
    <div class="grid grid-cols-12 gap-6">
      <!-- Top Suppliers -->
      <div class="col-span-3">
        <TopSuppliers />
      </div>

      <!-- Metrics -->
      <div class="col-span-9 grid grid-cols-3 gap-6">
        <MetricCard
          title="Total Transactions"
          :value="summaryData?.totalTransactions || 0"
          icon="TransactionIcon"
          icon-bg-color="bg-blue-500"
        />
        <MetricCard
          title="Transactions value"
          :value="formatCurrency(summaryData?.totalAmount)"
          icon="TransactionIcon"
          icon-bg-color="bg-orange-500"
          prefix="$"
        />
        <MetricCard
          title="Transactions costs"
          value="128k"
          icon="TransactionIcon"
          icon-bg-color="bg-orange-500"
          prefix="$"
        />
        <MetricCard
          title="Disbursements"
          value="93k"
          icon="TransactionIcon"
          icon-bg-color="bg-blue-500"
          prefix="$"
        />
        <MetricCard
          title="Gross profitability"
          value="110k"
          icon="TransactionIcon"
          icon-bg-color="bg-orange-500"
          prefix="$"
        />
        <MetricCard
          title="Avg. Execution time"
          value="0"
          icon="TransactionIcon"
          icon-bg-color="bg-blue-500"
          suffix=" days"
        />
      </div>
    </div>

    <!-- Charts -->
    <div class="mt-6">
      <TransactionCharts />
    </div>
  </div>
</template>

