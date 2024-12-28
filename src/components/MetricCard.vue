<template>
  <div class="bg-white rounded-lg p-6 shadow-sm">
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-full" :class="iconBgColor">
        <component :is="icon" class="w-5 h-5 text-white" />
      </div>
      <div>
        <p class="text-sm text-gray-600">{{ title }}</p>
        <p class="text-xl font-semibold mt-1">
          <span v-if="prefix">{{ prefix }}</span>{{ value }}
          <span v-if="suffix">{{ suffix }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DocumentTextIcon, CurrencyDollarIcon, ClockIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

defineProps<{
  title: string;
  value: string | number;
  icon: string;
  iconBgColor: string;
  prefix?: string;
  suffix?: string;
}>();
</script>