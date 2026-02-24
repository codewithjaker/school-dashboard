"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  BookOpen,
  CalendarIcon,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  User,
  X,
} from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { toast } from "sonner";
import {
  assignmentFormSchema,
  AssignmentFormValues,
} from "@/lib/schemas/assignment";

const statusOptions = [
  { value: "draft", label: "Draft", icon: FileText },
  { value: "active", label: "Active", icon: Clock },
  { value: "completed", label: "Completed", icon: CheckCircle2 },
  { value: "cancelled", label: "Cancelled", icon: X },
];

export default function NewAssignmentPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      className: "",
      subjectName: "",
      teacherName: "",
      details: "",
      status: "draft",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: AssignmentFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Assignment created", {
        description: "The new assignment has been created successfully.",
      });

      // Redirect to assignments list
      router.push("/academics/assignment");
    } catch (error) {
      toast.error("Error", {
        description: "Failed to create assignment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              New Assignment
            </h1>
            <p className="text-muted-foreground mt-2">
              Create a new assignment for your class
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="h-10 w-10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Assignment Details</CardTitle>
                <CardDescription>
                  Fill in the assignment information below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Class Field */}
                  <FormField
                    control={form.control}
                    name="className"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Class *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="e.g., Mathematics 101"
                              className="pl-10"
                              {...field}
                            />
                            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormDescription>
                          The class for this assignment
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Subject Field */}
                  <FormField
                    control={form.control}
                    name="subjectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Subject *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="e.g., Calculus"
                              className="pl-10"
                              {...field}
                            />
                            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Subject of the assignment
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Teacher Field */}
                  <FormField
                    control={form.control}
                    name="teacherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Teacher *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="e.g., Dr. Smith"
                              className="pl-10"
                              {...field}
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Teacher assigning this work
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Assignment Date Field */}
                  <FormField
                    control={form.control}
                    name="assignmentDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          Assignment Date *
                        </FormLabel>
                        <FormControl>
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          When the assignment is due
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Status Field - Full Width */}
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
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4" />
                                  {option.label}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Current status of the assignment
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Details Field - Full Width */}
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Details
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Assignment description, requirements, and any additional notes..."
                            className="min-h-[120px] pl-10"
                            {...field}
                          />
                          <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Provide detailed instructions for the assignment
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
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
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                      Creating...
                    </>
                  ) : (
                    "Create Assignment"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>

        
      </div>
    </div>
  );
}
