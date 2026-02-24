"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Book, Code, List, Award, ChevronDown, Check, X } from "lucide-react";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Form validation schema
const subjectFormSchema = z.object({
  subjectName: z.string().min(2, {
    message: "Subject name must be at least 2 characters.",
  }),
  subjectCode: z.string().min(2, {
    message: "Subject code must be at least 2 characters.",
  }),
  subjectType: z.string({
    message: "Please select a subject type.",
  }),
  prerequisites: z.string().optional(),
  credits: z.coerce.number().min(0).max(10).optional(),
  status: z.string({
    message: "Please select a status.",
  }),
});

type SubjectFormValues = z.infer<typeof subjectFormSchema>;

const subjectTypes = [
  { value: "core", label: "Core" },
  { value: "elective", label: "Elective" },
  { value: "lab", label: "Lab" },
  { value: "project", label: "Project" },
  { value: "seminar", label: "Seminar" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "draft", label: "Draft" },
];

export default function NewSubjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      subjectName: "",
      subjectCode: "",
      prerequisites: "",
      credits: 3,
      subjectType: "",
      status: "active",
    },
    mode: "onChange",
  });

  async function onSubmit(data: SubjectFormValues) {
    setIsSubmitting(true);
    try {
      // In a real application, you would make an API call here
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message and redirect
      alert("Subject created successfully!");
      router.push("/academics/subjects");
    } catch (error) {
      console.error("Error creating subject:", error);
      alert("Failed to create subject. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Subject</h1>
          <p className="text-muted-foreground mt-2">
            Add a new subject to the academic curriculum
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="h-8 gap-1"
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>

      <Separator />

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subject Name */}
                <FormField
                  control={form.control}
                  name="subjectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Book className="h-4 w-4" />
                        Subject Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter subject name"
                          {...field}
                          className="pl-10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subject Code */}
                <FormField
                  control={form.control}
                  name="subjectCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Subject Code *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter subject code"
                          {...field}
                          className="pl-10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subject Type */}
                <FormField
                  control={form.control}
                  name="subjectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Type *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjectTypes.map((type) => (
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

                {/* Status */}
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
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Prerequisites */}
                <FormField
                  control={form.control}
                  name="prerequisites"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="flex items-center gap-2">
                        <List className="h-4 w-4" />
                        Prerequisites
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter any prerequisites for this subject"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Credits */}
                <FormField
                  control={form.control}
                  name="credits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Credits
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="0.5"
                          placeholder="Enter credits"
                          {...field}
                          className="pl-10"
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !form.formState.isValid}
                  className="min-w-[100px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Subject"
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
