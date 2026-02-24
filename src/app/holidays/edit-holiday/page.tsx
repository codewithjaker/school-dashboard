"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { CalendarIcon, Home, NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Form validation schema
const holidayFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  startDate: z.date({
    message: "Start date is required",
  }),
  endDate: z.date({
   message: "End date is required",
  }),
  type: z.string().min(1, "Holiday type is required"),
  details: z.string().optional(),
});

type HolidayFormValues = z.infer<typeof holidayFormSchema>;

// Default form values (in a real app, this would come from an API)
const defaultValues: Partial<HolidayFormValues> = {
  title: "",
  startDate: new Date(),
  endDate: new Date(),
  type: "public",
  details: "",
};

export default function EditHolidayPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<HolidayFormValues>({
    resolver: zodResolver(holidayFormSchema),
    defaultValues,
  });

  // Handle form submission
  function onSubmit(data: HolidayFormValues) {
    setIsSubmitting(true);
    console.log("Form data:", data);

    // In a real application, you would:
    // 1. Send the data to your API
    // 2. Handle success/error states
    // 3. Redirect or show a notification

    setTimeout(() => {
      setIsSubmitting(false);
      // Example: redirect to holidays list
      // router.push('/holidays');
      alert("Holiday updated successfully!");
    }, 1000);
  }

  // Handle cancel
  function handleCancel() {
    if (
      confirm(
        "Are you sure you want to cancel? Any unsaved changes will be lost.",
      )
    ) {
      router.push("/holidays");
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/admin/dashboard"
                className="flex items-center gap-1"
              >
                <Home className="h-4 w-4" />
                <span className="sr-only md:not-sr-only">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/holidays">Holidays</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Holiday</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Holiday</h1>
          <p className="text-muted-foreground">Update holiday details below</p>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Holiday Details</CardTitle>
            <CardDescription>
              Update the holiday information and save your changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Title Field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Title</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <NotebookPen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Enter holiday title"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date Fields */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Start Date Field */}
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel required>Start Date</FormLabel>
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

                  {/* End Date Field */}
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel required>End Date</FormLabel>
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
                </div>

                {/* Holiday Type Field */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Holiday Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select holiday type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="public">Public Holiday</SelectItem>
                          <SelectItem value="optional">
                            Optional Holiday
                          </SelectItem>
                          <SelectItem value="religious">
                            Religious Holiday
                          </SelectItem>
                          <SelectItem value="national">
                            National Holiday
                          </SelectItem>
                          <SelectItem value="regional">
                            Regional Holiday
                          </SelectItem>
                          <SelectItem value="institutional">
                            Institutional Holiday
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Details Field */}
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Holiday Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter holiday description or additional details"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Updating...
                      </>
                    ) : (
                      "Update Holiday"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
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
