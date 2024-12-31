<script setup lang="ts">
interface Supplier {
  name: string;
  value_usd: number;
}

import { getTopThreeSocSummaries } from "@/utils/validators"
import { formatCurrency } from '@/utils/formatters';


const props = defineProps<{
  socSummary: Supplier[];
}>();

const topSuppliers = getTopThreeSocSummaries(props.socSummary)
</script>

<template>
  <div class="bg-gradient-to-b from-[#170901] to-[#762E01] rounded-lg p-6 pt-8 pb-28 text-white">
    <h3 class="text-lg font-medium mb-4">Top OEMs/Suppliers</h3>
    <div class="space-y-3">
      <div v-for="supplier in topSuppliers" :key="supplier.name" class="flex justify-between items-center bg-white rounded-full p-1.5 text-black">
        <span class="text-xs">{{ supplier.name }}</span>
        <span class="font-medium text-primary text-xs">${{ formatCurrency(supplier.value_usd) }}</span>
      </div>
    </div>
  </div>
</template>

