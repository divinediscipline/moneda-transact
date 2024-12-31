<script setup lang="ts">
import { DocumentTextIcon, CurrencyDollarIcon, ClockIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

defineProps<{
  title: string;
  value: string | number;
  icon: Component;
  iconBgColor: string;
  prefix?: string;
  suffix?: string;
}>();
</script>

<template>
  <div class="bg-white rounded-[18px] p-6 shadow-sm border-solid border-[7px] border-[#E6E6E6]">
    <div class="flex items-center gap-3">
      <div v-if="icon" class="bg-gray-100 p-3 rounded-full">
        <component :is="icon" class="w-6 h-6 text-gray-600" />
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

