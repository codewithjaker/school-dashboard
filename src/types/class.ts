export interface Class {
  id: string;
  className: string;
  classCode: string;
  classType: "Lecture" | "Lab" | "Seminar" | "Workshop";
  roomNumber: string;
  schedule: string;
  semester: string;
  classCapacity: number;
  status: "Active" | "Inactive";
  startDate: Date;
  endDate: Date;
}

export interface ColumnConfig {
  id: keyof Class;
  label: string;
  visible: boolean;
  sortable: boolean;
}
