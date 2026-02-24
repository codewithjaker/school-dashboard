"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Validation schema
const formSchema = z.object({
  exam_name: z.string().min(1, "Please select an exam"),
  student_name: z.string().min(2, "Student name must be at least 2 characters"),
  roll_no: z.string().min(1, "Roll number is required"),
  subject: z.string().min(1, "Subject is required"),
  marks_obtained: z.coerce
    .number()
    .min(0, "Marks cannot be negative")
    .refine((val) => val <= 100, "Marks cannot exceed 100"),
  max_marks: z.coerce
    .number()
    .min(1, "Maximum marks must be at least 1")
    .max(100, "Maximum marks cannot exceed 100"),
  status: z.enum(["Pass", "Fail", "Pending"], {
    message: "Please select a status",
  }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock exam data
const EXAM_OPTIONS = [
  { value: "midterm", label: "Midterm Examination" },
  { value: "final", label: "Final Examination" },
  { value: "quiz1", label: "Quiz 1" },
  { value: "quiz2", label: "Quiz 2" },
  { value: "assignment", label: "Assignment" },
];

// Mock subject data
const SUBJECT_OPTIONS = [
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "english", label: "English" },
];

export default function NewMarksEntryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exam_name: "",
      student_name: "",
      roll_no: "",
      subject: "",
      marks_obtained: 0,
      max_marks: 100,
      status: "Pending",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Success!", {
        description: "Marks entry has been saved successfully.",
      });

      // Reset form after successful submission
      form.reset();
    } catch (error) {
      toast.error("Error", {
        description: "Failed to save marks entry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate percentage
  const marksObtained = form.watch("marks_obtained");
  const maxMarks = form.watch("max_marks");
  const percentage = maxMarks > 0 ? (marksObtained / maxMarks) * 100 : 0;

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/examination/marks-entry"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marks Entry
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">New Marks Entry</h1>
        <p className="text-muted-foreground mt-2">
          Add new examination marks for students
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Marks Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Exam Name */}
                <FormField
                  control={form.control}
                  name="exam_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Exam Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select exam" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EXAM_OPTIONS.map((exam) => (
                            <SelectItem key={exam.value} value={exam.value}>
                              {exam.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Student Name */}
                <FormField
                  control={form.control}
                  name="student_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter student name" {...field} />
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
                      <FormLabel required>Roll No</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter roll number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subject */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Subject</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SUBJECT_OPTIONS.map((subject) => (
                            <SelectItem
                              key={subject.value}
                              value={subject.value}
                            >
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Marks Obtained */}
                <FormField
                  control={form.control}
                  name="marks_obtained"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Marks Obtained</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            placeholder="Enter marks"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Max Marks */}
                <FormField
                  control={form.control}
                  name="max_marks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Max Marks</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          step="1"
                          placeholder="Enter maximum marks"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
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

              {/* Percentage Display */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Percentage:</span>
                  <span
                    className={`text-lg font-bold ${
                      percentage >= 75
                        ? "text-green-600"
                        : percentage >= 50
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {percentage.toFixed(2)}%
                  </span>
                </div>
                <div className="mt-2 h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      percentage >= 75
                        ? "bg-green-500"
                        : percentage >= 50
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[100px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
