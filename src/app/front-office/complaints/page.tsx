"use client";

import React, { useState } from "react";
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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Search,
  Filter,
  PlusCircle,
  RefreshCw,
  Download,
  Edit,
  Trash2,
  Home,
  Calendar,
  Clock,
  MoreVertical,
  User,
  // Checkbox,
} from "lucide-react";
import { format } from "date-fns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Type definitions
type Complaint = {
  id: string;
  complainantName: string;
  complainantImage?: string;
  complainantType: "Parent" | "Student" | "Staff";
  complaintDate: Date;
  complaintTime: string;
  complaintDescription: string;
  status: "Resolved" | "In Progress" | "Closed" | "Open";
  department: string;
  assignedTo: string;
  resolutionDate: Date | null;
  priorityLevel: "Low" | "Medium" | "High";
};

// Sample data
const complaintsData: Complaint[] = [
  {
    id: "C001",
    complainantName: "Alice Johnson",
    complainantImage: "/images/user/user1.jpg",
    complainantType: "Parent",
    complaintDate: new Date("2024-11-20"),
    complaintTime: "09:00",
    complaintDescription: "The school lunch was cold and unappetizing.",
    status: "Resolved",
    department: "Administration",
    assignedTo: "John Smith",
    resolutionDate: new Date("2024-11-21"),
    priorityLevel: "Medium",
  },
  {
    id: "C002",
    complainantName: "David Brown",
    complainantImage: "/images/user/user2.jpg",
    complainantType: "Student",
    complaintDate: new Date("2024-11-21"),
    complaintTime: "13:15",
    complaintDescription: "The chemistry lab equipment is outdated and not working properly.",
    status: "In Progress",
    department: "Transportation",
    assignedTo: "Ms. Clara Green",
    resolutionDate: null,
    priorityLevel: "High",
  },
  {
    id: "C003",
    complainantName: "Sarah Miller",
    complainantImage: "/images/user/user3.jpg",
    complainantType: "Staff",
    complaintDate: new Date("2024-11-19"),
    complaintTime: "10:45",
    complaintDescription: "Inappropriate behavior from a student during class.",
    status: "Closed",
    department: "Administration",
    assignedTo: "Principal Adams",
    resolutionDate: new Date("2024-11-20"),
    priorityLevel: "Medium",
  },
  {
    id: "C004",
    complainantName: "Emily White",
    complainantImage: "/images/user/user4.jpg",
    complainantType: "Parent",
    complaintDate: new Date("2024-11-22"),
    complaintTime: "11:30",
    complaintDescription: "The school bus was late on multiple occasions.",
    status: "Open",
    department: "Transportation",
    assignedTo: "Mr. Alan Brown",
    resolutionDate: null,
    priorityLevel: "High",
  },
  {
    id: "C005",
    complainantName: "Michael Green",
    complainantImage: "/images/user/user5.jpg",
    complainantType: "Student",
    complaintDate: new Date("2024-11-21"),
    complaintTime: "14:00",
    complaintDescription: "The classroom is too noisy during study hours.",
    status: "In Progress",
    department: "Classroom",
    assignedTo: "Mr. Johnson",
    resolutionDate: null,
    priorityLevel: "Medium",
  },
  {
    id: "C006",
    complainantName: "Sophia Clark",
    complainantImage: "/images/user/user6.jpg",
    complainantType: "Parent",
    complaintDate: new Date("2024-11-22"),
    complaintTime: "10:30",
    complaintDescription: "The school's website is not user-friendly.",
    status: "Resolved",
    department: "IT Department",
    assignedTo: "Ms. Laura White",
    resolutionDate: new Date("2024-11-22"),
    priorityLevel: "Low",
  },
  {
    id: "C007",
    complainantName: "Alice Smith",
    complainantImage: "/images/user/user7.jpg",
    complainantType: "Parent",
    complaintDate: new Date("2024-11-23"),
    complaintTime: "09:15",
    complaintDescription: "My child has been bullied by other students.",
    status: "Open",
    department: "Human Resources",
    assignedTo: "Ms. Rebecca Turner",
    resolutionDate: null,
    priorityLevel: "High",
  },
  {
    id: "C008",
    complainantName: "Tom Williams",
    complainantImage: "/images/user/user8.jpg",
    complainantType: "Staff",
    complaintDate: new Date("2024-11-22"),
    complaintTime: "15:00",
    complaintDescription: "Insufficient resources in the library.",
    status: "In Progress",
    department: "Library",
    assignedTo: "Mr. Robert Lane",
    resolutionDate: null,
    priorityLevel: "Medium",
  },
  {
    id: "C009",
    complainantName: "Emily Carter",
    complainantImage: "/images/user/user9.jpg",
    complainantType: "Student",
    complaintDate: new Date("2024-11-21"),
    complaintTime: "11:45",
    complaintDescription: "The gym facilities are not well maintained.",
    status: "Resolved",
    department: "Facilities",
    assignedTo: "Mr. Steve Brown",
    resolutionDate: new Date("2024-11-22"),
    priorityLevel: "Medium",
  },
  {
    id: "C010",
    complainantName: "Brian Johnson",
    complainantImage: "/images/user/user10.jpg",
    complainantType: "Parent",
    complaintDate: new Date("2024-11-22"),
    complaintTime: "12:30",
    complaintDescription: "Lack of communication regarding school events.",
    status: "Open",
    department: "Administration",
    assignedTo: "Ms. Linda Smith",
    resolutionDate: null,
    priorityLevel: "Medium",
  },
];

