<template>
  <form @submit.prevent="handleSubmit" class="max-w-3xl">
    <div class="grid grid-cols-2 gap-6">
      <!-- Awarding Company -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Awarding Company</label>
        <select v-model="formData.awardingCompany" class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="TotalEnergies">TotalEnergies</option>
        </select>
      </div>

      <!-- No. of previous contracts -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">No. of previous contracts</label>
        <select v-model="formData.previousContracts" class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="1">1</option>
        </select>
      </div>

      <!-- Value of contract -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Value of contract</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm">USD</span>
          </div>
          <input
            type="text"
            v-model="formData.contractValue"
            class="pl-12 w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
            placeholder="50000"
          />
        </div>
      </div>

      <!-- Payment Terms -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Payment Terms</label>
        <select v-model="formData.paymentTerms" class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="milestones">Milestones</option>
        </select>
      </div>

      <!-- Incoterms -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Incoterms</label>
        <select v-model="formData.incoterms" class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="Ex Works">Ex Works</option>
        </select>
      </div>

      <!-- Execution Time -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Execution Time (days)</label>
        <input
          type="number"
          v-model="formData.executionTime"
          class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          placeholder="90"
        />
      </div>

      <!-- Payment after invoice -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Payment after invoice (days)</label>
        <input
          type="number"
          v-model="formData.paymentAfterInvoice"
          class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          placeholder="90"
        />
      </div>
    </div>

    <!-- Purchase Order -->
    <div class="mt-6">
      <label class="block text-sm text-gray-700 mb-2">
        Purchase Order<span class="text-red-500">*</span>
      </label>
      <div class="flex items-center justify-center w-full">
        <label class="flex flex-col items-center w-full px-4 py-6 bg-white text-gray-400 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-primary-500">
          <DocumentArrowUpIcon class="w-8 h-8" />
          <span class="mt-2 text-sm">Upload file</span>
          <input type="file" class="hidden" @change="handleFileUpload" />
        </label>
      </div>
      <p class="mt-1 text-sm text-gray-500">Max file size 2MB (pdf, docx, pptx, xlsx)</p>
    </div>

    <!-- Previous Contracts Information -->
    <div class="mt-6">
      <div class="flex items-center mb-4">
        <h3 class="text-lg font-medium">Previous Contracts Information</h3>
        <InformationCircleIcon class="w-5 h-5 ml-2 text-gray-400" />
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-sm text-gray-700 mb-2">
            Previous Invoice (1)<span class="text-red-500">*</span>
          </label>
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col items-center w-full px-4 py-6 bg-white text-gray-400 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-primary-500">
              <DocumentArrowUpIcon class="w-8 h-8" />
              <span class="mt-2 text-sm">Upload file</span>
              <input type="file" class="hidden" @change="handleFileUpload" />
            </label>
          </div>
          <p class="mt-1 text-sm text-gray-500">Max file size 2MB (pdf, docx, pptx, xlsx)</p>
        </div>

        <div>
          <label class="block text-sm text-gray-700 mb-2">
            Bank Statement (1)<span class="text-red-500">*</span>
            <InformationCircleIcon class="inline w-4 h-4 ml-1 text-gray-400" />
          </label>
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col items-center w-full px-4 py-6 bg-white text-gray-400 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-primary-500">
              <DocumentArrowUpIcon class="w-8 h-8" />
              <span class="mt-2 text-sm">Upload file</span>
              <input type="file" class="hidden" @change="handleFileUpload" />
            </label>
          </div>
          <p class="mt-1 text-sm text-gray-500">Max file size 2MB (pdf, docx, pptx, xlsx)</p>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end space-x-4 mt-8">
      <button
        type="button"
        class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Save
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        Next
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { DocumentArrowUpIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'

const formData = ref({
  awardingCompany: 'TotalEnergies',
  previousContracts: '1',
  contractValue: '50000',
  paymentTerms: 'milestones',
  incoterms: 'Ex Works',
  executionTime: '90',
  paymentAfterInvoice: '90'
})

const handleFileUpload = (event) => {
  // Handle file upload logic
}

const handleSubmit = () => {
  // Handle form submission
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
.hover\:border-primary-500:hover {
  border-color: #ef4444;
}
.focus\:border-primary-500:focus {
  border-color: #ef4444;
}
.focus\:ring-primary-500:focus {
  --tw-ring-color: #ef4444;
}
</style>