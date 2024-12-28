import { ref } from 'vue';
import type { TransactionSummary } from '../types/summary';
import { getSummary } from '../api/summary';

export function useSummary() {
  const loading = ref(true);
  const error = ref<string | null>(null);
  const summaryData = ref<TransactionSummary | null>(null);

  const fetchSummary = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      summaryData.value = await getSummary();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    summaryData,
    fetchSummary
  };
}