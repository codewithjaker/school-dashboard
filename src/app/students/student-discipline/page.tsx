"use client";

import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home,
  Search,
  PlusCircle,
  RefreshCw,
  Download,
  Filter,
  Trash2,
  Calendar,
  Edit,
  MoreVertical,
} from "lucide-react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type StudentDiscipline = {
  id: string;
  studentName: string;
  studentImage: string;
  incidentDate: string;
  incidentType: string;
  severity: "Low" | "Medium" | "High";
  location: string;
  reportedBy: string;
  actionTaken: string;
  status: "Resolved" | "Active" | "Pending";
};

const data: StudentDiscipline[] = [
  {
    id: "1",
    studentName: "John Doe",
    studentImage: "/api/placeholder/40/40",
    incidentDate: "12/05/2023",
    incidentType: "Late Coming",
    severity: "Low",
    location: "Main Gate",
    reportedBy: "Gatekeeper",
    actionTaken: "Warning",
    status: "Resolved",
  },
  {
    id: "2",
    studentName: "Sarah Smith",
    studentImage: "/api/placeholder/40/40",
    incidentDate: "11/20/2023",
    incidentType: "Bullying",
    severity: "High",
    location: "Playground",
    reportedBy: "Teacher Sarah",
    actionTaken: "Suspension",
    status: "Active",
  },
  {
    id: "3",
    studentName: "Michael Brown",
    studentImage: "/api/placeholder/40/40",
    incidentDate: "10/15/2023",
    incidentType: "Cheating",
    severity: "High",
    location: "Exam Hall",
    reportedBy: "Invigilator",
    actionTaken: "Exam Cancellation",
    status: "Resolved",
  },
  {
    id: "4",
    studentName: "Emily Davis",
    studentImage: "/api/placeholder/40/40",
    incidentDate: "09/10/2023",
    incidentType: "Uniform Violation",
    severity: "Low",
    location: "Classroom",
    reportedBy: "Class Teacher",
    actionTaken: "Fine",
    status: "Resolved",
  },
  {
    id: "5",
    studentName: "David Wilson",
    studentImage: "/api/placeholder/40/40",
    incidentDate: "08/25/2023",
    incidentType: "Damaging Property",
    severity: "Medium",
    location: "Lab",
    reportedBy: "Lab Assistant",
    actionTaken: "Repair Cost",
    status: "Pending",
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Low":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "High":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Resolved":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Active":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "Pending":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const columns: ColumnDef<StudentDiscipline>[] = [
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
    accessorKey: "studentName",
    header: "Student Name",
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
    accessorKey: "incidentDate",
    header: "Incident Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {row.getValue("incidentDate")}
      </div>
    ),
  },
  {
    accessorKey: "incidentType",
    header: "Incident Type",
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const severity = row.getValue("severity") as string;
      return (
        <Badge className={getSeverityColor(severity)} variant="secondary">
          {severity}
        </Badge>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "reportedBy",
    header: "Reported By",
  },
  {
    accessorKey: "actionTaken",
    header: "Action Taken",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge className={getStatusColor(status)} variant="secondary">
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(student.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function StudentDisciplinePage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
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
      {/* Header Section */}
      <div>
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <a
                href="/admin/dashboard/main"
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
              </a>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <a href="#">Student</a>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Discipline</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Student Discipline
          </h1>
        </div>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-2xl">Student Discipline</CardTitle>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-9 w-full sm:w-[200px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600 hover:text-green-700"
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
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

            {/* Pagination and Row Selection Info */}
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
