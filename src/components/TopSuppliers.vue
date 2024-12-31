<template>
  <div class="bg-gradient-to-b from-[#170901] to-[#762E01] rounded-lg p-6 pt-8 pb-28 text-white">
    <h3 class="text-lg font-medium mb-4">Top OEMs/Suppliers</h3>
    <div class="space-y-3">
      <div v-for="supplier in suppliers" :key="supplier.name" class="flex justify-between items-center bg-white rounded-full p-1.5 text-black">
        <span class="text-xs">{{ supplier.name }}</span>
        <span class="font-medium text-primary text-xs">${{ formatNumber(supplier.amount) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Supplier {
  name: string;
  amount: number;
}

const suppliers: Supplier[] = [
  { name: 'Sahara', amount: 100000 },
  { name: 'Halliburton', amount: 50000 },
  { name: 'Baker Hughes', amount: 7000 }
];

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};
</script>