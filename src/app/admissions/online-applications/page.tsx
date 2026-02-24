"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Download,
  Filter,
  PlusCircle,
  RefreshCw,
  Search,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
  Trash2,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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
import { format } from "date-fns";

// Define the data type
export type Application = {
  id: string;
  studentName: string;
  studentImage: string;
  applicationNo: string;
  email: string;
  mobile: string;
  course: string;
  applicationDate: Date;
  paymentStatus: "Paid" | "Unpaid" | "Pending";
  applicationStatus:
    | "Approved"
    | "Pending"
    | "Draft"
    | "Under Review"
    | "Rejected";
};

// Sample data
const data: Application[] = [
  {
    id: "1",
    studentName: "John Doe",
    studentImage: "/images/user/user1.jpg",
    applicationNo: "APP001",
    email: "john@example.com",
    mobile: "1234567890",
    course: "Computer Science",
    applicationDate: new Date("2023-01-11"),
    paymentStatus: "Paid",
    applicationStatus: "Approved",
  },
  {
    id: "2",
    studentName: "Jane Smith",
    studentImage: "/images/user/user2.jpg",
    applicationNo: "APP002",
    email: "jane@example.com",
    mobile: "2345678901",
    course: "Business Admin",
    applicationDate: new Date("2023-02-11"),
    paymentStatus: "Paid",
    applicationStatus: "Pending",
  },
  {
    id: "3",
    studentName: "Mike Ross",
    studentImage: "/images/user/user3.jpg",
    applicationNo: "APP003",
    email: "mike@example.com",
    mobile: "3456789012",
    course: "Law",
    applicationDate: new Date("2023-03-11"),
    paymentStatus: "Unpaid",
    applicationStatus: "Draft",
  },
  {
    id: "4",
    studentName: "Rachel Zane",
    studentImage: "/images/user/user4.jpg",
    applicationNo: "APP004",
    email: "rachel@example.com",
    mobile: "4567890123",
    course: "Law",
    applicationDate: new Date("2023-04-11"),
    paymentStatus: "Paid",
    applicationStatus: "Approved",
  },
  {
    id: "5",
    studentName: "Harvey Specter",
    studentImage: "/images/user/user5.jpg",
    applicationNo: "APP005",
    email: "harvey@example.com",
    mobile: "5678901234",
    course: "Economics",
    applicationDate: new Date("2023-05-11"),
    paymentStatus: "Paid",
    applicationStatus: "Under Review",
  },
  {
    id: "6",
    studentName: "Donna Paulsen",
    studentImage: "/images/user/user6.jpg",
    applicationNo: "APP006",
    email: "donna@example.com",
    mobile: "6789012345",
    course: "Management",
    applicationDate: new Date("2023-06-11"),
    paymentStatus: "Paid",
    applicationStatus: "Approved",
  },
  {
    id: "7",
    studentName: "Louis Litt",
    studentImage: "/images/user/user7.jpg",
    applicationNo: "APP007",
    email: "louis@example.com",
    mobile: "7890123456",
    course: "Finance",
    applicationDate: new Date("2023-07-11"),
    paymentStatus: "Unpaid",
    applicationStatus: "Rejected",
  },
  {
    id: "8",
    studentName: "Jessica Pearson",
    studentImage: "/images/user/user8.jpg",
    applicationNo: "APP008",
    email: "jessica@example.com",
    mobile: "8901234567",
    course: "Political Science",
    applicationDate: new Date("2023-08-11"),
    paymentStatus: "Paid",
    applicationStatus: "Approved",
  },
  {
    id: "9",
    studentName: "Oliver Queen",
    studentImage: "/images/user/user9.jpg",
    applicationNo: "APP009",
    email: "oliver@example.com",
    mobile: "9012345678",
    course: "Mechanical Eng",
    applicationDate: new Date("2023-09-11"),
    paymentStatus: "Paid",
    applicationStatus: "Pending",
  },
  {
    id: "10",
    studentName: "Barry Allen",
    studentImage: "/images/user/user10.jpg",
    applicationNo: "APP010",
    email: "barry@example.com",
    mobile: "0123456789",
    course: "Physics",
    applicationDate: new Date("2023-10-11"),
    paymentStatus: "Paid",
    applicationStatus: "Approved",
  },
];

// Define column definitions
export const columns: ColumnDef<Application>[] = [
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
      const application = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={application.studentImage}
              alt={application.studentName}
            />
            <AvatarFallback>
              {application.studentName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{application.studentName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "applicationNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          App No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("applicationNo")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("mobile")}</div>
    ),
  },
  {
    accessorKey: "course",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("course")}</div>
    ),
  },
  {
    accessorKey: "applicationDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          App Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("applicationDate"));
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-amber-700" />
          <span>{format(date, "MM/dd/yyyy")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as string;
      const variant =
        status === "Paid"
          ? "default"
          : status === "Unpaid"
            ? "destructive"
            : "secondary";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "applicationStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("applicationStatus") as string;
      const variantMap: Record<
        string,
        "default" | "secondary" | "destructive" | "outline"
      > = {
        Approved: "default",
        Pending: "secondary",
        Draft: "outline",
        "Under Review": "default",
        Rejected: "destructive",
      };
      return <Badge variant={variantMap[status] || "outline"}>{status}</Badge>;
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

export default function OnlineApplicationsPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
            <BreadcrumbLink
              href="/admin/dashboard"
              className="flex items-center gap-2"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/students">Students</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Applications</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Online Applications
          </h1>
          <p className="text-muted-foreground">
            Manage and review student applications
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-2xl">Applications List</CardTitle>
            <div className="flex items-center gap-2">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  className="pl-9 w-full sm:w-[300px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600 hover:text-green-700"
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-amber-700 hover:text-amber-800"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* <OnlineApplicationsTable /> */}
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
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Table Controls */}
            <div className="flex items-center justify-between">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>

              <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">Rows per page</p>
                  <select
                    className="h-8 w-[70px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                      table.setPageSize(Number(e.target.value));
                    }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                </div>

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
