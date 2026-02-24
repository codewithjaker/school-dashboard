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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "@/components/ui/breadcrumb";
import {
  Download,
  Edit,
  Eye,
  Filter,
  Home,
  MoreVertical,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
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


// Define the data type
export type LeaveType = {
  id: string;
  leaveName: string;
  type: "Paid" | "Unpaid";
  unit: "Days" | "Hours";
  status: "Active" | "Deactive";
  duration: number;
  createdBy: string;
  notificationPeriod: string;
  createdAt: Date;
};



// Mock data
const defaultData: LeaveType[] = [
  {
    id: "1",
    leaveName: "Work From Home Leave",
    type: "Paid",
    unit: "Days",
    status: "Deactive",
    duration: 5,
    createdBy: "HR Department",
    notificationPeriod: "48 hours prior.",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    leaveName: "Casual Leave",
    type: "Unpaid",
    unit: "Hours",
    status: "Active",
    duration: 8,
    createdBy: "HR Department",
    notificationPeriod: "24 hours prior.",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    leaveName: "Emergency Leave",
    type: "Unpaid",
    unit: "Days",
    status: "Active",
    duration: 3,
    createdBy: "HR Department",
    notificationPeriod: "Immediate.",
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "4",
    leaveName: "Family Leave",
    type: "Unpaid",
    unit: "Hours",
    status: "Deactive",
    duration: 12,
    createdBy: "HR Department",
    notificationPeriod: "48 hours prior.",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "5",
    leaveName: "Sick Leave",
    type: "Unpaid",
    unit: "Days",
    status: "Active",
    duration: 10,
    createdBy: "HR Department",
    notificationPeriod: "48 hours prior.",
    createdAt: new Date("2023-12-28"),
  },
  {
    id: "6",
    leaveName: "Maternity Leave",
    type: "Paid",
    unit: "Days",
    status: "Deactive",
    duration: 90,
    createdBy: "HR Department",
    notificationPeriod: "1 month prior.",
    createdAt: new Date("2023-12-20"),
  },
];

// Define columns
const columns: ColumnDef<LeaveType>[] = [
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
    accessorKey: "leaveName",
    header: "Leave Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("leaveName")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Leave Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge variant={type === "Paid" ? "default" : "secondary"}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "unit",
    header: "Leave Unit",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "Active" ? "success" : "destructive"}
          className="capitalize"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration (Days)",
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue("duration")}</div>;
    },
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    accessorKey: "notificationPeriod",
    header: "Notification Period",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => {
      return format(new Date(row.getValue("createdAt")), "MMM dd, yyyy");
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

export default function LeaveTypesPage() {
  const [data] = useState<LeaveType[]>(defaultData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

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
    <div className="flex flex-col gap-6 p-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Button variant="ghost" size="icon" className="h-6 w-6">
             Home
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span className="text-muted-foreground">HR</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">
              Leave Types
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Types</h1>
          <p className="text-muted-foreground">
            Manage your organization's leave types and configurations
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Leave Type
        </Button>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Leave Types</CardTitle>
              <CardDescription>
                View and manage all leave types in your organization
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search leave types..."
                  value={
                    (table
                      .getColumn("leaveName")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("leaveName")
                      ?.setFilterValue(event.target.value)
                  }
                  className="pl-10 w-[250px]"
                />
              </div>

              {/* Filter by status */}
              <Select
                value={
                  (table.getColumn("status")?.getFilterValue() as string) ?? ""
                }
                onValueChange={(value) =>
                  table.getColumn("status")?.setFilterValue(value || undefined)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Deactive">Deactive</SelectItem>
                </SelectContent>
              </Select>

              {/* Column visibility */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    View
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

              {/* Action buttons */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  table.resetSorting();
                  table.resetColumnFilters();
                  table.resetRowSelection();
                }}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
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

          {/* Pagination and row selection info */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
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
        </CardContent>
      </Card>
    </div>
  );
}
