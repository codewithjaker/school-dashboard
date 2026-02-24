"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Book,
  Clock,
  FileText,
  School,
  BookOpen,
  CheckCircle,
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

// Define validation schema with Zod
const curriculumFormSchema = z.object({
  courseName: z.string().min(2, {
    message: "Course name must be at least 2 characters.",
  }),
  className: z.string().min(1, {
    message: "Class is required.",
  }),
  subjectName: z.string().min(1, {
    message: "Subject is required.",
  }),
  description: z.string().optional(),
  duration: z.string().min(1, {
    message: "Duration is required.",
  }),
  referenceMaterial: z.string().optional(),
  status: z.enum(["active", "inactive", "draft"], {
    message: "Please select a status.",
  }),
});

type CurriculumFormValues = z.infer<typeof curriculumFormSchema>;

// Default form values
const defaultValues: Partial<CurriculumFormValues> = {
  courseName: "",
  className: "",
  subjectName: "",
  description: "",
  duration: "",
  referenceMaterial: "",
  status: "draft",
};

export default function NewCurriculumPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Initialize form
  const form = useForm<CurriculumFormValues>({
    resolver: zodResolver(curriculumFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // Handle form submission
  async function onSubmit(data: CurriculumFormValues) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real application, you would make an API call here
      console.log("Form data submitted:", data);

      toast.success("Curriculum Created", {
        description: "New curriculum has been successfully created.",
      });

      // Redirect to curriculum list page after successful submission
      router.push("/academics/course-curriculum");
    } catch (error) {
      setSubmitError("Failed to create curriculum. Please try again.");
      toast.error("Error", {
        description: "Failed to create curriculum.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle cancel
  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
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
              New Curriculum
            </h1>
            <p className="text-muted-foreground">
              Create a new course curriculum
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Curriculum Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Error Alert */}
                  {submitError && (
                    <Alert variant="destructive">
                      <AlertDescription>{submitError}</AlertDescription>
                    </Alert>
                  )}

                  {/* Course Name */}
                  <FormField
                    control={form.control}
                    name="courseName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Book className="h-4 w-4" />
                          Course Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter course name"
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Class */}
                    <FormField
                      control={form.control}
                      name="className"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <School className="h-4 w-4" />
                            Class *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Grade 10"
                              {...field}
                              className="h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Subject */}
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
                            <Input
                              placeholder="e.g., Mathematics"
                              {...field}
                              className="h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter course description"
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Brief overview of the curriculum
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Duration */}
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Duration *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 6 months, 30 hours"
                              {...field}
                              className="h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Reference Material */}
                    <FormField
                      control={form.control}
                      name="referenceMaterial"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Book className="h-4 w-4" />
                            Reference Material
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Textbook name"
                              {...field}
                              className="h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Status *
                        </FormLabel>
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
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4">
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
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Creating...
                        </>
                      ) : (
                        "Save Curriculum"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Guidelines Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold">Required Fields</h4>
                <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                  <li>All fields marked with * are required</li>
                  <li>Course name should be descriptive</li>
                  <li>Select appropriate status for curriculum</li>
                </ul>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold">Best Practices</h4>
                <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                  <li>Use clear, concise course names</li>
                  <li>Include comprehensive descriptions</li>
                  <li>Set appropriate duration for completion</li>
                  <li>Reference materials help students</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Form Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Form Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Required Fields
                </span>
                <span className="text-sm font-medium">
                  {Object.keys(form.formState.errors).length === 0
                    ? "✓ All valid"
                    : `${Object.keys(form.formState.errors).length} error(s)`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Form Status
                </span>
                <span
                  className={`text-sm font-medium ${form.formState.isValid ? "text-green-600" : "text-amber-600"}`}
                >
                  {form.formState.isValid
                    ? "Ready to submit"
                    : "Needs attention"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
