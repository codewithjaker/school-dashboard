"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import Link from "next/link";

// Define the data type
interface TimetableItem {
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

// Sample data
const timetableData: TimetableItem[] = [
  {
    time: "08:00",
    monday: "English Studies",
    tuesday: "Lang. Lab / English Studies",
    wednesday: "Physical Education",
    thursday: "French Language",
    friday: "Mathematics",
  },
  {
    time: "08:40",
    monday: "Cultural and Creative Arts",
    tuesday: "Mathematics",
    wednesday: "English Diction",
    thursday: "Mathematics",
    friday: "English Studies",
  },
  {
    time: "09:20",
    monday: "Mathematics",
    tuesday: "English Studies",
    wednesday: "Mathematics",
    thursday: "Social Studies",
    friday: "G.P / Voc. Apt",
  },
  {
    time: "10:00",
    monday: "Break",
    tuesday: "Break",
    wednesday: "Break",
    thursday: "Break",
    friday: "Break",
  },
  {
    time: "10:40",
    monday: "English Studies",
    tuesday: "Mathematics",
    wednesday: "Chinese Language / Creative Writing",
    thursday: "Phonics",
    friday: "Phonetics",
  },
  {
    time: "11:20",
    monday: "Basic Science and Technology",
    tuesday: "Health Education",
    wednesday: "Cultural and Creative Arts",
    thursday: "English Studies",
    friday: "English Studies",
  },
  {
    time: "12:00",
    monday: "Reading Eggs",
    tuesday: "Handwriting / Ind. Reading",
    wednesday: "Mathematics",
    thursday: "Mathematics",
    friday: "Mathematics",
  },
  {
    time: "12:40",
    monday: "ICT",
    tuesday: "News",
    wednesday: "Handwriting / Ind. Reading",
    thursday: "Handwriting / Ind. Reading",
    friday: "Reading Club",
  },
  {
    time: "13:20",
    monday: "Handwriting / Ind. Reading",
    tuesday: "Civic Education",
    wednesday: "English Studies",
    thursday: "Mathematics",
    friday: "Creative Arts",
  },
];

// Define columns
const columns: ColumnDef<TimetableItem>[] = [
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => (
      <div className="font-medium min-w-[100px]">{row.getValue("time")}</div>
    ),
  },
  {
    accessorKey: "monday",
    header: "Monday",
    cell: ({ row }) => (
      <div className="bg-blue-50 p-3 rounded-md min-h-[80px] flex items-center justify-center text-center">
        {row.getValue("monday")}
      </div>
    ),
  },
  {
    accessorKey: "tuesday",
    header: "Tuesday",
    cell: ({ row }) => (
      <div className="bg-green-50 p-3 rounded-md min-h-[80px] flex items-center justify-center text-center">
        {row.getValue("tuesday")}
      </div>
    ),
  },
  {
    accessorKey: "wednesday",
    header: "Wednesday",
    cell: ({ row }) => (
      <div className="bg-yellow-50 p-3 rounded-md min-h-[80px] flex items-center justify-center text-center">
        {row.getValue("wednesday")}
      </div>
    ),
  },
  {
    accessorKey: "thursday",
    header: "Thursday",
    cell: ({ row }) => (
      <div className="bg-purple-50 p-3 rounded-md min-h-[80px] flex items-center justify-center text-center">
        {row.getValue("thursday")}
      </div>
    ),
  },
  {
    accessorKey: "friday",
    header: "Friday",
    cell: ({ row }) => (
      <div className="bg-pink-50 p-3 rounded-md min-h-[80px] flex items-center justify-center text-center">
        {row.getValue("friday")}
      </div>
    ),
  },
];

export default function ClassTimetablePage() {
  const [data] = useState<TimetableItem[]>(timetableData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link
                href="/admin/dashboard/main"
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/class">Class</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Class Timetable</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Class Timetable</h1>
        <p className="text-muted-foreground">
          View and manage the weekly class schedule
        </p>
      </div>

      {/* Timetable Card */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>
            All classes are scheduled from Monday to Friday, 8:00 AM to 1:20 PM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-center font-bold bg-muted/50"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-transparent"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={
                            cell.column.id === "time"
                              ? "font-medium bg-muted/30"
                              : ""
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No timetable data available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Legend */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-300" />
              <span>Monday</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-100 border border-green-300" />
              <span>Tuesday</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-300" />
              <span>Wednesday</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-100 border border-purple-300" />
              <span>Thursday</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-100 border border-pink-300" />
              <span>Friday</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Timetable Notes</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <span>Break times are scheduled from 10:00 to 10:40 daily</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <span>
                  Language Lab sessions alternate with English Studies on
                  Tuesdays
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <span>
                  Creative Writing alternates with Chinese Language on
                  Wednesdays
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <span>Independent Reading sessions are scheduled daily</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
