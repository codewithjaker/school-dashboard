"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Validation schema
const formSchema = z.object({
  student_name: z.string().min(2, {
    message: "Student name must be at least 2 characters.",
  }),
  student_id: z.string().min(1, {
    message: "Student ID is required.",
  }),
  class_section: z.string().min(1, {
    message: "Class/Section is required.",
  }),
  route_name: z.string().min(1, {
    message: "Route name is required.",
  }),
  vehicle_no: z.string().min(1, {
    message: "Vehicle number is required.",
  }),
  stop_point: z.string().min(1, {
    message: "Stop point is required.",
  }),
  allocation_date: z.date({
    message: "Allocation date is required.",
  }),
  status: z.enum(["active", "inactive", "pending"], {
    message: "Please select a status.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewStudentAllocationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for dropdowns (replace with API data)
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_name: "",
      student_id: "",
      class_section: "",
      route_name: "",
      vehicle_no: "",
      stop_point: "",
      status: "active",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect or show success message
      router.push("/transport/student-allocation");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Allocation</h1>
          <p className="text-muted-foreground mt-2">
            Create a new student transportation allocation
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-10 w-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Allocation Details</CardTitle>
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
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter student name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Student ID */}
                <FormField
                  control={form.control}
                  name="student_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter student ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Class/Section */}
                <FormField
                  control={form.control}
                  name="class_section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class/Section</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 10-A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Route Name */}
                <FormField
                  control={form.control}
                  name="route_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Route</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter route name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Vehicle Number */}
                <FormField
                  control={form.control}
                  name="vehicle_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter vehicle number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Stop Point */}
                <FormField
                  control={form.control}
                  name="stop_point"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stop Point</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter stop point" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Allocation Date */}
                <FormField
                  control={form.control}
                  name="allocation_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Allocation Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
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
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
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

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Allocation"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
