"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, X } from "lucide-react";

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

const formSchema = z.object({
  visitorId: z.string().min(1, { message: "Visitor ID is required" }),
  visitorName: z.string().min(1, { message: "Visitor name is required" }),
  visitDate: z.date({ message: "Visit date is required" }),
  visitTime: z.string().min(1, { message: "Visit time is required" }),
  purposeOfVisit: z
    .string()
    .min(1, { message: "Purpose of visit is required" }),
  contactNumber: z
    .string()
    .min(1, { message: "Contact number is required" })
    .regex(/^[0-9+\-\s()]*$/, { message: "Invalid contact number format" }),
  visitorType: z.string().min(1, { message: "Visitor type is required" }),
  idProofType: z.string().optional(),
  idProofNumber: z.string().optional(),
  departmentPersonVisited: z
    .string()
    .min(1, { message: "Department visited is required" }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const visitorTypes = [
  { value: "client", label: "Client" },
  { value: "vendor", label: "Vendor" },
  { value: "interview", label: "Interview Candidate" },
  { value: "delivery", label: "Delivery Personnel" },
  { value: "guest", label: "Guest" },
  { value: "other", label: "Other" },
];

const idProofTypes = [
  { value: "aadhaar", label: "Aadhaar Card" },
  { value: "pan", label: "PAN Card" },
  { value: "passport", label: "Passport" },
  { value: "driving", label: "Driving License" },
  { value: "voter", label: "Voter ID" },
  { value: "other", label: "Other" },
];

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

export default function NewVisitorBookPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visitorId: "",
      visitorName: "",
      visitDate: new Date(),
      visitTime: format(new Date(), "HH:mm"),
      purposeOfVisit: "",
      contactNumber: "",
      visitorType: "",
      idProofType: "",
      idProofNumber: "",
      departmentPersonVisited: "",
      notes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      // Format the date for submission
      const formattedData = {
        ...data,
        visitDate: format(data.visitDate, "yyyy-MM-dd"),
      };

      // Here you would typically send the data to your API
      console.log("Form data:", formattedData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message and redirect
      alert("Visitor added successfully!");
      router.push("/front-office/visitors-book");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add visitor. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            New Visitor Entry
          </h1>
          <p className="text-muted-foreground">
            Register a new visitor in the visitor&apos;s book
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>

      <Separator />

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Visitor Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Row 1: Visitor ID & Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="visitorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visitor ID *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter visitor ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="visitorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visitor Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter visitor name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 2: Visit Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="visitDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Visit Date *</FormLabel>
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

                <FormField
                  control={form.control}
                  name="visitTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visit Time *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {time}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 3: Purpose & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="purposeOfVisit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purpose of Visit *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter purpose of visit"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 4: Visitor Type & ID Proof Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="visitorType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visitor Type *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visitor type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {visitorTypes.map((type) => (
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

                <FormField
                  control={form.control}
                  name="idProofType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Proof Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ID proof type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {idProofTypes.map((type) => (
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
              </div>

              {/* Row 5: ID Proof Number & Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="idProofNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Proof Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ID proof number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="departmentPersonVisited"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department/Person Visited *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter department or person name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 6: Notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional notes"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? "Saving..." : "Save Visitor"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
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
  );
}
