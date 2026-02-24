// app/human-resources/employee-leave-balance/page.tsx
"use client";

import React, { useState } from "react";

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
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, Download, Plus, RefreshCw, Filter } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, MoreVertical, Check, X, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

export type LeaveBalance = {
  id: string;
  employeeName: string;
  employeeImage: string;
  previousBalance: number;
  currentBalance: number;
  totalBalance: number;
  usedLeave: number;
  acceptedLeave: number;
  rejectedLeave: number;
  expiredLeave: number;
  carryOverBalance: number;
  status: "active" | "low" | "exhausted";
};

const data: LeaveBalance[] = [
  {
    id: "1",
    employeeName: "John Deo",
    employeeImage: "assets/images/user/user1.jpg",
    previousBalance: 10,
    currentBalance: 15,
    totalBalance: 25,
    usedLeave: 15,
    acceptedLeave: 10,
    rejectedLeave: 2,
    expiredLeave: 5,
    carryOverBalance: 5,
    status: "active",
  },
  {
    id: "2",
    employeeName: "Sarah Smith",
    employeeImage: "assets/images/user/user2.jpg",
    previousBalance: 10,
    currentBalance: 15,
    totalBalance: 25,
    usedLeave: 15,
    acceptedLeave: 10,
    rejectedLeave: 2,
    expiredLeave: 5,
    carryOverBalance: 5,
    status: "active",
  },
  {
    id: "3",
    employeeName: "Edna Gilbert",
    employeeImage: "assets/images/user/user3.jpg",
    previousBalance: 10,
    currentBalance: 15,
    totalBalance: 25,
    usedLeave: 15,
    acceptedLeave: 10,
    rejectedLeave: 2,
    expiredLeave: 5,
    carryOverBalance: 5,
    status: "active",
  },
  {
    id: "4",
    employeeName: "Shelia Osterberg",
    employeeImage: "assets/images/user/user4.jpg",
    previousBalance: 10,
    currentBalance: 15,
    totalBalance: 25,
    usedLeave: 15,
    acceptedLeave: 10,
    rejectedLeave: 2,
    expiredLeave: 5,
    carryOverBalance: 5,
    status: "active",
  },
  {
    id: "5",
    employeeName: "Barbara Garland",
    employeeImage: "assets/images/user/user5.jpg",
    previousBalance: 10,
    currentBalance: 15,
    totalBalance: 25,
    usedLeave: 15,
    acceptedLeave: 10,
    rejectedLeave: 2,
    expiredLeave: 5,
    carryOverBalance: 5,
    status: "active",
  },
  {
    id: "6",
    employeeName: "Sarah Smith",
    employeeImage: "assets/images/user/user6.jpg",
    previousBalance: 10,
    currentBalance: 15,
    totalBalance: 25,
    usedLeave: 15,
    acceptedLeave: 10,
    rejectedLeave: 2,
    expiredLeave: 5,
    carryOverBalance: 5,
    status: "active",
  },
  {
    id: "7",
    employeeName: "Marie Brodsky",
    employeeImage: "assets/images/user/user7.jpg",
    previousBalance: 10,
    currentBalance: 15,
    totalBalance: 25,
    usedLeave: 15,
    acceptedLeave: 10,
    rejectedLeave: 2,
    expiredLeave: 5,
    carryOverBalance: 5,
    status: "active",
  },
  {
    id: "8",
    employeeName: "Kara Thompson",
    employeeImage: "assets/images/user/user8.jpg",
    previousBalance: 10,
    currentBalance: 15,
    totalBalance: 25,
    usedLeave: 15,
    acceptedLeave: 10,
    rejectedLeave: 2,
    expiredLeave: 5,
    carryOverBalance: 5,
    status: "active",
  },
  {
    id: "9",
    employeeName: "Joseph Nye",
    employeeImage: "assets/images/user/user9.jpg",
    previousBalance: 10,
    currentBalance: 15,
    totalBalance: 25,
    usedLeave: 15,
    acceptedLeave: 10,
    rejectedLeave: 2,
    expiredLeave: 5,
    carryOverBalance: 5,
    status: "active",
  },
  {
    id: "10",
    employeeName: "Ricardo Wendler",
    employeeImage: "assets/images/user/user10.jpg",
    previousBalance: 10,
    currentBalance: 15,
    totalBalance: 25,
    usedLeave: 15,
    acceptedLeave: 10,
    rejectedLeave: 2,
    expiredLeave: 5,
    carryOverBalance: 5,
    status: "active",
  },
];

