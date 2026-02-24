"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, Upload, X } from "lucide-react";
import { format } from "date-fns";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

// Form validation schema
const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    gender: z.enum(["male", "female", "other"], {
      message: "Gender is required",
    }),
    mobile: z
      .string()
      .min(10, "Mobile number must be at least 10 digits")
      .regex(/^\d+$/, "Mobile number must contain only digits"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string(),
    designation: z.string().optional(),
    department: z.string({
      message: "Department is required",
    }),
    dob: z.date({
      message: "Date of birth is required",
    }),
    address: z.string().optional(),
    education: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

// Department options
const departments = [
  { value: "it", label: "IT Department" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "operations", label: "Operations" },
];

export default function AddStaffPage() {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
      designation: "",
      department: "",
      address: "",
      education: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Form values:", values);
    console.log("Uploaded files:", files);

    // Handle form submission here
    // You would typically send this to your API
    try {
      // Your API call here
      alert("Staff added successfully!");
      form.reset();
      setFiles([]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto py-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Add Staff</h1>

        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/admin/dashboard"
                className="flex items-center gap-2"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/staffs">Staff</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add Staff</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Staff Information</CardTitle>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Mobile */}
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile *</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter mobile number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
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

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password *</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Re-Enter Password *</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Designation */}
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter designation"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Department */}
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Department *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.value} value={dept.value}>
                              {dept.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter address"
                        className="min-h-[100px]"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File Upload */}
              <div className="space-y-4">
                <FormLabel>Upload Documents</FormLabel>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="mb-4"
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose file
                    </Button>
                    <p className="text-sm text-gray-500">
                      or drag and drop file here
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      PDF, DOC, DOCX, JPG, PNG up to 10MB
                    </p>
                  </label>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Selected Files:</h4>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded"
                        >
                          <span className="text-sm truncate max-w-xs">
                            {file.name}
                          </span>
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

              {/* Education */}
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter education details"
                        className="min-h-[100px]"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Actions */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="px-8"
                  disabled={!form.formState.isValid}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setFiles([]);
                  }}
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
