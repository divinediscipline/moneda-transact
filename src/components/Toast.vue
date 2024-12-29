<template>
  <TransitionRoot
    appear
    :show="visible"
    as="template"
  >
    <div 
      class="fixed bottom-4 right-4 z-50"
      :class="{
        'bg-primary-600': type === 'success',
        'bg-red-600': type === 'error'
      }"
    >
      <div class="rounded-lg shadow-lg p-4 text-white flex items-center">
        <CheckCircleIcon 
          v-if="type === 'success'"
          class="w-5 h-5 mr-2"
        />
        <XCircleIcon
          v-else
          class="w-5 h-5 mr-2"
        />
        {{ message }}
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { TransitionRoot } from '@headlessui/vue'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import { useToast } from '@/composables/useToast'

const { visible, message, type } = useToast()
</script>