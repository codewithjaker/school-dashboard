import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Home,
  MapPin,
  Phone,
  Mail,
  User,
  Code,
  BookOpen,
  Settings,
  School,
  Briefcase,
  GraduationCap,
  FileText,
  Flag,
  Save,
  X,
  Building,
  Lock,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function TeacherProfilePage() {
  const teacher = {
    name: "Sarah Smith",
    designation: "Senior Teacher",
    email: "sarah.smith@example.com",
    phone: "264-625-2583",
    location: "456, Estern evenue, Courtage area, New York",
    bio: "Hello I am Sarah Smith, a Senior Teacher at XYZ College. I love to work with all my college staff and senior teachers to create an engaging learning environment.",
    stats: {
      following: 564,
      followers: "18k",
      posts: 565,
    },
    details: {
      gender: "Female",
      lecturesTaken: "11k+",
      degree: "B.A., M.A., P.H.D.",
      designation: "Sr. Teacher",
    },
    skills: [
      { name: "JAVA", percentage: 45, color: "bg-green-500" },
      { name: "PHP", percentage: 38, color: "bg-orange-500" },
      { name: "Angular", percentage: 39, color: "bg-cyan-500" },
      { name: "JavaScript", percentage: 70, color: "bg-purple-500" },
    ],
    education: [
      {
        degree: "B.A., Gujarat University, Ahmedabad, India",
        period: "1996-2000",
        field: "Arts and Humanities",
      },
      {
        degree: "M.A., Gujarat University, Ahmedabad, India",
        period: "2000-2002",
        field: "Education Studies",
      },
      {
        degree: "P.H.D., Shaurashtra University, Rajkot",
        period: "2002-2006",
        field: "Educational Psychology",
      },
    ],
    experience: [
      {
        position: "Jr. Teacher at B. J. Arts College, Ahmedabad",
        period: "April-2009 to March-2010",
      },
      {
        position: "Jr. Teacher at V.S. Arts & Commerce College",
        period: "April-2008 to April-2011",
      },
      {
        position: "Associate Professor at XYZ University",
        period: "May-2011 to June-2018",
      },
      {
        position: "Senior Teacher at ABC International School",
        period: "July-2018 to Present",
      },
    ],
    courses: [
      {
        title: "Introduction to Programming (Python)",
        description: "Undergraduate level • 3 credits • Fall/Spring semesters",
      },
      {
        title: "Data Structures and Algorithms",
        description: "Undergraduate level • 4 credits • Spring semester",
      },
      {
        title: "Web Development (Angular & Node.js)",
        description: "Graduate level • 3 credits • Fall semester",
      },
      {
        title: "Database Management Systems",
        description: "Undergraduate level • 3 credits • Spring semester",
      },
    ],
    publications: [
      {
        title:
          '"Advanced Algorithms for Data Analysis" - Journal of Computer Science, 2022',
        description:
          "Co-authored with Dr. James Wilson and Dr. Maria Rodriguez",
      },
      {
        title:
          '"Machine Learning Applications in Education" - International Conference on AI, 2023',
        description:
          "Presented at the Annual Conference on Educational Technology",
      },
      {
        title:
          '"Optimizing Web Performance with Angular" - Web Development Journal, 2021',
        description: "Featured in the special issue on Modern Web Frameworks",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/admin/dashboard/main"
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/teachers">Teacher</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage
                      src="/assets/images/user/user3.jpg"
                      alt={teacher.name}
                    />
                    <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">{teacher.name}</h2>
                    <p className="text-muted-foreground">
                      {teacher.designation}
                    </p>
                  </div>

                  <div className="space-y-3 w-full">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {teacher.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {teacher.phone}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 w-full mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {teacher.stats.following}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Following
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {teacher.stats.followers}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Followers
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {teacher.stats.posts}
                      </div>
                      <div className="text-xs text-muted-foreground">Posts</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About & Skills Tabs */}
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="about"
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      About
                    </TabsTrigger>
                    <TabsTrigger
                      value="skills"
                      className="flex items-center gap-2"
                    >
                      <Code className="h-4 w-4" />
                      Skills
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="p-6">
                    <p className="text-muted-foreground mb-6">{teacher.bio}</p>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Gender</span>
                        <span className="text-muted-foreground">
                          {teacher.details.gender}
                        </span>
                      </div>

                      <Separator />

                      <div className="flex justify-between">
                        <span className="font-medium">Lectures Taken</span>
                        <span className="text-muted-foreground">
                          {teacher.details.lecturesTaken}
                        </span>
                      </div>

                      <Separator />

                      <div className="flex justify-between">
                        <span className="font-medium">Degree</span>
                        <span className="text-muted-foreground">
                          {teacher.details.degree}
                        </span>
                      </div>

                      <Separator />

                      <div className="flex justify-between">
                        <span className="font-medium">Designation</span>
                        <span className="text-muted-foreground">
                          {teacher.details.designation}
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="skills" className="p-6">
                    <div className="space-y-6">
                      {teacher.skills.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">
                              {skill.name}
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                              {skill.percentage}%
                            </span>
                          </div>
                          <Progress
                            value={skill.percentage}
                            className={`h-2 ${skill.color}`}
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="about-me" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger
                      value="about-me"
                      className="flex items-center gap-2 flex-1"
                    >
                      <User className="h-4 w-4" />
                      About Me
                    </TabsTrigger>
                    <TabsTrigger
                      value="courses"
                      className="flex items-center gap-2 flex-1"
                    >
                      <BookOpen className="h-4 w-4" />
                      Courses & Publications
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="flex items-center gap-2 flex-1"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="about-me" className="space-y-6 p-6">
                    {/* About Me Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          About Me
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Full Name
                            </p>
                            <p className="font-medium">{teacher.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Mobile
                            </p>
                            <p className="font-medium">(123) 456 7890</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Email
                            </p>
                            <p className="font-medium">{teacher.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Location
                            </p>
                            <p className="font-medium">New York, USA</p>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Completed my graduation in Arts from the well known
                            and renowned institution of India – SARDAR PATEL
                            ARTS COLLEGE, BARODA in 2000-01, which was
                            affiliated to M.S. University. I ranked in
                            University exams from the same university from
                            1996-01.
                          </p>
                          <p className="text-muted-foreground">
                            Worked as Professor and Head of the department at
                            Sarda College, Rajkot, Gujarat from 2003-2015.
                          </p>
                          <p className="text-muted-foreground">
                            I specialize in modern teaching methodologies and
                            have been recognized for innovative classroom
                            techniques. My research focuses on educational
                            technology integration and student engagement
                            strategies in higher education.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Education Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <GraduationCap className="h-5 w-5" />
                          Education
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {teacher.education.map((edu, index) => (
                          <div key={index} className="space-y-1">
                            <h3 className="font-semibold">{edu.degree}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{edu.period}</span>
                              <span>•</span>
                              <span>{edu.field}</span>
                            </div>
                            {index < teacher.education.length - 1 && (
                              <Separator className="my-4" />
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Experience Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5" />
                          Experience
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {teacher.experience.map((exp, index) => (
                          <div key={index} className="space-y-1">
                            <h3 className="font-semibold">{exp.position}</h3>
                            {exp.period && (
                              <p className="text-sm text-muted-foreground">
                                {exp.period}
                              </p>
                            )}
                            {index < teacher.experience.length - 1 && (
                              <Separator className="my-4" />
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Courses & Publications Tab */}
                  <TabsContent value="courses" className="p-6">
                    <div className="space-y-8">
                      {/* Courses Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <School className="h-5 w-5 text-blue-600" />
                          <h2 className="text-xl font-bold text-gray-900">
                            Courses Taught
                          </h2>
                        </div>

                        <div className="space-y-6">
                          {teacher.courses.map((course, index) => (
                            <div
                              key={index}
                              className="border-l-4 border-blue-500 pl-4 py-2"
                            >
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {course.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {course.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Publications Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <FileText className="h-5 w-5 text-green-600" />
                          <h2 className="text-xl font-bold text-gray-900">
                            Publications
                          </h2>
                        </div>

                        <div className="space-y-6">
                          {teacher.publications.map((publication, index) => (
                            <div
                              key={index}
                              className="border-l-4 border-green-500 pl-4 py-2"
                            >
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {publication.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {publication.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Security Settings */}
                  <TabsContent value="settings" className="p-6 space-y-6">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-gray-600" />
                        <h3 className="text-lg font-semibold">
                          Security Settings
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="username"
                              defaultValue="sarah.smith"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="current-password">
                            Current Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="current-password"
                              type="password"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="new-password"
                              type="password"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Confirm New Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="confirm-password"
                              type="password"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Button className="flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                          </Button>
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <X className="h-4 w-4" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Account Settings */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-600" />
                        <h3 className="text-lg font-semibold">
                          Account Settings
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="first-name"
                              defaultValue="Sarah"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="last-name"
                              defaultValue="Smith"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="city"
                              defaultValue="New York"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              defaultValue="sarah.smith@example.com"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <div className="relative">
                            <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="country"
                              defaultValue="USA"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <div className="relative">
                            <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <textarea
                              id="address"
                              defaultValue="456, Estern evenue, Courtage area, New York"
                              className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="profile-visibility" defaultChecked />
                          <Label
                            htmlFor="profile-visibility"
                            className="cursor-pointer"
                          >
                            Profile Visibility For Everyone
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="task-notifications" defaultChecked />
                          <Label
                            htmlFor="task-notifications"
                            className="cursor-pointer"
                          >
                            New task notifications
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="friend-requests" />
                          <Label
                            htmlFor="friend-requests"
                            className="cursor-pointer"
                          >
                            New friend request notifications
                          </Label>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
