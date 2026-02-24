"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  HomeIcon,
  CalendarIcon,
  BookOpenIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  CalendarXIcon,
} from "lucide-react";
import Link from "next/link";

// Types
interface Teacher {
  id: number;
  name: string;
}

interface TimetableItem {
  id: number;
  day: string;
  class: string;
  subject: string;
  subjectCode: string;
  time: string;
  room: string;
}

// Sample data
const teachers: Teacher[] = [
  { id: 1, name: "John Deo" },
  { id: 2, name: "Sarah Smith" },
  { id: 3, name: "Michael Johnson" },
  { id: 4, name: "Emily Wilson" },
  { id: 5, name: "David Brown" },
];

const timetableData: Record<string, TimetableItem[]> = {
  "John Deo": [
    {
      id: 1,
      day: "Monday",
      class: "Class 3(B)",
      subject: "Science",
      subjectCode: "230",
      time: "9:00 AM - 09:45 AM",
      room: "105",
    },
    {
      id: 2,
      day: "Monday",
      class: "Class 1(A)",
      subject: "Math",
      subjectCode: "201",
      time: "10:00 AM - 10:45 AM",
      room: "110",
    },
    {
      id: 3,
      day: "Tuesday",
      class: "Class 2(B)",
      subject: "English",
      subjectCode: "210",
      time: "9:30 AM - 10:00 AM",
      room: "120",
    },
    {
      id: 4,
      day: "Wednesday",
      class: "Class 5(C)",
      subject: "History",
      subjectCode: "220",
      time: "11:00 AM - 11:45 AM",
      room: "115",
    },
    {
      id: 5,
      day: "Thursday",
      class: "Class 4(A)",
      subject: "Geography",
      subjectCode: "240",
      time: "8:30 AM - 9:15 AM",
      room: "125",
    },
    {
      id: 6,
      day: "Friday",
      class: "Class 1(C)",
      subject: "Art",
      subjectCode: "250",
      time: "10:15 AM - 11:00 AM",
      room: "130",
    },
    {
      id: 7,
      day: "Saturday",
      class: "Class 3(A)",
      subject: "Physical Education",
      subjectCode: "260",
      time: "12:00 PM - 12:45 PM",
      room: "140",
    },
  ],
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Day Card Component
interface DayCardProps {
  day: string;
  items: TimetableItem[];
}

const DayCard: React.FC<DayCardProps> = ({ day, items }) => {
  const isSunday = day === "Sunday";
  const isEmpty = items.length === 0;

  return (
    <Card className={`h-full ${isEmpty ? "border-dashed" : ""}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{day}</CardTitle>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <CalendarXIcon className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-sm font-medium">Not Scheduled</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border bg-card p-4 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{item.class}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {item.subject} ({item.subjectCode})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Room {item.room}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function TeacherTimetablePage() {
  const [selectedTeacher, setSelectedTeacher] = useState<string>("John Deo");

  const filteredTimetable = timetableData[selectedTeacher] || [];

  // Group timetable items by day
  const timetableByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = filteredTimetable.filter((item) => item.day === day);
    return acc;
  }, {} as Record<string, TimetableItem[]>);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link
              href="/admin/dashboard/main"
              className="flex items-center gap-1"
            >
              <HomeIcon className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href="/teachers">Teacher</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Teacher Timetable</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Teacher Timetable</h1>
        <p className="text-muted-foreground mt-2">
          View and manage teacher schedules
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Teacher Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Select Teacher</CardTitle>
            <CardDescription>
              Choose a teacher to view their timetable
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Timetable Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Timetable for {selectedTeacher}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {daysOfWeek.map((day) => (
              <DayCard key={day} day={day} items={timetableByDay[day] || []} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
