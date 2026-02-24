// app/academics/assignment/page.tsx

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Edit,
  Trash2,
  Filter,
  Eye,
  Download,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
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

export type Assignment = {
  id: string;
  className: string;
  subject: string;
  teacher: string;
  title: string;
  deadline: Date;
  details: string;
  assignmentDate: Date;
  status: "published" | "draft";
};

// Mock data - replace with actual data fetching
const assignments: Assignment[] = [
  {
    id: "1",
    className: "Class 1",
    subject: "Mathematics",
    teacher: "John Doe",
    title: "Algebra Basics",
    deadline: new Date("2023-10-10"),
    details: "Solve exercises 1 to 10.",
    assignmentDate: new Date("2023-10-01"),
    status: "published",
  },
  {
    id: "2",
    className: "Class 2",
    subject: "Science",
    teacher: "Jane Smith",
    title: "Photosynthesis",
    deadline: new Date("2023-12-10"),
    details: "Draw a diagram of photosynthesis.",
    assignmentDate: new Date("2023-02-10"),
    status: "draft",
  },
  {
    id: "3",
    className: "Class 3",
    subject: "English",
    teacher: "Alice Brown",
    title: "Essay Writing",
    deadline: new Date("2023-10-15"),
    details: "Write an essay on environment.",
    assignmentDate: new Date("2023-03-10"),
    status: "published",
  },
  {
    id: "4",
    className: "Class 4",
    subject: "History",
    teacher: "Bob White",
    title: "Ancient Civilizations",
    deadline: new Date("2023-10-20"),
    details: "Research about Indus Valley.",
    assignmentDate: new Date("2023-04-10"),
    status: "published",
  },
  {
    id: "5",
    className: "Class 5",
    subject: "Geography",
    teacher: "Charlie Green",
    title: "Map Reading",
    deadline: new Date("2023-10-22"),
    details: "Identify major rivers in India.",
    assignmentDate: new Date("2023-05-10"),
    status: "draft",
  },
  {
    id: "6",
    className: "Class 6",
    subject: "Physics",
    teacher: "David Black",
    title: "Newton Laws",
    deadline: new Date("2023-10-25"),
    details: "Explain the three laws of motion.",
    assignmentDate: new Date("2023-06-10"),
    status: "published",
  },
  {
    id: "7",
    className: "Class 7",
    subject: "Chemistry",
    teacher: "Emma Watson",
    title: "Periodic Table",
    deadline: new Date("2023-10-28"),
    details: "Memorize first 20 elements.",
    assignmentDate: new Date("2023-07-10"),
    status: "published",
  },
  {
    id: "8",
    className: "Class 8",
    subject: "Biology",
    teacher: "Frank Miller",
    title: "Cell Structure",
    deadline: new Date("2023-10-30"),
    details: "Describe plant and animal cells.",
    assignmentDate: new Date("2023-08-10"),
    status: "draft",
  },
  {
    id: "9",
    className: "Class 9",
    subject: "Computer Science",
    teacher: "Grace Hopper",
    title: "Python Basics",
    deadline: new Date("2023-11-05"),
    details: "Write a program for Fibonacci series.",
    assignmentDate: new Date("2023-09-10"),
    status: "published",
  },
  {
    id: "10",
    className: "Class 10",
    subject: "Economics",
    teacher: "Henry Ford",
    title: "Supply and Demand",
    deadline: new Date("2023-11-10"),
    details: "Explain the law of demand.",
    assignmentDate: new Date("2023-10-10"),
    status: "published",
  },
];

export default function AssignmentsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Assignment>[] = [
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
      accessorKey: "className",
      header: "Class",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("className")}</div>
      ),
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("subject")}</div>
      ),
    },
    {
      accessorKey: "teacher",
      header: "Teacher",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("teacher")}</div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }) => {
        const date = new Date(row.getValue("deadline"));
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(date, "MM/dd/yyyy")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "details",
      header: "Details",
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">{row.getValue("details")}</div>
      ),
    },
    {
      accessorKey: "assignmentDate",
      header: "Assignment Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("assignmentDate"));
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
        return (
          <Badge
            variant={status === "published" ? "default" : "secondary"}
            className="capitalize"
          >
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

  const table = useReactTable({
    data: assignments,
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
    <div className="container mx-auto py-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard/main">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/academics">Academics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Class & Subject Assignment</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignment</h1>
          <p className="text-muted-foreground">
            Manage class assignments and submissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download XLSX
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Assignment
          </Button>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>
                View and manage all class assignments
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search assignments..."
                  className="pl-8 w-[200px] lg:w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Column Visibility */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Filter assignments..."
                  value={
                    (table.getColumn("title")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("title")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Columns
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
              <div className="text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
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

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
