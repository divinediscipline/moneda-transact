<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">New Transaction</h1>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-6 bg-white shadow rounded-lg p-6">
        <div v-if="error" class="bg-red-50 p-4 rounded-md">
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>

        <!-- Basic Information -->
        <div class="grid grid-cols-2 gap-6">
          <SelectField
            id="awarding_company"
            label="Awarding Company"
            v-model="formData.awarding_company_id"
            :options="awardingCompanies"
          />
          
          <SelectField
            id="estimated_value_currency"
            label="Currency"
            v-model="formData.estimated_value_currency"
            :options="CURRENCIES"
          />
        </div>

        <!-- Contract Details -->
        <div class="grid grid-cols-2 gap-6">
          <SelectField
            id="awarding_payment_terms"
            label="Payment Terms"
            v-model="formData.awarding_payment_terms"
            :options="PAYMENT_TERMS"
          />
          
          <SelectField
            id="incoterms"
            label="Incoterms"
            v-model="formData.incoterms"
            :options="INCOTERMS"
          />
        </div>

        <!-- File Uploads -->
        <div class="space-y-4">
          <FileUpload
            id="purchase_order"
            label="Purchase Order"
            v-model="files.purchase_order"
          />
          
          <FileUpload
            id="previous_invoice"
            label="Previous Invoice"
            v-model="files.previous_invoice"
          />
          
          <FileUpload
            id="bank_statement"
            label="Bank Statement"
            v-model="files.bank_statement"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
        >
          {{ loading ? 'Submitting...' : 'Submit Transaction' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { TransactionPayload, AwardingCompany } from '../types/transaction';
import { submitTransaction, getAwardingCompanies } from '../api/transaction';
import { 
  PAYMENT_TERMS,
  INCOTERMS,
  CURRENCIES
} from '../constants/dropdownOptions';
import SelectField from '../components/SelectField.vue';
import FileUpload from '../components/FileUpload.vue';

const router = useRouter();
const loading = ref(false);
const error = ref('');
const awardingCompanies = ref<AwardingCompany[]>([]);

const formData = ref<Partial<TransactionPayload>>({
  transaction_type: 'procurement',
  awarding_company_id: '',
  estimated_value_currency: '',
  awarding_payment_terms: '',
  incoterms: '',
});

const files = ref({
  purchase_order: null as File | null,
  previous_invoice: null as File | null,
  bank_statement: null as File | null,
});

const handleSubmit = async () => {
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
};

onMounted(async () => {
  try {
    awardingCompanies.value = await getAwardingCompanies();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load awarding companies';
  }
});
</script>