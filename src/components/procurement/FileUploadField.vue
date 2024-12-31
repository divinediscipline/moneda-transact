<script setup>
import { computed, watch } from 'vue'
import { DocumentArrowUpIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import { useFileUpload } from '@/composables/useFileUpload'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  showInfo: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: File,
    default: null
  },
  maxSize: {
    type: Number,
    default: 2
  },
  allowedTypes: {
    type: Array,
    default: () => ['pdf', 'docx', 'pptx', 'xlsx']
  }
})

const emit = defineEmits(['update:modelValue'])

const { file, error, handleUpload } = useFileUpload({
  maxSize: props.maxSize,
  types: props.allowedTypes
})

const acceptedTypes = computed(() => 
  props.allowedTypes.map(type => `.${type}`).join(',')
)

// Watch for file changes and emit to parent
watch(file, (newFile) => {
  emit('update:modelValue', newFile)
})
</script>

<template>
  <div>
    <label class="block text-sm text-gray-700 mb-2">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
      <InformationCircleIcon v-if="showInfo" class="inline w-4 h-4 ml-1 text-gray-400" />
    </label>
    <div class="flex items-center justify-center w-full">
      <label class="flex flex-col items-center w-full px-4 py-6 bg-white text-gray-400 rounded-lg border-2 border-gray-200 border-solid cursor-pointer hover:border-primary-500">
        <DocumentArrowUpIcon class="w-8 h-8" />
        <span class="mt-2 text-sm">{{ file ? file.name : 'Upload file' }}</span>
        <input
          type="file"
          class="hidden"
          @change="handleUpload"
          :accept="acceptedTypes"
        />
      </label>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
    <p class="mt-1 text-sm text-gray-500">Max file size {{ maxSize }}MB ({{ allowedTypes.join(', ') }})</p>
  </div>
</template>

