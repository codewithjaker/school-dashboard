"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  ChevronDown,
  Download,
  Edit,
  FileDown,
  Filter,
  Home,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Calendar,
  Eye,
} from "lucide-react";
import { useState } from "react";
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

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define the Discount type
export type Discount = {
  id: string;
  discountType: string;
  amount: number;
  percentage: number;
  discountCode: string;
  status: "Active" | "Inactive";
  startDate: Date;
  endDate: Date;
  appliedDate: Date;
};

// Sample data
const data: Discount[] = [
  {
    id: "1",
    discountType: "Handicapped Discount",
    amount: 20,
    percentage: 10,
    discountCode: "handicap-disc",
    status: "Active",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    appliedDate: new Date("2024-01-15"),
  },
  {
    id: "2",
    discountType: "Sibling Discount",
    amount: 30,
    percentage: 15,
    discountCode: "sibling-disc",
    status: "Inactive",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-12-31"),
    appliedDate: new Date("2024-02-10"),
  },
  {
    id: "3",
    discountType: "Merit-Based Discount",
    amount: 50,
    percentage: 25,
    discountCode: "merit-disc",
    status: "Active",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-12-31"),
    appliedDate: new Date("2024-03-05"),
  },
  {
    id: "4",
    discountType: "Financial Aid Discount",
    amount: 100,
    percentage: 50,
    discountCode: "financial-aid-disc",
    status: "Active",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    appliedDate: new Date("2024-01-10"),
  },
  {
    id: "5",
    discountType: "Early Payment Discount",
    amount: 20,
    percentage: 5,
    discountCode: "early-payment-disc",
    status: "Inactive",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    appliedDate: new Date("2024-01-05"),
  },
  {
    id: "6",
    discountType: "Scholarship Discount",
    amount: 200,
    percentage: 40,
    discountCode: "scholarship-disc",
    status: "Active",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-12-31"),
    appliedDate: new Date("2024-04-10"),
  },
  {
    id: "7",
    discountType: "Staff Discount",
    amount: 150,
    percentage: 20,
    discountCode: "staff-disc",
    status: "Active",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    appliedDate: new Date("2024-01-20"),
  },
  {
    id: "8",
    discountType: "Sports Discount",
    amount: 75,
    percentage: 10,
    discountCode: "sports-disc",
    status: "Inactive",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-12-31"),
    appliedDate: new Date("2024-02-15"),
  },
  {
    id: "9",
    discountType: "Extracurricular Discount",
    amount: 50,
    percentage: 10,
    discountCode: "extracurricular-disc",
    status: "Active",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-12-31"),
    appliedDate: new Date("2024-03-05"),
  },
  {
    id: "10",
    discountType: "Alumni Discount",
    amount: 100,
    percentage: 25,
    discountCode: "alumni-disc",
    status: "Active",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    appliedDate: new Date("2024-01-15"),
  },
];

// Define columns
const columns: ColumnDef<Discount>[] = [
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
    accessorKey: "discountType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Discount Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("discountType")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <div>${amount.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Percentage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const percentage = parseFloat(row.getValue("percentage"));
      return <div>{percentage}%</div>;
    },
  },
  {
    accessorKey: "discountCode",
    header: "Discount Code",
    cell: ({ row }) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        {row.getValue("discountCode")}
      </code>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "Active" ? "default" : "secondary"}
          className={status === "Active" ? "bg-green-500" : "bg-orange-500"}
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = row.getValue("startDate") as Date;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(date, "MM/dd/yyyy")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = row.getValue("endDate") as Date;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(date, "MM/dd/yyyy")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "appliedDate",
    header: "Applied Date",
    cell: ({ row }) => {
      const date = row.getValue("appliedDate") as Date;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(date, "MM/dd/yyyy")}</span>
        </div>
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

export default function FeesDiscountPage() {
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
            <BreadcrumbLink href="/fees">Fees</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Fees Discount</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fees Discount</h1>
          <p className="text-muted-foreground">
            Manage and view all fee discounts
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Discounts</CardTitle>

            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discounts..."
                  className="pl-8"
                  value={
                    (table
                      .getColumn("discountType")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("discountType")
                      ?.setFilterValue(event.target.value)
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                {/* Delete Button */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        disabled={!table.getSelectedRowModel().rows.length}
                        onClick={() => {
                          const selectedIds = table
                            .getSelectedRowModel()
                            .rows.map((row) => row.original.id);
                          console.log("Delete selected:", selectedIds);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete selected</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Column Visibility */}
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

                {/* Add Button */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-green-600"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add discount</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Refresh Button */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refresh</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Export Button */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-blue-600"
                      >
                        <FileDown className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Export to XLSX</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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

          {/* Pagination */}
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
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Show:</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-8">
                    {table.getState().pagination.pageSize}{" "}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <DropdownMenuItem
                      key={pageSize}
                      onClick={() => table.setPageSize(pageSize)}
                    >
                      {pageSize}
                    </DropdownMenuItem>
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
