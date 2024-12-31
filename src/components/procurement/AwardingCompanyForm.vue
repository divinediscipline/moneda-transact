<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { InformationCircleIcon } from "@heroicons/vue/24/outline";
import FileUploadField from "./FileUploadField.vue";
import { required, minValue } from "@/utils/validators";
import SelectField from "@/components/SelectField.vue"
import type { TransactionPayload, AwardingCompany } from "@/types/transaction"
import { submitTransaction, getAwardingCompanies } from "@/api/transaction"
import { useRouter } from 'vue-router';
import {
  PAYMENT_TERMS,
  INCOTERMS,
  CURRENCIES
} from "@/constants/dropdownOptions"
import FileUpload from "@/components/FileUpload.vue"




const router = useRouter();
const loading = ref(false);
const files = ref({
  purchase_order: null,
  previous_invoice: null,
  bank_statement: null,
});
const awardingCompanies = ref<AwardingCompany[]>([]);

const formData = reactive({
  awardingCompany: "TotalEnergies",
  previousContracts: "1",
  contractValue: "50000",
  awardingPaymentTerms: "Milestone Payment",
  incoterms: "Ex-works",
  executionTime: "90",
  paymentAfterInvoice: "90",
  purchaseOrder: null,
  previousInvoice: null,
  bankStatement: null,
  estimated_value_currency: 'USD',
});

const formValues = ref<Partial<TransactionPayload>>({
  transaction_type: 'procurement',
  awarding_company_id: '',
  estimated_value_currency: '',
  awarding_payment_terms: '',
  incoterms: '',
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

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      loading.value = true;
      error.value = '';

      const form = new FormData();

      // Append form fields
      Object.entries(formData.value).forEach(([key, value]) => {
        if (value) form.append(key, value);
      });

      // Append files
      Object.entries(files.value).forEach(([key, file]) => {
        if (file) form.append(key, file);
      });

      await submitTransaction(form);
      router.push('/');
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to submit transaction';
    } finally {
      loading.value = false;
    }
  }
};


const fetchAwardingCompanies = async () => {
  try {
    const response = await getAwardingCompanies();
    awardingCompanies.value = response.data.map((company: AwardingCompany) => ({
      label: company.name,
      value: company.id
    }));
  } catch (error) {
    console.error("Failed to fetch awarding companies:", error);
  }
};

onMounted(() => {
  console.log("Fetching awarding companies...");
  return fetchAwardingCompanies();
});



</script>

<template>
  <form @submit.prevent="handleSubmit" class="max-w-3xl">
    <div class="grid grid-cols-2 gap-6">
      <div class="col-span-2 grid grid-cols-2 gap-16">
        <div>
          <SelectField id="awarding_company" label="Awarding Company" v-model="formValues.awarding_company_id"
            :options="awardingCompanies" selectClass="border border-gray-300" />
        </div>
        <!-- No. of previous contracts -->
        <div>
          <label class="block text-sm text-gray-700 mb-2">No. of previous contracts</label>
          <select v-model="formData.previousContracts"
            class="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 border border-gray-300 p-1">
            <option v-for="n in 9" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
      </div>

      <!-- Value of contract -->
      <div class="col-span-2 grid grid-cols-2 gap-16">
        <div class="col-span-2 sm:col-span-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Value of contract</label>
          <div class="flex items-center space-x-2">
            <SelectField id="estimated_value_currency" v-model="formData.estimated_value_currency" :options="CURRENCIES"
              selectClass="border border-gray-300 w-auto mt-0" />
            <input type="number" v-model="formData.contractValue"
              class="special border border-gray-300 rounded-md focus:border-primary-500 focus:ring-primary-500 w-full mt-2 pl-3 p-0.5"
              placeholder="50000" />
          </div>
        </div>

        <!-- Payment Terms -->
        <div class="col-span-2 sm:col-span-1 mt-2">
          <SelectField id="awarding_payment_terms" label="Payment Terms" v-model="formData.awardingPaymentTerms"
            :options="PAYMENT_TERMS" selectClass="border border-gray-300" />
        </div>
      </div>

      <div class="col-span-2 grid grid-cols-2 gap-16">
        <!-- Incoterms -->
        <div class="col-span-2 sm:col-span-1">
          <SelectField id="incoterms" label="Incoterms" v-model="formData.incoterms" :options="INCOTERMS"
            selectClass="border border-gray-300" />

        </div>

        <!-- Execution Time -->
        <div class="col-span-2 sm:col-span-1">
          <label class="block text-sm text-gray-700 mb-2">Execution Time (days)</label>
          <input type="number" v-model="formData.executionTime"
            class="w-full rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-primary-500 pl-3 p-0.5"
            placeholder="90" />
        </div>
      </div>

      <!-- Payment after invoice -->
      <div class="col-span-2 grid grid-cols-2 gap-16">
        <div class="col-span-2 sm:col-span-1">
          <label class="block text-sm text-gray-700 mb-2">Payment after invoice (days)</label>
          <input type="number" v-model="formData.paymentAfterInvoice"
            class="w-full rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-primary-500 pl-3 p-0.5"
            placeholder="90" />
        </div>
      </div>

      <div class="col-span-2 grid grid-cols-2 gap-16">
        <div>
          <FileUploadField label="Purchase Order" required v-model="formData.purchaseOrder"
            :error="errors.purchaseOrder" />
        </div>
      </div>

      <div class="col-span-2 grid grid-cols-2 gap-16">
        <!-- Previous Contracts Information -->
        <div class="col-span-2 sm:col-span-1">
          <h3 class="text-sm font-light mb-4 flex items-center">
            Previous Contracts Information
            <InformationCircleIcon class="w-5 h-5 ml-2 text-gray-400" />
          </h3>

          <div class="grid grid-cols-2 gap-6">
            <FileUploadField label="Previous Invoice (1)" required class="font-medium" v-model="formData.previousInvoice"
              :error="errors.previousInvoice" />

            <FileUploadField label="Bank Statement (1)" required class="font-medium" show-info v-model="formData.bankStatement"
              :error="errors.bankStatement" />
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end space-x-4 mt-8">
      <!-- I think a save button being here as per the design, just causes confusion. what exactly does the save function do if we're yet to fill out the suppliers form?. I went ahead to remove it -->
      <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700"
        :disabled="Object.keys(errors).length > 0">
        Next
      </button>
    </div>
  </form>
</template>

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
