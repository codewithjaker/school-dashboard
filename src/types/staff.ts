export type Staff = {
  id: string;
  name: string;
  role: string;
  mobile: string;
  email: string;
  joiningDate: Date;
  dateOfBirth: Date;
  department: string;
  salary: number;
  experience?: string;
  gender: "male" | "female" | "other";
  address?: string;
  avatar?: string;
  status: "active" | "inactive" | "on-leave";
  createdAt: Date;
  updatedAt: Date;
};

export type StaffFormData = Omit<
  Staff,
  "id" | "createdAt" | "updatedAt" | "status"
> & {
  avatar?: File;
};
