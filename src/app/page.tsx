"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  GraduationCap,
  Trophy,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  BookOpen,
  Bus,
  TrendingUp,
  UserCircle,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  PieChartIcon,
  BarChartIcon,
  LineChartIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data
const statsData = [
  {
    title: "Total Students",
    value: "2,347",
    change: "+18%",
    icon: GraduationCap,
    color: "bg-blue-500",
  },
  {
    title: "Total Teachers",
    value: "258",
    change: "+21%",
    icon: Users,
    color: "bg-emerald-500",
  },
  {
    title: "Awards",
    value: "27",
    change: "+37%",
    icon: Trophy,
    color: "bg-amber-500",
  },
  {
    title: "Total Earning",
    value: "$25,698",
    change: "+10%",
    icon: DollarSign,
    color: "bg-rose-500",
  },
];

const attendanceData = [
  { name: "Present", value: 342, color: "#10b981" },
  { name: "Absent", value: 18, color: "#ef4444" },
  { name: "Late", value: 24, color: "#f59e0b" },
];

const attendanceSummary = [
  {
    status: "Present",
    count: 342,
    percentage: 89,
    icon: CheckCircle,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    status: "Absent",
    count: 18,
    percentage: 5,
    icon: XCircle,
    color: "bg-rose-100 text-rose-600",
  },
  {
    status: "Late",
    count: 24,
    percentage: 6,
    icon: Clock,
    color: "bg-amber-100 text-amber-600",
  },
];

const upcomingClasses = [
  {
    name: "Cara Stevens",
    subject: "Mathematics",
    date: "12 June '20",
    time: "09:00-10:00",
    avatar: "/avatars/user1.jpg",
  },
  {
    name: "Airi Satou",
    subject: "Computer Studies",
    date: "13 June '20",
    time: "11:00-12:00",
    avatar: "/avatars/user2.jpg",
  },
  {
    name: "Jens Brincker",
    subject: "Geography",
    date: "15 June '20",
    time: "09:30-10:30",
    avatar: "/avatars/user3.jpg",
  },
  {
    name: "Angelica Ramos",
    subject: "Chemistry",
    date: "16 June '20",
    time: "14:00-15:00",
    avatar: "/avatars/user4.jpg",
  },
];

const feeCollectionData = [
  {
    id: "STD1",
    name: "John Doe",
    feeType: "Tuition Fee",
    amount: "$500",
    status: "Paid",
    avatar: "/avatars/user1.jpg",
  },
  {
    id: "2MNY6",
    name: "Alan Gilchrist",
    feeType: "Sports Fee",
    amount: "$100",
    status: "Not Paid",
    avatar: "/avatars/user5.jpg",
  },
  {
    id: "6DKE4",
    name: "Sue Woodger",
    feeType: "Hostel Fee",
    amount: "$500",
    status: "Paid",
    avatar: "/avatars/user6.jpg",
  },
  {
    id: "5DHZ2",
    name: "David Perry",
    feeType: "Activity Fee",
    amount: "$250",
    status: "Not Paid",
    avatar: "/avatars/user7.jpg",
  },
  {
    id: "7KOD5",
    name: "Sneha Pandit",
    feeType: "Miscellaneous",
    amount: "$300",
    status: "Paid",
    avatar: "/avatars/user8.jpg",
  },
];

const professorsData = [
  {
    name: "Jens Brincker",
    department: "Computer",
    gender: "Male",
    degree: "M.Sc., PHD",
    email: "prof@example.com",
    mobile: "1234567890",
    joinDate: "02/25/2018",
    avatar: "/avatars/user1.jpg",
  },
  {
    name: "Mark Hay",
    department: "Mechanical",
    gender: "Female",
    degree: "M.Sc.",
    email: "prof@example.com",
    mobile: "1234567890",
    joinDate: "02/21/2018",
    avatar: "/avatars/user2.jpg",
  },
  {
    name: "Airi Satou",
    department: "Mathematics",
    gender: "Female",
    degree: "M.Sc., P.H.D.",
    email: "prof@example.com",
    mobile: "1234567890",
    joinDate: "03/11/2018",
    avatar: "/avatars/user2.jpg",
  },
];

const topPerformersData = [
  {
    name: "Alice Johnson",
    id: "5001",
    standard: "5th Class",
    percentage: 88.68,
    avatar: "/avatars/user1.jpg",
  },
  {
    name: "Ethan Williams",
    id: "5002",
    standard: "6th Class",
    percentage: 92.42,
    avatar: "/avatars/user2.jpg",
  },
  {
    name: "Mia Thompson",
    id: "5003",
    standard: "7th Class",
    percentage: 89.34,
    avatar: "/avatars/user7.jpg",
  },
  {
    name: "Oliver Martinez",
    id: "5004",
    standard: "8th Class",
    percentage: 78.91,
    avatar: "/avatars/user8.jpg",
  },
];

