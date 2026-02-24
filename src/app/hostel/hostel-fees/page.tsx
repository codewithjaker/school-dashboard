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
  ArrowUpDown,
  ChevronDown,
  Download,
  Edit,
  Eye,
  Home,
  MoreHorizontal,
  RefreshCw,
  Search,
  Trash2,
  User,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

export type HostelFee = {
  id: string;
  studentName: string;
  studentImage: string;
  rollNo: string;
  hostelName: string;
  roomNo: string;
  amount: number;
  paymentDate: Date;
  feeType: "Monthly" | "Quarterly" | "Yearly";
  status: "Paid" | "Unpaid";
};

const data: HostelFee[] = [
  {
    id: "1",
    studentName: "John Doe",
    studentImage: "/assets/images/user/user1.jpg",
    rollNo: "101",
    hostelName: "Sunrise Hostel",
    roomNo: "101",
    amount: 1500,
    paymentDate: new Date("2025-05-01"),
    feeType: "Monthly",
    status: "Paid",
  },
  {
    id: "2",
    studentName: "Jane Smith",
    studentImage: "/assets/images/user/user2.jpg",
    rollNo: "102",
    hostelName: "Sunrise Hostel",
    roomNo: "102",
    amount: 1500,
    paymentDate: new Date("2025-06-01"),
    feeType: "Monthly",
    status: "Unpaid",
  },
  {
    id: "3",
    studentName: "Robert Brown",
    studentImage: "/assets/images/user/user3.jpg",
    rollNo: "103",
    hostelName: "Sunset Villa",
    roomNo: "201",
    amount: 4000,
    paymentDate: new Date("2025-10-01"),
    feeType: "Quarterly",
    status: "Paid",
  },
  {
    id: "4",
    studentName: "Emily Davis",
    studentImage: "/assets/images/user/user4.jpg",
    rollNo: "104",
    hostelName: "Sunset Villa",
    roomNo: "202",
    amount: 1500,
    paymentDate: new Date("2025-12-01"),
    feeType: "Monthly",
    status: "Paid",
  },
  {
    id: "5",
    studentName: "Michael Wilson",
    studentImage: "/assets/images/user/user5.jpg",
    rollNo: "105",
    hostelName: "Sunrise Hostel",
    roomNo: "103",
    amount: 1500,
    paymentDate: new Date("2025-01-15"),
    feeType: "Monthly",
    status: "Unpaid",
  },
  {
    id: "6",
    studentName: "Sarah Parker",
    studentImage: "/assets/images/user/user6.jpg",
    rollNo: "106",
    hostelName: "Sunrise Hostel",
    roomNo: "104",
    amount: 1500,
    paymentDate: new Date("2025-01-18"),
    feeType: "Monthly",
    status: "Paid",
  },
  {
    id: "7",
    studentName: "David Lee",
    studentImage: "/assets/images/user/user7.jpg",
    rollNo: "107",
    hostelName: "Sunset Villa",
    roomNo: "203",
    amount: 15000,
    paymentDate: new Date("2025-01-20"),
    feeType: "Yearly",
    status: "Paid",
  },
  {
    id: "8",
    studentName: "Emma Watson",
    studentImage: "/assets/images/user/user8.jpg",
    rollNo: "108",
    hostelName: "Sunset Villa",
    roomNo: "204",
    amount: 1500,
    paymentDate: new Date("2025-01-22"),
    feeType: "Monthly",
    status: "Unpaid",
  },
  {
    id: "9",
    studentName: "Chris Evans",
    studentImage: "/assets/images/user/user9.jpg",
    rollNo: "109",
    hostelName: "Sunrise Hostel",
    roomNo: "105",
    amount: 4000,
    paymentDate: new Date("2025-01-25"),
    feeType: "Quarterly",
    status: "Paid",
  },
  {
    id: "10",
    studentName: "Jessica Alba",
    studentImage: "/assets/images/user/user10.jpg",
    rollNo: "110",
    hostelName: "Sunset Villa",
    roomNo: "205",
    amount: 1500,
    paymentDate: new Date("2025-01-28"),
    feeType: "Monthly",
    status: "Paid",
  },
];

export const columns: ColumnDef<HostelFee>[] = [
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
          className="p-0 hover:bg-transparent"
        >
          Student Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const fee = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={fee.studentImage} alt={fee.studentName} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="font-medium">{fee.studentName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "rollNo",
    header: "Roll No",
  },
  {
    accessorKey: "hostelName",
    header: "Hostel Name",
  },
  {
    accessorKey: "roomNo",
    header: "Room No",
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
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => {
      const date = row.getValue("paymentDate") as Date;
      return (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            {format(date, "MM/dd/yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "feeType",
    header: "Fee Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "Paid" ? "default" : "destructive"}
          className={status === "Paid" ? "bg-green-500 hover:bg-green-600" : ""}
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

export default function HostelFeesPage() {
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

  const handleRefresh = () => {
    // Implement refresh logic here
    console.log("Refreshing data...");
  };

  const handleExport = () => {
    // Implement export logic here
    console.log("Exporting data...");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard/main">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/hostel">Hostel</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Fees</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hostel Fees</h1>
          <p className="text-muted-foreground">
            Manage hostel fees and payment status
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hostel Fees</CardTitle>
              <CardDescription>
                View and manage all hostel fee payments
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                title="Refresh"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleExport}
                title="Export to Excel"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button>
                <span className="mr-2">+</span>
                Add Fee
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search fees..."
                  className="w-64 pl-8"
                  value={
                    (table
                      .getColumn("studentName")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("studentName")
                      ?.setFilterValue(event.target.value)
                  }
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
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
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected (
                {table.getFilteredSelectedRowModel().rows.length})
              </Button>
            )}
          </div>

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

          <div className="flex items-center justify-between space-x-2 py-4">
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
              <div className="text-sm text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
