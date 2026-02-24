"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Home,
  Search,
  Plus,
  RefreshCw,
  Download,
  Filter,
  Edit,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

export type AssignTeacher = {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherImage: string;
  classId: string;
  className: string;
  subject: string;
  assignmentStatus: "Active" | "Inactive";
  academicYear: string;
  classTiming: string;
  roomNumber: string;
};

const columns: ColumnDef<AssignTeacher>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    accessorKey: "teacherId",
    header: "Teacher ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("teacherId")}</div>
    ),
  },
  {
    accessorKey: "teacherName",
    header: "Teacher Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={row.original.teacherImage}
            alt={row.original.teacherName}
          />
          <AvatarFallback>
            {row.original.teacherName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span>{row.original.teacherName}</span>
      </div>
    ),
  },
  {
    accessorKey: "classId",
    header: "Class ID",
  },
  {
    accessorKey: "className",
    header: "Class Name",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "assignmentStatus",
    header: "Assignment Status",
    cell: ({ row }) => {
      const status = row.getValue("assignmentStatus") as "Active" | "Inactive";
      return (
        <Badge
          variant={status === "Active" ? "default" : "secondary"}
          className={
            status === "Active"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-orange-100 text-orange-800 hover:bg-orange-100"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "academicYear",
    header: "Academic Year",
  },
  {
    accessorKey: "classTiming",
    header: "Class Timing",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.getValue("classTiming")}
      </div>
    ),
  },
  {
    accessorKey: "roomNumber",
    header: "Room No",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const assignment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Mock data - replace with actual data fetching
const assignments = [
  {
    id: "1",
    teacherId: "T1001",
    teacherName: "John Doe",
    teacherImage: "/assets/images/user/user1.jpg",
    classId: "C101",
    className: "Grade 10 Science",
    subject: "Physics",
    assignmentStatus: "Active" as const,
    academicYear: "2024-2025",
    classTiming: "Monday, Wednesday, Friday - 10:00 AM to 11:30 AM",
    roomNumber: "101",
  },
  {
    id: "2",
    teacherId: "T1002",
    teacherName: "Jane Smith",
    teacherImage: "/assets/images/user/user2.jpg",
    classId: "C102",
    className: "Grade 9 Math",
    subject: "Mathematics",
    assignmentStatus: "Active" as const,
    academicYear: "2024-2025",
    classTiming: "Tuesday, Thursday - 9:00 AM to 10:30 AM",
    roomNumber: "102",
  },
  {
    id: "3",
    teacherId: "T1003",
    teacherName: "Emily Green",
    teacherImage: "/assets/images/user/user3.jpg",
    classId: "C103",
    className: "Grade 11 English",
    subject: "English Literature",
    assignmentStatus: "Inactive" as const,
    academicYear: "2024-2025",
    classTiming: "Monday, Wednesday - 1:00 PM to 2:30 PM",
    roomNumber: "103",
  },
  {
    id: "4",
    teacherId: "T1004",
    teacherName: "Michael Brown",
    teacherImage: "/assets/images/user/user4.jpg",
    classId: "C104",
    className: "Grade 12 History",
    subject: "History",
    assignmentStatus: "Active" as const,
    academicYear: "2024-2025",
    classTiming: "Monday, Friday - 3:00 PM to 4:30 PM",
    roomNumber: "104",
  },
  {
    id: "5",
    teacherId: "T1005",
    teacherName: "Sophie Taylor",
    teacherImage: "/assets/images/user/user5.jpg",
    classId: "C105",
    className: "Grade 10 Chemistry",
    subject: "Chemistry",
    assignmentStatus: "Active" as const,
    academicYear: "2024-2025",
    classTiming: "Tuesday, Thursday - 11:00 AM to 12:30 PM",
    roomNumber: "105",
  },
];

export default function AssignClassTeacherPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  
    const table = useReactTable({
      data:assignments,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        rowSelection,
      },
    });
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard/main">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/teachers">Teacher</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Assign Teacher</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assign Teacher</h1>
          <p className="text-muted-foreground">
            Manage teacher assignments to classes
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Assign Class Teacher</CardTitle>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem checked>
                    Teacher ID
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Teacher Name
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Class ID
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Class Name
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Subject
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Assignment Status
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Academic Year
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Class Timing
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Room No
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Add</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Refresh</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Xlsx Download</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search assignments..." className="pl-8" />
          </div>

          {/* Table Component */}
          {/* <AssignClassTeacherTable data={assignments} /> */}
              <div>
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
                            header.getContext()
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
                        cell.getContext()
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

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
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
    </div>
        </CardContent>
      </Card>
    </div>
  );
}
