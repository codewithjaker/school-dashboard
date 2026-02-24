"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, ArrowLeft, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// Define form schema with Zod
const leaveBalanceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  prev: z.coerce.number().min(0, "Previous balance cannot be negative"),
  current: z.coerce.number().min(0, "Current balance cannot be negative"),
  total: z.coerce.number().min(0, "Total balance cannot be negative"),
  used: z.coerce.number().min(0, "Used balance cannot be negative"),
  accepted: z.coerce.number().min(0, "Accepted leaves cannot be negative"),
  rejected: z.coerce.number().min(0, "Rejected leaves cannot be negative"),
  expired: z.coerce.number().min(0, "Expired leaves cannot be negative"),
  carryOver: z.coerce.number().min(0, "Carry over cannot be negative"),
});

type LeaveBalanceFormValues = z.infer<typeof leaveBalanceSchema>;

export default function NewLeaveBalancePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<LeaveBalanceFormValues>({
    resolver: zodResolver(leaveBalanceSchema),
    defaultValues: {
      name: "",
      prev: 0,
      current: 0,
      total: 0,
      used: 0,
      accepted: 0,
      rejected: 0,
      expired: 0,
      carryOver: 0,
    },
  });

  // Calculate derived values
  const watchedValues = form.watch();
  const remainingBalance = watchedValues.total - watchedValues.used;
  const approvalRate =
    watchedValues.total > 0
      ? (watchedValues.accepted / watchedValues.total) * 100
      : 0;

  // Handle form submission
  const onSubmit = async (data: LeaveBalanceFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real application, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

      toast.success("Leave Balance Created", {
        description: "New leave balance has been successfully created.",
      });

      // Redirect back to leave balance list
      router.push("/human-resources/employee-leave-balance");
    } catch (error) {
      toast.error("Error", {
        description: "Failed to create leave balance. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              New Leave Balance
            </h1>
            <p className="text-muted-foreground">
              Add new leave balance for an employee
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Employee Information Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/assets/images/user/new.jpg" alt="Avatar" />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Employee Details</CardTitle>
                <CardDescription>
                  Enter employee leave balance information
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator />

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  {/* Basic Information Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Name <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Enter employee name"
                                className="pl-9"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="prev"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Previous Balance{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              min="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Current Period Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="current"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Current Balance{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              min="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="total"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Total Balance{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              min="0"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Previous + Current Balance
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Usage Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="used"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Used Balance{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              min="0"
                              max={watchedValues.total}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accepted"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Accepted <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              min="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Status Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="rejected"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Rejected <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              min="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expired"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Expired <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              min="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Carry Over */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="carryOver"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Carry Over{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              min="0"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Balance to carry over to next period
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Calculated Values Display */}
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-semibold mb-2">Summary</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-muted-foreground">
                            Remaining Balance:
                          </div>
                          <div className="font-medium text-green-600">
                            {remainingBalance.toFixed(2)}
                          </div>

                          <div className="text-muted-foreground">
                            Approval Rate:
                          </div>
                          <div className="font-medium">
                            {approvalRate.toFixed(1)}%
                          </div>

                          <div className="text-muted-foreground">
                            Total Requests:
                          </div>
                          <div className="font-medium">
                            {watchedValues.accepted + watchedValues.rejected}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Footer with Actions */}
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !form.formState.isValid}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Saving..." : "Save Leave Balance"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
