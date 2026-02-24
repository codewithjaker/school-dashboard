import { z } from "zod";

export const assignmentFormSchema = z.object({
  className: z.string().min(1, "Class is required"),
  subjectName: z.string().min(1, "Subject is required"),
  teacherName: z.string().min(1, "Teacher is required"),
  assignmentDate: z.date({
    message: "Assignment date is required",
  }),
  status: z.enum(["draft", "active", "completed", "cancelled"], {
    message: "Status is required",
  }),
  details: z.string().optional(),
});

export type AssignmentFormValues = z.infer<typeof assignmentFormSchema>;