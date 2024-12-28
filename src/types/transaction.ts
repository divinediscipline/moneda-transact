export interface TransactionPayload {
  transaction_type: 'procurement';
  awarding_company_id: string;
  previous_transaction: number;
  estimated_value: number;
  estimated_value_currency: string;
  awarding_payment_terms: string;
  incoterms: string;
  duration: number;
  payment_after_invoice: number;
  purchase_order: File;
  previous_invoice: File;
  bank_statement: File;
  supplier_oem_subcontractors: SupplierInfo;
}

export interface SupplierInfo {
  soc_name: string;
  country: string;
  continent: string;
  basis_of_selection: string;
  incoterms: string;
  previous_purchase: number;
  delivery_time: number;
  procurement_type: string;
  payment_terms: string;
  item_cost_currency: string;
}

export interface AwardingCompany {
  id: string;
  name: string;
}