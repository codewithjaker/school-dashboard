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
  ChevronDown,
  Home,
  Search,
  PlusCircle,
  RefreshCw,
  Download,
  Filter,
  Edit,
  Trash2,
  Calendar,
  MoreVertical,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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

type AcademicYear = {
  id: string;
  academicYear: string;
  startDate: Date;
  endDate: Date;
  description: string;
  department: "All" | string;
  status: "Active" | "Inactive" | "Pending" | "Planned";
};

const data: AcademicYear[] = [
  {
    id: "1",
    academicYear: "2020-21",
    startDate: new Date(2020, 5, 1),
    endDate: new Date(2021, 4, 31),
    description: "Academic Year 2020-21",
    department: "All",
    status: "Inactive",
  },
  {
    id: "2",
    academicYear: "2021-22",
    startDate: new Date(2021, 5, 1),
    endDate: new Date(2022, 4, 31),
    description: "Academic Year 2021-22",
    department: "All",
    status: "Inactive",
  },
  {
    id: "3",
    academicYear: "2022-23",
    startDate: new Date(2022, 5, 1),
    endDate: new Date(2023, 4, 31),
    description: "Academic Year 2022-23",
    department: "All",
    status: "Inactive",
  },
  {
    id: "4",
    academicYear: "2023-24",
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2024, 4, 31),
    description: "Academic Year 2023-24",
    department: "All",
    status: "Active",
  },
  {
    id: "5",
    academicYear: "2024-25",
    startDate: new Date(2024, 5, 1),
    endDate: new Date(2025, 4, 31),
    description: "Academic Year 2024-25",
    department: "All",
    status: "Pending",
  },
  {
    id: "6",
    academicYear: "2025-26",
    startDate: new Date(2025, 5, 1),
    endDate: new Date(2026, 4, 31),
    description: "Academic Year 2025-26",
    department: "All",
    status: "Planned",
  },
  {
    id: "7",
    academicYear: "2019-20",
    startDate: new Date(2019, 6, 1),
    endDate: new Date(2020, 5, 31),
    description: "Academic Year 2019-20",
    department: "All",
    status: "Inactive",
  },
  {
    id: "8",
    academicYear: "2018-19",
    startDate: new Date(2018, 6, 1),
    endDate: new Date(2019, 5, 31),
    description: "Academic Year 2018-19",
    department: "All",
    status: "Inactive",
  },
  {
    id: "9",
    academicYear: "2017-18",
    startDate: new Date(2017, 6, 1),
    endDate: new Date(2018, 5, 31),
    description: "Academic Year 2017-18",
    department: "All",
    status: "Inactive",
  },
  {
    id: "10",
    academicYear: "2016-17",
    startDate: new Date(2016, 6, 1),
    endDate: new Date(2017, 5, 31),
    description: "Academic Year 2016-17",
    department: "All",
    status: "Inactive",
  },
];

const columns: ColumnDef<AcademicYear>[] = [
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
    accessorKey: "academicYear",
    header: "Academic Year",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("academicYear")}</div>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = row.getValue("startDate") as Date;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {format(date, "MM/dd/yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div>{row.getValue("department")}</div>,
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = row.getValue("endDate") as Date;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {format(date, "MM/dd/yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as AcademicYear["status"];

      const statusConfig = {
        Active: { variant: "default" as const, label: "Active" },
        Inactive: { variant: "secondary" as const, label: "Inactive" },
        Pending: { variant: "outline" as const, label: "Pending" },
        Planned: { variant: "outline" as const, label: "Planned" },
      };

      return (
        <Badge variant={statusConfig[status].variant}>
          {statusConfig[status].label}
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

export default function AcademicYearPage() {
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
            <BreadcrumbLink href="/admin/dashboard">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/academics">Academics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Academic Year</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academic Year</h1>
          <p className="text-muted-foreground">
            Manage academic years and their configurations
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Academic Years</CardTitle>
              <CardDescription>
                View and manage all academic years in the system
              </CardDescription>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.resetRowSelection()}
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
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

              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Academic Year
              </Button>

              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Search Bar */}
          <div className="flex items-center py-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search academic years..."
                value={
                  (table
                    .getColumn("academicYear")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("academicYear")
                    ?.setFilterValue(event.target.value)
                }
                className="pl-8"
              />
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

          {/* Pagination & Row Info */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
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
              <div className="flex items-center gap-1">
                <div className="text-sm font-medium">Page</div>
                <div className="text-sm font-medium">
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </div>
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
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-8 w-16">
                    {table.getState().pagination.pageSize}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <DropdownMenuCheckboxItem
                      key={pageSize}
                      checked={
                        table.getState().pagination.pageSize === pageSize
                      }
                      onCheckedChange={() => table.setPageSize(pageSize)}
                    >
                      {pageSize}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
