"use client";

import * as React from "react";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Calendar,
  Edit,
  Eye,
  MoreHorizontal,
  Home,
  Download,
  RefreshCw,
  Plus,
  Filter,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { HostelAttendance } from "@/app/admin/hostel/attendance/page";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const columns: ColumnDef<HostelAttendance>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "studentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={student.studentImage} alt={student.studentName} />
            <AvatarFallback>
              {student.studentName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{student.studentName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "rollNo",
    header: "Roll No",
    cell: ({ row }) => (
      <div className="font-mono">{row.getValue("rollNo")}</div>
    ),
  },
  {
    accessorKey: "hostelName",
    header: "Hostel Name",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-normal">
        {row.getValue("hostelName")}
      </Badge>
    ),
  },
  {
    accessorKey: "roomNo",
    header: "Room No",
  },
  {
    accessorKey: "attendanceDate",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("attendanceDate"));
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(date, "MM/dd/yyyy")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = {
        present: "default",
        absent: "destructive",
        late: "outline",
      }[status] as "default" | "destructive" | "outline";

      const label = {
        present: "Present",
        absent: "Absent",
        late: "Late",
      }[status];

      return (
        <Badge variant={variant} className="capitalize">
          {label}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
        >
          <Edit className="h-4 w-4" />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                student record and remove their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ),
  },
];

// Types
export interface HostelAttendance {
  id: string;
  studentName: string;
  rollNo: string;
  hostelName: string;
  roomNo: string;
  attendanceDate: Date;
  status: "present" | "absent" | "late";
  studentImage?: string;
}

// Mock data
const attendanceData: HostelAttendance[] = [
  {
    id: "1",
    studentName: "John Doe",
    rollNo: "101",
    hostelName: "Sunrise Hostel",
    roomNo: "101",
    attendanceDate: new Date("2025-01-20"),
    status: "present",
    studentImage: "/placeholder.svg",
  },
  {
    id: "2",
    studentName: "Jane Smith",
    rollNo: "102",
    hostelName: "Sunrise Hostel",
    roomNo: "102",
    attendanceDate: new Date("2025-01-20"),
    status: "absent",
    studentImage: "/placeholder.svg",
  },
  {
    id: "3",
    studentName: "Robert Brown",
    rollNo: "103",
    hostelName: "Sunset Villa",
    roomNo: "201",
    attendanceDate: new Date("2025-01-20"),
    status: "present",
    studentImage: "/placeholder.svg",
  },
  {
    id: "4",
    studentName: "Emily Davis",
    rollNo: "104",
    hostelName: "Sunset Villa",
    roomNo: "202",
    attendanceDate: new Date("2025-01-20"),
    status: "late",
    studentImage: "/placeholder.svg",
  },
  {
    id: "5",
    studentName: "Michael Wilson",
    rollNo: "105",
    hostelName: "Sunrise Hostel",
    roomNo: "103",
    attendanceDate: new Date("2025-01-20"),
    status: "present",
    studentImage: "/placeholder.svg",
  },
  {
    id: "6",
    studentName: "Sarah Parker",
    rollNo: "106",
    hostelName: "Sunrise Hostel",
    roomNo: "104",
    attendanceDate: new Date("2025-01-21"),
    status: "present",
    studentImage: "/placeholder.svg",
  },
  {
    id: "7",
    studentName: "David Lee",
    rollNo: "107",
    hostelName: "Sunset Villa",
    roomNo: "203",
    attendanceDate: new Date("2025-01-21"),
    status: "absent",
    studentImage: "/placeholder.svg",
  },
  {
    id: "8",
    studentName: "Emma Watson",
    rollNo: "108",
    hostelName: "Sunset Villa",
    roomNo: "204",
    attendanceDate: new Date("2025-01-21"),
    status: "present",
    studentImage: "/placeholder.svg",
  },
  {
    id: "9",
    studentName: "Chris Evans",
    rollNo: "109",
    hostelName: "Sunrise Hostel",
    roomNo: "105",
    attendanceDate: new Date("2025-01-22"),
    status: "present",
    studentImage: "/placeholder.svg",
  },
  {
    id: "10",
    studentName: "Jessica Alba",
    rollNo: "110",
    hostelName: "Sunset Villa",
    roomNo: "205",
    attendanceDate: new Date("2025-01-22"),
    status: "late",
    studentImage: "/placeholder.svg",
  },
];

export default function HostelAttendancePage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: attendanceData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/hostel">Hostel</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Attendance</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Hostel Attendance
            </h1>
            <p className="text-muted-foreground">
              Manage and track student attendance in hostels
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Present</CardTitle>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              6
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">60%</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Absent</CardTitle>
            <Badge
              variant="outline"
              className="bg-red-50 text-red-700 border-red-200"
            >
              2
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20%</div>
            <p className="text-xs text-muted-foreground">-1 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Entries</CardTitle>
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-700 border-amber-200"
            >
              2
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20%</div>
            <p className="text-xs text-muted-foreground">Same as yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Badge variant="outline">10</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 Hostels</div>
            <p className="text-xs text-muted-foreground">Across all rooms</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Attendance Records</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-8 w-[200px] lg:w-[300px]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem checked>
                    Student Name
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Roll No
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Hostel Name
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Room No
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Date
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Status
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="present">Present</TabsTrigger>
              <TabsTrigger value="absent">Absent</TabsTrigger>
              <TabsTrigger value="late">Late</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* <HostelAttendanceTable data={attendanceData} /> */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
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
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Icons
const Search = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
