<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
              <div class="flex justify-between items-center mb-8">
                <DialogTitle as="h3" class="text-xl font-semibold text-gray-900">
                  Our products were made just for you, select<br/>
                  an option below to get started.
                </DialogTitle>
                <button
                  @click="closeModal"
                  class="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon class="h-6 w-6" />
                </button>
              </div>

              <div class="grid grid-cols-3 gap-4 mb-8">
                <div
                  v-for="option in options"
                  :key="option.title"
                  :class="[
                    'p-4 rounded-lg border-2 cursor-pointer transition-all',
                    selectedOption === option.title
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                  @click="selectOption(option.title)"
                >
                  <component
                    :is="option.icon"
                    class="w-8 h-8 text-primary-600 mb-3"
                  />
                  <h4 class="font-medium text-gray-900 mb-2">{{ option.title }}</h4>
                  <p class="text-sm text-gray-500">{{ option.description }}</p>
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  @click="handleNext"
                  class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { BuildingLibraryIcon, PercentIcon, WrenchScrewdriverIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['close'])
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const selectedOption = ref(null)

const options = [
  {
    title: 'Commodities',
    description: 'Support to traders of essential commodities in the energy industry.',
    icon: BuildingLibraryIcon
  },
  {
    title: 'Procurement',
    description: 'Supply of equipments with funding and execution capacity.',
    icon: PercentIcon
  },
  {
    title: 'Services',
    description: 'Support operation, installation and maintenance contracts.',
    icon: WrenchScrewdriverIcon
  }
]

const closeModal = () => {
  emit('close')
  selectedOption.value = null
}

const selectOption = (option) => {
  selectedOption.value = option
}

const handleNext = () => {
  if (selectedOption.value === 'Procurement') {
    router.push('/procurement/new')
  }
}

</script>

<style scoped>
.bg-primary-50 {
  background-color: #fef2f2;
}
.bg-primary-600 {
  background-color: #dc2626;
}
.bg-primary-700 {
  background-color: #b91c1c;
}
.text-primary-600 {
  color: #dc2626;
}
.border-primary-600 {
  border-color: #dc2626;
}
</style>