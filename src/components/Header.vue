<script setup lang="ts">
import { BellIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <header class="flex justify-end items-center p-4 bg-white">
    <div class="flex items-center space-x-4">
      <button class="p-2 hover:bg-gray-100 rounded-full">
        <BellIcon class="w-6 h-6 text-gray-500" />
      </button>
      <div class="flex items-center space-x-2">
        <UserCircleIcon class="w-8 h-8 text-gray-500" />
        <span class="text-sm text-gray-700">Company name</span>
      </div>
    </div>
  </header>
</template>