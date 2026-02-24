// app/examination/report-cards/new-report-card/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, X } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  student_name: z.string().min(1, "Student name is required"),
  roll_no: z.string().min(1, "Roll number is required"),
  exam_name: z.string().min(1, "Exam name is required"),
  total_marks: z.coerce
    .number()
    .min(0, "Total marks must be a positive number"),
  percentage: z.coerce
    .number()
    .min(0)
    .max(100, "Percentage must be between 0 and 100"),
  grade: z.string().min(1, "Grade is required"),
  result: z.enum(["Pass", "Fail", "Pending"]),
});

type FormValues = z.infer<typeof formSchema>;

const examOptions = [
  "Final Examination",
  "Mid-Term Examination",
  "Quarterly Examination",
  "Unit Test",
  "Practical Examination",
];

export default function NewReportCardPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_name: "",
      roll_no: "",
      exam_name: "",
      total_marks: 0,
      percentage: 0,
      grade: "",
      result: "Pending",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      console.log("Form data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In real app, you would call your API here
      // await fetch('/api/report-cards', {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      // });

      // Navigate back or show success message
      router.push("/examination/report-cards");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">New Report Card</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Report Card Details</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Name */}
                <FormField
                  control={form.control}
                  name="student_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter student name"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Roll Number */}
                <FormField
                  control={form.control}
                  name="roll_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roll No *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter roll number"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Exam Name */}
                <FormField
                  control={form.control}
                  name="exam_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam Name *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select exam name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {examOptions.map((exam) => (
                            <SelectItem key={exam} value={exam}>
                              {exam}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Total Marks */}
                <FormField
                  control={form.control}
                  name="total_marks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Marks *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter total marks"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Percentage */}
                <FormField
                  control={form.control}
                  name="percentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Percentage (%) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Enter percentage"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Grade */}
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter grade (A, B, C, etc.)"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Result */}
                <FormField
                  control={form.control}
                  name="result"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Result *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select result" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pass">Pass</SelectItem>
                          <SelectItem value="Fail">Fail</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="min-w-[100px]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[100px] bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
