"use client";

import React, { useState } from "react";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ChevronDown,
  Download,
  Edit,
  Eye,
  Filter,
  Home,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define the data type
export type StaffAttendance = {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  date: Date;
  checkIn: string;
  break: string;
  checkOut: string;
  totalHours: string;
  department: string;
  shift: string;
  attendanceStatus: "present" | "absent" | "late" | "leave";
  avatar: string;
};

// Sample data
const data: StaffAttendance[] = [
  {
    id: "1",
    employeeId: "E12345",
    name: "John Deo",
    designation: "Admin Officer",
    date: new Date(2024, 7, 10),
    checkIn: "10:30",
    break: "01:15",
    checkOut: "19:37",
    totalHours: "08:02",
    department: "Admin",
    shift: "Day",
    attendanceStatus: "present",
    avatar: "/images/user/user1.jpg",
  },
  {
    id: "2",
    employeeId: "E12346",
    name: "Sarah Smith",
    designation: "Library Assistant",
    date: new Date(2024, 7, 10),
    checkIn: "10:32",
    break: "01:00",
    checkOut: "19:30",
    totalHours: "08:10",
    department: "Library",
    shift: "Day",
    attendanceStatus: "absent",
    avatar: "/images/user/user2.jpg",
  },
  {
    id: "3",
    employeeId: "E12347",
    name: "Edna Gilbert",
    designation: "Library Clerk",
    date: new Date(2024, 7, 10),
    checkIn: "10:42",
    break: "01:10",
    checkOut: "19:32",
    totalHours: "08:08",
    department: "Library",
    shift: "Day",
    attendanceStatus: "absent",
    avatar: "/images/user/user3.jpg",
  },
  {
    id: "4",
    employeeId: "E12348",
    name: "Shelia Osterberg",
    designation: "Math Teacher",
    date: new Date(2024, 7, 10),
    checkIn: "10:38",
    break: "01:07",
    checkOut: "19:40",
    totalHours: "08:00",
    department: "Teaching",
    shift: "Day",
    attendanceStatus: "present",
    avatar: "/images/user/user4.jpg",
  },
  {
    id: "5",
    employeeId: "E12349",
    name: "Barbara Garland",
    designation: "English Teacher",
    date: new Date(2024, 7, 10),
    checkIn: "10:33",
    break: "01:15",
    checkOut: "19:30",
    totalHours: "08:01",
    department: "Teaching",
    shift: "Day",
    attendanceStatus: "present",
    avatar: "/images/user/user5.jpg",
  },
  {
    id: "6",
    employeeId: "E12350",
    name: "Sarah Smith",
    designation: "Teaching Assistant",
    // date: "10/08/2024",
    date: new Date(2024, 8, 10),
    checkIn: "10:30",
    break: "01:10",
    checkOut: "19:37",
    totalHours: "08:10",
    department: "Teaching",
    shift: "Day",
    attendanceStatus: "absent",
    avatar: "/images/user/user6.jpg",
  },
  {
    id: "7",
    employeeId: "E12351",
    name: "Marie Brodsky",
    designation: "Sports Coach",
    date: new Date(2024, 8, 10),
    checkIn: "10:32",
    break: "01:05",
    checkOut: "19:40",
    totalHours: "08:00",
    department: "Sport",
    shift: "Day",
    attendanceStatus: "absent",
    avatar: "/images/user/user7.jpg",
  },
  {
    id: "8",
    employeeId: "E12352",
    name: "Kara Thompson",
    designation: "Library Assistant",
    date: new Date(2024, 8, 10),
    checkIn: "10:40",
    break: "01:07",
    checkOut: "19:30",
    totalHours: "08:12",
    department: "Library",
    shift: "Day",
    attendanceStatus: "present",
    avatar: "/images/user/user8.jpg",
  },
  {
    id: "9",
    employeeId: "E12353",
    name: "Joseph Nye",
    designation: "Library Clerk",
    date: new Date(2024, 8, 10),
    checkIn: "10:28",
    break: "01:00",
    checkOut: "19:32",
    totalHours: "08:02",
    department: "Library",
    shift: "Day",
    attendanceStatus: "present",
    avatar: "/images/user/user9.jpg",
  },
  {
    id: "10",
    employeeId: "E12354",
    name: "Ricardo Wendler",
    designation: "Placement Coordinator",
    date: new Date(2024, 8, 10),
    checkIn: "10:38",
    break: "01:15",
    checkOut: "19:37",
    totalHours: "08:00",
    department: "Placement",
    shift: "Day",
    attendanceStatus: "present",
    avatar: "/images/user/user10.jpg",
  },
];

// Define columns
const columns: ColumnDef<StaffAttendance>[] = [
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
    accessorKey: "employeeId",
    header: "Employee ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("employeeId")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Image
          src={row.original.avatar}
          alt={row.getValue("name")}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span>{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">
          {format(row.getValue("date"), "MM/dd/yyyy")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "checkIn",
    header: "Check In",
  },
  {
    accessorKey: "break",
    header: "Break",
  },
  {
    accessorKey: "checkOut",
    header: "Check Out",
  },
  {
    accessorKey: "totalHours",
    header: "Total Hours",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "shift",
    header: "Shift",
  },
  {
    accessorKey: "attendanceStatus",
    header: "Attendance Status",
    cell: ({ row }) => {
      const status = row.getValue("attendanceStatus") as string;
      const variant = {
        present: "default",
        absent: "destructive",
        late: "warning",
        leave: "secondary",
      }[status] as "default" | "destructive" | "warning" | "secondary";

      return (
        <Badge variant={variant} className="capitalize">
          {status}
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

export default function StaffAttendancePage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting data...");
  };

  const handleRefresh = () => {
    // Implement refresh functionality
    console.log("Refreshing data...");
  };

  const handleDeleteSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    // Implement delete functionality
    console.log("Deleting selected rows:", selectedRows);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard/main">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/staff">Staff</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Staff Attendance</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Staff Attendance
          </h1>
          <p className="text-muted-foreground">
            Manage and track staff attendance records
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>
                View and manage staff attendance
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {table.getSelectedRowModel().rows.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Selected ({table.getSelectedRowModel().rows.length}
                      )
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete Selected Records
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        {table.getSelectedRowModel().rows.length} selected
                        records? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteSelected}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-auto sm:flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleRefresh}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refresh</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleExport}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Export to Excel</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Columns
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Table */}
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
                        className="cursor-pointer hover:bg-muted/50"
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
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination & Row Info */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <div className="text-sm font-medium">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </div>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
