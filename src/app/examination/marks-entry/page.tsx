"use client";

import { useState, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  RowSelectionState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Edit,
  Trash2,
  PlusCircle,
  RefreshCw,
  Download,
  Filter,
  Search,
  Home,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Types
export type MarksEntry = {
  id: string;
  examName: string;
  studentName: string;
  rollNo: string;
  subject: string;
  marksObtained: number;
  maxMarks: number;
  status: "Passed" | "Failed";
};

// Sample Data
const data: MarksEntry[] = [
  {
    id: "1",
    examName: "Mid-Term Jan 2024",
    studentName: "John Doe",
    rollNo: "CS101",
    subject: "Mathematics",
    marksObtained: 85,
    maxMarks: 100,
    status: "Passed",
  },
  {
    id: "2",
    examName: "Mid-Term Jan 2024",
    studentName: "Jane Smith",
    rollNo: "CS102",
    subject: "Mathematics",
    marksObtained: 92,
    maxMarks: 100,
    status: "Passed",
  },
  {
    id: "3",
    examName: "Mid-Term Jan 2024",
    studentName: "Robert Brown",
    rollNo: "CS103",
    subject: "Mathematics",
    marksObtained: 45,
    maxMarks: 100,
    status: "Failed",
  },
  {
    id: "4",
    examName: "Mid-Term Jan 2024",
    studentName: "Emily Davis",
    rollNo: "CS104",
    subject: "Physics",
    marksObtained: 78,
    maxMarks: 100,
    status: "Passed",
  },
  {
    id: "5",
    examName: "Mid-Term Jan 2024",
    studentName: "Michael Wilson",
    rollNo: "CS105",
    subject: "Physics",
    marksObtained: 25,
    maxMarks: 100,
    status: "Failed",
  },
  {
    id: "6",
    examName: "Final Exam May 2024",
    studentName: "Sarah Miller",
    rollNo: "ME201",
    subject: "Thermodynamics",
    marksObtained: 88,
    maxMarks: 100,
    status: "Passed",
  },
  {
    id: "7",
    examName: "Final Exam May 2024",
    studentName: "David Taylor",
    rollNo: "ME202",
    subject: "Thermodynamics",
    marksObtained: 95,
    maxMarks: 100,
    status: "Passed",
  },
  {
    id: "8",
    examName: "Final Exam May 2024",
    studentName: "Linda Garcia",
    rollNo: "ME203",
    subject: "Thermodynamics",
    marksObtained: 38,
    maxMarks: 100,
    status: "Failed",
  },
  {
    id: "9",
    examName: "Internal Assessment 1",
    studentName: "James Anderson",
    rollNo: "EC301",
    subject: "Digital Logic",
    marksObtained: 18,
    maxMarks: 20,
    status: "Passed",
  },
  {
    id: "10",
    examName: "Internal Assessment 1",
    studentName: "Barbara Thomas",
    rollNo: "EC302",
    subject: "Digital Logic",
    marksObtained: 15,
    maxMarks: 20,
    status: "Passed",
  },
  {
    id: "11",
    examName: "Mid-Term Jan 2024",
    studentName: "William Clark",
    rollNo: "CS106",
    subject: "Chemistry",
    marksObtained: 65,
    maxMarks: 100,
    status: "Passed",
  },
  {
    id: "12",
    examName: "Final Exam May 2024",
    studentName: "Jessica Lee",
    rollNo: "ME204",
    subject: "Fluid Mechanics",
    marksObtained: 42,
    maxMarks: 100,
    status: "Failed",
  },
];

export default function MarksEntryPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  // Define columns
  const columns: ColumnDef<MarksEntry>[] = [
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
      accessorKey: "examName",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Exam Name
            {isSorted === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("examName")}</div>
      ),
    },
    {
      accessorKey: "studentName",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Student Name
            {isSorted === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
    },
    {
      accessorKey: "rollNo",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Roll No
            {isSorted === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
    },
    {
      accessorKey: "subject",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Subject
            {isSorted === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
    },
    {
      accessorKey: "marksObtained",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Marks Obtained
            {isSorted === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.getValue("marksObtained")}</div>
        );
      },
    },
    {
      accessorKey: "maxMarks",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Max Marks
            {isSorted === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("maxMarks")}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Status
            {isSorted === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as "Passed" | "Failed";
        return (
          <Badge
            variant={status === "Passed" ? "default" : "destructive"}
            className="capitalize"
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const marksEntry = row.original;
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={() => handleEdit(marksEntry)}
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
                onClick={() => handleDelete(marksEntry.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  marks entry for {marksEntry.studentName} in{" "}
                  {marksEntry.subject}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>;
      },
    },
  ];

  // Initialize table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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

  // Handlers
  const handleEdit = (marksEntry: MarksEntry) => {
    console.log("Edit marks entry:", marksEntry);
    // Implement edit logic
  };

  const handleDelete = (id: string) => {
    console.log("Delete marks entry:", id);
    // Implement delete logic
  };

  const handleAddNew = () => {
    console.log("Add new marks entry");
    // Implement add logic
  };

  const handleRefresh = () => {
    console.log("Refresh data");
    // Implement refresh logic
  };

  const handleDownload = () => {
    console.log("Download data");
    // Implement download logic
  };

  const handleDeleteSelected = () => {
    const selectedIds = Object.keys(rowSelection).map(
      (index) => data[parseInt(index)]?.id,
    );
    console.log("Delete selected:", selectedIds);
    // Implement bulk delete logic
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
            <BreadcrumbLink>Examination</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Marks Entry</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marks Entry</h1>
          <p className="text-muted-foreground">
            Manage student marks and examination results
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader className="px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Marks Records</CardTitle>
              <CardDescription>
                View, edit, and manage student examination marks
              </CardDescription>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {Object.keys(rowSelection).length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Selected
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Selected Items</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        {Object.keys(rowSelection).length} selected items? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteSelected}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              <Button onClick={handleAddNew} size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6">
          {/* Table Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            {/* Search */}
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search marks entries..."
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2">
              {/* Column Visibility */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Columns
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

              {/* Action Buttons */}
              <Button variant="outline" size="icon" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Refresh</span>
              </Button>

              <Button variant="outline" size="icon" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Rows per page
                </span>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent>
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

                <div className="text-sm text-muted-foreground">
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
    </div>
  );
}
