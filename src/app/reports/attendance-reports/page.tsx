"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";



import * as React from "react";
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Download,
  Filter,
  MoreVertical,
  RefreshCw,
  Search,
  Trash2,
  Eye,
  Calendar,
  User,
  Edit,
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

export type AttendanceReport = {
  id: string;
  reportType:
    | "Monthly Attendance"
    | "Weekly Attendance"
    | "Term Attendance"
    | "Daily Attendance"
    | "Subject Wise Attendance"
    | "Student Wise Attendance"
    | "Defaulter List";
  className: string;
  dateFrom: Date;
  dateTo: Date;
  attendancePercentage: number;
  generatedBy: {
    name: string;
    image: string;
  };
  dateGenerated: Date;
  status: "Completed" | "Pending" | "In Progress";
};

const data: AttendanceReport[] = [
  {
    id: "1",
    reportType: "Monthly Attendance",
    className: "Class 10-A",
    dateFrom: new Date("2024-11-01"),
    dateTo: new Date("2024-11-30"),
    attendancePercentage: 95.5,
    generatedBy: {
      name: "John Doe",
      image: "/assets/images/user/user1.jpg",
    },
    dateGenerated: new Date("2024-12-01"),
    status: "Completed",
  },
  {
    id: "2",
    reportType: "Weekly Attendance",
    className: "Class 9-B",
    dateFrom: new Date("2024-12-01"),
    dateTo: new Date("2024-12-07"),
    attendancePercentage: 92,
    generatedBy: {
      name: "Sarah Smith",
      image: "/assets/images/user/user2.jpg",
    },
    dateGenerated: new Date("2024-12-08"),
    status: "Completed",
  },
  {
    id: "3",
    reportType: "Term Attendance",
    className: "Class 12-A",
    dateFrom: new Date("2024-09-01"),
    dateTo: new Date("2024-11-30"),
    attendancePercentage: 88.5,
    generatedBy: {
      name: "Mike Johnson",
      image: "/assets/images/user/user3.jpg",
    },
    dateGenerated: new Date("2024-12-10"),
    status: "Pending",
  },
  {
    id: "4",
    reportType: "Daily Attendance",
    className: "Class 8-C",
    dateFrom: new Date("2024-12-15"),
    dateTo: new Date("2024-12-15"),
    attendancePercentage: 98,
    generatedBy: {
      name: "Emily Davis",
      image: "/assets/images/user/user4.jpg",
    },
    dateGenerated: new Date("2024-12-15"),
    status: "Completed",
  },
  {
    id: "5",
    reportType: "Monthly Attendance",
    className: "Class 11-B",
    dateFrom: new Date("2024-11-01"),
    dateTo: new Date("2024-11-30"),
    attendancePercentage: 94.2,
    generatedBy: {
      name: "David Wilson",
      image: "/assets/images/user/user5.jpg",
    },
    dateGenerated: new Date("2024-12-02"),
    status: "Completed",
  },
  {
    id: "6",
    reportType: "Subject Wise Attendance",
    className: "Class 7-A",
    dateFrom: new Date("2024-11-01"),
    dateTo: new Date("2024-11-30"),
    attendancePercentage: 90.5,
    generatedBy: {
      name: "Lisa Brown",
      image: "/assets/images/user/user6.jpg",
    },
    dateGenerated: new Date("2024-12-15"),
    status: "In Progress",
  },
  {
    id: "7",
    reportType: "Student Wise Attendance",
    className: "Class 10-B",
    dateFrom: new Date("2024-11-01"),
    dateTo: new Date("2024-11-30"),
    attendancePercentage: 85,
    generatedBy: {
      name: "Robert Taylor",
      image: "/assets/images/user/user7.jpg",
    },
    dateGenerated: new Date("2024-12-14"),
    status: "Completed",
  },
  {
    id: "8",
    reportType: "Monthly Attendance",
    className: "Class 9-A",
    dateFrom: new Date("2024-11-01"),
    dateTo: new Date("2024-11-30"),
    attendancePercentage: 96.8,
    generatedBy: {
      name: "Jennifer White",
      image: "/assets/images/user/user8.jpg",
    },
    dateGenerated: new Date("2024-12-03"),
    status: "Completed",
  },
  {
    id: "9",
    reportType: "Defaulter List",
    className: "Class 12-C",
    dateFrom: new Date("2024-11-01"),
    dateTo: new Date("2024-11-30"),
    attendancePercentage: 65,
    generatedBy: {
      name: "William Clark",
      image: "/assets/images/user/user9.jpg",
    },
    dateGenerated: new Date("2024-12-12"),
    status: "Pending",
  },
  {
    id: "10",
    reportType: "Monthly Attendance",
    className: "Class 8-A",
    dateFrom: new Date("2024-11-01"),
    dateTo: new Date("2024-11-30"),
    attendancePercentage: 93,
    generatedBy: {
      name: "Amanda Lee",
      image: "/assets/images/user/user10.jpg",
    },
    dateGenerated: new Date("2024-12-04"),
    status: "Completed",
  },
];

export default function AttendanceReportsPage() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      [],
    );
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");
  
    const columns: ColumnDef<AttendanceReport>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
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
        accessorKey: "className",
        header: "Class",
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
        accessorKey: "attendancePercentage",
        header: "Attendance %",
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("attendancePercentage")}%
          </div>
        ),
      },
      {
        accessorKey: "generatedBy",
        header: "Generated By",
        cell: ({ row }) => {
          const generatedBy = row.getValue(
            "generatedBy",
          ) as AttendanceReport["generatedBy"];
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={generatedBy.image}
                        alt={generatedBy.name}
                      />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span>{generatedBy.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generated by {generatedBy.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        },
      },
      {
        accessorKey: "dateGenerated",
        header: "Date",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            {format(row.getValue("dateGenerated"), "MM/dd/yyyy")}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as AttendanceReport["status"];
          const variant = {
            Completed: "default",
            Pending: "secondary",
            "In Progress": "outline",
          }[status];
  
          return <Badge variant={variant as any}>{status}</Badge>;
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
  
    const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      onGlobalFilterChange: setGlobalFilter,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        globalFilter,
      },
    });
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/admin/dashboard/main"
              className="flex items-center gap-1"
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
            <BreadcrumbPage>Attendance Reports</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <AttendanceReportsTable /> */}
           <div className="space-y-4">
      {/* Table Header with Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-9"
            />
          </div>

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
        </div>

        <div className="flex items-center gap-2">
          {Object.keys(rowSelection).length > 0 && (
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          )}
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
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
                  No reports found.
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Rows per page</span>
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
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
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
