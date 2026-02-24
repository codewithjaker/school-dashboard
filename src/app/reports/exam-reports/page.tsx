"use client";

import { useState, useMemo } from "react";
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
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Home,
  Search,
  Filter,
  PlusCircle,
  RefreshCw,
  Download,
  Edit,
  Trash2,
  Calendar,
  User,
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

type ExamReport = {
  id: string;
  examName: string;
  className: string;
  subject: string;
  examDate: Date;
  passPercentage: number;
  averageMarks: number;
  generatedBy: {
    name: string;
    image: string;
  };
  reportDate: Date;
  status: "completed" | "pending" | "in-progress";
};

const ExamReportsPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  // Mock data - in real app, fetch from API
  const data: ExamReport[] = [
    {
      id: "1",
      examName: "First Term Exam",
      className: "Class 10-A",
      subject: "Mathematics",
      examDate: new Date("2024-11-15"),
      passPercentage: 88.5,
      averageMarks: 72,
      generatedBy: {
        name: "John Doe",
        image: "/assets/images/user/user1.jpg",
      },
      reportDate: new Date("2024-12-01"),
      status: "completed",
    },
    {
      id: "2",
      examName: "Mid Term Exam",
      className: "Class 9-B",
      subject: "Science",
      examDate: new Date("2024-11-20"),
      passPercentage: 92,
      averageMarks: 78,
      generatedBy: {
        name: "Sarah Smith",
        image: "/assets/images/user/user2.jpg",
      },
      reportDate: new Date("2024-12-08"),
      status: "completed",
    },
    {
      id: "3",
      examName: "Final Exam",
      className: "Class 12-A",
      subject: "Physics",
      examDate: new Date("2024-11-25"),
      passPercentage: 85.5,
      averageMarks: 68,
      generatedBy: {
        name: "Mike Johnson",
        image: "/assets/images/user/user3.jpg",
      },
      reportDate: new Date("2024-12-10"),
      status: "pending",
    },
    {
      id: "4",
      examName: "Unit Test 2",
      className: "Class 8-C",
      subject: "English",
      examDate: new Date("2024-11-10"),
      passPercentage: 95,
      averageMarks: 82,
      generatedBy: {
        name: "Emily Davis",
        image: "/assets/images/user/user4.jpg",
      },
      reportDate: new Date("2024-12-15"),
      status: "completed",
    },
    {
      id: "5",
      examName: "First Term Exam",
      className: "Class 11-B",
      subject: "Chemistry",
      examDate: new Date("2024-11-15"),
      passPercentage: 84.2,
      averageMarks: 70,
      generatedBy: {
        name: "David Wilson",
        image: "/assets/images/user/user5.jpg",
      },
      reportDate: new Date("2024-12-02"),
      status: "completed",
    },
    {
      id: "6",
      examName: "Weekly Test",
      className: "Class 7-A",
      subject: "History",
      examDate: new Date("2024-11-18"),
      passPercentage: 90.5,
      averageMarks: 75,
      generatedBy: {
        name: "Lisa Brown",
        image: "/assets/images/user/user6.jpg",
      },
      reportDate: new Date("2024-12-15"),
      status: "in-progress",
    },
  ];

  const columns: ColumnDef<ExamReport>[] = [
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
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("examName")}</div>
      ),
    },
    {
      accessorKey: "className",
      header: "Class",
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
          {format(row.getValue("examDate"), "MM/dd/yyyy")}
        </div>
      ),
    },
    {
      accessorKey: "passPercentage",
      header: "Pass %",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("passPercentage")}%</span>
      ),
    },
    {
      accessorKey: "averageMarks",
      header: "Avg Marks",
    },
    {
      accessorKey: "generatedBy",
      header: "Generated By",
      cell: ({ row }) => {
        const generatedBy = row.getValue(
          "generatedBy",
        ) as ExamReport["generatedBy"];
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
              {/* In real app, use Image component from next/image */}
              <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
            <span className="truncate">{generatedBy.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "reportDate",
      header: "Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {format(row.getValue("reportDate"), "MM/dd/yyyy")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as ExamReport["status"];
        const statusConfig = {
          completed: { label: "Completed", variant: "default" as const },
          pending: { label: "Pending", variant: "secondary" as const },
          "in-progress": { label: "In Progress", variant: "outline" as const },
        };

        const config = statusConfig[status];
        return <Badge variant={config.variant}>{config.label}</Badge>;
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
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard/main">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/reports">Reports</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Exam Reports</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Exam Reports</CardTitle>

            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-8 w-[200px] lg:w-[300px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
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

                <Button variant="outline" size="icon">
                  <PlusCircle className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
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

          {/* Pagination */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
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
    </div>
  );
};

export default ExamReportsPage;
