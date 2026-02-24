// app/hostel/hostel-fees/new-fee-record/page.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  X,
  User,
  Badge,
  Building,
  Bed,
  DollarSign,
  Receipt,
} from "lucide-react";
import { useRouter } from "next/navigation";

const feeFormSchema = z.object({
  student_name: z.string().min(2, {
    message: "Student name must be at least 2 characters.",
  }),
  roll_no: z.string().min(1, {
    message: "Roll number is required.",
  }),
  hostel_name: z.string().min(1, {
    message: "Hostel name is required.",
  }),
  room_no: z.string().min(1, {
    message: "Room number is required.",
  }),
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
  payment_date: z.date({
    message: "Payment date is required.",
  }),
  fee_type: z.string().min(1, {
    message: "Fee type is required.",
  }),
  payment_status: z.string().default("Paid"),
});

type FeeFormValues = z.infer<typeof feeFormSchema>;

const defaultValues: Partial<FeeFormValues> = {
  student_name: "",
  roll_no: "",
  hostel_name: "",
  room_no: "",
  amount: 0,
  payment_status: "Paid",
};

export default function NewFeeRecordPage() {
  const router = useRouter();

  const form = useForm<FeeFormValues>({
    resolver: zodResolver(feeFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: FeeFormValues) => {
    try {
      // Here you would typically send the data to your API
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect or show success message
      router.push("/hostel/hostel-fees");
      // You could add a toast notification here
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const feeTypes = [
    { value: "hostel_fee", label: "Hostel Fee" },
    { value: "maintenance", label: "Maintenance Fee" },
    { value: "security", label: "Security Deposit" },
    { value: "mess", label: "Mess Fee" },
    { value: "electricity", label: "Electricity Charge" },
    { value: "water", label: "Water Charge" },
  ];

  const paymentStatuses = [
    { value: "Paid", label: "Paid" },
    { value: "Pending", label: "Pending" },
    { value: "Partially Paid", label: "Partially Paid" },
    { value: "Overdue", label: "Overdue" },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Receipt className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  New Fee Record
                </h1>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Form */}
          <div className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Student Name */}
                  <FormField
                    control={form.control}
                    name="student_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Student Name
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter student name"
                              {...field}
                              className="pl-10"
                            />
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Roll No */}
                  <FormField
                    control={form.control}
                    name="roll_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Badge className="h-4 w-4" />
                          Roll No
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter roll number"
                              {...field}
                              className="pl-10"
                            />
                            <Badge className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Hostel Name */}
                  <FormField
                    control={form.control}
                    name="hostel_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Hostel Name
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter hostel name"
                              {...field}
                              className="pl-10"
                            />
                            <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Room No */}
                  <FormField
                    control={form.control}
                    name="room_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Bed className="h-4 w-4" />
                          Room No
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter room number"
                              {...field}
                              className="pl-10"
                            />
                            <Bed className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Amount */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Amount
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                              className="pl-10"
                            />
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Payment Date */}
                  <FormField
                    control={form.control}
                    name="payment_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Payment Date
                          <span className="text-destructive">*</span>
                        </FormLabel>
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

                  {/* Fee Type */}
                  <FormField
                    control={form.control}
                    name="fee_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Fee Type
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select fee type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {feeTypes.map((type) => (
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

                  {/* Payment Status */}
                  <FormField
                    control={form.control}
                    name="payment_status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Status</FormLabel>
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
                            {paymentStatuses.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                              >
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

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="min-w-[100px]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      !form.formState.isValid || form.formState.isSubmitting
                    }
                    className="min-w-[100px]"
                  >
                    {form.formState.isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
