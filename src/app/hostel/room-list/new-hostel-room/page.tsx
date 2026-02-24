// app/hostel/room-list/new-hostel-room/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Form validation schema
const formSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  roomType: z.string().min(1, "Room type is required"),
  floor: z.coerce.number().min(0, "Floor must be 0 or greater"),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  occupiedStatus: z.enum(["Vacant", "Occupied", "Partially Occupied"]),
  currentOccupants: z.coerce
    .number()
    .min(0, "Current occupants must be 0 or greater"),
  priceFees: z.coerce.number().min(0, "Price must be 0 or greater"),
  roomCondition: z.enum(["Good", "Fair", "Poor", "Under Maintenance"]),
  dateAssigned: z.date().optional(),
  roomSupervisorStaff: z.string().min(1, "Room supervisor is required"),
  hostelBlock: z.string().min(1, "Hostel block is required"),
  roomTypeCode: z.string().min(1, "Room type code is required"),
  checkInDate: z.date().optional(),
  checkOutDate: z.date().optional(),
  roomDescription: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for select options
const roomTypes = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
  { value: "triple", label: "Triple" },
  { value: "dormitory", label: "Dormitory" },
  { value: "suite", label: "Suite" },
];

const hostelBlocks = [
  { value: "block-a", label: "Block A" },
  { value: "block-b", label: "Block B" },
  { value: "block-c", label: "Block C" },
  { value: "block-d", label: "Block D" },
];

const staffMembers = [
  { value: "staff-1", label: "John Smith" },
  { value: "staff-2", label: "Sarah Johnson" },
  { value: "staff-3", label: "Michael Chen" },
];

const roomTypeCodes = [
  { value: "sgl-101", label: "SGL-101 (Single Standard)" },
  { value: "dbl-201", label: "DBL-201 (Double Standard)" },
  { value: "trp-301", label: "TRP-301 (Triple)" },
  { value: "dm-401", label: "DM-401 (Dormitory)" },
];

export default function NewHostelRoomPage() {
  const router = useRouter();

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNumber: "",
      roomType: "",
      floor: 0,
      capacity: 1,
      occupiedStatus: "Vacant",
      currentOccupants: 0,
      priceFees: 0,
      roomCondition: "Good",
      dateAssigned: undefined,
      roomSupervisorStaff: "",
      hostelBlock: "",
      roomTypeCode: "",
      checkInDate: undefined,
      checkOutDate: undefined,
      roomDescription: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Form data:", data);
      // Here you would typically make an API call
      // await api.createHostelRoom(data);
      
      // Show success message
      alert("Hostel room created successfully!");
      
      // Redirect to room list
      router.push("/hostel/room-list");
    } catch (error) {
      console.error("Error creating hostel room:", error);
      alert("Failed to create hostel room. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Hostel Room</h1>
          <p className="text-muted-foreground mt-2">
            Add a new room to the hostel inventory
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/hostel/room-list")}
        >
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Room Details</CardTitle>
          <CardDescription>
            Fill in the details for the new hostel room.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Room Number */}
                <FormField
                  control={form.control}
                  name="roomNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 101, A-102" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Room Type */}
                <FormField
                  control={form.control}
                  name="roomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type *</FormLabel>
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
                          {roomTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Floor */}
                <FormField
                  control={form.control}
                  name="floor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Floor *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Floor number"
                          {...field}
                        />
                      </FormControl>
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
                      <FormLabel>Capacity *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Maximum occupants"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Occupied Status */}
                <FormField
                  control={form.control}
                  name="occupiedStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupied Status</FormLabel>
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
                          <SelectItem value="Vacant">Vacant</SelectItem>
                          <SelectItem value="Occupied">Occupied</SelectItem>
                          <SelectItem value="Partially Occupied">
                            Partially Occupied
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Current Occupants */}
                <FormField
                  control={form.control}
                  name="currentOccupants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Occupants *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="Current number of occupants"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price/Fees */}
                <FormField
                  control={form.control}
                  name="priceFees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price/Fees *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            className="pl-8"
                            placeholder="0.00"
                            {...field}
                          />
                        </div>
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
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                          <SelectItem value="Under Maintenance">
                            Under Maintenance
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date Assigned */}
                <FormField
                  control={form.control}
                  name="dateAssigned"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date Assigned</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
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

                {/* Room Supervisor Staff */}
                <FormField
                  control={form.control}
                  name="roomSupervisorStaff"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Supervisor Staff *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select supervisor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {staffMembers.map((staff) => (
                            <SelectItem key={staff.value} value={staff.value}>
                              {staff.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Hostel Block */}
                <FormField
                  control={form.control}
                  name="hostelBlock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hostel Block *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select block" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hostelBlocks.map((block) => (
                            <SelectItem key={block.value} value={block.value}>
                              {block.label}
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
                      <FormLabel>Room Type Code *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roomTypeCodes.map((code) => (
                            <SelectItem key={code.value} value={code.value}>
                              {code.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Check-in Date */}
                <FormField
                  control={form.control}
                  name="checkInDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-in Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
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

                {/* Check-out Date */}
                <FormField
                  control={form.control}
                  name="checkOutDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-out Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
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

              {/* Room Description */}
              <FormField
                control={form.control}
                name="roomDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter room description, facilities, or notes..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/hostel/room-list")}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Room
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}