const columns: ColumnDef<LeaveBalance>[] = [
  {
    id: "select",
    header: () => <div className="text-center">Select</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      </div>
    ),
  },
  {
    accessorKey: "employeeName",
    header: "Employee Name",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage
              src={employee.employeeImage}
              alt={employee.employeeName}
            />
            <AvatarFallback>{employee.employeeName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{employee.employeeName}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "previousBalance",
    header: "Previous Balance",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-mono">
        {row.getValue("previousBalance")} days
      </Badge>
    ),
  },
  {
    accessorKey: "currentBalance",
    header: "Current Balance",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-mono">
        {row.getValue("currentBalance")} days
      </Badge>
    ),
  },
  {
    accessorKey: "totalBalance",
    header: "Total Balance",
    cell: ({ row }) => (
      <div className="font-bold text-primary font-mono">
        {row.getValue("totalBalance")} days
      </div>
    ),
  },
  {
    accessorKey: "usedLeave",
    header: "Used Leave",
    cell: ({ row }) => (
      <Badge variant="destructive" className="font-mono">
        {row.getValue("usedLeave")} days
      </Badge>
    ),
  },
  {
    accessorKey: "acceptedLeave",
    header: "Accepted Leave",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1 text-green-600">
        <Check className="h-4 w-4" />
        <span className="font-mono">{row.getValue("acceptedLeave")}</span>
      </div>
    ),
  },
  {
    accessorKey: "rejectedLeave",
    header: "Rejected Leave",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1 text-red-600">
        <X className="h-4 w-4" />
        <span className="font-mono">{row.getValue("rejectedLeave")}</span>
      </div>
    ),
  },
  {
    accessorKey: "expiredLeave",
    header: "Expired Leave",
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-amber-50 text-amber-700 font-mono">
        {row.getValue("expiredLeave")} days
      </Badge>
    ),
  },
  {
    accessorKey: "carryOverBalance",
    header: "Carry Over",
    cell: ({ row }) => (
      <Badge variant="default" className="bg-blue-50 text-blue-700 font-mono">
        {row.getValue("carryOverBalance")} days
      </Badge>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusConfig = {
        active: { label: "Active", className: "bg-green-100 text-green-800" },
        low: { label: "Low", className: "bg-yellow-100 text-yellow-800" },
        exhausted: { label: "Exhausted", className: "bg-red-100 text-red-800" },
      };

      const config = statusConfig[status];
      return <Badge className={config.className}>{config.label}</Badge>;
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

export default function EmployeeLeaveBalancePage() {
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
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard/main">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/human-resources">HR</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Leave Balance</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Leave Balance</h1>
            <p className="text-muted-foreground">
              Manage and track employee leave balances, approvals, and
              carry-overs
            </p>
          </div>
        </div>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader className="px-6 py-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <CardTitle className="text-2xl">
                Leave Balance Management
              </CardTitle>
              <CardDescription>
                View and manage all employee leave balances in one place
              </CardDescription>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search employees..."
                  className="pl-9 w-full md:w-[250px]"
                />
              </div>

              <Button variant="outline" size="icon" title="Show/Hide Columns">
                <Filter className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" title="Refresh">
                <RefreshCw className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" title="Download XLSX">
                <Download className="h-4 w-4" />
              </Button>

              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Leave Balance
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* <LeaveBalanceTable /> */}
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
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between px-4 py-2">
              <div className="text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        table.previousPage();
                      }}
                      className={
                        !table.getCanPreviousPage()
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      Page {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        table.nextPage();
                      }}
                      className={
                        !table.getCanNextPage()
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
