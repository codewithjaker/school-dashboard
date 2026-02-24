import { z } from "zod";

export const promotionSchema = z.object({
  student_name: z.string().min(1, "Student name is required"),
  rollNo: z.string().min(1, "Roll number is required"),
  current_class: z.string().min(1, "Current class is required"),
  promoted_class: z.string().min(1, "Promoted class is required"),
  section: z.string().min(1, "Section is required"),
  session: z.string().min(1, "Session is required"),
  promotion_date: z.date({
    message: "Promotion date is required",
  }),
  result: z.enum(["pass", "fail", "pending"], {
    message: "Result is required",
  }),
  total_marks: z.coerce.number().min(0, "Total marks must be positive"),
  obtained_marks: z.coerce.number().min(0, "Obtained marks must be positive"),
  percentage: z.coerce.number().min(0).max(100).optional(),
  status: z.enum(["active", "inactive", "pending"], {
    message: "Status is required",
  }),
});

export type PromotionFormData = z.infer<typeof promotionSchema>;