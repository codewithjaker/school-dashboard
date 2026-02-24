"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

// Shadcn UI Components
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";

// Validation Schema
const certificateFormSchema = z.object({
  student_name: z.string().min(1, "Student name is required"),
  certificate_type: z.string().min(1, "Certificate type is required"),
  issue_date: z.date({
    message: "Issue date is required",
  }),
  expiry_date: z.date().optional().nullable(),
  certificate_no: z.string().min(1, "Certificate number is required"),
  issued_by: z.string().min(1, "Issued by is required"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["active", "expired", "revoked", "pending"]),
  description: z.string().optional(),
});

type CertificateFormValues = z.infer<typeof certificateFormSchema>;

const certificateTypes = [
  "Academic",
  "Sports",
  "Extracurricular",
  "Achievement",
  "Completion",
  "Recognition",
];

const categories = [
  "Academic",
  "Sports",
  "Arts",
  "Leadership",
  "Community Service",
  "Technical",
];

export default function NewCertificatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      student_name: "",
      certificate_type: "",
      issue_date: undefined,
      expiry_date: null,
      certificate_no: "",
      issued_by: "",
      category: "",
      status: "active",
      description: "",
    },
  });

  const onSubmit = async (data: CertificateFormValues) => {
    setIsSubmitting(true);
    try {
      // Format dates for API
      const formattedData = {
        ...data,
        issue_date: format(data.issue_date, "yyyy-MM-dd"),
        expiry_date: data.expiry_date
          ? format(data.expiry_date, "yyyy-MM-dd")
          : null,
      };

      // API call would go here
      console.log("Submitting certificate:", formattedData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle success - redirect or show success message
      console.log("Certificate created successfully");
    } catch (error) {
      console.error("Error creating certificate:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              New Student Certificate
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Add a new certificate for a student
            </p>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Name */}
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
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Certificate Type */}
                <FormField
                  control={form.control}
                  name="certificate_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Certificate Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select certificate type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {certificateTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Issue Date */}
                <FormField
                  control={form.control}
                  name="issue_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel required>Issue Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="h-12 w-full pl-3 text-left font-normal"
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
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Expiry Date */}
                <FormField
                  control={form.control}
                  name="expiry_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Expiry Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="h-12 w-full pl-3 text-left font-normal"
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
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Certificate Number */}
                <FormField
                  control={form.control}
                  name="certificate_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Certificate No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter certificate number"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Issued By */}
                <FormField
                  control={form.control}
                  name="issued_by"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Issued By</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter issuer name"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
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
                              key={category}
                              value={category.toLowerCase()}
                            >
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <FormLabel required>Status</FormLabel>
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
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                          <SelectItem value="revoked">Revoked</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description - Full Width */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter certificate description"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="min-w-[120px]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="min-w-[120px]"
                  disabled={isSubmitting || !form.formState.isValid}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Saving...
                    </>
                  ) : (
                    "Save Certificate"
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
