export interface HallAllocation {
  id?: string;
  exam_name: string;
  student_name: string;
  roll_no: string;
  hall_no: string;
  seat_no: string;
  created_at?: string;
  updated_at?: string;
}

export interface ExamOption {
  id: string;
  name: string;
}