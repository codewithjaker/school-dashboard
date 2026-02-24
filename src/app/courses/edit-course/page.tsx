"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Upload, X } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

// Form Schema
const courseFormSchema = z.object({
  cName: z.string().min(2, "Course name is required"),
  cCode: z.string().optional(),
  cDetails: z.string().min(10, "Course details are required"),
  sDate: z.date({
    message: "Start date is required",
  }),
  cTyme: z.string().min(1, "Course time length is required"),
  cPrice: z.string().min(1, "Course price is required"),
  pName: z.string().min(1, "Professor name is required"),
  maxStds: z.coerce.number().min(1, "Maximum students required"),
  contactNo: z.coerce.number().min(1, "Contact number is required"),
  courseCategory: z.string().min(1, "Course category is required"),
  courseDuration: z.coerce.number().min(1, "Course duration is required"),
  courseLevel: z.string().min(1, "Course level is required"),
  department: z.string().optional(),
  prerequisites: z.string().optional(),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

// Mock data for professors
const professors = [
  { id: "1", name: "Pr. Salini Parmar" },
  { id: "2", name: "Dr. John Smith" },
  { id: "3", name: "Prof. Emily Johnson" },
  { id: "4", name: "Dr. Robert Chen" },
];

// Mock data for categories
const categories = [
  { id: "1", name: "Science" },
  { id: "2", name: "Mathematics" },
  { id: "3", name: "Computer Science" },
  { id: "4", name: "Engineering" },
  { id: "5", name: "Business" },
  { id: "6", name: "Arts" },
];

// Mock data for course levels
const courseLevels = [
  { id: "1", name: "Beginner" },
  { id: "2", name: "Intermediate" },
  { id: "3", name: "Advanced" },
  { id: "4", name: "Expert" },
];

export default function EditCoursePage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      cName: "Advanced React Development",
      cCode: "CS-401",
      cDetails: "Learn advanced React patterns, state management, and performance optimization techniques.",
      sDate: new Date(),
      cTyme: "3 hours per week",
      cPrice: "299.99",
      pName: "1",
      maxStds: 30,
      contactNo: 1234567890,
      courseCategory: "1",
      courseDuration: 6,
      courseLevel: "2",
      department: "Computer Science",
      prerequisites: "Basic JavaScript knowledge, React fundamentals",
    },
  });

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
    }
  };

  // Remove file from selection
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const onSubmit = async (data: CourseFormValues) => {
    setIsSubmitting(true);
    console.log("Form data:", data);
    console.log("Selected files:", selectedFiles);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    alert("Course updated successfully!");
  };

  // Handle cancel
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/dashboard/main" className="flex items-center gap-1">
                    <HomeIcon className="h-4 w-4" />
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/courses/all-courses">Course</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit Course</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-xl">Edit Course Details</CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Row 1: Course Name & Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cName">
                    Course name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cName"
                    {...form.register("cName")}
                    placeholder="Enter course name"
                    className={form.formState.errors.cName ? "border-red-500" : ""}
                  />
                  {form.formState.errors.cName && (
                    <p className="text-sm text-red-500">{form.formState.errors.cName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cCode">Course code</Label>
                  <Input
                    id="cCode"
                    {...form.register("cCode")}
                    placeholder="Enter course code"
                  />
                </div>
              </div>

              {/* Row 2: Course Details */}
              <div className="space-y-2">
                <Label htmlFor="cDetails">
                  Course Details <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="cDetails"
                  {...form.register("cDetails")}
                  placeholder="Enter course details"
                  className={`min-h-[120px] ${form.formState.errors.cDetails ? "border-red-500" : ""}`}
                />
                {form.formState.errors.cDetails && (
                  <p className="text-sm text-red-500">{form.formState.errors.cDetails.message}</p>
                )}
              </div>

              {/* Row 3: Start Date & Course Time Length */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sDate">
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!form.watch("sDate") ? "text-muted-foreground" : ""} ${form.formState.errors.sDate ? "border-red-500" : ""}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.watch("sDate") ? (
                          format(form.watch("sDate"), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={form.watch("sDate")}
                        onSelect={(date) => form.setValue("sDate", date!)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.sDate && (
                    <p className="text-sm text-red-500">{form.formState.errors.sDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cTyme">
                    Course Time Length <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cTyme"
                    {...form.register("cTyme")}
                    placeholder="e.g., 3 hours per week"
                    className={form.formState.errors.cTyme ? "border-red-500" : ""}
                  />
                  {form.formState.errors.cTyme && (
                    <p className="text-sm text-red-500">{form.formState.errors.cTyme.message}</p>
                  )}
                </div>
              </div>

              {/* Row 4: Course Price & Professor Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cPrice">
                    Course Price ($) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cPrice"
                    type="number"
                    step="0.01"
                    {...form.register("cPrice")}
                    placeholder="0.00"
                    className={form.formState.errors.cPrice ? "border-red-500" : ""}
                  />
                  {form.formState.errors.cPrice && (
                    <p className="text-sm text-red-500">{form.formState.errors.cPrice.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pName">
                    Professor Name <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={form.watch("pName")}
                    onValueChange={(value) => form.setValue("pName", value)}
                  >
                    <SelectTrigger className={form.formState.errors.pName ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select professor" />
                    </SelectTrigger>
                    <SelectContent>
                      {professors.map((professor) => (
                        <SelectItem key={professor.id} value={professor.id}>
                          {professor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.pName && (
                    <p className="text-sm text-red-500">{form.formState.errors.pName.message}</p>
                  )}
                </div>
              </div>

              {/* Row 5: Max Students & Contact Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxStds">
                    Maximum Students Length <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="maxStds"
                    type="number"
                    {...form.register("maxStds")}
                    placeholder="Enter maximum students"
                    className={form.formState.errors.maxStds ? "border-red-500" : ""}
                  />
                  {form.formState.errors.maxStds && (
                    <p className="text-sm text-red-500">{form.formState.errors.maxStds.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNo">
                    Contact Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactNo"
                    type="tel"
                    {...form.register("contactNo")}
                    placeholder="Enter contact number"
                    className={form.formState.errors.contactNo ? "border-red-500" : ""}
                  />
                  {form.formState.errors.contactNo && (
                    <p className="text-sm text-red-500">{form.formState.errors.contactNo.message}</p>
                  )}
                </div>
              </div>

              {/* Row 6: Course Category & Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="courseCategory">
                    Course Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={form.watch("courseCategory")}
                    onValueChange={(value) => form.setValue("courseCategory", value)}
                  >
                    <SelectTrigger className={form.formState.errors.courseCategory ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.courseCategory && (
                    <p className="text-sm text-red-500">{form.formState.errors.courseCategory.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseDuration">
                    Course Duration (Months) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="courseDuration"
                    type="number"
                    {...form.register("courseDuration")}
                    placeholder="Enter duration in months"
                    className={form.formState.errors.courseDuration ? "border-red-500" : ""}
                  />
                  {form.formState.errors.courseDuration && (
                    <p className="text-sm text-red-500">{form.formState.errors.courseDuration.message}</p>
                  )}
                </div>
              </div>

              {/* Row 7: Course Level & Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="courseLevel">
                    Course Level <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={form.watch("courseLevel")}
                    onValueChange={(value) => form.setValue("courseLevel", value)}
                  >
                    <SelectTrigger className={form.formState.errors.courseLevel ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseLevels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.courseLevel && (
                    <p className="text-sm text-red-500">{form.formState.errors.courseLevel.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    {...form.register("department")}
                    placeholder="Enter department"
                  />
                </div>
              </div>

              {/* Row 8: Prerequisites */}
              <div className="space-y-2">
                <Label htmlFor="prerequisites">Prerequisites</Label>
                <Textarea
                  id="prerequisites"
                  {...form.register("prerequisites")}
                  placeholder="Enter prerequisites"
                  className="min-h-[100px]"
                />
              </div>

              {/* File Upload Section */}
              <div className="space-y-4">
                <Label>Upload Files</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      <Button type="button" variant="outline" className="mr-2">
                        Choose file
                      </Button>
                      or drag and drop file here
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Supports PDF, DOC, PPT, Images (Max 10MB each)
                    </p>
                  </label>
                </div>

                {/* Selected Files List */}
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Selected Files:</p>
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                        >
                          <div className="flex items-center">
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-gray-500 ml-2">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Submit & Cancel Buttons */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}