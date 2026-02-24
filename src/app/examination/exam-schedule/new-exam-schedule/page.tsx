"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, X, Clock, Building } from "lucide-react";
import { format } from "date-fns";

// Shadcn UI Components
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Form Schema with Zod validation
const formSchema = z.object({
  examType: z.string({
    message: "Please select an exam type",
  }),
  course: z.string({
    message: "Please select a course",
  }),
  semester: z.string().min(1, "Semester is required"),
  subject: z.string().min(1, "Subject is required"),
  examDate: z.date({
    message: "Exam date is required",
  }),
  roomNo: z.string().min(1, "Room number is required"),
  startTime: z.string().regex(/^([0-9]|0[0-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i, {
    message: "Please enter time in format: 10:00 AM",
  }),
  endTime: z.string().regex(/^([0-9]|0[0-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i, {
    message: "Please enter time in format: 01:00 PM",
  }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for dropdowns
const examTypes = [
  { value: "midterm", label: "Midterm Exam" },
  { value: "final", label: "Final Exam" },
  { value: "quiz", label: "Quiz" },
  { value: "practical", label: "Practical Exam" },
  { value: "assignment", label: "Assignment" },
];

const courses = [
  { value: "cs101", label: "Computer Science 101" },
  { value: "math201", label: "Mathematics 201" },
  { value: "phy301", label: "Physics 301" },
  { value: "eng401", label: "Engineering 401" },
  { value: "bio501", label: "Biology 501" },
];

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function NewExamSchedulePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      examType: "",
      course: "",
      semester: "",
      subject: "",
      roomNo: "",
      startTime: "",
      endTime: "",
    },
  });

  // Form submission handler
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", values);
      
      // Show success message
      alert("Exam schedule created successfully!");
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to create exam schedule. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              New Exam Schedule
            </h1>
            <p className="text-muted-foreground mt-2">
              Create a new examination schedule for your institution
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            Draft
          </Badge>
        </div>

        <Card className="border-2">
          <CardHeader className="border-b bg-muted/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Exam Schedule Details</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.history.back()}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Exam Type and Course */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="examType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Exam Type <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {examTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
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
                        <FormLabel>
                          Course <span className="text-destructive">*</span>
                        </FormLabel>
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

                {/* Semester and Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Semester <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {semesters.map((sem) => (
                              <SelectItem key={sem} value={sem}>
                                Semester {sem}
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
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Subject <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter subject name"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Exam Date and Room No */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="examDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Exam Date <span className="text-destructive">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="h-11 pl-3 text-left font-normal justify-start"
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roomNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Room No <span className="text-destructive">*</span>
                        </FormLabel>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="Enter room number"
                              className="h-11 pl-10"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Start Time and End Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Start Time <span className="text-destructive">*</span>
                        </FormLabel>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="e.g. 10:00 AM"
                              className="h-11 pl-10"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                        <p className="text-sm text-muted-foreground mt-1">
                          Use 12-hour format (e.g., 10:00 AM)
                        </p>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          End Time <span className="text-destructive">*</span>
                        </FormLabel>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="e.g. 01:00 PM"
                              className="h-11 pl-10"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                        <p className="text-sm text-muted-foreground mt-1">
                          Use 12-hour format (e.g., 01:00 PM)
                        </p>
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="min-w-[100px]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[100px] bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                        Saving...
                      </>
                    ) : (
                      "Save Schedule"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        
      </div>
    </div>
  );
}