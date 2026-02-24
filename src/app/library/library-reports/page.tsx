"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Home,
  Search,
  Filter,
  PlusCircle,
  RefreshCw,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  FileText,
  AlertCircle,
  BarChart,
  DollarSign,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
} from "lucide-react";

// import { generateReportData } from "@/lib/mock-data";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
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

import { Checkbox } from "@/components/ui/checkbox";

export type LibraryReport = {
  id: string;
  reportName: string;
  reportType: "Stock" | "Overdue" | "Borrowing" | "Finance" | "Catalog";
  generatedDate: Date;
  status: "Available" | "Processing" | "Failed";
  downloadCount: number;
  size: string;
};

const getStatusBadge = (status: LibraryReport["status"]) => {
  switch (status) {
    case "Available":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Available
        </Badge>
      );
    case "Processing":
      return (
        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
          Processing
        </Badge>
      );
    case "Failed":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Failed
        </Badge>
      );
  }
};

const getReportTypeIcon = (type: LibraryReport["reportType"]) => {
  switch (type) {
    case "Stock":
      return <BookOpen className="h-4 w-4 mr-2" />;
    case "Overdue":
      return <AlertCircle className="h-4 w-4 mr-2" />;
    case "Borrowing":
      return <Eye className="h-4 w-4 mr-2" />;
    case "Finance":
      return <DollarSign className="h-4 w-4 mr-2" />;
    case "Catalog":
      return <FileText className="h-4 w-4 mr-2" />;
  }
};

const columns: ColumnDef<LibraryReport>[] = [
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
    accessorKey: "reportName",
    header: "Report Name",
    cell: ({ row }) => (
      <div className="flex items-center">
        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
        <div>
          <div className="font-medium">{row.getValue("reportName")}</div>
          <div className="text-sm text-muted-foreground">
            Size: {row.original.size}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "reportType",
    header: "Report Type",
    cell: ({ row }) => (
      <div className="flex items-center">
        {getReportTypeIcon(row.getValue("reportType"))}
        <span>{row.getValue("reportType")} Report</span>
      </div>
    ),
  },
  {
    accessorKey: "generatedDate",
    header: "Generated Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("generatedDate"));
      return (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{date.toLocaleDateString()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.getValue("status")),
  },
  {
    accessorKey: "downloadCount",
    header: "Downloads",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("downloadCount")}</div>
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
          className="h-8 w-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
        >
          <Download className="mr-2 h-4 w-4" />
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

export const generateReportData: LibraryReport[] = [
  {
    id: "1",
    reportName: "Monthly Book Stock Report - Dec 2023",
    reportType: "Stock",
    generatedDate: new Date("2023-12-25"),
    status: "Available",
    downloadCount: 45,
    size: "2.3 MB",
  },
  {
    id: "2",
    reportName: "Overdue Books List - Dec 2023",
    reportType: "Overdue",
    generatedDate: new Date("2023-12-24"),
    status: "Available",
    downloadCount: 78,
    size: "1.8 MB",
  },
  {
    id: "3",
    reportName: "Student Borrowing History - Dec 2023",
    reportType: "Borrowing",
    generatedDate: new Date("2023-12-23"),
    status: "Available",
    downloadCount: 32,
    size: "3.1 MB",
  },
  {
    id: "4",
    reportName: "Library Fines Summary - Q4 2023",
    reportType: "Finance",
    generatedDate: new Date("2023-12-20"),
    status: "Processing",
    downloadCount: 0,
    size: "0 MB",
  },
  {
    id: "5",
    reportName: "New Arrivals Catalog - Dec 2023",
    reportType: "Catalog",
    generatedDate: new Date("2023-12-15"),
    status: "Available",
    downloadCount: 112,
    size: "4.5 MB",
  },
  {
    id: "6",
    reportName: "Most Popular Books - 2023",
    reportType: "Stock",
    generatedDate: new Date("2023-12-10"),
    status: "Available",
    downloadCount: 89,
    size: "1.2 MB",
  },
  {
    id: "7",
    reportName: "Faculty Usage Report - Nov 2023",
    reportType: "Borrowing",
    generatedDate: new Date("2023-12-05"),
    status: "Available",
    downloadCount: 23,
    size: "1.7 MB",
  },
  {
    id: "8",
    reportName: "Lost/Damaged Books Report",
    reportType: "Stock",
    generatedDate: new Date("2023-12-01"),
    status: "Failed",
    downloadCount: 0,
    size: "0 MB",
  },
];



export default function LibraryReportsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: generateReportData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  // const reports = generateReportData();

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
            <BreadcrumbLink href="/library">Library</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Reports</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library Reports</h1>
          <p className="text-muted-foreground">
            View and manage all library reports
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export XLSX
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <CardTitle>Library Reports</CardTitle>
              <CardDescription>
                View all generated reports and their status
              </CardDescription>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  className="pl-8 w-full sm:w-[250px]"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter Columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Report Name
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Report Type
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Generated Date
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Status
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Actions
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* <LibraryReportsTable data={reports} /> */}
          <div className="space-y-4">
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
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile View Sheet (for actions) */}
      <Sheet>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Report Actions</SheetTitle>
            <SheetDescription>
              Available actions for the selected report
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Button variant="outline" className="justify-start">
              <Edit className="mr-2 h-4 w-4" />
              Edit Report
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button
              variant="outline"
              className="justify-start text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Report
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
