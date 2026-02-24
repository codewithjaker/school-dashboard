"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  student_name: z.string().min(2, {
    message: "Student name must be at least 2 characters.",
  }),
  application_no: z.string().min(1, {
    message: "Application number is required.",
  }),
  category: z.string({
    message: "Please select a category.",
  }),
  course: z.string({
    message: "Please select a course.",
  }),
  entrance_score: z.coerce.number().min(0).max(100, {
    message: "Entrance score must be between 0 and 100.",
  }),
  academic_score: z.coerce.number().min(0).max(100, {
    message: "Academic score must be between 0 and 100.",
  }),
  total_score: z.coerce.number().min(0).max(200, {
    message: "Total score must be between 0 and 200.",
  }),
  rank: z.coerce.number().min(1, {
    message: "Rank must be at least 1.",
  }),
  selection_status: z.string({
    message: "Please select a status.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for dropdowns
const categories = [
  { value: "general", label: "General" },
  { value: "obc", label: "OBC" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
  { value: "ews", label: "EWS" },
];

const courses = [
  { value: "btech-cse", label: "B.Tech Computer Science" },
  { value: "btech-mech", label: "B.Tech Mechanical" },
  { value: "btech-civil", label: "B.Tech Civil" },
  { value: "btech-ece", label: "B.Tech Electronics" },
  { value: "mba", label: "MBA" },
  { value: "mca", label: "MCA" },
];

const selectionStatuses = [
  { value: "selected", label: "Selected" },
  { value: "waiting", label: "Waiting List" },
  { value: "rejected", label: "Rejected" },
  { value: "provisional", label: "Provisional" },
];

export default function NewMeritEntryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_name: "",
      application_no: "",
      entrance_score: 0,
      academic_score: 0,
      total_score: 0,
      rank: 1,
    },
    mode: "onChange", // Validate on change for immediate feedback
  });

  // Watch scores to auto-calculate total
  const entranceScore = form.watch("entrance_score");
  const academicScore = form.watch("academic_score");

  useEffect(() => {
    // Auto-calculate total score
    const total = (entranceScore || 0) + (academicScore || 0);
    if (!form.getFieldState("total_score").isDirty) {
      form.setValue("total_score", total, { shouldValidate: true });
    }
  }, [entranceScore, academicScore, form]);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      // Here you would make your API call
      console.log("Form submitted:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success, redirect to merit list
      router.push("/admissions/merit-list");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    if (form.formState.isDirty) {
      if (
        confirm("You have unsaved changes. Are you sure you want to cancel?")
      ) {
        router.back();
      }
    } else {
      router.back();
    }
  }

  // Check if form is valid for button enable/disable
  const isFormValid = form.formState.isValid;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                New Merit Entry
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Add a new student merit record
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Student Name & Application No */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="student_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Student Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter student name"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="application_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Application No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter application number"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Category & Course */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Course</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.value} value={course.value}>
                              {course.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Scores Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="entrance_score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Entrance Score</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          placeholder="0-100"
                          {...field}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? 0
                                : parseFloat(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="academic_score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Academic Score</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          placeholder="0-100"
                          {...field}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? 0
                                : parseFloat(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total_score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Total Score</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="200"
                          step="0.01"
                          placeholder="Auto-calculated"
                          {...field}
                          readOnly
                          className="bg-muted"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Rank & Selection Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="rank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Rank</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Enter rank"
                          {...field}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? 1
                                : parseInt(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="selection_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Selection Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectionStatuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="min-w-[100px]"
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Saving...</span>
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
