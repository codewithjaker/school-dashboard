import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Home,
  User,
  Settings,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
}

interface Experience {
  id: number;
  role: string;
  organization: string;
  duration: string;
  description: string;
}

export default function StaffProfilePage() {
  const staff = {
    name: "Jayna Patil",
    title: "Professor",
    email: "jayna.patil@example.com",
    phone: "264-625-2583",
    address: "456 Eastern Avenue, Courtage Area, New York",
    about: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
    stats: {
      following: 564,
      followers: "18k",
      posts: 565,
    },
  };

  const educationItems: Education[] = [
    {
      id: 1,
      degree: "M.S.N.",
      institution: "Gujarat University",
      location: "Ahmedabad, India",
    },
    {
      id: 2,
      degree: "B.S.N.",
      institution: "Gujarat University",
      location: "Ahmedabad, India",
    },
    {
      id: 3,
      degree: "A.S.D.",
      institution: "Shaurashtra University",
      location: "Rajkot, India",
    },
  ];

  const experienceItems: Experience[] = [
    {
      id: 1,
      role: "Nursing Internship",
      organization: "B. J. Medical College",
      duration: "April 2009 - March 2010",
      description:
        "One year nursing internship at B. J. Medical College, Ahmedabad.",
    },
    {
      id: 2,
      role: "Part-time Nurse",
      organization: "Apang Manav Mandal",
      duration: "June 2004 - January 2005",
      description: "Worked as a part time nurse in Apang manav mandal.",
    },
    {
      id: 3,
      role: "Medical Staff",
      organization: "Mahatma Gandhi General Hospital",
      duration: "2.5 Years",
      description: "Worked at Mahatma Gandhi General Hospital, Surendranagar.",
    },
  ];

  const personalInfo = [
    { label: "Full Name", value: "Emily Smith" },
    { label: "Mobile", value: "(123) 456 7890" },
    { label: "Email", value: "emily.smith@example.com" },
    { label: "Location", value: "India" },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/admin/dashboard/main"
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/staff">Staff</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 border-4 border-white/20">
                  <AvatarImage
                    src="/assets/images/user/user2.jpg"
                    alt={staff.name}
                  />
                  <AvatarFallback className="text-2xl bg-white/20">
                    {staff.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4">
                  <h2 className="text-2xl font-bold">{staff.name}</h2>
                  <p className="text-white/90">{staff.title}</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{staff.address}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{staff.phone}</span>
                </div>

                <Separator />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">
                      {staff.stats.following}
                    </p>
                    <p className="text-sm text-muted-foreground">Following</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {staff.stats.followers}
                    </p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{staff.stats.posts}</p>
                    <p className="text-sm text-muted-foreground">Posts</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About & Skills Tabs */}
          <Card>
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  {staff.about}
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Email address:
                    </p>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <p>{staff.email}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Phone:
                    </p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <p>+91 1234567890</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* <TabsContent value="skills" className="p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Nursing Care</Badge>
                  <Badge variant="secondary">Medical Knowledge</Badge>
                  <Badge variant="secondary">Patient Education</Badge>
                  <Badge variant="secondary">Emergency Response</Badge>
                  <Badge variant="secondary">Team Leadership</Badge>
                  <Badge variant="secondary">Clinical Research</Badge>
                </div>
              </TabsContent> */}
              <TabsContent value="skills" className="space-y-6 p-6">
                  <div className="space-y-4">
                    <SkillItem label="Java" value={45} />
                    <SkillItem label="PHP" value={38} />
                    <SkillItem label="Database" value={39} />
                    <SkillItem label="Spring" value={70} />
                  </div>
                </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <Tabs defaultValue="about-me" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger
                  value="about-me"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  About Me
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* About Me Tab */}
              <TabsContent value="about-me" className="space-y-6 p-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Personal Information
                    </h3>
                    <Separator className="my-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {personalInfo.map((info) => (
                      <div key={info.label} className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          {info.label}
                        </p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Completed my graduation in Arts from the well known and
                      renowned institution of India – SARDAR PATEL ARTS COLLEGE,
                      BARODA in 2000-01, which was affiliated to M.S.
                      University. I ranker in University exams from the same
                      university from 1996-01.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Worked as Professor and Head of the department at Sarda
                      Collage, Rajkot, Gujarat from 2003-2015
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </p>
                  </div>
                </div>

                {/* Education Section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Education
                    </h3>
                    <Separator className="my-2" />
                  </div>

                  <div className="space-y-4">
                    {educationItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                          <GraduationCap className="h-3 w-3 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.degree}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.institution}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Experience
                    </h3>
                    <Separator className="my-2" />
                  </div>

                  <div className="space-y-6">
                    {experienceItems.map((exp) => (
                      <div key={exp.id} className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                            <Briefcase className="h-3 w-3 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <p className="font-medium">{exp.role}</p>
                              <Badge variant="outline" className="mt-1 sm:mt-0">
                                {exp.duration}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {exp.organization}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              {/* <TabsContent value="settings" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">Account Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your account settings and preferences here.
                    </p>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription>
                        Update your profile information and settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Coming Soon</p>
                        <p className="text-sm text-muted-foreground">
                          Settings functionality will be implemented in a future
                          update.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent> */}

              <TabsContent value="settings" className="space-y-6 p-6">
                  {/* Security Settings */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      <strong>Security</strong> Settings
                    </h2>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="Enter username" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="Enter new password"
                        />
                      </div>
                      <Button className="w-fit">Save</Button>
                    </div>
                  </div>

                  {/* Account Settings */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">
                      <strong>Account</strong> Settings
                    </h2>
                    <div className="grid gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" placeholder="Enter first name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" placeholder="Enter last name" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="Enter city" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" placeholder="Enter country" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          placeholder="Enter full address"
                          rows={3}
                        />
                      </div>

                      {/* Checkboxes */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="profile-visibility" />
                          <Label
                            htmlFor="profile-visibility"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Profile Visibility For Everyone
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="task-notifications" />
                          <Label
                            htmlFor="task-notifications"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            New task notifications
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="friend-request-notifications" />
                          <Label
                            htmlFor="friend-request-notifications"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            New friend request notifications
                          </Label>
                        </div>
                      </div>

                      <Button className="w-fit">Save Changes</Button>
                    </div>
                  </div>
                </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}


// Skill Item Component
function SkillItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-500">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  )
}