<script setup lang="ts">
interface Option {
  label: string;
  value: string;
}

defineProps<{
  id: string;
  label?: string;
  modelValue: string;
  options: Option[];
  selectClass?: string; 
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div class="space-y-2">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      :class="selectClass" 
      class="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm 
        focus:border-orange-500 focus:ring-orange-500"
    >
      <option value="" disabled>Select {{ label }}</option>
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.name"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

