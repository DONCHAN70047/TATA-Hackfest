export interface InsuranceType {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  coverage: string[];
  benefits: string[];
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  insuranceType?: string;
  availability?: boolean;
  message?: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  insuranceType: string;
}

export interface InsuranceQuote {
  id: string;
  customerInfo: CustomerInfo;
  insuranceType: string;
  premium: number;
  coverage: string;
  term: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
} 