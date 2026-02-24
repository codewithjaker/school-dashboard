"use client";

// import AttendanceSheet from "@/components/attendance/attendance-sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home } from "lucide-react";
import Link from "next/link";

// export default function AttendanceSheetPage() {
//   return (
//     <div className="container mx-auto py-6">
//       {/* Breadcrumb */}
//       <div className="mb-6">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <Link
//                   href="/admin/dashboard/main"
//                   className="flex items-center gap-1"
//                 >
//                   <Home className="h-4 w-4" />
//                   Home
//                 </Link>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <Link href="/human-resources">Attendance</Link>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage>Sheet</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//         <h4 className="page-title mt-2 text-2xl font-bold tracking-tight">
//           Attendance Sheet
//         </h4>
//       </div>

//       {/* Main Card */}
//       <Card className="overflow-hidden">
//         <CardHeader>
//           <CardTitle className="text-2xl">Attendance Sheet</CardTitle>
//           <CardDescription>
//             View and manage employee attendance records for the selected period
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="p-0">
//           <AttendanceSheet />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Star, CircleOff } from "lucide-react";
import { Label } from "@/components/ui/label";

interface EmployeeAttendance {
  id: number;
  name: string;
  image: string;
  attendance: {
    [day: number]: "present" | "leave" | "holiday" | "weekend";
  };
}

