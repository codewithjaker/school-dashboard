import { AlertCircle, BookOpen, DollarSign, Users } from "lucide-react";
import { Activity } from "react";

export const enrollmentData = [
  { month: "Jan", students: 4000 },
  { month: "Feb", students: 4200 },
  { month: "Mar", students: 4500 },
  { month: "Apr", students: 4800 },
  { month: "May", students: 5200 },
  { month: "Jun", students: 5800 },
  { month: "Jul", students: 6200 },
  { month: "Aug", students: 7000 },
  { month: "Sep", students: 7500 },
  { month: "Oct", students: 8000 },
  { month: "Nov", students: 8300 },
  { month: "Dec", students: 8452 },
];

export const attendanceData = [
  { department: "Computer Science", attendance: 94 },
  { department: "Engineering", attendance: 88 },
  { department: "Business", attendance: 92 },
  { department: "Medicine", attendance: 96 },
  { department: "Arts", attendance: 85 },
  { department: "Law", attendance: 90 },
];

export const revenueData = [
  { month: "Jan", revenue: 85000 },
  { month: "Feb", revenue: 92000 },
  { month: "Mar", revenue: 98000 },
  { month: "Apr", revenue: 105000 },
  { month: "May", revenue: 112000 },
  { month: "Jun", revenue: 118000 },
  { month: "Jul", revenue: 124580 },
];

export const departmentData = [
  { name: "Computer Science", value: 2400 },
  { name: "Engineering", value: 1800 },
  { name: "Business", value: 2200 },
  { name: "Medicine", value: 1200 },
  { name: "Arts", value: 800 },
  { name: "Law", value: 600 },
];

export const recentActivities = [
  {
    title: "New Student Enrollment",
    description: "John Doe enrolled in Computer Science",
    time: "10 minutes ago",
    status: "completed",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Course Assignment",
    description: 'New course "AI Fundamentals" added',
    time: "1 hour ago",
    status: "completed",
    icon: BookOpen,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Fee Payment",
    description: "Batch payment of $50,000 received",
    time: "2 hours ago",
    status: "completed",
    icon: DollarSign,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "System Maintenance",
    description: "Database optimization in progress",
    time: "4 hours ago",
    status: "in-progress",
    icon: Activity,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Security Alert",
    description: "Multiple failed login attempts detected",
    time: "6 hours ago",
    status: "pending",
    icon: AlertCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
];

export const topCourses = [
  {
    name: "Data Structures",
    department: "Computer Science",
    students: 240,
    averageGrade: 92,
  },
  {
    name: "Business Analytics",
    department: "Business",
    students: 180,
    averageGrade: 89,
  },
  {
    name: "Organic Chemistry",
    department: "Medicine",
    students: 150,
    averageGrade: 87,
  },
  {
    name: "Machine Learning",
    department: "Computer Science",
    students: 210,
    averageGrade: 91,
  },
  {
    name: "Financial Accounting",
    department: "Business",
    students: 190,
    averageGrade: 88,
  },
];

export const studentDemographics = [
  { year: "Freshman", male: 1200, female: 1100 },
  { year: "Sophomore", male: 1000, female: 1050 },
  { year: "Junior", male: 900, female: 950 },
  { year: "Senior", male: 800, female: 850 },
  { year: "Graduate", male: 600, female: 550 },
];
