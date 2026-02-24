// app/examination/exam-schedule/page.tsx
"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Filter,
  Home,
  MoreHorizontal,
  PlusCircle,
  RefreshCw,
  Search,
  Trash2,
  Edit,
  Calendar,
  Clock,
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

type ExamSchedule = {
  id: string;
  examType: string;
  course: string;
  semester: string;
  subject: string;
  examDate: string;
  startTime: string;
  endTime: string;
  roomNo: string;
};

const data: ExamSchedule[] = [
  {
    id: "1",
    examType: "Internal Assessment 1",
    course: "B.Tech",
    semester: "Sem 1",
    subject: "Mathematics I",
    examDate: "01/15/2024",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    roomNo: "101",
  },
  {
    id: "2",
    examType: "Internal Assessment 1",
    course: "B.Tech",
    semester: "Sem 1",
    subject: "Physics I",
    examDate: "01/16/2024",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    roomNo: "102",
  },
  {
    id: "3",
    examType: "Internal Assessment 1",
    course: "B.Tech",
    semester: "Sem 1",
    subject: "Chemistry I",
    examDate: "01/17/2024",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    roomNo: "103",
  },
  {
    id: "4",
    examType: "Internal Assessment 2",
    course: "MBA",
    semester: "Sem 2",
    subject: "Marketing Management",
    examDate: "02/10/2024",
    startTime: "02:00 PM",
    endTime: "03:30 PM",
    roomNo: "201",
  },
  {
    id: "5",
    examType: "Internal Assessment 2",
    course: "MBA",
    semester: "Sem 2",
    subject: "Financial Accounting",
    examDate: "02/11/2024",
    startTime: "02:00 PM",
    endTime: "03:30 PM",
    roomNo: "202",
  },
  {
    id: "6",
    examType: "Mid-Term Examination",
    course: "B.Com",
    semester: "Sem 3",
    subject: "Business Law",
    examDate: "03/05/2024",
    startTime: "10:00 AM",
    endTime: "01:00 PM",
    roomNo: "301",
  },
  {
    id: "7",
    examType: "Mid-Term Examination",
    course: "B.Com",
    semester: "Sem 3",
    subject: "Corporate Accounting",
    examDate: "03/06/2024",
    startTime: "10:00 AM",
    endTime: "01:00 PM",
    roomNo: "302",
  },
  {
    id: "8",
    examType: "End-Term Examination",
    course: "B.Tech",
    semester: "Sem 4",
    subject: "Data Structures",
    examDate: "05/20/2024",
    startTime: "10:00 AM",
    endTime: "01:00 PM",
    roomNo: "401",
  },
  {
    id: "9",
    examType: "End-Term Examination",
    course: "B.Tech",
    semester: "Sem 4",
    subject: "Operating Systems",
    examDate: "05/22/2024",
    startTime: "10:00 AM",
    endTime: "01:00 PM",
    roomNo: "402",
  },
  {
    id: "10",
    examType: "Practical Examination",
    course: "B.Tech",
    semester: "Sem 4",
    subject: "DS Lab",
    examDate: "05/25/2024",
    startTime: "09:00 AM",
    endTime: "12:00 PM",
    roomNo: "Lab 1",
  },
];

const columns: ColumnDef<ExamSchedule>[] = [
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
    accessorKey: "examType",
    header: "Exam Type",
    cell: ({ row }) => {
      const type = row.getValue("examType") as string;
      let variant: "default" | "secondary" | "destructive" | "outline" =
        "secondary";

      if (type.includes("Internal")) variant = "secondary";
      else if (type.includes("Mid-Term")) variant = "default";
      else if (type.includes("End-Term")) variant = "destructive";
      else if (type.includes("Practical")) variant = "outline";

      return (
        <Badge variant={variant} className="text-xs">
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "semester",
    header: "Semester",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "examDate",
    header: "Exam Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("examDate")}</span>
      </div>
    ),
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("startTime")}</span>
      </div>
    ),
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("endTime")}</span>
      </div>
    ),
  },
  {
    accessorKey: "roomNo",
    header: "Room No",
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

const ExamSchedulePage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState({});

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleEdit = (exam: ExamSchedule) => {
    // Implement edit functionality
    console.log("Edit exam:", exam);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log("Delete exam:", id);
  };

  const handleAdd = () => {
    // Implement add functionality
    console.log("Add new exam schedule");
  };

  const handleRefresh = () => {
    // Implement refresh functionality
    console.log("Refresh data");
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log("Download as XLSX");
  };

  const handleDeleteSelected = () => {
    // Implement delete selected functionality
    console.log("Delete selected:", Object.keys(rowSelection));
  };

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
            <BreadcrumbLink href="#">Examination</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Exam Schedule</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Exam Schedule</CardTitle>
              <CardDescription>
                Manage and view all exam schedules
              </CardDescription>
            </div>

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
                      <AlertDialogTitle>
                        Delete Selected Schedules
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete the selected exam
                        schedules? This action cannot be undone.
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

              <Button onClick={handleAdd}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Schedule
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Table Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8 w-full sm:w-[300px]"
                value={
                  (table.getColumn("subject")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("subject")?.setFilterValue(event.target.value)
                }
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
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

              <Button variant="outline" size="icon" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" onClick={handleDownload}>
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

          {/* Pagination and Rows per page */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                  <SelectTrigger className="w-[80px]">
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
                    <span className="text-sm">
                      Page {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()}
                    </span>
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
};

export default ExamSchedulePage;
