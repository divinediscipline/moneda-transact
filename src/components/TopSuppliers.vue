<template>
  <div class="bg-gradient-to-br from-brown-800 to-brown-900 rounded-lg p-6 text-white">
    <h3 class="text-lg font-medium mb-4">Top OEMs/Suppliers</h3>
    <div class="space-y-3">
      <div v-for="supplier in suppliers" :key="supplier.name" class="flex justify-between items-center">
        <span class="text-sm">{{ supplier.name }}</span>
        <span class="font-medium">${{ formatNumber(supplier.amount) }}</span>
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