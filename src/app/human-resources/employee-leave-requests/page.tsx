// app/human-resources/employee-leave-requests/page.tsx
"use client";

import { useState } from "react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ArrowUpDown,
  MoreHorizontal,
  Search,
  Download,
  RefreshCw,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Building,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Home,
} from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

type LeaveRequest = {
  id: string;
  employeeName: string;
  employeeImage: string;
  employeeId: string;
  department: string;
  leaveType:
    | "Sick Leave"
    | "Maternity Leave"
    | "Medical Leave"
    | "Casual Leave"
    | "Annual Leave";
  leaveFrom: string;
  leaveTo: string;
  numberOfDays: number;
  durationType: "Full-day" | "Half-day";
  status: "Approved" | "Pending" | "Rejected";
  reason: string;
  requestedOn: string;
  approvedBy: string;
  approvalDate: string;
};

const data: LeaveRequest[] = [
  {
    id: "1",
    employeeName: "Mr. John Deo",
    employeeImage: "/assets/images/user/user1.jpg",
    employeeId: "T123",
    department: "Mathematics",
    leaveType: "Sick Leave",
    leaveFrom: "11/01/2024",
    leaveTo: "11/05/2024",
    numberOfDays: 5,
    durationType: "Full-day",
    status: "Approved",
    reason: "Flu symptoms, need rest for recovery.",
    requestedOn: "10/30/2024",
    approvedBy: "Ms. Jane Smith",
    approvalDate: "10/31/2024",
  },
  {
    id: "2",
    employeeName: "Ms. Sarah Smith",
    employeeImage: "/assets/images/user/user2.jpg",
    employeeId: "T124",
    department: "English",
    leaveType: "Maternity Leave",
    leaveFrom: "12/01/2024",
    leaveTo: "01/01/2025",
    numberOfDays: 31,
    durationType: "Full-day",
    status: "Pending",
    reason: "Pregnancy and childbirth.",
    requestedOn: "10/15/2024",
    approvedBy: "",
    approvalDate: "",
  },
  {
    id: "3",
    employeeName: "Ms. Edna Gilbert",
    employeeImage: "/assets/images/user/user3.jpg",
    employeeId: "T125",
    department: "History",
    leaveType: "Medical Leave",
    leaveFrom: "11/01/2024",
    leaveTo: "11/03/2024",
    numberOfDays: 2,
    durationType: "Half-day",
    status: "Rejected",
    reason: "Surgery recovery.",
    requestedOn: "10/18/2024",
    approvedBy: "",
    approvalDate: "",
  },
  {
    id: "4",
    employeeName: "Ms. Shelia Osterberg",
    employeeImage: "/assets/images/user/user4.jpg",
    employeeId: "T126",
    department: "IT Support",
    leaveType: "Sick Leave",
    leaveFrom: "11/05/2024",
    leaveTo: "11/07/2024",
    numberOfDays: 3,
    durationType: "Full-day",
    status: "Approved",
    reason: "Flu symptoms and fever.",
    requestedOn: "11/02/2024",
    approvedBy: "Mr. Tom Johnson",
    approvalDate: "11/03/2024",
  },
  {
    id: "5",
    employeeName: "Mr. Barbara Garland",
    employeeImage: "/assets/images/user/user5.jpg",
    employeeId: "T127",
    department: "Health Center",
    leaveType: "Casual Leave",
    leaveFrom: "11/15/2024",
    leaveTo: "11/17/2024",
    numberOfDays: 2,
    durationType: "Full-day",
    status: "Approved",
    reason: "Personal errands.",
    requestedOn: "10/30/2024",
    approvedBy: "Nurse Lisa Grey",
    approvalDate: "10/31/2024",
  },
  {
    id: "6",
    employeeName: "Ms. Sarah Smith",
    employeeImage: "/assets/images/user/user6.jpg",
    employeeId: "T128",
    department: "Science",
    leaveType: "Medical Leave",
    leaveFrom: "11/05/2024",
    leaveTo: "11/08/2024",
    numberOfDays: 3,
    durationType: "Half-day",
    status: "Pending",
    reason: "Recovering from a minor surgery.",
    requestedOn: "11/01/2024",
    approvedBy: "",
    approvalDate: "",
  },
  {
    id: "7",
    employeeName: "Mr. Marie Brodsky",
    employeeImage: "/assets/images/user/user7.jpg",
    employeeId: "T129",
    department: "Art",
    leaveType: "Casual Leave",
    leaveFrom: "11/10/2024",
    leaveTo: "11/12/2024",
    numberOfDays: 2,
    durationType: "Half-day",
    status: "Rejected",
    reason: "Attending a family event.",
    requestedOn: "11/01/2024",
    approvedBy: "",
    approvalDate: "",
  },
  {
    id: "8",
    employeeName: "Ms. Kara Thompson",
    employeeImage: "/assets/images/user/user8.jpg",
    employeeId: "T130",
    department: "Physical Education",
    leaveType: "Casual Leave",
    leaveFrom: "11/15/2024",
    leaveTo: "11/17/2024",
    numberOfDays: 3,
    durationType: "Full-day",
    status: "Approved",
    reason: "Family emergency.",
    requestedOn: "11/01/2024",
    approvedBy: "Mr. Anne White",
    approvalDate: "11/02/2024",
  },
  {
    id: "9",
    employeeName: "Mr. Joseph Nye",
    employeeImage: "/assets/images/user/user9.jpg",
    employeeId: "T131",
    department: "Social Studies",
    leaveType: "Medical Leave",
    leaveFrom: "11/10/2024",
    leaveTo: "11/12/2024",
    numberOfDays: 3,
    durationType: "Half-day",
    status: "Approved",
    reason: "Post-operation recovery.",
    requestedOn: "11/02/2024",
    approvedBy: "Mr. Mark Brown",
    approvalDate: "11/03/2024",
  },
  {
    id: "10",
    employeeName: "Ms. Ricardo Wendler",
    employeeImage: "/assets/images/user/user10.jpg",
    employeeId: "T132",
    department: "Science",
    leaveType: "Maternity Leave",
    leaveFrom: "12/01/2024",
    leaveTo: "01/01/2025",
    numberOfDays: 31,
    durationType: "Full-day",
    status: "Rejected",
    reason: "Pregnancy and childbirth.",
    requestedOn: "11/01/2024",
    approvedBy: "",
    approvalDate: "",
  },
];

