import * as z from "zod";

export const assetFormSchema = z.object({
  no: z.string().min(1, "Bill No is required"),
  title: z.string().min(1, "Title is required"),
  subject: z.string().min(1, "Subject is required"),
  autherName: z.string().optional(),
  publisher: z.string().min(1, "Publisher is required"),
  department: z.string().min(1, "Department is required"),
  aType: z.enum(["Book", "Journal", "Magazine", "E-Book", "Other"]),
  date: z.date({
    message: "Purchase date is required",
  }),
  price: z.string().min(1, "Price is required"),
  status: z.enum(["In Stock", "Borrowed", "Lost", "Damaged"]),
  details: z.string().optional(),
});

export type AssetFormValues = z.infer<typeof assetFormSchema>;

export const subjects = [
  "Java",
  "Python",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Literature",
  "Computer Science",
] as const;

export const departments = [
  "Computer",
  "Electrical",
  "Mechanical",
  "Civil",
  "Chemical",
  "Physics",
  "Mathematics",
  "Library",
] as const;

export const assetTypes = ["Book", "Journal", "Magazine", "E-Book", "Other"] as const;

export const statuses = ["In Stock", "Borrowed", "Lost", "Damaged"] as const;

export type Asset = {
  id: string;
  no: string;
  title: string;
  subject: string;
  autherName?: string;
  publisher: string;
  department: string;
  aType: AssetFormValues["aType"];
  date: Date;
  price: string;
  status: AssetFormValues["status"];
  details?: string;
};