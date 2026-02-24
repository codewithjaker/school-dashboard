"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// import { Icons } from "@/components/icons";

import { sportFormSchema, SportFormValues } from "@/lib/validations/sport";
import { Trophy } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function AddSportPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SportFormValues>({
    resolver: zodResolver(sportFormSchema),
    defaultValues: {
      name: "",
      coach: "",
      startedYear: "",
    },
  });

  async function onSubmit(data: SportFormValues) {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call your API here
      // const response = await fetch('/api/sports', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      // if (!response.ok) throw new Error('Failed to add sport');
      
      toast.success("Sport added successfully!");
      
      // Redirect to sports list page
      router.push("/sports");
      router.refresh();
    } catch (error) {
      toast.error("Failed to add sport. Please try again.");
      console.error("Error adding sport:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Sport</h1>
        <p className="text-muted-foreground mt-2">
          Add a new sport to your sports management system
        </p>
      </div>

      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {/* <Icons.sport className="h-5 w-5" /> */}
            <Trophy className="h-5 w-5" />
            Sport Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter sport name" 
                          {...field} 
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coach"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coach *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter coach name" 
                          {...field} 
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startedYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Started Year *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="YYYY" 
                          maxLength={4}
                          {...field} 
                          disabled={isSubmitting}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/sports")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      {/* <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
                      <Spinner className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Sport"
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