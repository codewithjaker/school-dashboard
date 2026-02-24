// app/transport/student-allocation/page.tsx
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Download, Home, Plus, RefreshCw, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Edit,
  MoreHorizontal,
  Trash2,
  Calendar,
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

export type StudentAllocation = {
  id: string;
  studentName: string;
  studentId: string;
  classSection: string;
  routeName: string;
  vehicleNo: string;
  stopPoint: string;
  allocationDate: string;
  status: "active" | "inactive";
  image: string;
};

const data: StudentAllocation[] = [
  {
    id: "1",
    studentName: "Alice Johnson",
    studentId: "STU001",
    classSection: "10-A",
    routeName: "North Campus - Main Gate",
    vehicleNo: "VH-2021-001",
    stopPoint: "Blue Circle",
    allocationDate: "08/15/2023",
    status: "active",
    image: "assets/images/user/user1.jpg",
  },
  {
    id: "2",
    studentName: "Bob Smith",
    studentId: "STU002",
    classSection: "9-B",
    routeName: "City Center - South Block",
    vehicleNo: "VH-2020-002",
    stopPoint: "Green Park",
    allocationDate: "08/16/2023",
    status: "active",
    image: "assets/images/user/user2.jpg",
  },
  {
    id: "3",
    studentName: "Charlie Brown",
    studentId: "STU003",
    classSection: "11-C",
    routeName: "Airport Road - Science Wing",
    vehicleNo: "VH-2019-003",
    stopPoint: "Red Cross",
    allocationDate: "08/17/2023",
    status: "inactive",
    image: "assets/images/user/user3.jpg",
  },
  {
    id: "4",
    studentName: "Diana Prince",
    studentId: "STU004",
    classSection: "8-A",
    routeName: "Green Valley - Arts College",
    vehicleNo: "VH-2022-004",
    stopPoint: "Yellow House",
    allocationDate: "08/18/2023",
    status: "active",
    image: "assets/images/user/user4.jpg",
  },
  {
    id: "5",
    studentName: "Ethan Hunt",
    studentId: "STU005",
    classSection: "12-B",
    routeName: "Railway Station - Hostel Block",
    vehicleNo: "VH-2021-005",
    stopPoint: "Black Square",
    allocationDate: "08/19/2023",
    status: "active",
    image: "assets/images/user/user5.jpg",
  },
  {
    id: "6",
    studentName: "Fiona Gallagher",
    studentId: "STU006",
    classSection: "10-B",
    routeName: "East Suburb - Library",
    vehicleNo: "VH-2018-006",
    stopPoint: "White Bridge",
    allocationDate: "08/20/2023",
    status: "active",
    image: "assets/images/user/user6.jpg",
  },
  {
    id: "7",
    studentName: "George Miller",
    studentId: "STU007",
    classSection: "7-C",
    routeName: "West End - Sports Complex",
    vehicleNo: "VH-2023-007",
    stopPoint: "Silver Road",
    allocationDate: "08/21/2023",
    status: "active",
    image: "assets/images/user/user7.jpg",
  },
  {
    id: "8",
    studentName: "Hannah Abbott",
    studentId: "STU008",
    classSection: "11-A",
    routeName: "Hill Top - Medical Center",
    vehicleNo: "VH-2020-008",
    stopPoint: "Gold Hill",
    allocationDate: "08/22/2023",
    status: "active",
    image: "assets/images/user/user8.jpg",
  },
  {
    id: "9",
    studentName: "Ian Wright",
    studentId: "STU009",
    classSection: "9-A",
    routeName: "Market Square - Admin Block",
    vehicleNo: "VH-2017-009",
    stopPoint: "Old Market",
    allocationDate: "08/23/2023",
    status: "active",
    image: "assets/images/user/user9.jpg",
  },
  {
    id: "10",
    studentName: "Julia Roberts",
    studentId: "STU010",
    classSection: "12-A",
    routeName: "Lake Side - Engineering Wing",
    vehicleNo: "VH-2021-010",
    stopPoint: "Water Front",
    allocationDate: "08/24/2023",
    status: "active",
    image: "assets/images/user/user10.jpg",
  },
];

export const columns: ColumnDef<StudentAllocation>[] = [
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
    header: "Student Name",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={student.image} alt={student.studentName} />
            <AvatarFallback>{student.studentName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{student.studentName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "studentId",
    header: "Student ID",
  },
  {
    accessorKey: "classSection",
    header: "Class",
  },
  {
    accessorKey: "routeName",
    header: "Route",
  },
  {
    accessorKey: "vehicleNo",
    header: "Vehicle",
  },
  {
    accessorKey: "stopPoint",
    header: "Stop",
  },
  {
    accessorKey: "allocationDate",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("allocationDate")}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "active" ? "default" : "secondary"}
          className={
            status === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-orange-100 text-orange-800 hover:bg-orange-100"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
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

export default function StudentAllocationPage() {
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
    <div className="container mx-auto py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard/main">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/transport">Transport</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Student Allocation</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Student Allocation
        </h1>
        <p className="text-muted-foreground">
          Manage student transport allocations and assignments
        </p>
      </div>

      {/* Main Card */}
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-4">
            <CardTitle className="text-2xl">Student Allocation</CardTitle>

            {/* Search Bar */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>

            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Allocation
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="w-full">
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

            {/* Table Footer */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>

              {/* Pagination */}
              <div className="flex items-center space-x-6 lg:space-x-8">
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
                        <DropdownMenuItem
                          key={pageSize}
                          onClick={() => table.setPageSize(Number(pageSize))}
                        >
                          {pageSize}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
