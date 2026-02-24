"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Download,
  Home,
  Plus,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Trash2, Calendar, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
export type FeeReport = {
  id: string;
  reportType: string;
  feeCategory: string;
  dateFrom: Date;
  dateTo: Date;
  totalAmount: number;
  generatedBy: {
    name: string;
    avatar: string;
  };
  generatedDate: Date;
  status: "completed" | "pending" | "in-progress";
};

// Mock data
const mockData: FeeReport[] = [
  {
    id: "1",
    reportType: "Fee Collection",
    feeCategory: "Tuition Fee",
    dateFrom: new Date("2024-11-01"),
    dateTo: new Date("2024-11-30"),
    totalAmount: 450000,
    generatedBy: {
      name: "John Doe",
      avatar: "/assets/images/user/user1.jpg",
    },
    generatedDate: new Date("2024-12-01"),
    status: "completed",
  },
  {
    id: "2",
    reportType: "Due Fees",
    feeCategory: "Hostel Fee",
    dateFrom: new Date("2024-12-01"),
    dateTo: new Date("2024-12-07"),
    totalAmount: 125000,
    generatedBy: {
      name: "Sarah Smith",
      avatar: "/assets/images/user/user2.jpg",
    },
    generatedDate: new Date("2024-12-08"),
    status: "completed",
  },
  {
    id: "3",
    reportType: "Fee Summary",
    feeCategory: "Transport Fee",
    dateFrom: new Date("2024-09-01"),
    dateTo: new Date("2024-11-30"),
    totalAmount: 78000,
    generatedBy: {
      name: "Mike Johnson",
      avatar: "/assets/images/user/user3.jpg",
    },
    generatedDate: new Date("2024-12-10"),
    status: "pending",
  },
  {
    id: "4",
    reportType: "Miscellaneous Fees",
    feeCategory: "Library Fee",
    dateFrom: new Date("2024-09-01"),
    dateTo: new Date("2024-11-30"),
    totalAmount: 5400,
    generatedBy: {
      name: "Emily Davis",
      avatar: "assets/images/user/user4.jpg",
    },
    generatedDate: new Date("2024-12-10"),
    status: "completed",
  },
  {
    id: "5",
    reportType: "Fee Collection",
    feeCategory: "Lab Fee",
    dateFrom: new Date("2024-09-01"),
    dateTo: new Date("2024-11-30"),
    totalAmount: 32000,
    generatedBy: {
      name: "David Wilson",
      avatar: "assets/images/user/user5.jpg",
    },
    generatedDate: new Date("2024-12-10"),
    status: "completed",
  },
  {
    id: "6",
    reportType: "Discount Report",
    feeCategory: "Tuition Fee",
    dateFrom: new Date("2024-09-01"),
    dateTo: new Date("2024-11-30"),
    totalAmount: 15000,
    generatedBy: {
      name: "Lisa Brown",
      avatar: "assets/images/user/user6.jpg",
    },
    generatedDate: new Date("2024-12-10"),
    status: "in-progress",
  },
  {
    id: "7",
    reportType: "Refund Report",
    feeCategory: "Admission Fee",
    dateFrom: new Date("2024-09-01"),
    dateTo: new Date("2024-11-30"),
    totalAmount: 8500,
    generatedBy: {
      name: "Robert Taylor",
      avatar: "assets/images/user/user7.jpg",
    },
    generatedDate: new Date("2024-12-10"),
    status: "completed",
  },
  {
    id: "8",
    reportType: "Fee Collection",
    feeCategory: "Exam Fee",
    dateFrom: new Date("2024-09-01"),
    dateTo: new Date("2024-11-30"),
    totalAmount: 56800,
    generatedBy: {
      name: "Jennifer White",
      avatar: "assets/images/user/user8.jpg",
    },
    generatedDate: new Date("2024-12-10"),
    status: "completed",
  },
  {
    id: "9",
    reportType: "Overdue List",
    feeCategory: "Tuition Fee",
    dateFrom: new Date("2024-09-01"),
    dateTo: new Date("2024-11-30"),
    totalAmount: 245000,
    generatedBy: {
      name: "William Clark",
      avatar: "assets/images/user/user9.jpg",
    },
    generatedDate: new Date("2024-12-10"),
    status: "pending",
  },
  {
    id: "10",
    reportType: "Fee Collection",
    feeCategory: "Registration Fee",
    dateFrom: new Date("2024-09-01"),
    dateTo: new Date("2024-11-30"),
    totalAmount: 12000,
    generatedBy: {
      name: "Amanda Lee",
      avatar: "assets/images/user/user10.jpg",
    },
    generatedDate: new Date("2024-12-10"),
    status: "completed",
  },
  // Add more mock data as needed...
];

// Define columns
const columns: ColumnDef<FeeReport>[] = [
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
    accessorKey: "reportType",
    header: "Report Type",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("reportType")}</div>
    ),
  },
  {
    accessorKey: "feeCategory",
    header: "Fee Category",
  },
  {
    accessorKey: "dateFrom",
    header: "Date From",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {format(row.getValue("dateFrom"), "MM/dd/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "dateTo",
    header: "Date To",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {format(row.getValue("dateTo"), "MM/dd/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "generatedBy",
    header: "Generated By",
    cell: ({ row }) => {
      const generatedBy = row.getValue(
        "generatedBy",
      ) as FeeReport["generatedBy"];
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={generatedBy.avatar} alt={generatedBy.name} />
            <AvatarFallback>
              {generatedBy.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span>{generatedBy.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "generatedDate",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {format(row.getValue("generatedDate"), "MM/dd/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as FeeReport["status"];
      const variant = {
        completed: "default",
        pending: "destructive",
        "in-progress": "secondary",
      }[status] as "default" | "destructive" | "secondary" | "outline";

      const label = {
        completed: "Completed",
        pending: "Pending",
        "in-progress": "In Progress",
      }[status];

      return <Badge variant={variant}>{label}</Badge>;
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

const handleEdit = (id: string) => {
  console.log("Edit report:", id);
  // Implement edit logic
};

const handleDelete = (id: string) => {
  console.log("Delete report:", id);
  // Implement delete logic
};

export default function FeeReportsPage() {
    const [data, setData] = useState<FeeReport[]>(mockData);
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
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fee Reports</h1>

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
                <BreadcrumbLink href="/reports">Reports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Fee Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Fee Reports</CardTitle>
              <CardDescription>
                View and manage all fee reports generated in the system
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" title="Delete">
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Filter">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Add">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Refresh">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Download XLSX">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="relative mb-6 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search reports..." className="pl-8" />
          </div>

          {/* Table Component */}
          {/* <FeeReportsTable /> */}
            <div className="space-y-4">
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
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
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
    </div>
        </CardContent>
      </Card>
    </div>
  );
}