const columns: ColumnDef<LeaveRequest>[] = [
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
    accessorKey: "employeeName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Employee Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={row.original.employeeImage} />
          <AvatarFallback>
            {row.original.employeeName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{row.original.employeeName}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "employeeId",
    header: "Employee ID",
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Building className="h-4 w-4 text-muted-foreground" />
        {row.original.department}
      </div>
    ),
  },
  {
    accessorKey: "leaveType",
    header: "Leave Type",
  },
  {
    accessorKey: "leaveFrom",
    header: "Leave From",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {row.original.leaveFrom}
      </div>
    ),
  },
  {
    accessorKey: "leaveTo",
    header: "Leave To",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {row.original.leaveTo}
      </div>
    ),
  },
  {
    accessorKey: "numberOfDays",
    header: "Number of Days",
  },
  {
    accessorKey: "durationType",
    header: "Duration Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = {
        Approved: "default",
        Pending: "secondary",
        Rejected: "destructive",
      }[status];

      const Icon = {
        Approved: CheckCircle,
        Pending: Clock,
        Rejected: XCircle,
      }[status];

      return (
        <Badge variant={variant as any} className="gap-1">
          <Icon className="h-3 w-3" />
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.original.reason}</div>
    ),
  },
  {
    accessorKey: "requestedOn",
    header: "Requested On",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {row.original.requestedOn}
      </div>
    ),
  },
  {
    accessorKey: "approvedBy",
    header: "Approved By",
    cell: ({ row }) =>
      row.original.approvedBy ? (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          {row.original.approvedBy}
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      ),
  },
  {
    accessorKey: "approvalDate",
    header: "Approval Date",
    cell: ({ row }) =>
      row.original.approvalDate ? (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {row.original.approvalDate}
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      ),
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

export default function EmployeeLeaveRequestsPage() {
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
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard/main">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>HR</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Leave Requests</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Leave Requests
            </h1>
            <p className="text-muted-foreground">
              Manage and review employee leave requests
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl">Leave Requests</CardTitle>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  className="pl-9"
                  value={
                    (table
                      .getColumn("employeeName")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("employeeName")
                      ?.setFilterValue(event.target.value)
                  }
                />
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Leave
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Leave Request</DialogTitle>
                      <DialogDescription>
                        Create a new leave request for an employee.
                      </DialogDescription>
                    </DialogHeader>
                    {/* Add leave form would go here */}
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>

                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {["Approved", "Pending", "Rejected"].map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => {
                          table.getColumn("status")?.setFilterValue(status);
                        }}
                      >
                        {status}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        table.getColumn("status")?.setFilterValue("");
                      }}
                    >
                      Clear Filters
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

          {/* Pagination and Selection Info */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
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
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Requests
                </p>
                <p className="text-2xl font-bold">{data.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Approved
                </p>
                <p className="text-2xl font-bold">
                  {data.filter((r) => r.status === "Approved").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending
                </p>
                <p className="text-2xl font-bold">
                  {data.filter((r) => r.status === "Pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Rejected
                </p>
                <p className="text-2xl font-bold">
                  {data.filter((r) => r.status === "Rejected").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
