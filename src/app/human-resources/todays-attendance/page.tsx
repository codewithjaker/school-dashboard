"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Home,
  Search,
  Filter,
  PlusCircle,
  RefreshCw,
  Download,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import Image from "next/image";

// Define the data type
export type Attendance = {
  id: string;
  name: string;
  image: string;
  firstIn: string;
  break: string;
  lastOut: string;
  totalHours: string;
  status: "present" | "absent";
  shift: "Day Shift" | "Night Shift";
};

// Sample data
const data: Attendance[] = [
  {
    id: "1",
    name: "John Deo",
    image: "/assets/images/user/user1.jpg",
    firstIn: "10:30",
    break: "01:15",
    lastOut: "19:37",
    totalHours: "08:02",
    status: "present",
    shift: "Night Shift",
  },
  {
    id: "2",
    name: "Sarah Smith",
    image: "/assets/images/user/user2.jpg",
    firstIn: "10:32",
    break: "01:00",
    lastOut: "19:30",
    totalHours: "08:10",
    status: "absent",
    shift: "Day Shift",
  },
  {
    id: "3",
    name: "Edna Gilbert",
    image: "/assets/images/user/user3.jpg",
    firstIn: "10:42",
    break: "01:10",
    lastOut: "19:32",
    totalHours: "08:08",
    status: "absent",
    shift: "Day Shift",
  },
  {
    id: "4",
    name: "Shelia Osterberg",
    image: "/assets/images/user/user4.jpg",
    firstIn: "10:38",
    break: "01:07",
    lastOut: "19:40",
    totalHours: "08:00",
    status: "present",
    shift: "Night Shift",
  },
  {
    id: "5",
    name: "Barbara Garland",
    image: "/assets/images/user/user5.jpg",
    firstIn: "10:33",
    break: "01:15",
    lastOut: "19:30",
    totalHours: "08:01",
    status: "present",
    shift: "Night Shift",
  },
  {
    id: "6",
    name: "Sarah Smith",
    image: "/assets/images/user/user6.jpg",
    firstIn: "10:30",
    break: "01:10",
    lastOut: "19:37",
    totalHours: "08:10",
    status: "absent",
    shift: "Day Shift",
  },
  {
    id: "7",
    name: "Marie Brodsky",
    image: "/assets/images/user/user7.jpg",
    firstIn: "10:32",
    break: "01:05",
    lastOut: "19:40",
    totalHours: "08:00",
    status: "absent",
    shift: "Day Shift",
  },
  {
    id: "8",
    name: "Kara Thompson",
    image: "/assets/images/user/user8.jpg",
    firstIn: "10:40",
    break: "01:07",
    lastOut: "19:30",
    totalHours: "08:12",
    status: "present",
    shift: "Day Shift",
  },
  {
    id: "9",
    name: "Joseph Nye",
    image: "/assets/images/user/user9.jpg",
    firstIn: "10:28",
    break: "01:00",
    lastOut: "19:32",
    totalHours: "08:02",
    status: "present",
    shift: "Night Shift",
  },
  {
    id: "10",
    name: "Ricardo Wendler",
    image: "/assets/images/user/user10.jpg",
    firstIn: "10:38",
    break: "01:15",
    lastOut: "19:37",
    totalHours: "08:00",
    status: "present",
    shift: "Night Shift",
  },
];

// Define columns
const columns: ColumnDef<Attendance>[] = [
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
    accessorKey: "name",
    header: "Employee Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={row.original.image}
            alt={row.original.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "firstIn",
    header: "First In",
  },
  {
    accessorKey: "break",
    header: "Break",
  },
  {
    accessorKey: "lastOut",
    header: "Last Out",
  },
  {
    accessorKey: "totalHours",
    header: "Total Hours",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "present" ? "default" : "destructive"}
        className={
          row.original.status === "present"
            ? "bg-green-100 text-green-800 hover:bg-green-100"
            : "bg-orange-100 text-orange-800 hover:bg-orange-100"
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "shift",
    header: "Shift",
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

export default function TodaysAttendancePage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
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

  const handleExportXLSX = () => {
    // Implement export functionality
    console.log("Exporting to XLSX");
  };

  const handleRefresh = () => {
    // Implement refresh functionality
    console.log("Refreshing data");
  };

  const handleAdd = () => {
    // Implement add functionality
    console.log("Adding new attendance");
  };

  const handleDeleteSelected = () => {
    // Implement delete functionality
    const selectedRows = table.getSelectedRowModel().rows;
    console.log("Deleting selected rows:", selectedRows);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Button variant="ghost" size="sm" className="p-0">
              Home
            </Button>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Button variant="ghost" size="sm">
              HR
            </Button>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Attendance</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">
          View and manage today's attendance records
        </p>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Today's Attendance</CardTitle>
              <CardDescription>
                Showing {table.getFilteredRowModel().rows.length} employee
                records
              </CardDescription>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {table.getSelectedRowModel().rows.length > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDeleteSelected}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete selected records</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              <DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Columns
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Show/Hide columns</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleAdd}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add new attendance record</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleRefresh}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Refresh data</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportXLSX}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Export to XLSX</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Search Bar */}
          <div className="flex items-center mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search employees..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="pl-9"
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

          {/* Pagination and Row Count */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <span className="text-sm">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
