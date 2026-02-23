"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Calendar,
  Clock,
  Home,
  Users,
  BookOpen,
  BarChart3,
  TrendingUp,
  Bell,
  MessageSquare,
  FileText,
  Edit,
  Trash2,
  MoreVertical,
  ChevronRight,
  Trophy,
  Target,
  CheckCircle,
  XCircle,
  Clock4,
  PieChart,
  LineChart,
  CalendarDays,
  Mail,
  AlertCircle,
  Megaphone,
  Download,
  Printer,
} from "lucide-react";

// Charts
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Mock Data
const monthlyLectureData = [
  { month: "Jan", lectures: 65 },
  { month: "Feb", lectures: 72 },
  { month: "Mar", lectures: 58 },
  { month: "Apr", lectures: 79 },
  { month: "May", lectures: 63 },
  { month: "Jun", lectures: 82 },
  { month: "Jul", lectures: 90 },
  { month: "Aug", lectures: 68 },
];

const subjectData = [
  { name: "Science", value: 44, color: "#008ffb" },
  { name: "Mathematics", value: 55, color: "#00e396" },
  { name: "Economics", value: 13, color: "#feb019" },
  { name: "History", value: 43, color: "#ff4560" },
  { name: "Music", value: 22, color: "#775dd0" },
];

const todaysClasses = [
  {
    time: "08:00 - 09:30",
    subject: "Mathematics",
    room: "Room 101",
    status: "completed",
  },
  {
    time: "10:00 - 11:30",
    subject: "Science",
    room: "Lab 3",
    status: "ongoing",
  },
  {
    time: "13:00 - 14:30",
    subject: "English Literature",
    room: "Room 203",
    status: "upcoming",
  },
  {
    time: "15:00 - 16:30",
    subject: "History",
    room: "Room 105",
    status: "upcoming",
  },
];

const todaysLectures = [
  {
    subject: "Business Studies",
    standard: "Standard 12",
    time: "10:30 AM",
    duration: "45 Min",
  },
  {
    subject: "Chemistry",
    standard: "Standard 11",
    time: "11:15 AM",
    duration: "30 Min",
  },
  {
    subject: "Biology",
    standard: "Standard 12",
    time: "12:00 PM",
    duration: "35 Min",
  },
  {
    subject: "Physics",
    standard: "Standard 11",
    time: "12:45 PM",
    duration: "30 Min",
  },
];

const studentProgress = [
  { name: "John Smith", subject: "Mathematics", progress: 85, grade: "A" },
  { name: "Emily Johnson", subject: "Science", progress: 92, grade: "A+" },
  { name: "Michael Brown", subject: "English", progress: 78, grade: "B+" },
  { name: "Sarah Davis", subject: "History", progress: 65, grade: "C+" },
  { name: "David Wilson", subject: "Physics", progress: 88, grade: "A-" },
];

const attendanceData = [
  { name: "Present", value: 85, color: "#4CAF50" },
  { name: "Absent", value: 10, color: "#F44336" },
  { name: "Late", value: 5, color: "#FF9800" },
];

const weeklySchedule = [
  {
    day: "Monday",
    date: "Feb 9",
    classes: [
      {
        time: "8:30 AM",
        subject: "Mathematics",
        duration: "1h",
        room: "Room 101",
        grade: "Grade 10A",
      },
      {
        time: "10:00 AM",
        subject: "Physics",
        duration: "1h",
        room: "Room 203",
        grade: "Grade 11B",
      },
      {
        time: "1:00 PM",
        subject: "Computer Science",
        duration: "1h 30m",
        room: "Lab 3",
        grade: "Grade 12C",
      },
    ],
  },
  {
    day: "Tuesday",
    date: "Feb 10",
    classes: [
      {
        time: "9:00 AM",
        subject: "Chemistry",
        duration: "1h 30m",
        room: "Lab 2",
        grade: "Grade 11A",
      },
      {
        time: "11:00 AM",
        subject: "English Literature",
        duration: "1h",
        room: "Room 105",
        grade: "Grade 10B",
      },
    ],
  },
];

