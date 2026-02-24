"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Define form schema with validation
const classFormSchema = z.object({
  className: z
    .string()
    .min(1, "Class name is required")
    .max(100, "Class name must be less than 100 characters"),
  classCode: z
    .string()
    .min(1, "Class code is required")
    .max(50, "Class code must be less than 50 characters"),
  teacherId: z.string().optional(),
  roomNumber: z.string().min(1, "Room number is required"),
  startDate: z.date({
    message: "Start date is required",
  }),
  endDate: z.date().optional(),
  semester: z.string().optional(),
  classCapacity: z.coerce
    .number()
    .min(1, "Class capacity must be at least 1")
    .max(500, "Class capacity must be at most 500"),
  status: z.enum(["active", "inactive"], {
    message: "Status is required",
  }),
  classType: z.enum(["lecture", "lab", "seminar", "workshop"], {
    message: "Class type is required",
  }),
  schedule: z
    .string()
    .max(200, "Schedule must be less than 200 characters")
    .optional(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
});

type ClassFormValues = z.infer<typeof classFormSchema>;

// Default form values
const defaultValues: Partial<ClassFormValues> = {
  status: "inactive",
  classCapacity: 30,
};

export default function NewClassPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // Form submission handler
  async function onSubmit(data: ClassFormValues) {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", data);

      toast.success("Class created successfully", {
        description: `${data.className} has been added to the system.`,
      });

      // Navigate back to class list
      router.push("/class/class-list");
    } catch (error) {
      toast.error("Error", {
        description: "Failed to create class. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Cancel handler
  function handleCancel() {
    router.back();
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <Card className="border-0 shadow-lg">
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">New Class</CardTitle>
              <p className="text-muted-foreground mt-2">
                Add a new class to the system
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Separator className="mt-4" />
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Class Name */}
                  <FormField
                    control={form.control}
                    name="className"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Class Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter class name"
                            {...field}
                            maxLength={100}
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum 100 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Class Code */}
                  <FormField
                    control={form.control}
                    name="classCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Class Code <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter class code"
                            {...field}
                            maxLength={50}
                          />
                        </FormControl>
                        <FormDescription>Maximum 50 characters</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Teacher ID */}
                  <FormField
                    control={form.control}
                    name="teacherId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teacher ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter teacher ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Room Number */}
                  <FormField
                    control={form.control}
                    name="roomNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Room Number{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter room number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Date Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Date Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Start Date */}
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Start Date <span className="text-destructive">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={`w-full pl-3 text-left font-normal ${
                                  !field.value && "text-muted-foreground"
                                }`}
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

                  {/* End Date */}
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={`w-full pl-3 text-left font-normal ${
                                  !field.value && "text-muted-foreground"
                                }`}
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
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Class Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Class Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Semester */}
                  <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester</FormLabel>
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
                            <SelectItem value="fall-2024">Fall 2024</SelectItem>
                            <SelectItem value="spring-2025">
                              Spring 2025
                            </SelectItem>
                            <SelectItem value="summer-2025">
                              Summer 2025
                            </SelectItem>
                            <SelectItem value="fall-2025">Fall 2025</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Class Capacity */}
                  <FormField
                    control={form.control}
                    name="classCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Class Capacity{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="500"
                            placeholder="Enter capacity"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Between 1 and 500 students
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Status */}
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
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Class Type */}
                  <FormField
                    control={form.control}
                    name="classType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Class Type <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select class type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="lecture">Lecture</SelectItem>
                            <SelectItem value="lab">Lab</SelectItem>
                            <SelectItem value="seminar">Seminar</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Additional Information
                </h3>

                {/* Schedule */}
                <FormField
                  control={form.control}
                  name="schedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Schedule</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Monday 9:00 AM - 10:30 AM, Wednesday 2:00 PM - 3:30 PM"
                          {...field}
                          maxLength={200}
                        />
                      </FormControl>
                      <FormDescription>Maximum 200 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter class description"
                          className="min-h-[100px]"
                          {...field}
                          maxLength={500}
                        />
                      </FormControl>
                      <FormDescription>Maximum 500 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6">
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
                  disabled={isSubmitting || !form.formState.isValid}
                >
                  {isSubmitting ? "Creating..." : "Create Class"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
