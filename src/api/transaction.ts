import axios from 'axios';
import type { TransactionPayload, AwardingCompany } from '../types/transaction';

const BASE_URL = 'https://musa-mock-production.up.railway.app';

export const submitTransaction = async (formData: FormData): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/transaction`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to submit transaction';
    throw new Error(errorMessage);
  }
};

export const getAwardingCompanies = async (): Promise<AwardingCompany[]> => {
  try {
    const response = await axios.get<AwardingCompany[]>(`${BASE_URL}/awarding-company`);
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch awarding companies';
    throw new Error(errorMessage);
  }
};