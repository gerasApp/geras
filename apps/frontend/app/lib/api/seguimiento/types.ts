export interface TrackingEntry {
  id: string;
  date: string;
  amount: number;
  type: 'expense' | 'income';
  category: string;
  description: string;
}

export interface TrackingFormData {
  date: string;
  amount: number;
  type: 'expense' | 'income';
  category: string;
  description: string;
} 