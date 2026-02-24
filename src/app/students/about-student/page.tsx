import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  MapPin,
  Phone,
  User,
  BarChart3,
  Settings,
  School,
  Trophy,
  Medal,
  Cake,
  BookOpen,
  Building,
  Mail,
  Smartphone,
  Globe,
  Lock,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const metadata: Metadata = {
  title: "Student Profile | Dashboard",
  description: "View student profile and details",
};

interface StudentInfo {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface SocialStat {
  label: string;
  value: string;
  description: string;
}

interface EducationItem {
  id: number;
  institution: string;
  degree?: string;
  icon: React.ReactNode;
}

interface CertificateItem {
  id: number;
  title: string;
  icon: React.ReactNode;
}

export default function StudentProfilePage() {
  const student = {
    name: "Sarah Smith",
    department: "Computer Department",
    fullName: "Emily Smith",
    email: "johndeo@example.com",
    phone: "(123) 456 7890",
    altPhone: "264-625-2583",
    location: "456, Eastern Avenue, Courtage Area, New York",
    country: "India",
    gender: "Female",
    lecturesTaken: "11k+",
    major: "Computer Engineering",
    bio: "Hello I am Sarah Smith a student in Sanjivni College Surat. I love to study with all my class friends and professors.",
    detailedBio: [
      "Open after rule place He earth earth good called days unto which wherein day doesn't said day image signs fish days forth for evening whose his make his bearing years gathering good brought without.",
      "Years living creepeth. Form them yielding behold greater divided void was fowl earth in. Spirit Bring grass they're you have shall years so morning. Grass gathering won't heaven set greater darkness forth abundantly he.",
      "Isn't hath, forth. Brought sea subdue, from divided replenish creature after creeping abundantly fly is cattle fill were years years may darkness blessed which land creepeth good moving good. Life living you're.",
    ],
  };

  const skills = [
    { name: "Study", percentage: 45, color: "bg-green-500" },
    { name: "Cricket", percentage: 38, color: "bg-orange-500" },
    { name: "Music", percentage: 39, color: "bg-cyan-500" },
    { name: "Yoga", percentage: 70, color: "bg-purple-500" },
  ];

  const socialStats: SocialStat[] = [
    { label: "Following", value: "564", description: "People followed" },
    { label: "Followers", value: "18k", description: "Followers count" },
    { label: "Posts", value: "565", description: "Total posts" },
  ];

  const studentInfo: StudentInfo[] = [
    {
      label: "Gender",
      value: student.gender,
      icon: <Cake className="h-4 w-4" />,
    },
    {
      label: "Lectures Taken",
      value: student.lecturesTaken,
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      label: "Department",
      value: student.major,
      icon: <Building className="h-4 w-4" />,
    },
  ];

  const education: EducationItem[] = [
    {
      id: 1,
      institution: "Sarvoday Vidhyalay, Mumbai",
      degree: "Schooling",
      icon: <School className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 2,
      institution: "Bhagvati College Hariyana",
      degree: "Bachelor In Arts",
      icon: <School className="h-5 w-5 text-green-500" />,
    },
  ];

  const certificates: CertificateItem[] = [
    {
      id: 1,
      title: "1st Prize in Music competition",
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    },
    {
      id: 2,
      title: "1st Prize in Acting & Drama",
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    },
    {
      id: 3,
      title: "Gold Medal in Bachelor in Arts",
      icon: <Medal className="h-5 w-5 text-amber-500" />,
    },
  ];

  const contactInfo = [
    { label: "Full Name", value: student.fullName },
    { label: "Mobile", value: student.phone },
    { label: "Email", value: student.email },
    { label: "Location", value: student.country },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <a
            href="/admin/dashboard/main"
            className="hover:text-foreground flex items-center"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </a>
          <span>/</span>
          <span>Student</span>
          <span>/</span>
          <span className="text-foreground font-medium">Profile</span>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight mt-4">Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 border-4 border-background">
                  <AvatarImage
                    src="/assets/images/user/user4.jpg"
                    alt={student.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="mt-4 space-y-1">
                  <h2 className="text-2xl font-bold">{student.name}</h2>
                  <p className="text-muted-foreground">{student.department}</p>
                  <Badge variant="secondary" className="mt-2">
                    Active Student
                  </Badge>
                </div>

                <div className="mt-6 space-y-4 w-full">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-left">{student.location}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{student.altPhone}</span>
                  </div>
                </div>

                {/* Social Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 w-full">
                  {socialStats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About & Skills Tabs */}
          <Card>
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="about" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  About
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Skills
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-4">
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    {student.bio}
                  </p>

                  <div className="space-y-4">
                    {studentInfo.map((info) => (
                      <div
                        key={info.label}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {info.icon}
                          <span className="font-medium">{info.label}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {info.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="skills" className="mt-4">
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Skills information will appear here.
                  </p>
                </CardContent>
              </TabsContent>
              <TabsContent value="skills" className="mt-4">
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="text-sm font-medium">
                          {skill.percentage}%
                        </span>
                      </div>
                      <Progress value={skill.percentage} className="h-2" />
                    </div>
                  ))}
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

              <TabsContent value="about-me" className="space-y-6 p-6">
                {/* About Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">About</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {contactInfo.map((info) => (
                      <div key={info.label}>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {info.label}
                        </p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {student.detailedBio.map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Education Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Education</h2>
                  <div className="space-y-4">
                    {education.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-3 rounded-lg border"
                      >
                        <div className="mt-1">{item.icon}</div>
                        <div>
                          <p className="font-medium">{item.institution}</p>
                          {item.degree && (
                            <p className="text-sm text-muted-foreground">
                              {item.degree}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Certificates Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Certificates</h2>
                  <div className="space-y-3">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="flex items-center gap-3">
                        <div>{cert.icon}</div>
                        <span>{cert.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* <TabsContent value="settings" className="p-6">
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Settings</h3>
                  <p className="text-muted-foreground">
                    Student settings and preferences will appear here.
                  </p>
                </div>
              </TabsContent> */}
              <TabsContent value="settings" className="p-6">
                {/* Security Settings */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-6">
                      <span className="font-normal">Security</span> Settings
                    </h3>

                    <div className="grid gap-4 max-w-md">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="username"
                            className="pl-10"
                            placeholder="Enter username"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="current-password"
                            type="password"
                            className="pl-10"
                            placeholder="Enter current password"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="new-password"
                            type="password"
                            className="pl-10"
                            placeholder="Enter new password"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-2">
                        <Button>Save Changes</Button>
                        <Button variant="outline">Cancel</Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Account Settings */}
                  <div>
                    <h3 className="text-xl font-bold mb-6">
                      <span className="font-normal">Account</span> Settings
                    </h3>

                    <div className="grid gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input
                            id="first-name"
                            placeholder="Enter first name"
                          />
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
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              className="pl-10"
                              placeholder="Enter email"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" placeholder="Enter country" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <textarea
                          id="address"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your address"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember-me" />
                        <label
                          htmlFor="remember-me"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember Me
                        </label>
                      </div>

                      <Button className="w-fit">Save Changes</Button>
                    </div>
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