// Column definitions for TanStack Table
const columns: ColumnDef<Complaint>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Com. ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "complainantName",
    header: "Complainant Name",
    cell: ({ row }) => {
      const complaint = row.original;
      return (
        <div className="flex items-center gap-3">
          {complaint.complainantImage ? (
            <img
              src={complaint.complainantImage}
              alt={complaint.complainantName}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <User className="h-4 w-4" />
            </div>
          )}
          <span>{complaint.complainantName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "complainantType",
    header: "Complainant Type",
  },
  {
    accessorKey: "complaintDate",
    header: "Complaint Date",
    cell: ({ row }) => {
      const date = row.getValue("complaintDate") as Date;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(date, "MM/dd/yyyy")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "complaintTime",
    header: "Complaint Time",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("complaintTime")}</span>
      </div>
    ),
  },
  {
    accessorKey: "complaintDescription",
    header: "Complaint Description",
    cell: ({ row }) => (
      <div className="max-w-xs truncate">{row.getValue("complaintDescription")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Complaint["status"];
      const statusColors = {
        Resolved: "bg-green-100 text-green-800 hover:bg-green-100",
        "In Progress": "bg-blue-100 text-blue-800 hover:bg-blue-100",
        Closed: "bg-amber-100 text-amber-800 hover:bg-amber-100",
        Open: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      };
      return (
        <Badge className={statusColors[status]} variant="secondary">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
  },
  {
    accessorKey: "resolutionDate",
    header: "Resolution Date",
    cell: ({ row }) => {
      const date = row.getValue("resolutionDate") as Date | null;
      return date ? (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(date, "MM/dd/yyyy")}</span>
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: "priorityLevel",
    header: "Priority Level",
    cell: ({ row }) => {
      const priority = row.getValue("priorityLevel") as Complaint["priorityLevel"];
      const priorityColors = {
        Low: "bg-green-100 text-green-800 hover:bg-green-100",
        Medium: "bg-purple-100 text-purple-800 hover:bg-purple-100",
        High: "bg-orange-100 text-orange-800 hover:bg-orange-100",
      };
      return (
        <Badge className={priorityColors[priority]} variant="secondary">
          {priority}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const complaint = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      );
    },
  },
];

export default function ComplaintsPage() {
  const [data, setData] = useState<Complaint[]>(complaintsData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

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
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  // Handle refresh data
  const handleRefresh = () => {
    // In a real app, you would fetch fresh data from your API
    setData([...complaintsData]);
  };

  // Handle export to XLSX
  const handleExport = () => {
    // In a real app, implement XLSX export logic
    console.log("Exporting data...");
  };

  // Handle delete selected
  const handleDeleteSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    if (selectedRows.length > 0) {
      const selectedIds = selectedRows.map((row) => row.original.id);
      const newData = data.filter((item) => !selectedIds.includes(item.id));
      setData(newData);
      setRowSelection({});
    }
  };

  return (
    <div className="container mx-auto py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/front-office">Front Office</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/front-office/complaints">Complaints</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Complaints</h1>
        <p className="text-muted-foreground">
          Manage and track all complaints from students, parents, and staff
        </p>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl">Complaints Management</CardTitle>
            
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search complaints..."
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Delete Selected */}
                {Object.keys(rowSelection).length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeleteSelected}
                    className="text-destructive border-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete ({Object.keys(rowSelection).length})
                  </Button>
                )}

                {/* Show/Hide Columns */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Columns
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {table
                      .getAllColumns()
                      .filter(
                        (column) =>
                          typeof column.accessorFn !== "undefined" && column.getCanHide()
                      )
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

                {/* Add Complaint */}
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Complaint
                </Button>

                {/* Refresh */}
                <Button variant="outline" size="icon" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </Button>

                {/* Export */}
                <Button variant="outline" size="icon" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
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
                                header.getContext()
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
                            cell.getContext()
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
                      No complaints found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination and Row Count */}
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              {table.getFilteredRowModel().rows.length === 0
                ? 0
                : table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                  1}{" "}
              to{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{" "}
              of {table.getFilteredRowModel().rows.length} complaints
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
                    <SelectValue placeholder={table.getState().pagination.pageSize} />
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

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Actions (hidden on desktop) */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
              <MoreVertical className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top">
            <DropdownMenuItem onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Complaint
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}