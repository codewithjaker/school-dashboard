import { z } from "zod";

export const courseFormSchema = z.object({
  cName: z.string().min(1, "Course name is required"),
  cCode: z.string().optional(),
  cDetails: z.string().min(1, "Course details are required"),
  sDate: z.date({
    message: "Start date is required",
  }),
  cTime: z.coerce.number().min(1, "Course time length is required"),
  cPrice: z.coerce.number().min(0, "Course price is required"),
  pName: z.string().min(1, "Professor name is required"),
  maxStds: z.coerce.number().min(1, "Maximum students length is required"),
  contactNo: z.string().min(1, "Contact number is required"),
  courseCategory: z.string().min(1, "Course category is required"),
  courseDuration: z.coerce.number().min(1, "Course duration is required"),
  courseLevel: z.string().min(1, "Course level is required"),
  department: z.string().optional(),
  prerequisites: z.string().optional(),
  uploadFile: z.instanceof(File).optional(),
});

export type CourseFormData = z.infer<typeof courseFormSchema>;
