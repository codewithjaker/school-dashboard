"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Route, MapPin, Flag, Ruler, Bus, DollarSign } from "lucide-react";
import { toast } from "sonner";

// Define the form schema using Zod
const formSchema = z.object({
  route_name: z.string().min(1, "Route name is required"),
  start_point: z.string().min(1, "Start point is required"),
  end_point: z.string().min(1, "End point is required"),
  distance: z.string().min(1, "Distance is required").regex(/^\d+(\.\d+)?$/, "Distance must be a number"),
  vehicle_no: z.string().min(1, "Vehicle number is required"),
  route_fees: z.string().min(1, "Route fees is required").regex(/^\d+(\.\d+)?$/, "Fees must be a number"),
  status: z.enum(["active", "inactive", "pending"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewRoutePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      route_name: "",
      start_point: "",
      end_point: "",
      distance: "",
      vehicle_no: "",
      route_fees: "",
      status: "active",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to save the route
      console.log("Form data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Route created successfully!");
      router.push("/transport/routes");
    } catch (error) {
      toast.error("Failed to create route. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Route</h1>
            <p className="text-muted-foreground mt-2">
              Create a new transportation route with all necessary details
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            Route Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Route Name */}
              <FormField
                control={form.control}
                name="route_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Route className="h-4 w-4" />
                      Route Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter route name"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Point */}
                <FormField
                  control={form.control}
                  name="start_point"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Start Point *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter starting point"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* End Point */}
                <FormField
                  control={form.control}
                  name="end_point"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Flag className="h-4 w-4" />
                        End Point *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter ending point"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Distance */}
                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Ruler className="h-4 w-4" />
                        Distance (km) *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter distance in kilometers"
                          type="number"
                          step="0.01"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Vehicle Number */}
                <FormField
                  control={form.control}
                  name="vehicle_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Bus className="h-4 w-4" />
                        Vehicle Number *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter vehicle number"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Route Fees */}
                <FormField
                  control={form.control}
                  name="route_fees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Route Fees ($) *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter route fees"
                          type="number"
                          step="0.01"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
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
                      <FormLabel>Status *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
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
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Route"
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