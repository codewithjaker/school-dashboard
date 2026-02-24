import { z } from "zod";

export const attendanceFormSchema = z.object({
  rollNo: z.string().min(1, "Roll number is required"),
  sName: z.string().min(1, "Student name is required"),
  class: z.string().min(1, "Class is required"),
  date: z.date({
    message: "Date is required",
  }),
  status: z.enum(["present", "absent", "late"], {
    message: "Status is required",
  }),
  attendance_time: z.string().optional(),
  semester: z.string().min(1, "Semester is required"),
  subject: z.string().min(1, "Subject is required"),
  present_count: z.coerce.number().min(0, "Present count must be at least 0"),
  absent_count: z.coerce.number().min(0, "Absent count must be at least 0"),
  reason_for_absence: z.string().optional(),
  note: z.string().optional(),
});

export type AttendanceFormValues = z.infer<typeof attendanceFormSchema>;