"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  FileText,
  PieChart,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Briefcase,
  User,
} from "lucide-react";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

import { Progress } from "@/components/ui/progress";
import { AttendanceStats } from "./components/attendance-stats";
import { AttendanceTable } from "./components/attendance-table";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// import { AttendanceStats } from "./attendance-stats";


// Types
interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workingHours: string;
  shift: string;
  status: "present" | "leave" | "weekend";
  isLateCheckIn: boolean;
  isEarlyCheckOut: boolean;
  isShortHours: boolean;
}

interface AttendanceData {
  name: string;
  value: number;
  color: string;
  percentage: string;
  total: number;
}

interface PieGridData {
  name: string;
  value: number;
  percentage: string;
  total: number;
  fill: string;
}

export default function AttendanceDetailPage() {
  const [activeTab, setActiveTab] = useState("details");

  // Attendance data for the main pie chart
  const attendanceData: AttendanceData[] = [
    {
      name: "Present",
      value: 42,
      percentage: "79%",
      total: 42,
      color: "#9370DB",
    },
    {
      name: "On Duty",
      value: 2,
      percentage: "3.8%",
      total: 2,
      color: "#87CEFA",
    },
    {
      name: "Paid Leave",
      value: 5,
      percentage: "9.4%",
      total: 5,
      color: "#FA8072",
    },
    {
      name: "Absent",
      value: 1,
      percentage: "1.9%",
      total: 1,
      color: "#FF7F50",
    },
    {
      name: "Holiday Leave",
      value: 3,
      percentage: "5.7%",
      total: 3,
      color: "#90EE90",
    },
    { name: "Weekend", value: 0, percentage: "0%", total: 0, color: "#9370DB" },
  ];

  // Data for pie grid
  const pieGridData: PieGridData[] = [
    {
      name: "Present",
      value: 79,
      percentage: "79%",
      total: 42,
      fill: "#9370DB",
    },
    {
      name: "On Duty",
      value: 3.8,
      percentage: "3.8%",
      total: 2,
      fill: "#87CEFA",
    },
    {
      name: "Paid Leave",
      value: 9.4,
      percentage: "9.4%",
      total: 5,
      fill: "#FA8072",
    },
    {
      name: "Absent",
      value: 1.9,
      percentage: "1.9%",
      total: 1,
      fill: "#FF7F50",
    },
    {
      name: "Holiday Leave",
      value: 5.7,
      percentage: "5.7%",
      total: 3,
      fill: "#90EE90",
    },
    { name: "Weekend", value: 0, percentage: "0%", total: 0, fill: "#9370DB" },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Mock data - replace with actual API data
  const employee = {
    name: "Maria Smith",
    position: "Software Developer",
    employeeId: "IM062587UT",
    joiningDate: "January 12, 2015",
    department: "Account",
    avatar: "/images/user/user3.jpg",
    avatarFallback: "MS",
  };

  const attendanceStats = {
    avgWorkingHours: "08:00",
    avgInTime: "10:30 AM",
    avgOutTime: "07:30 PM",
    avgBreakTime: "01:00",
  };

  const attendance2Data: AttendanceRecord[] = [
    {
      id: "1",
      date: "10-02-2018",
      checkIn: "10:28",
      checkOut: "19:32",
      workingHours: "08:04",
      shift: "Shift 1",
      status: "present",
      isLateCheckIn: false,
      isEarlyCheckOut: false,
      isShortHours: false,
    },
    {
      id: "2",
      date: "11-02-2018",
      checkIn: "10:32",
      checkOut: "19:32",
      workingHours: "08:00",
      shift: "Shift 1",
      status: "present",
      isLateCheckIn: true,
      isEarlyCheckOut: false,
      isShortHours: false,
    },
    {
      id: "3",
      date: "12-02-2018",
      checkIn: "-",
      checkOut: "-",
      workingHours: "-",
      shift: "Shift 1",
      status: "leave",
      isLateCheckIn: false,
      isEarlyCheckOut: false,
      isShortHours: false,
    },
    {
      id: "4",
      date: "13-02-2018",
      checkIn: "10:35",
      checkOut: "19:31",
      workingHours: "07:56",
      shift: "Shift 1",
      status: "present",
      isLateCheckIn: true,
      isEarlyCheckOut: false,
      isShortHours: true,
    },
    {
      id: "5",
      date: "14-02-2018",
      checkIn: "10:25",
      checkOut: "19:29",
      workingHours: "08:04",
      shift: "Shift 1",
      status: "present",
      isLateCheckIn: false,
      isEarlyCheckOut: true,
      isShortHours: false,
    },
    {
      id: "6",
      date: "15-02-2018",
      checkIn: "-",
      checkOut: "-",
      workingHours: "-",
      shift: "Shift 1",
      status: "weekend",
      isLateCheckIn: false,
      isEarlyCheckOut: false,
      isShortHours: false,
    },
    {
      id: "7",
      date: "16-02-2018",
      checkIn: "-",
      checkOut: "-",
      workingHours: "-",
      shift: "Shift 1",
      status: "weekend",
      isLateCheckIn: false,
      isEarlyCheckOut: false,
      isShortHours: false,
    },
    {
      id: "8",
      date: "17-02-2018",
      checkIn: "10:28",
      checkOut: "19:35",
      workingHours: "08:07",
      shift: "Shift 1",
      status: "present",
      isLateCheckIn: false,
      isEarlyCheckOut: false,
      isShortHours: false,
    },
  ];

  const handleEdit = (id: string) => {
    console.log("Edit record:", id);
    // Implement edit logic
  };

  const handleDelete = (id: string) => {
    console.log("Delete record:", id);
    // Implement delete logic with confirmation
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-4 space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard/main">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/human-resources">
                Human Resources
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/human-resources/attendance">
                Attendance
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Employee Attendance</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Employee Attendance
            </h1>
            <p className="text-muted-foreground">
              View and manage attendance records for employees
            </p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Attendance Details</CardTitle>
            <CardDescription>
              Detailed attendance records for {employee.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                <TabsTrigger
                  value="details"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="chart" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  Chart
                </TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6">
                {/* Employee Info Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage
                          src={employee.avatar}
                          alt={employee.name}
                        />
                        <AvatarFallback className="text-lg">
                          {employee.avatarFallback}
                        </AvatarFallback>
                      </Avatar>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm font-medium text-muted-foreground">
                              Employee Name
                            </p>
                          </div>
                          <p className="text-lg font-semibold">
                            {employee.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {employee.position}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm font-medium text-muted-foreground">
                              Employee ID
                            </p>
                          </div>
                          <p className="text-lg font-semibold">
                            {employee.employeeId}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm font-medium text-muted-foreground">
                              Joining Date
                            </p>
                          </div>
                          <p className="text-lg font-semibold">
                            {employee.joiningDate}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm font-medium text-muted-foreground">
                              Department
                            </p>
                          </div>
                          <p className="text-lg font-semibold">
                            {employee.department}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Cards */}
                <AttendanceStats stats={attendanceStats} />

                {/* Attendance Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Records</CardTitle>
                    <CardDescription>
                      Daily attendance records for the selected period
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AttendanceTable
                      data={attendanceData}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Chart Tab */}
              {/* <TabsContent value="chart" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Analytics</CardTitle>
                    <CardDescription>
                      Visual representation of attendance patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <PieChart className="h-24 w-24 mx-auto text-muted-foreground" />
                      <div>
                        <p className="text-lg font-medium">
                          Chart Visualization
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Attendance charts and analytics will be displayed here
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}
              <TabsContent value="chart" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Attendance Report</h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Main Pie Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Attendance Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                              <Pie
                                data={attendance2Data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {attendance2Data.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                  />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(value, name) => [
                                  `${value} employees (${attendance2Data.find((d) => d.name === name)?.percentage})`,
                                  name,
                                ]}
                              />
                              <Legend />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Pie Grid Cards */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Attendance Breakdown
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px]">
                          <div className="grid h-full grid-cols-2 gap-4 md:grid-cols-3">
                            {pieGridData.map((item, index) => (
                              <Card
                                key={index}
                                className="relative overflow-hidden"
                              >
                                <CardContent className="flex flex-col items-center justify-center p-4">
                                  <div className="relative mb-2">
                                    <div
                                      className="h-16 w-16 rounded-full border-4"
                                      style={{ borderColor: item.fill }}
                                    >
                                      <div className="flex h-full items-center justify-center">
                                        <span className="text-sm font-bold">
                                          {item.percentage}
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      className="absolute inset-0 rounded-full"
                                      style={{
                                        background: `conic-gradient(${item.fill} ${item.value}%, transparent ${item.value}%)`,
                                      }}
                                    />
                                  </div>
                                  <h4 className="text-center text-sm font-medium">
                                    {item.name}
                                  </h4>
                                  <p className="text-center text-xs text-muted-foreground">
                                    Total: {item.total}
                                  </p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Summary Statistics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Attendance Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {attendanceData.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-sm font-medium">
                                {item.name}
                              </span>
                            </div>
                            <span className="text-sm font-medium">
                              {item.value} employees ({item.percentage})
                            </span>
                          </div>
                          <Progress
                            value={parseFloat(item.percentage)}
                            className="h-2"
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
