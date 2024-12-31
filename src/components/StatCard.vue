<script setup lang="ts">
defineProps<{
  title: string
  value: string
  icon?: any
}>()
</script>

<template>
  <div class="bg-white rounded-lg p-6 shadow-sm">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-sm text-gray-500">{{ title }}</h3>
        <p class="text-2xl font-semibold mt-1">{{ value }}</p>
      </div>
      <div v-if="icon" class="bg-gray-100 p-3 rounded-full">
        <component :is="icon" class="w-6 h-6 text-gray-600" />
      </div>
    </div>
  </div>
</template>