const eventsData = [
  {
    name: "Annual Sports Day",
    date: "06/20/2023",
    time: "09:00 AM",
    location: "School Ground",
    organizer: "Sports Department",
  },
  {
    name: "Parent-Teacher Meeting",
    date: "06/25/2023",
    time: "10:00 AM",
    location: "School Auditorium",
    organizer: "Administration",
  },
  {
    name: "Science Exhibition",
    date: "05/07/2023",
    time: "11:00 AM",
    location: "Science Block",
    organizer: "Science Department",
  },
];

const admissionsData = [
  {
    id: "ADM-2023-001",
    name: "Emily Johnson",
    grade: "Grade 9",
    date: "01/06/2023",
    status: "Confirmed",
  },
  {
    id: "ADM-2023-002",
    name: "Michael Smith",
    grade: "Grade 5",
    date: "03/06/2023",
    status: "Pending",
  },
  {
    id: "ADM-2023-003",
    name: "Sophia Williams",
    grade: "Grade 7",
    date: "05/06/2023",
    status: "Confirmed",
  },
];

const budgetData = [
  { name: "Staff Salaries", value: 750000, color: "#3b82f6" },
  { name: "Infrastructure", value: 300000, color: "#10b981" },
  { name: "Learning Materials", value: 225000, color: "#06b6d4" },
  { name: "Technology", value: 150000, color: "#f59e0b" },
  { name: "Miscellaneous", value: 75000, color: "#ef4444" },
];

const budgetBreakdown = [
  {
    category: "Staff Salaries",
    amount: "$750,000",
    percentage: 50,
    color: "bg-blue-500",
  },
  {
    category: "Infrastructure",
    amount: "$300,000",
    percentage: 20,
    color: "bg-emerald-500",
  },
  {
    category: "Learning Materials",
    amount: "$225,000",
    percentage: 15,
    color: "bg-cyan-500",
  },
  {
    category: "Technology",
    amount: "$150,000",
    percentage: 10,
    color: "bg-amber-500",
  },
  {
    category: "Miscellaneous",
    amount: "$75,000",
    percentage: 5,
    color: "bg-rose-500",
  },
];

const staffMetrics = [
  { subject: "English", percentage: 76, color: "bg-cyan-500" },
  { subject: "Mathematics", percentage: 67, color: "bg-orange-500" },
  { subject: "Science", percentage: 61, color: "bg-blue-400" },
  { subject: "Arts", percentage: 90, color: "bg-rose-500" },
  { subject: "Sports", percentage: 82, color: "bg-emerald-500" },
];

const monthlyPerformance = [
  { month: "Jan", average: 82 },
  { month: "Feb", average: 84 },
  { month: "Mar", average: 86 },
  { month: "Apr", average: 85 },
  { month: "May", average: 88 },
  { month: "Jun", average: 87 },
];

