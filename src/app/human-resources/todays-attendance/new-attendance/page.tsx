"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, Clock, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Validation schema
const attendanceFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  first_in: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format",
  }),
  break_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format",
  }),
  last_out: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format",
  }),
  total: z.string().optional(),
  status: z.enum(["present", "absent", "late", "half_day", "on_leave"], {
    message: "Please select a status.",
  }),
  shift: z.enum(["morning", "afternoon", "night", "flexible"], {
    message: "Please select a shift.",
  }),
});

type AttendanceFormValues = z.infer<typeof attendanceFormSchema>;

// Status options with colors
const statusOptions = [
  { value: "present", label: "Present", color: "bg-green-100 text-green-800" },
  { value: "absent", label: "Absent", color: "bg-red-100 text-red-800" },
  { value: "late", label: "Late", color: "bg-yellow-100 text-yellow-800" },
  { value: "half_day", label: "Half Day", color: "bg-blue-100 text-blue-800" },
  {
    value: "on_leave",
    label: "On Leave",
    color: "bg-purple-100 text-purple-800",
  },
];

// Shift options
const shiftOptions = [
  { value: "morning", label: "Morning Shift (9 AM - 5 PM)" },
  { value: "afternoon", label: "Afternoon Shift (1 PM - 9 PM)" },
  { value: "night", label: "Night Shift (9 PM - 5 AM)" },
  { value: "flexible", label: "Flexible Hours" },
];

export default function NewAttendancePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [calculatedTotal, setCalculatedTotal] = useState<string>("");

  // Initialize form
  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceFormSchema),
    defaultValues: {
      name: "",
      first_in: "",
      break_time: "",
      last_out: "",
      total: "",
      status: undefined,
      shift: undefined,
    },
    mode: "onChange",
  });

  // Watch time fields to calculate total
  const firstIn = form.watch("first_in");
  const breakTime = form.watch("break_time");
  const lastOut = form.watch("last_out");

  // Calculate total hours function
  const calculateTotalHours = () => {
    if (!firstIn || !lastOut) return;

    try {
      const parseTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours + minutes / 60;
      };

      const start = parseTime(firstIn);
      const end = parseTime(lastOut);
      const breakTimeValue = breakTime ? parseTime(breakTime) : 0;

      let totalHours = end - start - breakTimeValue;

      // Handle overnight shifts
      if (totalHours < 0) {
        totalHours += 24;
      }

      if (totalHours >= 0) {
        const hours = Math.floor(totalHours);
        const minutes = Math.round((totalHours - hours) * 60);
        const formatted = `${hours}h ${minutes}m`;
        setCalculatedTotal(formatted);
        form.setValue("total", formatted);
      }
    } catch (error) {
      console.error("Error calculating total:", error);
    }
  };

  // Calculate total when time fields change
  useState(() => {
    if (firstIn && lastOut) {
      calculateTotalHours();
    }
  });

  // Handle form submission
  const onSubmit = async (data: AttendanceFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", data);
      setShowSuccessDialog(true);

      // Reset form after successful submission
      setTimeout(() => {
        form.reset();
        setCalculatedTotal("");
        setShowSuccessDialog(false);
        router.push("/human-resources/todays-attendance");
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.push("/human-resources/todays-attendance");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Attendance Recorded Successfully!
              </DialogTitle>
              <p className="mt-2 text-gray-600">
                The attendance entry has been saved to the system.
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                New Attendance Entry
              </h1>
              <p className="text-gray-600 mt-2">
                Add a new attendance record for today
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="h-10 w-10 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4 border-b">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-4 border-white shadow-sm">
                <AvatarImage src="/assets/images/user/new.jpg" alt="New User" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">New Entry</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Fill in the attendance details below
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Name
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter employee name"
                              className="pl-10"
                              {...field}
                            />
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* First In Field */}
                  <FormField
                    control={form.control}
                    name="first_in"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          First In
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="time"
                              placeholder="HH:MM"
                              className="pl-10"
                              {...field}
                            />
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Break Time Field */}
                  <FormField
                    control={form.control}
                    name="break_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Break
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="time"
                              placeholder="HH:MM"
                              className="pl-10"
                              {...field}
                            />
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Last Out Field */}
                  <FormField
                    control={form.control}
                    name="last_out"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Last Out
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="time"
                              placeholder="HH:MM"
                              className="pl-10"
                              {...field}
                            />
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Total Field (Auto-calculated) */}
                  <FormField
                    control={form.control}
                    name="total"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Total Hours
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Auto-calculated"
                              className="pl-10 bg-gray-50"
                              readOnly
                              value={calculatedTotal}
                              {...field}
                            />
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        {calculatedTotal && (
                          <p className="text-sm text-green-600">
                            ✓ Calculated based on entries
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status Field */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Status
                          <span className="text-red-500">*</span>
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
                            {statusOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${option.color.split(" ")[0]}`}
                                  />
                                  {option.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Shift Field */}
                  <FormField
                    control={form.control}
                    name="shift"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Shift
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select shift" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {shiftOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator className="my-8" />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="sm:w-auto w-full"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !form.formState.isValid}
                    className="sm:w-auto w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                        Saving...
                      </>
                    ) : (
                      "Save Attendance"
                    )}
                  </Button>
                </div>

                {/* Form Validation Summary */}
                {form.formState.errors &&
                  Object.keys(form.formState.errors).length > 0 && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-800 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Please fix the errors above before submitting
                      </p>
                    </div>
                  )}
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            All fields marked with <span className="text-red-500">*</span> are
            required. Total hours are automatically calculated based on First
            In, Break, and Last Out times.
          </p>
        </div>
      </div>
    </div>
  );
}
