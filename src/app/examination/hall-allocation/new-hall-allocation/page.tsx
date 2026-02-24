"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

// Shadcn UI Components
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

// Validation schema
const formSchema = z.object({
  exam_name: z.string().min(1, "Exam name is required"),
  student_name: z.string().min(1, "Student name is required"),
  roll_no: z.string().min(1, "Roll number is required"),
  hall_no: z.string().min(1, "Hall number is required"),
  seat_no: z.string().min(1, "Seat number is required"),
});

type FormValues = z.infer<typeof formSchema>;

// Mock exam data
const examOptions = [
  { id: "1", name: "Final Examination 2024" },
  { id: "2", name: "Mid-Term Examination 2024" },
  { id: "3", name: "Semester 1 Examination" },
  { id: "4", name: "Semester 2 Examination" },
];

export default function NewHallAllocationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exam_name: "",
      student_name: "",
      roll_no: "",
      hall_no: "",
      seat_no: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      
      // Here you would typically make an API call
      // await fetch("/api/hall-allocations", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      // });
      
      // Show success message and redirect or reset form
      alert("Hall allocation created successfully!");
      form.reset();
      router.push("/examination/hall-allocation");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create hall allocation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    router.push("/examination/hall-allocation");
  };

  const isFormValid = form.formState.isValid;

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-end mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            New Hall Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Exam Name */}
                <FormField
                  control={form.control}
                  name="exam_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Exam Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select exam" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {examOptions.map((exam) => (
                            <SelectItem key={exam.id} value={exam.id}>
                              {exam.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Roll No */}
                <FormField
                  control={form.control}
                  name="roll_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Roll No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter roll number"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Hall No */}
                <FormField
                  control={form.control}
                  name="hall_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Hall No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter hall number"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Seat No */}
                <FormField
                  control={form.control}
                  name="seat_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Seat No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter seat number"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="sm:w-32"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="sm:w-32 bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    "Save"
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