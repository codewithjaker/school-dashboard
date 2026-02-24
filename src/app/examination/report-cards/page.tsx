"use client";
import { useState } from "react";

import { Input } from "@/components/ui/input";

import { Plus, RefreshCw, Download, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

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
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
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

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export type ReportCard = {
  id: string;
  studentName: string;
  rollNo: string;
  examName: string;
  totalMarks: number;
  percentage: number;
  grade: string;
  result: "Pass" | "Fail";
};

const data: ReportCard[] = [
  {
    id: "1",
    studentName: "John Doe",
    rollNo: "CS101",
    examName: "Mid-Term Jan 2024",
    totalMarks: 450,
    percentage: 90,
    grade: "A+",
    result: "Pass",
  },
  {
    id: "2",
    studentName: "Jane Smith",
    rollNo: "CS102",
    examName: "Mid-Term Jan 2024",
    totalMarks: 420,
    percentage: 84,
    grade: "A",
    result: "Pass",
  },
  {
    id: "3",
    studentName: "Robert Brown",
    rollNo: "CS103",
    examName: "Mid-Term Jan 2024",
    totalMarks: 380,
    percentage: 76,
    grade: "B+",
    result: "Pass",
  },
  {
    id: "4",
    studentName: "Emily Davis",
    rollNo: "CS104",
    examName: "Mid-Term Jan 2024",
    totalMarks: 350,
    percentage: 70,
    grade: "B",
    result: "Pass",
  },
  {
    id: "5",
    studentName: "Michael Wilson",
    rollNo: "CS105",
    examName: "Mid-Term Jan 2024",
    totalMarks: 280,
    percentage: 56,
    grade: "C",
    result: "Pass",
  },
  {
    id: "6",
    studentName: "Sarah Miller",
    rollNo: "ME201",
    examName: "Final Exam May 2024",
    totalMarks: 480,
    percentage: 96,
    grade: "O",
    result: "Pass",
  },
  {
    id: "7",
    studentName: "David Taylor",
    rollNo: "ME202",
    examName: "Final Exam May 2024",
    totalMarks: 410,
    percentage: 82,
    grade: "A",
    result: "Pass",
  },
  {
    id: "8",
    studentName: "Linda Garcia",
    rollNo: "ME203",
    examName: "Final Exam May 2024",
    totalMarks: 150,
    percentage: 30,
    grade: "F",
    result: "Fail",
  },
];

const columns: ColumnDef<ReportCard>[] = [
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
        >
          Student Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("studentName")}</div>
    ),
  },
  {
    accessorKey: "rollNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Roll No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "examName",
    header: "Exam Name",
  },
  {
    accessorKey: "totalMarks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Marks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const totalMarks = parseFloat(row.getValue("totalMarks"));
      return <div className="font-medium">{totalMarks}</div>;
    },
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Percentage (%)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const percentage = parseFloat(row.getValue("percentage"));
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">{percentage}%</span>
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => {
      const grade = row.getValue("grade") as string;
      const gradeColors: Record<string, string> = {
        O: "bg-green-100 text-green-800 hover:bg-green-100",
        "A+": "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
        A: "bg-blue-100 text-blue-800 hover:bg-blue-100",
        "B+": "bg-cyan-100 text-cyan-800 hover:bg-cyan-100",
        B: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        C: "bg-orange-100 text-orange-800 hover:bg-orange-100",
        F: "bg-red-100 text-red-800 hover:bg-red-100",
      };
      return (
        <Badge variant="secondary" className={gradeColors[grade] || ""}>
          {grade}
        </Badge>
      );
    },
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => {
      const result = row.getValue("result") as "Pass" | "Fail";
      return (
        <Badge
          variant={result === "Pass" ? "default" : "destructive"}
          className={result === "Pass" ? "bg-green-500 hover:bg-green-600" : ""}
        >
          {result}
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

export default function ReportCardsPage() {
  const [search, setSearch] = useState("");
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
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/examination">Examination</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-foreground">
              Report Cards
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Content */}
      <div className="flex flex-col gap-6">
        {/* Header with Title and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Report Cards</h1>
            <p className="text-muted-foreground">
              View and manage student report cards and examination results
            </p>
          </div>
        </div>

        {/* Table Card */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Report Cards</CardTitle>
              {/* <TableHeader /> */}
              <div className="flex items-center gap-2">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search report cards..."
                    className="pl-9 w-[250px]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Show/Hide Columns */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem checked>
                      Student Name
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Roll No
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Exam Name
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Total Marks
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Percentage
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Grade
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Result
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Action Buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* <ReportCardsTable /> */}
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

              {/* Table Footer with Pagination */}
              <div className="flex items-center justify-between space-x-2 py-4 px-4">
                <div className="flex-1 text-sm text-muted-foreground">
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
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
