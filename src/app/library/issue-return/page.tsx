// app/library/issue-return/page.tsx
"use client";

import { useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  CheckCircle,
  Download,
  Edit,
  Filter,
  Home,
  MoreVertical,
  RefreshCw,
  Search,
  Trash2,
  XCircle,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type IssueReturnRecord = {
  id: string;
  bookNo: string;
  bookTitle: string;
  studentName: string;
  rollNo: string;
  issueDate: string;
  returnDate: string;
  status: "Returned" | "Issued" | "Overdue";
  dueSoon?: boolean;
};

const data: IssueReturnRecord[] = [
  {
    id: "1",
    bookNo: "B101",
    bookTitle: "Introduction to Algorithms",
    studentName: "John Doe",
    rollNo: "CS001",
    issueDate: "2023-12-01",
    returnDate: "2023-12-15",
    status: "Returned",
  },
  {
    id: "2",
    bookNo: "B105",
    bookTitle: "Modern Operating Systems",
    studentName: "Jane Smith",
    rollNo: "CS002",
    issueDate: "2023-12-05",
    returnDate: "2023-12-20",
    status: "Issued",
    dueSoon: true,
  },
  {
    id: "3",
    bookNo: "B110",
    bookTitle: "Database System Concepts",
    studentName: "Robert Brown",
    rollNo: "CS003",
    issueDate: "2023-11-20",
    returnDate: "2023-12-05",
    status: "Overdue",
  },
  {
    id: "4",
    bookNo: "B115",
    bookTitle: "Computer Networks",
    studentName: "Emily Davis",
    rollNo: "CS004",
    issueDate: "2023-12-10",
    returnDate: "2023-12-25",
    status: "Issued",
  },
  {
    id: "5",
    bookNo: "B120",
    bookTitle: "Software Engineering",
    studentName: "Michael Wilson",
    rollNo: "CS005",
    issueDate: "2023-12-15",
    returnDate: "2023-12-30",
    status: "Issued",
  },
];

export const columns: ColumnDef<IssueReturnRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(value) =>
          table.toggleAllPageRowsSelected(!!value.target.checked)
        }
        className="h-4 w-4 rounded border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(value) => row.toggleSelected(!!value.target.checked)}
        className="h-4 w-4 rounded border-gray-300"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "bookNo",
    header: "Book No",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("bookNo")}</div>
    ),
  },
  {
    accessorKey: "bookTitle",
    header: "Book Title",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate" title={row.getValue("bookTitle")}>
        {row.getValue("bookTitle")}
      </div>
    ),
  },
  {
    accessorKey: "studentName",
    header: "Student Name",
  },
  {
    accessorKey: "rollNo",
    header: "Roll No",
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {new Date(row.getValue("issueDate")).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    ),
  },
  {
    accessorKey: "returnDate",
    header: "Return Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {new Date(row.getValue("returnDate")).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as IssueReturnRecord["status"];
      const dueSoon = row.original.dueSoon;

      const variants = {
        Returned: {
          bg: "bg-green-100",
          text: "text-green-800",
          icon: CheckCircle,
        },
        Issued: {
          bg: dueSoon ? "bg-amber-100" : "bg-orange-100",
          text: dueSoon ? "text-amber-800" : "text-orange-800",
          icon: dueSoon ? AlertCircle : CheckCircle,
        },
        Overdue: {
          bg: "bg-red-100",
          text: "text-red-800",
          icon: XCircle,
        },
      };

      const { bg, text, icon: Icon } = variants[status];

      return (
        <div className="flex items-center gap-2">
          <Badge className={`${bg} ${text} border-0 font-medium`}>
            <Icon className="h-3 w-3 mr-1" />
            {status}
            {dueSoon && status === "Issued" && " (Due Soon)"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const record = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default function IssueReturnPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

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
    <div className="container mx-auto p-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/admin/dashboard/main"
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/library">Library</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Issue / Return</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Issue / Return</h1>
          <p className="text-muted-foreground">
            Manage book issuing and returns in your library
          </p>
        </div>
      </div>

      {/* Main Content */}
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Issue / Return Records</CardTitle>
              <CardDescription>
                View and manage all book transactions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* <IssueReturnTable /> */}
          <div className="w-full">
            {/* Table Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b">
              <div className="flex items-center flex-1 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search records..."
                    value={
                      (table
                        .getColumn("bookTitle")
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn("bookTitle")
                        ?.setFilterValue(event.target.value)
                    }
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Column Visibility */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-9 gap-2">
                      <Filter className="h-4 w-4" />
                      View
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
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Download className="h-4 w-4" />
                </Button>
                <Button className="h-9 gap-2 bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4" />
                  Add Record
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-md">
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
                        className="hover:bg-muted/50 cursor-pointer"
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

            {/* Table Footer */}
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>

              {/* Pagination */}
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
        </CardContent>
      </Card>
    </div>
  );
}
