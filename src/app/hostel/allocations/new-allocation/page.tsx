"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CalendarIcon,
  X,
  User,
  Badge,
  Hotel,
  DoorOpen,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

// Form validation schema
const formSchema = z.object({
  student_name: z.string().min(1, "Student name is required"),
  roll_no: z.string().min(1, "Roll number is required"),
  hostel_name: z.string().min(1, "Hostel name is required"),
  room_no: z.string().min(1, "Room number is required"),
  room_type: z.enum(["single", "double", "triple", "suite"], {
    message: "Please select a room type",
  }),
  allocation_date: z.date({
    message: "Allocation date is required",
  }),
  status: z.enum(["active", "inactive"], {
    message: "Please select a status",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewAllocationPage() {
  const [isOpen, setIsOpen] = useState(true);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_name: "",
      roll_no: "",
      hostel_name: "",
      room_no: "",
      status: "active",
    },
  });

  // Form submission handler
  async function onSubmit(values: FormValues) {
    try {
      console.log("Form submitted:", values);
      // Here you would typically make an API call
      // await createAllocation(values);

      // Reset form after successful submission
      form.reset();
      setIsOpen(false);

      // Show success message (you can use toast here)
      alert("Allocation created successfully!");
    } catch (error) {
      console.error("Error creating allocation:", error);
      alert("Failed to create allocation. Please try again.");
    }
  }

  if (!isOpen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Allocation Created</h2>
          <p className="text-muted-foreground mb-6">
            The hostel allocation has been successfully created.
          </p>
          <Button onClick={() => setIsOpen(true)}>
            Create Another Allocation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <div className="addContainer">
          {/* Header */}
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src="/assets/images/user/new.jpg"
                    alt="New Allocation"
                  />
                  <AvatarFallback>NA</AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-2xl font-semibold">
                    New Allocation
                  </DialogTitle>
                </div>
              </div>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>

          {/* Form */}
          <div className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Student Name and Roll No Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="student_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Student Name *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter student name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roll_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Badge className="h-4 w-4" />
                          Roll No *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter roll number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Hostel Name and Room No Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="hostel_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Hotel className="h-4 w-4" />
                          Hostel Name *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter hostel name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="room_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <DoorOpen className="h-4 w-4" />
                          Room No *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter room number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Room Type and Allocation Date Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="room_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Type *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select room type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">Single Room</SelectItem>
                            <SelectItem value="double">Double Room</SelectItem>
                            <SelectItem value="triple">Triple Room</SelectItem>
                            <SelectItem value="suite">Suite</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="allocation_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Allocation Date *
                        </FormLabel>
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
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Status Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Save Allocation
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
