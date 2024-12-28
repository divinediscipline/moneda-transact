import axios from 'axios';
import type { TransactionSummary } from '../types/summary';

const BASE_URL = 'https://musa-mock-production.up.railway.app';

export const getSummary = async (): Promise<TransactionSummary> => {
  try {
    const response = await axios.get<TransactionSummary>(`${BASE_URL}/summary`);
    return response.data;
  } catch (error) {
    // Convert error to string to avoid Symbol cloning issues
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch summary data';
    throw new Error(errorMessage);
  }
};