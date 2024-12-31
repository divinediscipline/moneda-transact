<script setup lang="ts">
import type { TransactionSummary } from '../types/summary';
import TopSuppliers from './TopSuppliers.vue';
import MetricCard from './MetricCard.vue';
import TransactionCharts from './TransactionCharts.vue';
import { formatCurrency } from '../utils/formatters';
import { getTopThreeSocSummaries } from '../utils/validators';
import TransactionIcon from '@/assets/icons/transaction.svg?component'
// import transactionIconss from '@/assets/icons/transaction.ico'
import StatCard from './StatCard.vue'
import BanknotesIcon from '@/assets/icons/banknotes.svg'

const props = defineProps<{
  summaryData: TransactionSummary | null;
}>();

const { total_transaction, transaction_value, transaction_cost, total_disbursement, gross_profitability, avg_execution_time, soc_summary, transaction_type_summary } = props.summaryData?.data;
</script>

<template>
  <div>
    <div class="grid grid-cols-12 gap-6">
      <!-- Top Suppliers -->
      <div class="col-span-3">
        <TopSuppliers :soc-summary="soc_summary"/>
      </div>

      <!-- Metrics -->
      <div class="col-span-9 grid grid-cols-3 gap-6">
        <MetricCard
          title="Total Transactions"
          :value="total_transaction || 0"
          icon="TransactionIcon"
          icon-bg-color="bg-blue-500"
        />
        <MetricCard
          title="Transactions value"
          :value="formatCurrency(transaction_value) || 0"
          icon="TransactionIcon"
          icon-bg-color="bg-orange-500"
          prefix="$"
        />
        <MetricCard
          title="Transactions costs"
          :value="formatCurrency(transaction_cost) || 0"
          icon="TransactionIcon"
          icon-bg-color="bg-orange-500"
          prefix="$"
        />
        <MetricCard
          title="Disbursements"
          :value="formatCurrency(total_disbursement) || 0"
          icon="TransactionIcon"
          icon-bg-color="bg-blue-500"
          prefix="$"
        />
        <MetricCard
          title="Gross profitability"
          :value="formatCurrency(gross_profitability) || 0"
          icon="TransactionIcon"
          icon-bg-color="bg-orange-500"
          prefix="$"
        />
        <MetricCard
          title="Avg. Execution time"
          :value="Math.ceil(avg_execution_time) || 0"
          icon="TransactionIcon"
          icon-bg-color="bg-blue-500"
          suffix=" days"
        />
      </div>
    </div>

    <!-- Charts -->
    <div class="mt-6">
      <TransactionCharts :transaction-type-summary="transaction_type_summary"/>
    </div>
  </div>
</template>

