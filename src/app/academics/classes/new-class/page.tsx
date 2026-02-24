"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";

// Shadcn UI Components
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Form Schema
const formSchema = z.object({
  className: z.string().min(2, {
    message: "Class name must be at least 2 characters.",
  }),
  section: z.string().min(1, {
    message: "Section is required.",
  }),
  academicYear: z.string().min(4, {
    message: "Please enter a valid academic year (e.g., 2024-2025).",
  }),
  teacher: z.string().min(2, {
    message: "Teacher name must be at least 2 characters.",
  }),
  studentCount: z.coerce
    .number()
    .min(0, {
      message: "Student count must be 0 or greater.",
    })
    .max(100, {
      message: "Student count cannot exceed 100.",
    }),
  roomNumber: z.string().min(1, {
    message: "Room number is required.",
  }),
  status: z.enum(["active", "inactive", "archived"], {
    message: "Please select a status.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewClassPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: "",
      section: "",
      academicYear: "2024-2025",
      teacher: "",
      studentCount: 0,
      roomNumber: "",
      status: "active",
    },
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real application, you would call your API here
      // const response = await fetch('/api/classes', {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      // });

      toast.success("Class created successfully", {
        description: `${data.className} (Section ${data.section}) has been created.`,
      });

      // Redirect to classes list
      router.push("/academics/classes");
      router.refresh();
    } catch (error) {
      toast.error("Error", {
        description: "Failed to create class. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle cancel/back
  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleCancel}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Class</h1>
            <p className="text-muted-foreground">
              Create a new class with all required information
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
          <CardDescription>
            Fill in all the required details to create a new class.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Row 1: Class Name and Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="className"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Class Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="e.g., Mathematics 101"
                            {...field}
                            className="pl-10"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-school"
                            >
                              <path d="m4 6 8-4 8 4" />
                              <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
                              <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
                              <path d="M18 5v17" />
                              <path d="M6 5v17" />
                              <circle cx="12" cy="9" r="2" />
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter the official name of the class
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Section <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="e.g., A, B, C"
                            {...field}
                            className="pl-10"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-users"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Class section identifier
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 2: Academic Year and Teacher */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="academicYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Academic Year{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 2024-2025"
                            {...field}
                            className="pl-10"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-calendar"
                            >
                              <rect
                                width="18"
                                height="18"
                                x="3"
                                y="4"
                                rx="2"
                                ry="2"
                              />
                              <line x1="16" x2="16" y1="2" y2="6" />
                              <line x1="8" x2="8" y1="2" y2="6" />
                              <line x1="3" x2="21" y1="10" y2="10" />
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Academic year for this class
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teacher"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Teacher <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Teacher's name"
                            {...field}
                            className="pl-10"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-user"
                            >
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Primary teacher for this class
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 3: Student Count and Room Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="studentCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Student Count{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="Number of students"
                            {...field}
                            className="pl-10"
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-users"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Current number of enrolled students
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roomNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Room Number <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="e.g., 101, A-12"
                            {...field}
                            className="pl-10"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-door-open"
                            >
                              <path d="M13 4h3a2 2 0 0 1 2 2v14" />
                              <path d="M2 20h3" />
                              <path d="M13 20h9" />
                              <path d="M10 12v.01" />
                              <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z" />
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>Classroom location</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 4: Status */}
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
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Current status of the class
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="px-0 pb-0 pt-6 flex justify-between">
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
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Class"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
