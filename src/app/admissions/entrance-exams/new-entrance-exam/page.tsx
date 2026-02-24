"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { CalendarIcon, Clock, X } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Form validation schema
const formSchema = z.object({
  exam_name: z.string().min(1, "Exam name is required"),
  exam_code: z.string().min(1, "Exam code is required"),
  exam_date: z.date({
    message: "Exam date is required",
  }),
  venue: z.string().min(1, "Venue is required"),
  start_time: z.string().regex(
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM|am|pm)$/,
    "Please enter time in format: HH:MM AM/PM"
  ),
  end_time: z.string().regex(
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM|am|pm)$/,
    "Please enter time in format: HH:MM AM/PM"
  ),
  max_marks: z.coerce
    .number()
    .min(0, "Maximum marks must be a positive number"),
  passing_marks: z.coerce
    .number()
    .min(0, "Passing marks must be a positive number"),
  status: z.enum(["active", "inactive", "draft", "completed"], {
    message: "Please select a status",
  }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewEntranceExamPage() {
  const router = useRouter();

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exam_name: "",
      exam_code: "",
      venue: "",
      start_time: "",
      end_time: "",
      max_marks: 100,
      passing_marks: 40,
      status: "draft",
      description: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    try {
      // Here you would typically send data to your API
      console.log("Form data:", data);
      
      // For demo purposes, show success and redirect
      alert("Entrance exam created successfully!");
      router.push("/admissions/entrance-exams");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create entrance exam. Please try again.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? Unsaved changes will be lost.")) {
      router.push("/admissions/entrance-exams");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              New Entrance Exam
            </h1>
            <p className="text-muted-foreground">
              Create a new entrance exam for student admissions
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <Separator />

        {/* Form */}
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Exam Name */}
                  <FormField
                    control={form.control}
                    name="exam_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Exam Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Medical Entrance Test 2024"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Exam Code */}
                  <FormField
                    control={form.control}
                    name="exam_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Exam Code <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., MET-2024" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Exam Date */}
                  <FormField
                    control={form.control}
                    name="exam_date"
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
                                className="w-full pl-3 text-left font-normal"
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
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Venue */}
                  <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Venue <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Main Campus Auditorium"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Start Time */}
                  <FormField
                    control={form.control}
                    name="start_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Start Time <span className="text-destructive">*</span>
                        </FormLabel>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="10:00 AM"
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* End Time */}
                  <FormField
                    control={form.control}
                    name="end_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          End Time <span className="text-destructive">*</span>
                        </FormLabel>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="01:00 PM"
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                        </div>
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
                        <FormLabel>
                          Max Marks <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Passing Marks */}
                  <FormField
                    control={form.control}
                    name="passing_marks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Passing Marks <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status - Full Width */}
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Status <span className="text-destructive">*</span>
                          </FormLabel>
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
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Description - Full Width */}
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter exam description, instructions, or additional notes..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Saving..." : "Save Exam"}
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