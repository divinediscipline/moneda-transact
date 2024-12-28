<template>
  <div class="space-y-2">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      type="file"
      accept=".pdf,.docx,.xlsx"
      @change="handleFileChange"
      class="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-orange-50 file:text-orange-700
        hover:file:bg-orange-100"
    />
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  id: string;
  label: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', file: File | null): void;
}>();

const error = ref('');

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  
  if (!file) {
    emit('update:modelValue', null);
    return;
  }

  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  if (!allowedTypes.includes(file.type)) {
    error.value = 'Invalid file type. Please upload PDF, DOCX, or XLSX files only.';
    emit('update:modelValue', null);
    return;
  }

  error.value = '';
  emit('update:modelValue', file);
};
</script>