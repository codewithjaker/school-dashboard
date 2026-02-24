export type AdmissionEnquiryStatus = "pending" | "in_progress" | "completed";

export interface AdmissionEnquiry {
  id: string;
  student_name: string;
  mobile: string;
  enquiry_date: Date;
  course: string;
  source: string;
  assigned_to: string;
  status: AdmissionEnquiryStatus;
}

export interface AdmissionEnquiryTableFilters {
  search: string;
  status: AdmissionEnquiryStatus | "all";
  source: string;
  assigned_to: string;
}

export interface AdmissionEnquiryColumn {
  id: keyof AdmissionEnquiry | "select" | "actions";
  label: string;
  checked: boolean;
}
