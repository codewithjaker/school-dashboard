// app/hostel/attendance/new-attendance/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Form validation schema
const formSchema = z.object({
  student_name: z.string().min(1, "Student name is required"),
  roll_no: z.string().min(1, "Roll number is required"),
  hostel_name: z.string().min(1, "Hostel name is required"),
  room_no: z.string().min(1, "Room number is required"),
  attendance_date: z.date({
    message: "Attendance date is required",
  }),
  status: z.enum(["present", "absent", "late", "excused"], {
    message: "Status is required",
  }),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewAttendancePage() {
  const router = useRouter();

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_name: "",
      roll_no: "",
      hostel_name: "",
      room_no: "",
      attendance_date: new Date(),
      status: "present",
      note: "",
    },
    mode: "onChange",
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    try {
      // Here you would typically make an API call
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Success", {
        description: "Attendance record has been saved successfully.",
      });

      // Navigate back or to another page
      router.push("/hostel/attendance");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error", {
        description: "Failed to save attendance record. Please try again.",
      });
    }
  }

  // Handle cancel
  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                New Attendance
              </h1>
              <p className="text-muted-foreground">
                Add a new attendance record for a student
              </p>
            </div>
            <Button variant="outline" onClick={handleCancel} type="button">
              Cancel
            </Button>
          </div>
          <Separator />
        </div>

        {/* Form */}
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Student Name and Roll No */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Hostel Name and Room No */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="hostel_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hostel Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter hostel name"
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="room_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room No *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter room number"
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Attendance Date and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="attendance_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Attendance Date *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "h-11 pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
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
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                            <SelectItem value="excused">Excused</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Note */}
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any additional notes..."
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add any relevant notes or remarks about this attendance
                        record.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    type="button"
                    className="h-11 px-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-11 px-8"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      "Save Attendance"
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
