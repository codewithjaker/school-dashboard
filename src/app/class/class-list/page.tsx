"use client";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  Filter,
  Plus,
  RefreshCcw,
  // Refresh,
  Search,
  Trash2,
} from "lucide-react";
import { Suspense } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Class } from "@/types/class";
import { classData } from "@/data/class-data";
import { useState } from "react";
import { format } from "date-fns";
import {
  Calendar,
  Edit,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Eye,
} from "lucide-react";

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
// import { TablePagination } from "@/components/ui/table-pagination";

const columns: ColumnDef<Class>[] = [
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 hover:bg-transparent"
      >
        Class Name
        {column.getIsSorted() === "asc" ? (
          <ChevronUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ChevronDown className="ml-2 h-4 w-4" />
        ) : null}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("className")}</div>
    ),
  },
  {
    accessorKey: "classCode",
    header: "Class Code",
  },
  {
    accessorKey: "classType",
    header: "Class Type",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("classType")}</Badge>
    ),
  },
  {
    accessorKey: "roomNumber",
    header: "Room Number",
  },
  {
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue("schedule")}</div>
    ),
  },
  {
    accessorKey: "semester",
    header: "Semester",
  },
  {
    accessorKey: "classCapacity",
    header: "Capacity",
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("classCapacity")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Class["status"];
      return (
        <Badge
          variant={status === "Active" ? "default" : "secondary"}
          className={
            status === "Active" ? "bg-green-500 hover:bg-green-600" : ""
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>{format(new Date(row.getValue("startDate")), "MM/dd/yyyy")}</span>
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>{format(new Date(row.getValue("endDate")), "MM/dd/yyyy")}</span>
      </div>
    ),
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

export default function ClassListPage() {
  const [data] = useState<Class[]>(classData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
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
              <BreadcrumbLink href="/class">Students</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Class List</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Class List</h1>
            <p className="text-muted-foreground">
              Manage all classes in the system
            </p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-lg border bg-card shadow-sm">
        {/* Table Header */}
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search classes..." className="pl-9" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>

            <ColumnVisibilityDropdown />

            <Button className="h-9 gap-2">
              <Plus className="h-4 w-4" />
              Add Class
            </Button>

            <Button variant="outline" size="icon" className="h-9 w-9">
              {/* <Refresh className="h-4 w-4" /> */}
              <RefreshCcw className="h-4 w-4" />
              <span className="sr-only">Refresh</span>
            </Button>

            <Button variant="outline" size="icon" className="h-9 w-9">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>

        {/* Table */}
        <Suspense fallback={<TableSkeleton />}>
          {/* <ClassListTable /> */}
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

            {/* <TablePagination table={table} /> */}
          </div>
        </Suspense>
      </div>
    </div>
  );
}

function ColumnVisibilityDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Show/Hide Columns</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Class Name</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Class Code</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Class Type</DropdownMenuCheckboxItem>
        {/* Add more columns as needed */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TableSkeleton() {
  return (
    <div className="p-6">
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 rounded-md bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  );
}
