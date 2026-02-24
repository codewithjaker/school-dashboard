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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Home,
  Filter,
  PlusCircle,
  RefreshCw,
  Download,
  Edit,
  Trash2,
  Calendar,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import { format } from "date-fns";

// Define the data type
export type Fee = {
  id: string;
  rollNo: number;
  studentName: string;
  class: string;
  feesType: "library" | "annual" | "tuition" | "transport" | "exam" | "other";
  invoiceNo: string;
  paymentDueDate: Date;
  paymentDate: Date | null;
  paymentType: "cash" | "credit card" | "cheque" | "";
  status: "pending" | "paid";
  amount: string;
  notes: string;
};

// Sample data
const data: Fee[] = [
  {
    id: "1",
    rollNo: 1,
    studentName: "Jenish Shah",
    class: "10th Grade",
    feesType: "library",
    invoiceNo: "IN-5645644",
    paymentDueDate: new Date("2019-03-01"),
    paymentDate: null,
    paymentType: "",
    status: "pending",
    amount: "170$",
    notes: "N/A",
  },
  {
    id: "2",
    rollNo: 2,
    studentName: "Priya Patel",
    class: "11th Grade",
    feesType: "annual",
    invoiceNo: "IN-5645644",
    paymentDueDate: new Date("2019-03-01"),
    paymentDate: null,
    paymentType: "",
    status: "pending",
    amount: "170$",
    notes: "N/A",
  },
  {
    id: "3",
    rollNo: 3,
    studentName: "Mayank Jani",
    class: "7th Grade",
    feesType: "other",
    invoiceNo: "IN-5645644",
    paymentDueDate: new Date("2020-01-01"),
    paymentDate: null,
    paymentType: "",
    status: "pending",
    amount: "250$",
    notes: "N/A",
  },
  {
    id: "4",
    rollNo: 4,
    studentName: "Bertie Jones",
    class: "8th Grade",
    feesType: "annual",
    invoiceNo: "IN-5645644",
    paymentDueDate: new Date("2019-03-01"),
    paymentDate: new Date("2019-10-02"),
    paymentType: "cheque",
    status: "paid",
    amount: "340$",
    notes: "N/A",
  },
  {
    id: "5",
    rollNo: 5,
    studentName: "Jenish Shah",
    class: "9th Grade",
    feesType: "transport",
    invoiceNo: "IN-5645644",
    paymentDueDate: new Date("2019-03-01"),
    paymentDate: new Date("2019-10-02"),
    paymentType: "credit card",
    status: "paid",
    amount: "170$",
    notes: "N/A",
  },
  {
    id: "6",
    rollNo: 6,
    studentName: "Sarah Smith",
    class: "11th Grade",
    feesType: "exam",
    invoiceNo: "IN-5645644",
    // paymentDueDate: "2019-03-01",
    // paymentDate: "2019-02-10",
    paymentDueDate: new Date("2019-03-01"),
    paymentDate: new Date("2019-03-01"),
    paymentType: "cash",
    status: "paid",
    amount: "340$",
    notes: "N/A",
  },
  {
    id: "7",
    rollNo: 7,
    studentName: "Pam Abbott",
    class: "7th Grade",
    feesType: "tuition",
    invoiceNo: "IN-5645644",
    // paymentDueDate: "2019-03-01",
    paymentDueDate: new Date("2019-03-01"),
    paymentDate: null,
    paymentType: "",
    status: "pending",
    amount: "340$",
    notes: "N/A",
  },
  {
    id: "8",
    rollNo: 8,
    studentName: "Bethaney Spence",
    class: "8th Grade",
    feesType: "library",
    invoiceNo: "IN-5645644",
    // paymentDueDate: "2019-03-01",
    // paymentDate: "2019-02-10",
    paymentDueDate: new Date("2019-03-01"),
    paymentDate: new Date("2019-03-01"),
    paymentType: "credit card",
    status: "paid",
    amount: "250$",
    notes: "N/A",
  },
  {
    id: "9",
    rollNo: 9,
    studentName: "Ivan Bell",
    class: "11th Grade",
    feesType: "transport",
    invoiceNo: "IN-5645644",
    // paymentDueDate: "2019-03-01",
    paymentDueDate: new Date("2019-03-01"),
    paymentDate: null,
    paymentType: "",
    status: "pending",
    amount: "170$",
    notes: "N/A",
  },
  {
    id: "10",
    rollNo: 10,
    studentName: "Jay Soni",
    class: "9th Grade",
    feesType: "tuition",
    invoiceNo: "IN-5645644",
    // paymentDueDate: "2019-03-01",
    // paymentDate: "2019-02-10",
    paymentDueDate: new Date("2019-03-01"),
    paymentDate: new Date("2019-03-01"),
    paymentType: "credit card",
    status: "paid",
    amount: "340$",
    notes: "N/A",
  },
];

// Define columns
const columns: ColumnDef<Fee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        className="h-4 w-4 rounded border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="h-4 w-4 rounded border-gray-300"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "rollNo",
    header: "Roll No",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("rollNo")}</div>
    ),
  },
  {
    accessorKey: "studentName",
    header: "Student Name",
    cell: ({ row }) => <div>{row.getValue("studentName")}</div>,
  },
  {
    accessorKey: "class",
    header: "Class",
    cell: ({ row }) => <div>{row.getValue("class")}</div>,
  },
  {
    accessorKey: "feesType",
    header: "Fees Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("feesType")}
      </Badge>
    ),
  },
  {
    accessorKey: "invoiceNo",
    header: "Invoice No",
    cell: ({ row }) => <div>{row.getValue("invoiceNo")}</div>,
  },
  {
    accessorKey: "paymentDueDate",
    header: "Payment Due Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {format(new Date(row.getValue("paymentDueDate")), "MM/dd/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => {
      const date = row.getValue<Date | null>("paymentDate");
      return date ? (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {format(date, "MM/dd/yyyy")}
        </div>
      ) : (
        <span>-</span>
      );
    },
  },
  {
    accessorKey: "paymentType",
    header: "Payment Type",
    cell: ({ row }) => {
      const type = row.getValue("paymentType");
      return type ? (
        <Badge variant="outline" className="capitalize">
          {type}
        </Badge>
      ) : (
        <span>-</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as "pending" | "paid";
      return (
        <Badge
          variant="secondary"
          className={
            status === "paid"
              ? "bg-green-100 text-green-800"
              : "bg-orange-100 text-orange-800"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue("amount")}</div>
    ),
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => <div>{row.getValue("notes")}</div>,
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

export default function AllFeesPage() {
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/admin/dashboard"
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/fees">Fees</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All Fees</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Fees</h1>
          <p className="text-muted-foreground">
            Manage and view all student fees
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Fee Records</CardTitle>
              <CardDescription>
                All student fee records in one place
              </CardDescription>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search fees..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-9 w-full sm:w-[250px]"
                />
              </div>

              {/* Status Filter */}
              <Select
                onValueChange={(value) => {
                  if (value === "all") {
                    table.getColumn("status")?.setFilterValue(undefined);
                  } else {
                    table.getColumn("status")?.setFilterValue(value);
                  }
                }}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              {/* Column Visibility */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-9">
                    <Filter className="mr-2 h-4 w-4" />
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
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
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <PlusCircle className="h-4 w-4 text-green-600" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
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

          {/* Pagination and Row Selection Info */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <span className="text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
              <Select
                value={table.getState().pagination.pageSize.toString()}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
