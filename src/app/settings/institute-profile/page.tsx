// app/admin/settings/institute-profile/page.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Building2,
  Calendar,
  Contact2,
  CornerDownLeft,
  Home,
  Key,
  Mail,
  Palette,
  Quote,
  Save,
  Share2,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// -----------------------------------------------------------------------------
// Form schema & type
// -----------------------------------------------------------------------------
const formSchema = z.object({
  // General
  name: z.string().min(1, "Institute name is required"),
  code: z.string().min(1, "Institute code is required"),
  type: z.string({ message: "Please select an institute type" }),
  foundingDate: z.string().optional(),
  motto: z.string().optional(),

  // Contact (placeholders)
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),

  // Social (placeholders)
  facebook: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),

  // Branding (placeholders)
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  name: "",
  code: "",
  type: "Engineering College",
  foundingDate: "",
  motto: "",
  email: "",
  phone: "",
  address: "",
  website: "",
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: "",
  primaryColor: "#3b82f6",
  secondaryColor: "#10b981",
  logo: "",
  favicon: "",
};

// -----------------------------------------------------------------------------
// Page Component
// -----------------------------------------------------------------------------
export default function InstituteProfilePage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    // Here you would call your API to save the data
  };

  const handleReset = () => {
    form.reset(defaultValues);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard">
              
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/settings">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Institute Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Building2 className="mr-2 inline-block h-6 w-6" />
            Institute Details
          </CardTitle>
          <CardDescription>
            Manage your institute’s profile information across all tabs.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">
                  <Building2 className="mr-2 h-4 w-4" />
                  General
                </TabsTrigger>
                <TabsTrigger value="contact">
                  <Contact2 className="mr-2 h-4 w-4" />
                  Contact
                </TabsTrigger>
                <TabsTrigger value="social">
                  <Share2 className="mr-2 h-4 w-4" />
                  Social
                </TabsTrigger>
                <TabsTrigger value="branding">
                  <Palette className="mr-2 h-4 w-4" />
                  Branding
                </TabsTrigger>
              </TabsList>

              {/* ---------- General Tab ---------- */}
              <TabsContent value="general" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Institute Name <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="name"
                        placeholder="e.g. University of Technology"
                        {...form.register("name")}
                      />
                      <Building2 className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code">
                      Institute Code <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="code"
                        placeholder="e.g. UOT123"
                        {...form.register("code")}
                      />
                      <Key className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                    {form.formState.errors.code && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.code.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">
                      Institute Type <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) => form.setValue("type", value)}
                      defaultValue={form.getValues("type")}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering College">
                          Engineering College
                        </SelectItem>
                        <SelectItem value="Medical College">
                          Medical College
                        </SelectItem>
                        <SelectItem value="Business School">
                          Business School
                        </SelectItem>
                        <SelectItem value="University">University</SelectItem>
                        <SelectItem value="Polytechnic">Polytechnic</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.type && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.type.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="foundingDate">Founding Date</Label>
                    <div className="relative">
                      <Input
                        id="foundingDate"
                        type="date"
                        {...form.register("foundingDate")}
                      />
                      <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="motto">Institute Motto</Label>
                    <div className="relative">
                      <Textarea
                        id="motto"
                        placeholder="Enter your motto..."
                        {...form.register("motto")}
                      />
                      <Quote className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* ---------- Contact Tab ---------- */}
              <TabsContent value="contact" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@institute.edu"
                        {...form.register("email")}
                      />
                      <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 234 567 890"
                      {...form.register("phone")}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="123 College Ave, City, Country"
                      {...form.register("address")}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://www.institute.edu"
                      {...form.register("website")}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* ---------- Social Tab ---------- */}
              <TabsContent value="social" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      placeholder="https://facebook.com/..."
                      {...form.register("facebook")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      placeholder="https://twitter.com/..."
                      {...form.register("twitter")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/company/..."
                      {...form.register("linkedin")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      placeholder="https://instagram.com/..."
                      {...form.register("instagram")}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* ---------- Branding Tab ---------- */}
              <TabsContent value="branding" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Input
                      id="primaryColor"
                      type="color"
                      className="h-10 w-full"
                      {...form.register("primaryColor")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <Input
                      id="secondaryColor"
                      type="color"
                      className="h-10 w-full"
                      {...form.register("secondaryColor")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      placeholder="https://example.com/logo.png"
                      {...form.register("logo")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="favicon">Favicon URL</Label>
                    <Input
                      id="favicon"
                      placeholder="https://example.com/favicon.ico"
                      {...form.register("favicon")}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleReset}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}