const topStudents = [
  {
    rank: 1,
    name: "Emma Thompson",
    score: 98,
    subject: "Mathematics",
    improvement: "+5%",
  },
  {
    rank: 2,
    name: "James Wilson",
    score: 96,
    subject: "Science",
    improvement: "+3%",
  },
  {
    rank: 3,
    name: "Sophia Garcia",
    score: 95,
    subject: "English",
    improvement: "+7%",
  },
  {
    rank: 4,
    name: "Liam Johnson",
    score: 93,
    subject: "History",
    improvement: "+2%",
  },
  {
    rank: 5,
    name: "Olivia Brown",
    score: 91,
    subject: "Art",
    improvement: "+4%",
  },
];

const messages = [
  {
    type: "announcement",
    title: "Staff Meeting Reminder",
    sender: "Principal Johnson",
    date: "Yesterday",
    priority: "high",
    unread: false,
  },
  {
    type: "announcement",
    title: "New Grading System Update",
    sender: "IT Department",
    date: "2 days ago",
    priority: "medium",
    unread: false,
  },
  {
    type: "message",
    title: "Parent-Teacher Conference Schedule",
    sender: "Vice Principal Smith",
    date: "3 days ago",
    priority: "medium",
    unread: true,
  },
];

const progressChartData = [
  {
    month: "January",
    Mathematics: 85,
    Science: 78,
    English: 62,
    History: 79,
    Art: 42,
  },
  {
    month: "February",
    Mathematics: 71,
    Science: 91,
    English: 56,
    History: 74,
    Art: 51,
  },
  {
    month: "March",
    Mathematics: 79,
    Science: 71,
    English: 68,
    History: 62,
    Art: 39,
  },
  {
    month: "April",
    Mathematics: 62,
    Science: 74,
    English: 59,
    History: 68,
    Art: 34,
  },
];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Home className="h-4 w-4" />
          <ChevronRight className="h-3 w-3" />
          <span>Dashboard</span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-gray-900">Teacher Dashboard</span>
        </nav>
      </div>

      {/* Welcome Banner */}
      <Card className="mb-6 overflow-hidden border-none bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, <span className="text-blue-600">Ashton Cox!</span>
              </h1>
              <p className="text-gray-600 max-w-2xl">
                We would like to take this opportunity to welcome you to our
                practice and to thank you for choosing our physicians to
                participate in your healthcare. We look forward to providing you
                with personalized, comprehensive health care focusing on
                wellness and prevention.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="w-48 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-blue-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Average Lecture Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Average Lecture Per Month</CardTitle>
              <CardDescription>Monthly lecture statistics</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={monthlyLectureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="lectures"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subject Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {subjectData.map((subject) => (
                <div
                  key={subject.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="text-sm">{subject.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">
                      {subject.value}%
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        subject.value > 30
                          ? "text-green-600 border-green-200"
                          : "text-amber-600 border-amber-200"
                      }
                    >
                      {subject.value > 30 ? "+12%" : "-12%"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule & Lectures */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Today's Class Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today's Class Schedule</CardTitle>
              <CardDescription>Your classes for today</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {todaysClasses.map((cls, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      cls.status === "completed"
                        ? "bg-gray-50 border-gray-200"
                        : cls.status === "ongoing"
                          ? "bg-blue-50 border-blue-200"
                          : "bg-green-50 border-green-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Clock className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium">
                            {cls.time}
                          </span>
                          <Badge
                            className={`ml-3 ${
                              cls.status === "completed"
                                ? "bg-gray-500"
                                : cls.status === "ongoing"
                                  ? "bg-blue-500"
                                  : "bg-green-500"
                            }`}
                          >
                            {cls.status}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-gray-900">
                          {cls.subject}
                        </h4>
                        <p className="text-sm text-gray-500">{cls.room}</p>
                      </div>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Today's Lectures */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today's Lecture</CardTitle>
              <CardDescription>Upcoming lectures schedule</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-medium">
                        Subject Name
                      </th>
                      <th className="text-left p-4 font-medium">Standard</th>
                      <th className="text-left p-4 font-medium">Time</th>
                      <th className="text-left p-4 font-medium">Duration</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todaysLectures.map((lecture, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="font-medium">{lecture.subject}</div>
                        </td>
                        <td className="p-4">{lecture.standard}</td>
                        <td className="p-4">{lecture.time}</td>
                        <td className="p-4">{lecture.duration}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button size="icon" variant="ghost">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Progress & Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Student Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {studentProgress.map((student, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-gray-500">
                          {student.subject}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">
                          {student.progress}%
                        </span>
                        <div className="text-sm text-gray-500">
                          Grade: {student.grade}
                        </div>
                      </div>
                    </div>
                    <Progress value={student.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Attendance Overview</CardTitle>
            <select className="text-sm border rounded px-3 py-1">
              <option>Grade 10A</option>
              <option>Grade 11B</option>
              <option>Grade 12C</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
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
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {attendanceData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="text-2xl font-bold">{item.value}%</div>
                  <div className="text-sm text-gray-500">{item.name}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              Total Students: 100
            </div>
          </CardContent>
        </Card>

        {/* Quick Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                {[
                  "#FFF59D",
                  "#FFCC80",
                  "#EF9A9A",
                  "#C5E1A5",
                  "#81D4FA",
                  "#CE93D8",
                ].map((color) => (
                  <button
                    key={color}
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="relative">
                <textarea
                  placeholder="Add a new note..."
                  className="w-full h-24 p-3 border rounded-lg resize-none"
                />
                <Button className="absolute bottom-3 right-3">Add Note</Button>
              </div>
            </div>
            <ScrollArea className="h-[280px] mt-4">
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p>Welcome to Quick Notes! 📝</p>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                    <span>Jan 19, 09:45 PM</span>
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost" className="h-6 w-6">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Schedule & Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Weekly Class Schedule
            </CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <Accordion type="multiple" className="w-full">
                {weeklySchedule.map((day) => (
                  <AccordionItem key={day.day} value={day.day}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center">
                          <span className="font-medium">{day.day}</span>
                          <span className="ml-3 text-sm text-gray-500">
                            {day.date}
                          </span>
                        </div>
                        <Badge variant="secondary">
                          {day.classes.length} Classes
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {day.classes.map((cls, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-start">
                              <div className="mr-4 text-center">
                                <div className="font-medium">{cls.time}</div>
                                <div className="text-sm text-gray-500">
                                  {cls.duration}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center mb-1">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                    <BookOpen className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <h4 className="font-medium">{cls.subject}</h4>
                                </div>
                                <div className="text-sm text-gray-500 space-y-1">
                                  <div className="flex items-center">
                                    <Users className="h-3 w-3 mr-1" />
                                    {cls.grade}
                                  </div>
                                  <div className="flex items-center">
                                    <Home className="h-3 w-3 mr-1" />
                                    {cls.room}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Student Progress Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Student Progress</CardTitle>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={progressChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Mathematics"
                    stroke="#4CAF50"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Science"
                    stroke="#2196F3"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="English"
                    stroke="#FF9800"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="History"
                    stroke="#E91E63"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Art"
                    stroke="#9C27B0"
                    strokeWidth={2}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Students & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Students */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5" />
              Top Performing Students
            </CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {topStudents.map((student) => (
                  <div
                    key={student.rank}
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                        student.rank === 1
                          ? "bg-yellow-100 text-yellow-800"
                          : student.rank === 2
                            ? "bg-gray-100 text-gray-800"
                            : student.rank === 3
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {student.rank}
                    </div>
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{student.name}</h4>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {student.score}%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{student.subject}</span>
                        <span className="text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {student.improvement}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Center */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              Message Center
              <Badge className="ml-2 bg-red-500">3</Badge>
            </CardTitle>
            <Button size="icon" variant="ghost">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${msg.unread ? "bg-blue-50 border-blue-200" : ""}`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`p-2 rounded-full mr-3 ${
                          msg.type === "announcement"
                            ? "bg-purple-100 text-purple-600"
                            : msg.type === "alert"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {msg.type === "announcement" ? (
                          <Megaphone className="h-4 w-4" />
                        ) : msg.type === "alert" ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : (
                          <Mail className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{msg.title}</h4>
                          <Badge
                            variant={
                              msg.priority === "high"
                                ? "destructive"
                                : msg.priority === "medium"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {msg.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{msg.sender}</span>
                          <span>{msg.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
