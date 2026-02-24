"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, X } from "lucide-react";
import { toast } from "sonner";

// Form validation schema
const leaveTypeFormSchema = z.object({
  leave_name: z.string().min(2, {
    message: "Leave name must be at least 2 characters.",
  }),
  type: z.string({
    message: "Please select a leave type.",
  }),
  leave_unit: z.string().min(1, {
    message: "Leave unit is required.",
  }),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  note: z.string().optional(),
  duration: z.coerce.number().positive({
    message: "Duration must be a positive number.",
  }),
  created_by: z.string().min(2, {
    message: "Created by must be at least 2 characters.",
  }),
  carry_over: z.coerce.number().min(0).optional(),
  notification_period: z.coerce.number().min(0).optional(),
  max_leaves: z.coerce.number().positive({
    message: "Maximum leaves must be a positive number.",
  }),
  annual_limit: z.coerce.number().positive({
    message: "Annual limit must be a positive number.",
  }),
});

type LeaveTypeFormValues = z.infer<typeof leaveTypeFormSchema>;

const defaultValues: Partial<LeaveTypeFormValues> = {
  leave_name: "",
  type: "",
  leave_unit: "",
  status: "Active",
  note: "",
  duration: 0,
  created_by: "",
  carry_over: 0,
  notification_period: 0,
  max_leaves: 0,
  annual_limit: 0,
};

const leaveTypeOptions = [
  { value: "paid", label: "Paid Leave" },
  { value: "unpaid", label: "Unpaid Leave" },
  { value: "sick", label: "Sick Leave" },
  { value: "maternity", label: "Maternity Leave" },
  { value: "paternity", label: "Paternity Leave" },
  { value: "bereavement", label: "Bereavement Leave" },
  { value: "vacation", label: "Vacation Leave" },
];

const leaveUnitOptions = [
  { value: "days", label: "Days" },
  { value: "hours", label: "Hours" },
  { value: "weeks", label: "Weeks" },
];

export default function NewLeaveTypePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LeaveTypeFormValues>({
    resolver: zodResolver(leaveTypeFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: LeaveTypeFormValues) {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Form data:", data);
      
      toast.success("Leave type created successfully", {
        description: `${data.leave_name} has been added to leave types.`,
      });
      
      router.push("/human-resources/leave-types");
    } catch (error) {
      toast.error("Failed to create leave type", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="h-7 w-7"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Leave Type</h1>
            <p className="text-muted-foreground">
              Create a new leave type for your organization
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Type Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="leave_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Leave Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Annual Leave"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        The display name for this leave type
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Leave Type <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select leave type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {leaveTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Category of the leave</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="leave_unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Leave Unit <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {leaveUnitOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Unit of measurement for leave calculation
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Whether this leave type is currently active
                      </FormDescription>
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
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional notes or descriptions"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional description or instructions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Duration & Created By */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Duration <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 21"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Default duration in selected units
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="created_by"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Created By <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Admin User"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Name of the person creating this leave type
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Carry Over & Notification Period */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="carry_over"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carry Over</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 5"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Number of leaves that can be carried over
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notification_period"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notification Period</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 7"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Days notice required before taking leave
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Max Leaves & Annual Limit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="max_leaves"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Max Leaves <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 30"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum leaves allowed per employee
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="annual_limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Annual Limit <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 20"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum leaves allowed per year
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/human-resources/leave-types")}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSubmitting ? "Saving..." : "Save Leave Type"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}