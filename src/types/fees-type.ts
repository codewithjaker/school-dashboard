export type FeesType = {
  id: string;
  feeTypeName: string;
  category: "Academic" | "Miscellaneous" | "Extracurricular";
  description: string;
  amount: number;
  applicableClasses: string;
  frequency: "Monthly" | "Quarterly" | "Annually";
  status: "Active" | "Inactive";
  createdBy: string;
  createdAt: Date;
};

export type CategoryType = {
  value: FeesType["category"];
  label: string;
};

export type FrequencyType = {
  value: FeesType["frequency"];
  label: string;
};

export type StatusType = {
  value: FeesType["status"];
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline" | "success";
};

export const categories: CategoryType[] = [
  { value: "Academic", label: "Academic" },
  { value: "Miscellaneous", label: "Miscellaneous" },
  { value: "Extracurricular", label: "Extracurricular" },
];

export const frequencies: FrequencyType[] = [
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly", label: "Quarterly" },
  { value: "Annually", label: "Annually" },
];

export const statuses: StatusType[] = [
  { value: "Active", label: "Active", variant: "success" },
  { value: "Inactive", label: "Inactive", variant: "secondary" },
];
