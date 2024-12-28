<template>
  <div class="space-y-2">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
        focus:border-orange-500 focus:ring-orange-500"
    >
      <option value="" disabled>Select {{ label }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string;
  value: string;
}

defineProps<{
  id: string;
  label: string;
  modelValue: string;
  options: Option[];
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>