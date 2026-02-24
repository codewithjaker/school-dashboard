"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

// Form validation schema
const formSchema = z.object({
  roomTypeName: z.string().min(1, "Room type name is required"),
  roomCategory: z.string().min(1, "Room category is required"),
  capacity: z.coerce
    .number()
    .int()
    .positive("Capacity must be at least 1")
    .min(1, "Capacity must be at least 1"),
  maxOccupants: z.coerce
    .number()
    .int()
    .positive("Max occupants must be at least 1")
    .min(1, "Max occupants must be at least 1"),
  roomPrice: z.coerce
    .number()
    .nonnegative("Room price must be non-negative")
    .min(0, "Room price must be non-negative"),
  roomArea: z.coerce
    .number()
    .nonnegative("Room area must be non-negative")
    .min(0, "Room area must be non-negative"),
  roomCondition: z.string().default("Good"),
  roomTypeCode: z
    .string()
    .min(1, "Room type code is required")
    .regex(/^[A-Z0-9-]+$/, "Room type code must be alphanumeric with dashes"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  roomFacilities: z.string().optional(),
  roomDescription: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for dropdowns
const roomTypeOptions = [
  { value: "single", label: "Single Room" },
  { value: "double", label: "Double Room" },
  { value: "suite", label: "Suite" },
  { value: "deluxe", label: "Deluxe Room" },
  { value: "shared", label: "Shared Dormitory" },
];

const roomCategoryOptions = [
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "executive", label: "Executive" },
  { value: "economy", label: "Economy" },
];

const roomConditionOptions = [
  { value: "Excellent", label: "Excellent" },
  { value: "Good", label: "Good" },
  { value: "Fair", label: "Fair" },
  { value: "Needs Maintenance", label: "Needs Maintenance" },
];

export default function NewRoomTypePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomTypeName: "",
      roomCategory: "",
      capacity: 1,
      maxOccupants: 1,
      roomPrice: 0,
      roomArea: 0,
      roomCondition: "Good",
      roomTypeCode: "",
      status: "Active",
      roomFacilities: "",
      roomDescription: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // In a real application, you would make an API call here
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Success!", {
        description: "Room type has been created successfully.",
      });

      // Redirect to room types list
      router.push("/hostel/room-type");
    } catch (error) {
      toast.error("Error", {
        description: "Failed to create room type. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate room type code based on selections
  const generateRoomTypeCode = () => {
    const roomType = form.getValues("roomTypeName");
    const category = form.getValues("roomCategory");

    if (roomType && category) {
      const typeCode = roomType.slice(0, 3).toUpperCase();
      const catCode = category.slice(0, 2).toUpperCase();
      const randomNum = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");

      const generatedCode = `${typeCode}-${catCode}-${randomNum}`;
      form.setValue("roomTypeCode", generatedCode, { shouldValidate: true });
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Room Type</h1>
          <p className="text-muted-foreground">
            Create a new room type for hostel management
          </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Room Type Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Room Type Name */}
                <FormField
                  control={form.control}
                  name="roomTypeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Room Type Name{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roomTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Room Category */}
                <FormField
                  control={form.control}
                  name="roomCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Room Category{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          generateRoomTypeCode();
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roomCategoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Capacity */}
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Capacity <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 1)
                          }
                        />
                      </FormControl>
                      <FormDescription>Standard number of beds</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Max Occupants */}
                <FormField
                  control={form.control}
                  name="maxOccupants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Max Occupants{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 1)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum allowed occupants (including extra beds)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Room Price */}
                <FormField
                  control={form.control}
                  name="roomPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Room Price <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            $
                          </div>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            className="pl-8"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Price per night</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Room Area */}
                <FormField
                  control={form.control}
                  name="roomArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Room Area (sq ft){" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Room Condition */}
                <FormField
                  control={form.control}
                  name="roomCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Condition</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roomConditionOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Room Type Code */}
                <FormField
                  control={form.control}
                  name="roomTypeCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Room Type Code{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input
                            placeholder="e.g., SIN-ST-001"
                            {...field}
                            className="uppercase"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={generateRoomTypeCode}
                          >
                            Generate
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Unique identifier for this room type
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Status</FormLabel>
                        <FormDescription>
                          Active room types will be available for booking
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value === "Active"}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? "Active" : "Inactive")
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Room Facilities */}
                <FormField
                  control={form.control}
                  name="roomFacilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Facilities</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., AC, TV, WiFi, Private Bathroom"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of facilities
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Created At */}
                <FormField
                  control={form.control}
                  name="createdAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Created At</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
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
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Updated At */}
                <FormField
                  control={form.control}
                  name="updatedAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Updated At</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
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
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Room Description */}
              <FormField
                control={form.control}
                name="roomDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the room features, amenities, and any additional details..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Room Type"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