const popularBooks = [
  { name: "The Mathematics of Life", borrowed: 145 },
  { name: "To Kill a Mockingbird", borrowed: 140 },
  { name: "A Brief History of Time", borrowed: 135 },
  { name: "The Great Gatsby", borrowed: 130 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">School Management Analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-emerald-600">
                        {stat.change} from last month
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Second Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Student Attendance with Pie Chart */}
        <Card className="border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-blue-500" />
                Student Attendance
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Export Data</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Summary Stats */}
              <div className="space-y-4">
                {attendanceSummary.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${item.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">
                          {item.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold">{item.count}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({item.percentage}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Attendance</span>
                    <span className="font-medium">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Fee Collection (unchanged but with subtle card styling) */}
        <Card className="border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Fee Collection</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeCollectionData.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={fee.avatar} />
                            <AvatarFallback>
                              {fee.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{fee.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {fee.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{fee.feeType}</TableCell>
                      <TableCell className="font-medium">
                        {fee.amount}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            fee.status === "Paid" ? "default" : "destructive"
                          }
                        >
                          {fee.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Third Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Classes */}
        <Card className="lg:col-span-1 border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Classes</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px]">
              <div className="space-y-4">
                {upcomingClasses.map((cls, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={cls.avatar} />
                        <AvatarFallback>{cls.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{cls.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {cls.subject}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{cls.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {cls.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Professors List */}
        <Card className="lg:col-span-2 border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Professors List</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Professor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Degree</TableHead>
                    <TableHead>Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {professorsData.map((prof, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={prof.avatar} />
                            <AvatarFallback>
                              {prof.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{prof.name}</p>
                            <Badge variant="outline" className="mt-1">
                              {prof.gender}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{prof.department}</TableCell>
                      <TableCell>{prof.degree}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            <span className="text-sm">{prof.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            <span className="text-sm">{prof.mobile}</span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Fourth Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Performers */}
        <Card className="border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>
              Students with highest academic performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="week">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <TabsContent value="week" className="mt-4">
                <div className="space-y-4">
                  {topPerformersData.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ID: {student.id}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-amber-500">
                          {student.percentage}%
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {student.standard}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Student Performance Chart */}
        <Card className="border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <LineChartIcon className="h-5 w-5 text-blue-500" />
                Student Performance
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="average"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  87.5%
                </p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                  +3.2%
                </p>
                <p className="text-sm text-muted-foreground">Improvement</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                  24
                </p>
                <p className="text-sm text-muted-foreground">Toppers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fifth Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <Card className="border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <CardTitle>Upcoming Events</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              View Calendar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventsData.map((event, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{event.name}</h4>
                      <Badge variant="outline">{event.date}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Organizer: {event.organizer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Admissions */}
        <Card className="border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-blue-500" />
              <CardTitle>Recent Admissions</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {admissionsData.map((admission, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div>
                    <p className="font-medium">{admission.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {admission.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{admission.grade}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={
                          admission.status === "Confirmed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {admission.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {admission.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Total New Admissions</p>
                  <p className="text-sm text-muted-foreground">
                    This Academic Year
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    157
                  </p>
                  <p className="text-sm text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% from last year
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sixth Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Budget Overview with Pie Chart */}
        <Card className="border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-blue-500" />
              Budget Overview
            </CardTitle>
            <div className="text-right">
              <p className="text-2xl font-bold">$1,500,000</p>
              <p className="text-sm text-muted-foreground">Total Budget</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `$${value.toLocaleString()}`}
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Breakdown List */}
              <div className="space-y-3">
                {budgetBreakdown.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.category}</span>
                      <span className="font-medium">{item.amount}</span>
                    </div>
                    <Progress
                      value={item.percentage}
                      className={`h-2 ${item.color}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Remaining Budget
                </p>
                <p className="text-2xl font-bold">$650,000</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Utilization</p>
                <p className="text-2xl font-bold">57%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Staff Performance with Bar Chart */}
        <Card className="border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChartIcon className="h-5 w-5 text-blue-500" />
              Staff Performance Metrics
            </CardTitle>
            <CardDescription>
              Department-wise performance ratings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={staffMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="subject" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="percentage"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  >
                    {staffMetrics.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color.replace("bg-", "#")}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">96%</p>
                <p className="text-sm text-muted-foreground">Top Performer</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600">87%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">8</p>
                <p className="text-sm text-muted-foreground">Departments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seventh Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Library Statistics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <CardTitle>Library Statistics</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold">12,500</p>
                <p className="text-sm text-muted-foreground">Total Books</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold">3,245</p>
                <p className="text-sm text-muted-foreground">Borrowed</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold">187</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold">350</p>
                <p className="text-sm text-muted-foreground">New Books</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Most Popular Books</h4>
              <div className="space-y-2">
                {[
                  "The Mathematics of Life",
                  "To Kill a Mockingbird",
                  "A Brief History of Time",
                  "The Great Gatsby",
                ].map((book, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
                  >
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">{book}</p>
                      <p className="text-sm text-muted-foreground">
                        Borrowed: {145 - index * 5} times
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transportation Management */}
        <Card className="border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Bus className="h-5 w-5 text-blue-500" />
              <CardTitle>Transportation</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              View Routes
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-2 shadow-lg">
                  <Bus className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold">25</p>
                <p className="text-sm text-muted-foreground">Total Buses</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center mb-2 shadow-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-muted-foreground">Routes</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center mb-2 shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold">850</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center mb-2 shadow-lg">
                  <UserCircle className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold">22</p>
                <p className="text-sm text-muted-foreground">Drivers</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Bus Status</h4>
              <div className="space-y-2">
                {[
                  {
                    bus: "Bus #101",
                    route: "North Route",
                    driver: "John Davis",
                    status: "On Route",
                  },
                  {
                    bus: "Bus #102",
                    route: "South Route",
                    driver: "Michael Clark",
                    status: "At School",
                  },
                  {
                    bus: "Bus #103",
                    route: "East Route",
                    driver: "Robert Lewis",
                    status: "Maintenance",
                  },
                  {
                    bus: "Bus #104",
                    route: "West Route",
                    driver: "William Moore",
                    status: "On Route",
                  },
                ].map((bus, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div>
                      <p className="font-medium">{bus.bus}</p>
                      <p className="text-sm text-muted-foreground">
                        {bus.route} • {bus.driver}
                      </p>
                    </div>
                    <Badge
                      variant={
                        bus.status === "On Route"
                          ? "default"
                          : bus.status === "At School"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {bus.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