const attendanceData: EmployeeAttendance[] = [
  {
    id: 1,
    name: "Jacob Ryan",
    image: "/assets/images/user/user1.jpg",
    attendance: {
      1: "present",
      2: "present",
      3: "weekend",
      4: "holiday",
      5: "present",
      6: "present",
      7: "weekend",
      8: "present",
      9: "leave",
      10: "present",
      11: "present",
      12: "weekend",
      13: "weekend",
      14: "present",
      15: "present",
      16: "present",
      17: "leave",
      18: "weekend",
      19: "weekend",
      20: "present",
      21: "present",
      22: "present",
      23: "holiday",
      24: "present",
      25: "weekend",
      26: "weekend",
      27: "present",
      28: "present",
      29: "leave",
      30: "present",
      31: "present",
    },
  },
  {
    id: 2,
    name: "Angelica Ramos",
    image: "/assets/images/user/user2.jpg",
    attendance: {
      1: "present",
      2: "present",
      3: "weekend",
      4: "present",
      5: "leave",
      6: "present",
      7: "weekend",
      8: "present",
      9: "present",
      10: "holiday",
      11: "present",
      12: "weekend",
      13: "weekend",
      14: "present",
      15: "present",
      16: "present",
      17: "present",
      18: "weekend",
      19: "weekend",
      20: "present",
      21: "leave",
      22: "present",
      23: "present",
      24: "present",
      25: "weekend",
      26: "weekend",
      27: "holiday",
      28: "present",
      29: "present",
      30: "present",
      31: "present",
    },
  },
  {
    id: 3,
    name: "Jens Brincker",
    image: "/assets/images/user/user3.jpg",
    attendance: {
      1: "present",
      2: "leave",
      3: "weekend",
      4: "present",
      5: "present",
      6: "present",
      7: "weekend",
      8: "holiday",
      9: "present",
      10: "present",
      11: "leave",
      12: "weekend",
      13: "weekend",
      14: "present",
      15: "present",
      16: "present",
      17: "present",
      18: "weekend",
      19: "weekend",
      20: "holiday",
      21: "present",
      22: "present",
      23: "present",
      24: "leave",
      25: "weekend",
      26: "weekend",
      27: "present",
      28: "present",
      29: "present",
      30: "holiday",
      31: "present",
    },
  },
  {
    id: 4,
    name: "Mark Hay",
    image: "/assets/images/user/user4.jpg",
    attendance: {
      1: "holiday",
      2: "present",
      3: "weekend",
      4: "present",
      5: "present",
      6: "leave",
      7: "weekend",
      8: "present",
      9: "present",
      10: "present",
      11: "present",
      12: "weekend",
      13: "weekend",
      14: "holiday",
      15: "present",
      16: "leave",
      17: "present",
      18: "weekend",
      19: "weekend",
      20: "present",
      21: "present",
      22: "present",
      23: "present",
      24: "holiday",
      25: "weekend",
      26: "weekend",
      27: "present",
      28: "leave",
      29: "present",
      30: "present",
      31: "present",
    },
  },
  {
    id: 5,
    name: "Cara Stevens",
    image: "/assets/images/user/user5.jpg",
    attendance: {
      1: "present",
      2: "present",
      3: "weekend",
      4: "holiday",
      5: "leave",
      6: "present",
      7: "weekend",
      8: "present",
      9: "present",
      10: "present",
      11: "holiday",
      12: "weekend",
      13: "weekend",
      14: "present",
      15: "present",
      16: "present",
      17: "leave",
      18: "weekend",
      19: "weekend",
      20: "present",
      21: "present",
      22: "holiday",
      23: "present",
      24: "present",
      25: "weekend",
      26: "weekend",
      27: "present",
      28: "present",
      29: "leave",
      30: "present",
      31: "present",
    },
  },
  {
    id: 6,
    name: "John Doe",
    image: "/assets/images/user/user6.jpg",
    attendance: {
      1: "present",
      2: "holiday",
      3: "weekend",
      4: "present",
      5: "present",
      6: "present",
      7: "weekend",
      8: "leave",
      9: "present",
      10: "present",
      11: "present",
      12: "weekend",
      13: "weekend",
      14: "holiday",
      15: "present",
      16: "present",
      17: "present",
      18: "weekend",
      19: "weekend",
      20: "leave",
      21: "present",
      22: "present",
      23: "holiday",
      24: "present",
      25: "weekend",
      26: "weekend",
      27: "present",
      28: "present",
      29: "present",
      30: "leave",
      31: "present",
    },
  },
  {
    id: 7,
    name: "Ashton Cox",
    image: "/assets/images/user/user7.jpg",
    attendance: {
      1: "leave",
      2: "present",
      3: "weekend",
      4: "present",
      5: "holiday",
      6: "present",
      7: "weekend",
      8: "present",
      9: "present",
      10: "leave",
      11: "present",
      12: "weekend",
      13: "weekend",
      14: "present",
      15: "holiday",
      16: "present",
      17: "present",
      18: "weekend",
      19: "weekend",
      20: "present",
      21: "present",
      22: "leave",
      23: "present",
      24: "present",
      25: "weekend",
      26: "weekend",
      27: "holiday",
      28: "present",
      29: "present",
      30: "present",
      31: "leave",
    },
  },
  {
    id: 8,
    name: "Sarah Parker",
    image: "/assets/images/user/user8.jpg",
    attendance: {
      1: "present",
      2: "present",
      3: "weekend",
      4: "leave",
      5: "present",
      6: "holiday",
      7: "weekend",
      8: "present",
      9: "present",
      10: "present",
      11: "leave",
      12: "weekend",
      13: "weekend",
      14: "present",
      15: "present",
      16: "holiday",
      17: "present",
      18: "weekend",
      19: "weekend",
      20: "present",
      21: "leave",
      22: "present",
      23: "present",
      24: "holiday",
      25: "weekend",
      26: "weekend",
      27: "present",
      28: "present",
      29: "leave",
      30: "present",
      31: "present",
    },
  },
  {
    id: 9,
    name: "Airi Satou",
    image: "/assets/images/user/user9.jpg",
    attendance: {
      1: "holiday",
      2: "present",
      3: "weekend",
      4: "present",
      5: "present",
      6: "leave",
      7: "weekend",
      8: "present",
      9: "holiday",
      10: "present",
      11: "present",
      12: "weekend",
      13: "weekend",
      14: "leave",
      15: "present",
      16: "present",
      17: "holiday",
      18: "weekend",
      19: "weekend",
      20: "present",
      21: "present",
      22: "leave",
      23: "present",
      24: "present",
      25: "weekend",
      26: "weekend",
      27: "holiday",
      28: "present",
      29: "present",
      30: "leave",
      31: "present",
    },
  },
  {
    id: 10,
    name: "Michael Chen",
    image: "/assets/images/user/user10.jpg",
    attendance: {
      1: "present",
      2: "leave",
      3: "weekend",
      4: "holiday",
      5: "present",
      6: "present",
      7: "weekend",
      8: "present",
      9: "present",
      10: "leave",
      11: "holiday",
      12: "weekend",
      13: "weekend",
      14: "present",
      15: "leave",
      16: "present",
      17: "present",
      18: "weekend",
      19: "weekend",
      20: "holiday",
      21: "present",
      22: "present",
      23: "leave",
      24: "present",
      25: "weekend",
      26: "weekend",
      27: "present",
      28: "holiday",
      29: "present",
      30: "present",
      31: "leave",
    },
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = ["2023", "2024", "2025"];

export default function AttendanceSheetPage() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("November");

  const daysInMonth = 31; // For November 2024

  const getAttendanceIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "leave":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "holiday":
        return <Star className="h-5 w-5 text-amber-500" />;
      case "weekend":
        return <CircleOff className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      present: "bg-green-100 text-green-800 hover:bg-green-100",
      leave: "bg-red-100 text-red-800 hover:bg-red-100",
      holiday: "bg-amber-100 text-amber-800 hover:bg-amber-100",
      weekend: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    };

    return (
      <Badge
        variant="secondary"
        className={variants[status as keyof typeof variants]}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href="/admin/dashboard/main"
                  className="flex items-center gap-1"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/human-resources">Attendance</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Sheet</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h4 className="page-title mt-2 text-2xl font-bold tracking-tight">
          Attendance Sheet
        </h4>
      </div>

      {/* Main Card */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Attendance Sheet</CardTitle>
          <CardDescription>
            View and manage employee attendance records for the selected period
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-6 p-6">
            {/* Filter Form */}
            <div className="rounded-lg border p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="year">Select Year</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger id="year" className="w-full">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="month">Select Month</Label>
                  <Select
                    value={selectedMonth}
                    onValueChange={setSelectedMonth}
                  >
                    <SelectTrigger id="month" className="w-full">
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button className="w-full">Search</Button>
                </div>
              </div>
            </div>

            {/* Filter Info and Legend */}
            <div className="flex flex-col justify-between gap-4 rounded-lg border p-4 md:flex-row">
              <div>
                <p className="text-sm font-medium">
                  Filtered by: Year: {selectedYear} | Month: {selectedMonth}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CircleOff className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">Weekend</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Leave</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Holiday</span>
                </div>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[250px]">
                      Employee Name
                    </TableHead>
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                      (day) => (
                        <TableHead
                          key={day}
                          className="w-12 text-center px-2 py-3"
                        >
                          {day}
                        </TableHead>
                      ),
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={employee.image}
                              alt={employee.name}
                            />
                            <AvatarFallback>
                              {employee.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </TableCell>
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                        (day) => (
                          <TableCell
                            key={day}
                            className="text-center px-2 py-3"
                          >
                            {getAttendanceIcon(
                              employee.attendance[day] || "present",
                            )}
                          </TableCell>
                        ),
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Summary Section */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Present
                    </p>
                    <p className="text-2xl font-bold text-green-600">22</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Leave
                    </p>
                    <p className="text-2xl font-bold text-red-600">3</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Holidays
                    </p>
                    <p className="text-2xl font-bold text-amber-600">2</p>
                  </div>
                  <Star className="h-8 w-8 text-amber-500" />
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Working Days
                    </p>
                    <p className="text-2xl font-bold text-blue-600">26</p>
                  </div>
                  <CircleOff className="h-8 w-8 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
