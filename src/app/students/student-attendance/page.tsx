"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Icons
import {
  Home,
  Search,
  Trash2,
  Filter,
  PlusCircle,
  RefreshCw,
  Download,
  Edit,
  MoreVertical,
  Calendar,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Types
export type StudentAttendance = {
  id: string;
  rollNo: number;
  studentName: string;
  studentImage?: string;
  class: string;
  date: Date;
  status: "Present" | "Absent" | "Late" | "Excused";
  semester: string;
  attendanceTime?: string;
  reasonForAbsence?: string;
  notes?: string;
  approved: boolean;
};

// Mock data
const studentAttendanceData: StudentAttendance[] = [
  {
    id: "1",
    rollNo: 1,
    studentName: "Jenish Shah",
    studentImage: "/assets/images/user/user1.jpg",
    class: "Class A",
    date: new Date("2019-02-25"),
    status: "Absent",
    semester: "Spring 2019",
    reasonForAbsence: "Family function",
    notes: "Leave for marriage function",
    approved: false,
  },
  {
    id: "2",
    rollNo: 2,
    studentName: "Priya Patel",
    studentImage: "/assets/images/user/user2.jpg",
    class: "Class A",
    date: new Date("2019-02-17"),
    status: "Present",
    semester: "Spring 2019",
    attendanceTime: "09:00",
    approved: true,
  },
  {
    id: "3",
    rollNo: 3,
    studentName: "Mayank Jani",
    studentImage: "/assets/images/user/user4.jpg",
    class: "Class B",
    date: new Date("2020-01-01"),
    status: "Present",
    semester: "Spring 2020",
    attendanceTime: "09:00",
    approved: true,
  },
  {
    id: "4",
    rollNo: 4,
    studentName: "Bertie Jones",
    studentImage: "/assets/images/user/user3.jpg",
    class: "Class A",
    date: new Date("2019-02-01"),
    status: "Absent",
    semester: "Spring 2019",
    reasonForAbsence: "Family function",
    notes: "Leave for marriage function",
    approved: false,
  },
  {
    id: "5",
    rollNo: 5,
    studentName: "Jenish Shah",
    studentImage: "/assets/images/user/user5.jpg",
    class: "Class E",
    date: new Date("2019-02-02"),
    status: "Present",
    semester: "Spring 2019",
    attendanceTime: "09:00",
    approved: true,
  },
  {
    id: "6",
    rollNo: 6,
    studentName: "Sarah Smith",
    studentImage: "/assets/images/user/user6.jpg",
    class: "Class C",
    date: new Date("2019-02-26"),
    status: "Present",
    semester: "Spring 2019",
    attendanceTime: "09:00",
    approved: true,
  },
  {
    id: "7",
    rollNo: 7,
    studentName: "Pam Abbott",
    studentImage: "/assets/images/user/user7.jpg",
    class: "Class B",
    date: new Date("2019-02-22"),
    status: "Absent",
    semester: "Spring 2019",
    reasonForAbsence: "Family function",
    notes: "Leave for marriage function",
    approved: false,
  },
  {
    id: "8",
    rollNo: 8,
    studentName: "Bethaney Spence",
    studentImage: "/assets/images/user/user8.jpg",
    class: "Class A",
    date: new Date("2019-02-19"),
    status: "Present",
    semester: "Spring 2019",
    attendanceTime: "09:00",
    approved: true,
  },
  {
    id: "9",
    rollNo: 9,
    studentName: "Ivan Bell",
    studentImage: "/assets/images/user/user9.jpg",
    class: "Class E",
    date: new Date("2019-02-14"),
    status: "Absent",
    semester: "Spring 2019",
    reasonForAbsence: "Family function",
    notes: "Leave for marriage function",
    approved: false,
  },
  {
    id: "10",
    rollNo: 10,
    studentName: "Jay Soni",
    studentImage: "/assets/images/user/user10.jpg",
    class: "Class B",
    date: new Date("2019-02-27"),
    status: "Present",
    semester: "Spring 2019",
    attendanceTime: "09:00",
    approved: true,
  },
];

const columns: ColumnDef<StudentAttendance>[] = [
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
    accessorKey: "rollNo",
    header: "Roll No",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("rollNo")}</div>
    ),
  },
  {
    accessorKey: "studentName",
    header: "Student Name",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={student.studentImage} alt={student.studentName} />
            <AvatarFallback>
              {student.studentName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span>{student.studentName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {format(new Date(row.getValue("date")), "MM/dd/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = {
        Present: "default",
        Absent: "destructive",
        Late: "secondary",
        Excused: "outline",
      }[status] as "default" | "destructive" | "secondary" | "outline";

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "semester",
    header: "Semester",
  },
  {
    accessorKey: "attendanceTime",
    header: "Attendance Time",
    cell: ({ row }) => {
      const time = row.getValue("attendanceTime");
      return time ? (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          {time}
        </div>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "reasonForAbsence",
    header: "Reason for Absence",
    cell: ({ row }) => row.getValue("reasonForAbsence") || "—",
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => row.getValue("notes") || "—",
  },
  {
    accessorKey: "approved",
    header: "Approved",
    cell: ({ row }) => (
      <Badge variant={row.getValue("approved") ? "default" : "outline"}>
        {row.getValue("approved") ? "Yes" : "No"}
      </Badge>
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

// Helper functions
const handleEdit = (student: StudentAttendance) => {
  console.log("Edit student:", student);
  // Implement edit logic here
};

const handleDelete = (ids: string[]) => {
  console.log("Delete students:", ids);
  // Implement delete logic here
};

const exportToExcel = (data: StudentAttendance[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    data.map((item) => ({
      "Roll No": item.rollNo,
      "Student Name": item.studentName,
      Class: item.class,
      Date: format(item.date, "MM/dd/yyyy"),
      Status: item.status,
      Semester: item.semester,
      "Attendance Time": item.attendanceTime || "",
      "Reason for Absence": item.reasonForAbsence || "",
      Notes: item.notes || "",
      Approved: item.approved ? "Yes" : "No",
    })),
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Student Attendance");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `student-attendance-${format(new Date(), "yyyy-MM-dd")}.xlsx`);
};

export default function StudentAttendancePage() {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const data = useMemo(() => studentAttendanceData, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  });

  const handleRefresh = () => {
    // Implement refresh logic here
    router.refresh();
  };

  const handleDeleteSelected = () => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);
    setSelectedRows(selectedIds);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(selectedRows);
    table.resetRowSelection();
    setDeleteDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/admin/dashboard"
              className="flex items-center gap-2"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/students">Students</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All Students</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Student Attendance</CardTitle>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-[200px] lg:w-[300px]"
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {/* Delete Button */}
                {table.getSelectedRowModel().rows.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDeleteSelected}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                )}

                {/* Show/Hide Columns */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Show/Hide columns</span>
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
                          {column.id === "select" ? "Select" : column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Add Button */}
                <Button variant="ghost" size="icon">
                  <PlusCircle className="h-4 w-4 text-green-600" />
                  <span className="sr-only">Add</span>
                </Button>

                {/* Refresh Button */}
                <Button variant="ghost" size="icon" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">Refresh</span>
                </Button>

                {/* Export Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  //   onClick={() => exportToExcel(data)}
                >
                  <Download className="h-4 w-4 text-blue-600" />
                  <span className="sr-only">Export to Excel</span>
                </Button>
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
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from(
                  { length: table.getPageCount() },
                  (_, i) => i + 1,
                ).map((page) => (
                  <Button
                    key={page}
                    variant={
                      table.getState().pagination.pageIndex + 1 === page
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => table.setPageIndex(page - 1)}
                  >
                    {page}
                  </Button>
                ))}
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
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <select
                className="border rounded px-2 py-1"
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {selectedRows.length} selected attendance record(s).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
