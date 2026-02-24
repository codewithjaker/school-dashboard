"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  X,
  User,
  Tag,
  Mail,
  Building,
  Briefcase,
  DollarSign,
  Award,
  MinusCircle,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

// Schema validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  empID: z.string().min(1, { message: "Employee ID is required." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  department: z.string().min(1, { message: "Department is required." }),
  role: z.string().min(1, { message: "Role is required." }),
  salary: z.coerce.number().positive({ message: "Salary must be positive." }),
  bonus: z.coerce.number().min(0).optional(),
  deductions: z.coerce.number().min(0).optional(),
  netSalary: z.coerce.number().min(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for departments and roles
const departments = [
  { value: "engineering", label: "Engineering" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance" },
  { value: "operations", label: "Operations" },
];

const roles = [
  { value: "software-engineer", label: "Software Engineer" },
  { value: "senior-engineer", label: "Senior Engineer" },
  { value: "team-lead", label: "Team Lead" },
  { value: "manager", label: "Manager" },
  { value: "director", label: "Director" },
  { value: "executive", label: "Executive" },
];

export default function NewEmployeeSalaryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalculatingNet, setIsCalculatingNet] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      empID: "",
      email: "",
      department: "",
      role: "",
      salary: 0,
      bonus: 0,
      deductions: 0,
      netSalary: 0,
    },
    mode: "onChange",
  });

  // Calculate net salary whenever salary, bonus, or deductions change
  const watchFields = form.watch(["salary", "bonus", "deductions"]);

  useEffect(() => {
    const [salary, bonus = 0, deductions = 0] = watchFields;
    setIsCalculatingNet(true);

    const netSalary = Math.max(
      0,
      Number(salary) + Number(bonus) - Number(deductions),
    );

    // Update netSalary field without triggering validation
    form.setValue("netSalary", netSalary, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Use setTimeout to prevent infinite loops
    const timer = setTimeout(() => setIsCalculatingNet(false), 100);
    return () => clearTimeout(timer);
  }, [watchFields, form]);

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would make an API call here
      console.log("Form data:", data);

      toast.success("Success!", {
        description: "Employee salary has been saved.",
      });

      // Redirect to employee list or show success message
      router.push("/human-resources/employee-salary");
    } catch (error) {
      toast.error("Error", {
        description: "Failed to save employee salary. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Dialog Container */}
        <Card className="border shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/assets/images/user/new.jpg" alt="Avatar" />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-semibold">
                  New Employee Salary
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Add new employee salary details
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="h-10 w-10 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Form Content */}
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Name
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter full name"
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Employee ID Field */}
                  <FormField
                    control={form.control}
                    name="empID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          Employee ID
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter employee ID"
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Department Field */}
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Department
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11">
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

                  {/* Role Field */}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Role
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Salary Field */}
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Salary
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </span>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                              className="h-11 pl-8"
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Bonus Field */}
                  <FormField
                    control={form.control}
                    name="bonus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Bonus
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </span>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                              className="h-11 pl-8"
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Deductions Field */}
                  <FormField
                    control={form.control}
                    name="deductions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MinusCircle className="h-4 w-4" />
                          Deductions
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </span>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                              className="h-11 pl-8"
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Net Salary Field (Read-only) */}
                  <FormField
                    control={form.control}
                    name="netSalary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          Net Salary
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </span>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                              className="h-11 pl-8 bg-muted"
                              readOnly
                              disabled={isCalculatingNet}
                            />
                          </div>
                        </FormControl>
                        <p className="text-sm text-muted-foreground">
                          Calculated automatically
                        </p>
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="h-11 px-6"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-11 px-6 bg-primary hover:bg-primary/90"
                    disabled={isSubmitting || !form.formState.isValid}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
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
    </div>
  );
}
