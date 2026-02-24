"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  Clock,
  User,
  BookOpen,
  Hash,
  CalendarDays,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
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
import { cn } from "@/lib/utils";
import {
  attendanceFormSchema,
  AttendanceFormValues,
} from "@/lib/schemas/attendance";

export default function NewAttendancePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceFormSchema),
    defaultValues: {
      rollNo: "",
      sName: "",
      class: "",
      date: new Date(),
      status: undefined,
      attendance_time: "",
      semester: "",
      subject: "",
      present_count: 0,
      absent_count: 0,
      reason_for_absence: "",
      note: "",
    },
  });

  const onSubmit = async (data: AttendanceFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Form data:", data);
      // Add your API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      alert("Attendance record created successfully!");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create attendance record");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <Card className="border shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">New Attendance</CardTitle>
                <CardDescription>
                  Add a new attendance record for a student
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
              <a href="/students/all-students/student-attendance">
                <XCircle className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Row 1: Roll No and Student Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="rollNo" className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Roll No
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="rollNo"
                    placeholder="Enter roll number"
                    {...form.register("rollNo")}
                    className="h-12"
                  />
                  {form.formState.errors.rollNo && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.rollNo.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Student Name
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="sName"
                    placeholder="Enter student name"
                    {...form.register("sName")}
                    className="h-12"
                  />
                  {form.formState.errors.sName && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.sName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Class and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="class" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Class
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => form.setValue("class", value)}
                    defaultValue={form.getValues("class")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class-1">Class 1</SelectItem>
                      <SelectItem value="class-2">Class 2</SelectItem>
                      <SelectItem value="class-3">Class 3</SelectItem>
                      <SelectItem value="class-4">Class 4</SelectItem>
                      <SelectItem value="class-5">Class 5</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.class && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.class.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Date
                    <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !form.watch("date") && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.watch("date") ? (
                          format(form.watch("date"), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={form.watch("date")}
                        onSelect={(date) => date && form.setValue("date", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.date && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.date.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Status and Attendance Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="status" className="flex items-center gap-2">
                    Status
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value: "present" | "absent" | "late") =>
                      form.setValue("status", value)
                    }
                    defaultValue={form.getValues("status")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="present">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Present
                        </div>
                      </SelectItem>
                      <SelectItem value="absent">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          Absent
                        </div>
                      </SelectItem>
                      <SelectItem value="late">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-amber-500" />
                          Late
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.status && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.status.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="attendance_time"
                    className="flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Attendance Time
                  </Label>
                  <Input
                    id="attendance_time"
                    type="time"
                    {...form.register("attendance_time")}
                    className="h-12"
                  />
                </div>
              </div>

              {/* Row 4: Semester and Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="semester">
                    Semester
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="semester"
                    placeholder="Enter semester"
                    {...form.register("semester")}
                    className="h-12"
                  />
                  {form.formState.errors.semester && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.semester.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Subject
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Enter subject"
                    {...form.register("subject")}
                    className="h-12"
                  />
                  {form.formState.errors.subject && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.subject.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 5: Present Count and Absent Count */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="present_count">
                    Present Count
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="present_count"
                    type="number"
                    min="0"
                    {...form.register("present_count")}
                    className="h-12"
                  />
                  {form.formState.errors.present_count && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.present_count.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="absent_count">
                    Absent Count
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="absent_count"
                    type="number"
                    min="0"
                    {...form.register("absent_count")}
                    className="h-12"
                  />
                  {form.formState.errors.absent_count && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.absent_count.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 6: Reason for Absence */}
              <div className="space-y-2">
                <Label
                  htmlFor="reason_for_absence"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Reason for Absence (Optional)
                </Label>
                <Textarea
                  id="reason_for_absence"
                  placeholder="Enter reason for absence..."
                  {...form.register("reason_for_absence")}
                  className="min-h-[100px]"
                />
              </div>

              {/* Row 7: Note */}
              <div className="space-y-2">
                <Label htmlFor="note" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Note (Optional)
                </Label>
                <Textarea
                  id="note"
                  placeholder="Enter any additional notes..."
                  {...form.register("note")}
                  className="min-h-[100px]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    "Save Attendance"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 px-8"
                  onClick={() => window.history.back()}
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
