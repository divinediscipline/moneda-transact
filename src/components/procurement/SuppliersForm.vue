<template>
  <form @submit.prevent="handleSubmit" class="max-w-3xl">
    <div class="grid grid-cols-2 gap-6">
      <!-- Basic Information -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Name of Supplier (1)</label>
        <select v-model="formData.supplierName" class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="TotalEnergies">TotalEnergies</option>
        </select>
      </div>

      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">No. of previous purchases</label>
        <select v-model="formData.previousPurchases" class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="1">1</option>
        </select>
      </div>

      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Payment Terms</label>
        <select v-model="formData.paymentTerms" class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="Bullet Payment">Bullet Payment</option>
        </select>
      </div>

      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Basis of selection of supplier (Choice)</label>
        <select v-model="formData.selectionBasis" class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="Contractor's choice">Contractor's choice</option>
        </select>
      </div>

      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Country</label>
        <select v-model="formData.country" class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="Nigeria">Nigeria</option>
        </select>
      </div>

      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Continent</label>
        <select v-model="formData.continent" class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="Africa">Africa</option>
        </select>
      </div>

      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Supplier's Incoterms</label>
        <select v-model="formData.supplierIncoterms" class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="Select">Select</option>
        </select>
      </div>

      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Procurement Type</label>
        <select v-model="formData.procurementType" class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="Bespoke">Bespoke</option>
        </select>
      </div>

      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Delivery Time</label>
        <select v-model="formData.deliveryTime" class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500">
          <option value="4">4</option>
        </select>
      </div>

      <!-- Cost Section -->
      <div class="col-span-2">
        <h3 class="text-lg font-medium mb-4">Cost</h3>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm text-gray-700 mb-2">Cost of items</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">USD</span>
              </div>
              <input
                type="text"
                v-model="formData.costOfItems"
                class="pl-12 w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm text-gray-700 mb-2">Logistics cost</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">USD</span>
              </div>
              <input
                type="text"
                v-model="formData.logisticsCost"
                class="pl-12 w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm text-gray-700 mb-2">Others</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">USD</span>
              </div>
              <input
                type="text"
                v-model="formData.othersCost"
                class="pl-12 w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm text-gray-700 mb-2">Funding Request</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">USD</span>
              </div>
              <input
                type="text"
                v-model="formData.fundingRequest"
                class="pl-12 w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                placeholder="50000"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Pro-Forma Invoice -->
      <div class="col-span-2">
        <FileUploadField
          label="Pro-Forma Invoice"
          required
          v-model="formData.proFormaInvoice"
          :error="errors.proFormaInvoice"
        />
        <div v-if="formData.proFormaInvoice" class="mt-2 flex items-center text-sm text-gray-600">
          <span>Pro-Forma_inv.pdf</span>
          <button
            @click="removeFile('proFormaInvoice')"
            class="ml-2 text-red-500 hover:text-red-700"
          >
            <XMarkIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Action Button -->
    <div class="flex justify-end mt-8">
      <button
        type="submit"
        class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import FileUploadField from './FileUploadField.vue'
import { useToast } from '@/composables/useToast'

const toast = useToast()

const formData = reactive({
  supplierName: 'TotalEnergies',
  previousPurchases: '1',
  paymentTerms: 'Bullet Payment',
  selectionBasis: "Contractor's choice",
  country: 'Nigeria',
  continent: 'Africa',
  supplierIncoterms: 'Select',
  procurementType: 'Bespoke',
  deliveryTime: '4',
  costOfItems: '50000',
  logisticsCost: '50000',
  othersCost: '50000',
  fundingRequest: '50000',
  proFormaInvoice: null
})

const errors = reactive({})

const removeFile = (field) => {
  formData[field] = null
}

const handleSubmit = () => {
  // Validate and submit form
  toast.success('Form saved successfully')
  // Reset form
  Object.keys(formData).forEach(key => {
    formData[key] = null
  })
}
</script>