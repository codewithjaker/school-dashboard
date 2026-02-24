"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  // getPagedRowModel,
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  Home,
  Search,
  PlusCircle,
  RefreshCw,
  Download,
  Filter,
  Edit,
  Trash2,
  Calendar,
  MoreVertical,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
type Allocation = {
  id: string;
  studentName: string;
  rollNo: string;
  hostelName: string;
  roomNo: string;
  roomType: "Single" | "Double" | "Triple";
  allocationDate: Date;
  status: "Active" | "Inactive";
  studentImage: string;
};

// Mock data
const allocationsData: Allocation[] = [
  {
    id: "1",
    studentName: "John Doe",
    rollNo: "STU001",
    hostelName: "Sunrise Hostel",
    roomNo: "101",
    roomType: "Single",
    allocationDate: new Date(2025, 0, 10),
    status: "Active",
    studentImage: "/api/placeholder/32/32",
  },
  {
    id: "2",
    studentName: "Jane Smith",
    rollNo: "STU002",
    hostelName: "Sunrise Hostel",
    roomNo: "102",
    roomType: "Double",
    allocationDate: new Date(2025, 0, 12),
    status: "Active",
    studentImage: "/api/placeholder/32/32",
  },
  {
    id: "3",
    studentName: "Robert Brown",
    rollNo: "STU003",
    hostelName: "Sunset Villa",
    roomNo: "201",
    roomType: "Triple",
    allocationDate: new Date(2025, 0, 15),
    status: "Inactive",
    studentImage: "/api/placeholder/32/32",
  },
  {
    id: "4",
    studentName: "Emily Davis",
    rollNo: "STU004",
    hostelName: "Sunset Villa",
    roomNo: "202",
    roomType: "Single",
    allocationDate: new Date(2025, 0, 18),
    status: "Active",
    studentImage: "/api/placeholder/32/32",
  },
  {
    id: "5",
    studentName: "Michael Wilson",
    rollNo: "STU005",
    hostelName: "Sunrise Hostel",
    roomNo: "103",
    roomType: "Double",
    allocationDate: new Date(2025, 0, 20),
    status: "Active",
    studentImage: "/api/placeholder/32/32",
  },
  {
    id: "6",
    studentName: "Sarah Parker",
    rollNo: "STU006",
    hostelName: "Sunrise Hostel",
    roomNo: "104",
    roomType: "Single",
    allocationDate: new Date(2025, 0, 22),
    status: "Active",
    studentImage: "/api/placeholder/32/32",
  },
  {
    id: "7",
    studentName: "David Lee",
    rollNo: "STU007",
    hostelName: "Sunset Villa",
    roomNo: "203",
    roomType: "Double",
    allocationDate: new Date(2025, 0, 25),
    status: "Active",
    studentImage: "/api/placeholder/32/32",
  },
  {
    id: "8",
    studentName: "Emma Watson",
    rollNo: "STU008",
    hostelName: "Sunset Villa",
    roomNo: "204",
    roomType: "Triple",
    allocationDate: new Date(2025, 0, 28),
    status: "Inactive",
    studentImage: "/api/placeholder/32/32",
  },
  {
    id: "9",
    studentName: "Chris Evans",
    rollNo: "STU009",
    hostelName: "Sunrise Hostel",
    roomNo: "105",
    roomType: "Single",
    allocationDate: new Date(2025, 1, 1),
    status: "Active",
    studentImage: "/api/placeholder/32/32",
  },
  {
    id: "10",
    studentName: "Jessica Alba",
    rollNo: "STU010",
    hostelName: "Sunset Villa",
    roomNo: "205",
    roomType: "Double",
    allocationDate: new Date(2025, 1, 5),
    status: "Active",
    studentImage: "/api/placeholder/32/32",
  },
];

// Define columns
const columns: ColumnDef<Allocation>[] = [
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
    accessorKey: "studentName",
    header: "Student Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.original.studentImage} />
          <AvatarFallback>
            {row.original.studentName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{row.original.studentName}</span>
      </div>
    ),
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
    accessorKey: "roomType",
    header: "Room Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.roomType}
      </Badge>
    ),
  },
  {
    accessorKey: "allocationDate",
    header: "Allocation Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>{format(row.original.allocationDate, "MM/dd/yyyy")}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={
            status === "Active"
              ? "bg-green-500/10 text-green-700 hover:bg-green-500/20"
              : "bg-orange-500/10 text-orange-700 hover:bg-orange-500/20"
          }
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

export default function AllocationsPage() {
  const [data, setData] = useState<Allocation[]>(allocationsData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});

  // Initialize table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
      columnVisibility,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getPagedRowModel: getPagedRowModel(),
  });

  // Handler functions
  const handleEdit = (allocation: Allocation) => {
    console.log("Edit allocation:", allocation);
    // Implement edit logic
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this allocation?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleViewDetails = (allocation: Allocation) => {
    console.log("View details:", allocation);
    // Implement view details logic
  };

  const handleAddNew = () => {
    console.log("Add new allocation");
    // Implement add new logic
  };

  const handleRefresh = () => {
    console.log("Refreshing data");
    // Implement refresh logic
  };

  const handleExport = () => {
    console.log("Exporting data");
    // Implement export logic
  };

  const handleDeleteSelected = () => {
    const selectedIds = Object.keys(rowSelection);
    if (selectedIds.length === 0) return;

    if (confirm(`Delete ${selectedIds.length} selected allocations?`)) {
      setData((prev) =>
        prev.filter((_, index) => !rowSelection[index.toString()]),
      );
      setRowSelection({});
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/hostel">Hostel</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/hostel/allocations">
                Allocations
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Allocations</h1>
          <p className="text-muted-foreground">
            Manage student hostel room allocations
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Allocation List</CardTitle>
              <CardDescription>
                View and manage all hostel room allocations
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {Object.keys(rowSelection).length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteSelected}
                  className="gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Selected ({Object.keys(rowSelection).length})
                </Button>
              )}
              <Button
                variant="default"
                size="sm"
                onClick={handleAddNew}
                className="gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                Add Allocation
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search allocations..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Show/Hide Columns</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
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
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                title="Refresh"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Refresh</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleExport}
                title="Export to Excel"
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Export</span>
              </Button>
            </div>
          </div>

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
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
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
              <span className="text-sm">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
