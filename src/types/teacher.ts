export interface Teacher {
  id: string;
  name: string;
  department: string;
  email: string;
  gender: "male" | "female";
  mobile: string;
  degree: string;
  address: string;
  hireDate: Date;
  salary: number;
  image: string;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
