"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Bus,
  Car,
  Calendar,
  User,
  Badge,
  X,
  Check,
  CarFront,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Form validation schema
const vehicleFormSchema = z.object({
  vehicle_no: z.string().min(1, "Vehicle number is required"),
  vehicle_model: z.string().min(1, "Vehicle model is required"),
  year_made: z
    .string()
    .min(4, "Year must be 4 digits")
    .max(4, "Year must be 4 digits")
    .regex(/^\d{4}$/, "Must be a valid year"),
  driver_name: z.string().min(1, "Driver name is required"),
  driver_license: z.string().min(1, "Driver license is required"),
  vehicle_type: z.enum(["bus", "truck", "van", "car", "motorcycle"], {
    message: "Please select a vehicle type",
  }),
  status: z.enum(["active", "maintenance", "inactive"], {
    message: "Please select a status",
  }),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

export default function NewVehiclePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      vehicle_no: "",
      vehicle_model: "",
      year_made: "",
      driver_name: "",
      driver_license: "",
      vehicle_type: undefined,
      status: "active",
    },
  });

  const vehicleTypeOptions = [
    { value: "bus", label: "Bus", icon: Bus },
    { value: "truck", label: "Truck", icon: Car },
    { value: "van", label: "Van", icon: CarFront },
    { value: "car", label: "Car", icon: Car },
    { value: "motorcycle", label: "Motorcycle", icon: Car },
  ];

  const statusOptions = [
    { value: "active", label: "Active", color: "text-green-600" },
    { value: "maintenance", label: "Maintenance", color: "text-yellow-600" },
    { value: "inactive", label: "Inactive", color: "text-red-600" },
  ];

  const onSubmit = async (data: VehicleFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate API call
      console.log("Form submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect back to vehicles list or show success message
      router.push("/transport/vehicles");
      // In real app, you might want to show a toast notification
      // toast.success("Vehicle created successfully!");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create vehicle",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Car className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Vehicle</h1>
            <p className="text-muted-foreground">
              Add a new vehicle to your fleet
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          className="h-10 w-10"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Separator className="mb-8" />

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent>
          {submitError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vehicle Number */}
                <FormField
                  control={form.control}
                  name="vehicle_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Bus className="h-4 w-4 text-muted-foreground" />
                        Vehicle Number *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter vehicle number"
                            {...field}
                            className="pl-10"
                          />
                          <Bus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Vehicle Model */}
                <FormField
                  control={form.control}
                  name="vehicle_model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        Vehicle Model *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter vehicle model"
                            {...field}
                            className="pl-10"
                          />
                          <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Year Made */}
                <FormField
                  control={form.control}
                  name="year_made"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        Year Made *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="YYYY"
                            {...field}
                            maxLength={4}
                            className="pl-10"
                          />
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Driver Name */}
                <FormField
                  control={form.control}
                  name="driver_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        Driver Name *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter driver name"
                            {...field}
                            className="pl-10"
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Driver License */}
                <FormField
                  control={form.control}
                  name="driver_license"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Badge className="h-4 w-4 text-muted-foreground" />
                        Driver License *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter driver license number"
                            {...field}
                            className="pl-10"
                          />
                          <Badge className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Vehicle Type */}
                <FormField
                  control={form.control}
                  name="vehicle_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <CarFront className="h-4 w-4 text-muted-foreground" />
                        Vehicle Type *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {vehicleTypeOptions.map((option) => {
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-current" />
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
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-2 w-2 rounded-full ${option.color.replace("text", "bg")}`}
                                />
                                <span className={option.color}>
                                  {option.label}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
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
                  className="min-w-[100px]"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Save Vehicle
                    </>
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
