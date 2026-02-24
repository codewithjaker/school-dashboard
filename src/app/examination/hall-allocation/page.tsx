"use client";

import { useState, useMemo } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  RowSelectionState,
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Home,
  Search,
  Filter,
  PlusCircle,
  RefreshCw,
  Download,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
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

// Define the data type
export type HallAllocation = {
  id: string;
  examName: string;
  studentName: string;
  rollNo: string;
  hallNo: string;
  seatNo: string;
  examType: "Mid-Term" | "Final" | "Entrance";
};

// Mock data
const data: HallAllocation[] = [
  {
    id: "1",
    examName: "Mid-Term Jan 2024",
    studentName: "John Doe",
    rollNo: "CS101",
    hallNo: "Hall A",
    seatNo: "S1",
    examType: "Mid-Term",
  },
  {
    id: "2",
    examName: "Mid-Term Jan 2024",
    studentName: "Jane Smith",
    rollNo: "CS102",
    hallNo: "Hall A",
    seatNo: "S2",
    examType: "Mid-Term",
  },
  {
    id: "3",
    examName: "Mid-Term Jan 2024",
    studentName: "Robert Brown",
    rollNo: "CS103",
    hallNo: "Hall A",
    seatNo: "S3",
    examType: "Mid-Term",
  },
  {
    id: "4",
    examName: "Mid-Term Jan 2024",
    studentName: "Emily Davis",
    rollNo: "CS104",
    hallNo: "Hall B",
    seatNo: "S1",
    examType: "Mid-Term",
  },
  {
    id: "5",
    examName: "Mid-Term Jan 2024",
    studentName: "Michael Wilson",
    rollNo: "CS105",
    hallNo: "Hall B",
    seatNo: "S2",
    examType: "Mid-Term",
  },
  {
    id: "6",
    examName: "Final Exam May 2024",
    studentName: "Sarah Miller",
    rollNo: "ME201",
    hallNo: "Hall C",
    seatNo: "A10",
    examType: "Final",
  },
  {
    id: "7",
    examName: "Final Exam May 2024",
    studentName: "David Taylor",
    rollNo: "ME202",
    hallNo: "Hall C",
    seatNo: "A11",
    examType: "Final",
  },
  {
    id: "8",
    examName: "Final Exam May 2024",
    studentName: "Linda Garcia",
    rollNo: "ME203",
    hallNo: "Hall C",
    seatNo: "A12",
    examType: "Final",
  },
  {
    id: "9",
    examName: "Entrance Test 2024",
    studentName: "James Anderson",
    rollNo: "ENT001",
    hallNo: "Main Hall",
    seatNo: "M01",
    examType: "Entrance",
  },
  {
    id: "10",
    examName: "Entrance Test 2024",
    studentName: "Barbara Thomas",
    rollNo: "ENT002",
    hallNo: "Main Hall",
    seatNo: "M02",
    examType: "Entrance",
  },
];

export default function HallAllocationPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState({});

  const columns: ColumnDef<HallAllocation>[] = [
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
      header: "Exam Name",
      cell: ({ row }) => {
        const examType = row.original.examType;
        return (
          <div className="flex flex-col gap-1">
            <span>{row.getValue("examName")}</span>
            <Badge variant="outline" className="w-fit">
              {examType}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "studentName",
      header: "Student Name",
      cell: ({ row }) => <div>{row.getValue("studentName")}</div>,
    },
    {
      accessorKey: "rollNo",
      header: "Roll No",
      cell: ({ row }) => (
        <div className="font-mono">{row.getValue("rollNo")}</div>
      ),
    },
    {
      accessorKey: "hallNo",
      header: "Hall No",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("hallNo")}</div>
      ),
    },
    {
      accessorKey: "seatNo",
      header: "Seat No",
      cell: ({ row }) => (
        <div className="font-medium text-primary">{row.getValue("seatNo")}</div>
      ),
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

  const handleEdit = (id: string) => {
    console.log("Edit:", id);
    // Implement edit logic
  };

  const handleDelete = (id: string) => {
    console.log("Delete:", id);
    // Implement delete logic
  };

  const handleBulkDelete = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    console.log(
      "Bulk delete:",
      selectedRows.map((row) => row.original.id),
    );
    // Implement bulk delete logic
  };

  const handleExport = () => {
    console.log("Export data");
    // Implement export logic
  };

  const handleAddNew = () => {
    console.log("Add new allocation");
    // Implement add new logic
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard/main">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Examination</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Hall Allocation</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hall Allocation</h1>
          <p className="text-muted-foreground">
            Manage examination hall and seat allocations for students
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <CardTitle>Hall Allocations</CardTitle>
              <CardDescription>
                View and manage hall allocations for examinations
              </CardDescription>
            </div>

            {Object.keys(rowSelection).length > 0 && (
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete Selected ({Object.keys(rowSelection).length})
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-auto sm:flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search allocations..."
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
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
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

              <Button
                variant="outline"
                size="icon"
                onClick={() => table.resetSorting()}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>

              <Button onClick={handleAddNew} className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Add New
              </Button>

              <Button
                variant="outline"
                onClick={handleExport}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export
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
                      No results found.
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
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
