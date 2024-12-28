<template>
  <div class="grid grid-cols-2 gap-6">
    <!-- Transaction by product -->
    <div class="bg-white rounded-lg p-6 shadow-sm">
      <h3 class="text-lg font-medium mb-4">Transaction by product</h3>
      <div class="relative" style="height: 200px;">
        <!-- Placeholder for chart - would use a proper chart library in production -->
        <div class="w-48 h-48 rounded-full border-8 border-blue-500 relative mx-auto">
          <div class="absolute inset-0 border-t-8 border-r-8 border-red-500 rounded-full rotate-45"></div>
          <div class="absolute inset-0 border-t-8 border-brown-500 rounded-full rotate-[250deg]"></div>
        </div>
      </div>
      <div class="flex justify-center gap-4 mt-4">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-red-500 rounded"></div>
          <span class="text-sm">Project</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-blue-500 rounded"></div>
          <span class="text-sm">Commodities</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-brown-500 rounded"></div>
          <span class="text-sm">Procurement</span>
        </div>
      </div>
    </div>

    <!-- Transaction by awarding companies -->
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

<script setup lang="ts">
// Chart implementation would go here
</script>