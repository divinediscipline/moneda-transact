<template>
  <form @submit.prevent="handleSubmit" class="max-w-3xl">
    <div class="grid grid-cols-2 gap-6">
      <!-- Awarding Company -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Awarding Company</label>
        <select
          v-model="formData.awardingCompany"
          :class="[
            'w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500',
            errors.awardingCompany ? 'border-red-500' : '',
          ]"
        >
          <option value="TotalEnergies">TotalEnergies</option>
        </select>
        <p v-if="errors.awardingCompany" class="mt-1 text-sm text-red-500">
          {{ errors.awardingCompany }}
        </p>
      </div>

      <!-- No. of previous contracts -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2"
          >No. of previous contracts</label
        >
        <select
          v-model="formData.previousContracts"
          class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="1">1</option>
        </select>
      </div>

      <!-- Value of contract -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2"
          >Value of contract</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
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
        <select
          v-model="formData.paymentTerms"
          class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="milestones">Milestones</option>
        </select>
      </div>

      <!-- Incoterms -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2">Incoterms</label>
        <select
          v-model="formData.incoterms"
          class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="Ex Works">Ex Works</option>
        </select>
      </div>

      <!-- Execution Time -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2"
          >Execution Time (days)</label
        >
        <input
          type="number"
          v-model="formData.executionTime"
          class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          placeholder="90"
        />
      </div>

      <!-- Payment after invoice -->
      <div class="col-span-2 sm:col-span-1">
        <label class="block text-sm text-gray-700 mb-2"
          >Payment after invoice (days)</label
        >
        <input
          type="number"
          v-model="formData.paymentAfterInvoice"
          class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          placeholder="90"
        />
      </div>

      <div class="col-span-2">
        <FileUploadField
          label="Purchase Order"
          required
          v-model="formData.purchaseOrder"
          :error="errors.purchaseOrder"
        />
      </div>

      <!-- Previous Contracts Information -->
      <div class="col-span-2">
        <h3 class="text-lg font-medium mb-4 flex items-center">
          Previous Contracts Information
          <InformationCircleIcon class="w-5 h-5 ml-2 text-gray-400" />
        </h3>

        <div class="grid grid-cols-2 gap-6">
          <FileUploadField
            label="Previous Invoice (1)"
            required
            v-model="formData.previousInvoice"
            :error="errors.previousInvoice"
          />

          <FileUploadField
            label="Bank Statement (1)"
            required
            show-info
            v-model="formData.bankStatement"
            :error="errors.bankStatement"
          />
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end space-x-4 mt-8">
      <!-- I think a save button being here as per the design, just causes confusion. what exactly does the save function do if we're yet to fill out the suppliers form?. I went ahead to remove it -->
      <button
        type="submit"
        class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        :disabled="Object.keys(errors).length > 0"
      >
        Next
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { InformationCircleIcon } from "@heroicons/vue/24/outline";
import FileUploadField from "./FileUploadField.vue";
import { required, minValue } from "@/utils/validators";

const formData = reactive({
  awardingCompany: "TotalEnergies",
  previousContracts: "1",
  contractValue: "50000",
  paymentTerms: "milestones",
  incoterms: "Ex Works",
  executionTime: "90",
  paymentAfterInvoice: "90",
  purchaseOrder: null,
  previousInvoice: null,
  bankStatement: null,
});

const errors = reactive({});

const validateForm = () => {
  errors.awardingCompany = required(formData.awardingCompany);
  errors.contractValue = minValue(0)(formData.contractValue);
  errors.executionTime = minValue(1)(formData.executionTime);
  errors.paymentAfterInvoice = minValue(0)(formData.paymentAfterInvoice);
  errors.purchaseOrder = required(formData.purchaseOrder);
  errors.previousInvoice = required(formData.previousInvoice);
  errors.bankStatement = required(formData.bankStatement);

  // Remove null/undefined errors
  Object.keys(errors).forEach((key) => {
    if (!errors[key]) delete errors[key];
  });

  return Object.keys(errors).length === 0;
};

const handleSubmit = () => {
  if (validateForm()) {
    // Handle form submission
    console.log("Form submitted:", formData);
  }
};

const handleSave = () => {
  // Handle save as draft functionality
  console.log("Form saved:", formData);
};
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
