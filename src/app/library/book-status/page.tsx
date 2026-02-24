"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Plus,
  RefreshCw,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Home,
  ChevronRight,
  Calendar,
  User,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  Settings,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define the Book type
export type Book = {
  id: string;
  bookID: string;
  bookName: string;
  status: "Available" | "Checked Out" | "Reserved" | "Under Repair" | "Lost";
  dateUpdated: Date;
  lastCheckedOutDate: Date | null;
  dueDate: Date | null;
  checkedOutBy: string | null;
  reservedBy: string | null;
  condition: "Excellent" | "Good" | "Damaged";
  returnDate: Date | null;
};

// Sample data
const data: Book[] = [
  {
    id: "1",
    bookID: "101",
    bookName: "Introduction to Programming",
    status: "Available",
    dateUpdated: new Date("2024-11-20"),
    lastCheckedOutDate: null,
    dueDate: null,
    checkedOutBy: null,
    reservedBy: null,
    condition: "Good",
    returnDate: null,
  },
  {
    id: "2",
    bookID: "102",
    bookName: "Data Structures and Algorithms",
    status: "Checked Out",
    dateUpdated: new Date("2024-11-18"),
    lastCheckedOutDate: new Date("2024-11-17"),
    dueDate: new Date("2024-11-24"),
    checkedOutBy: "Student-001",
    reservedBy: null,
    condition: "Good",
    returnDate: null,
  },
  {
    id: "3",
    bookID: "103",
    bookName: "Advanced Mathematics",
    status: "Reserved",
    dateUpdated: new Date("2024-11-19"),
    lastCheckedOutDate: null,
    dueDate: null,
    checkedOutBy: null,
    reservedBy: "Student-002",
    condition: "Excellent",
    returnDate: null,
  },
  {
    id: "4",
    bookID: "104",
    bookName: "Physics for Engineers",
    status: "Under Repair",
    dateUpdated: new Date("2024-11-15"),
    lastCheckedOutDate: null,
    dueDate: null,
    checkedOutBy: null,
    reservedBy: null,
    condition: "Damaged",
    returnDate: null,
  },
  {
    id: "5",
    bookID: "105",
    bookName: "History of Modern Science",
    status: "Lost",
    dateUpdated: new Date("2024-11-12"),
    lastCheckedOutDate: new Date("2024-10-01"),
    dueDate: new Date("2024-10-08"),
    checkedOutBy: "Student-003",
    reservedBy: null,
    condition: "Good",
    returnDate: null,
  },
  {
    id: "6",
    bookID: "106",
    bookName: "Artificial Intelligence Basics",
    status: "Available",
    dateUpdated: new Date("2024-11-22"),
    lastCheckedOutDate: null,
    dueDate: null,
    checkedOutBy: null,
    reservedBy: null,
    condition: "Good",
    returnDate: null,
  },
  {
    id: "7",
    bookID: "107",
    bookName: "The Art of War",
    status: "Checked Out",
    dateUpdated: new Date("2024-11-10"),
    lastCheckedOutDate: new Date("2024-11-05"),
    dueDate: new Date("2024-11-12"),
    checkedOutBy: "Student-004",
    reservedBy: null,
    condition: "Good",
    returnDate: null,
  },
  {
    id: "8",
    bookID: "108",
    bookName: "The Philosophy of Science",
    status: "Under Repair",
    dateUpdated: new Date("2024-11-13"),
    lastCheckedOutDate: null,
    dueDate: null,
    checkedOutBy: null,
    reservedBy: null,
    condition: "Damaged",
    returnDate: null,
  },
  {
    id: "9",
    bookID: "109",
    bookName: "Quantum Mechanics",
    status: "Available",
    dateUpdated: new Date("2024-11-21"),
    lastCheckedOutDate: null,
    dueDate: null,
    checkedOutBy: null,
    reservedBy: null,
    condition: "Excellent",
    returnDate: null,
  },
  {
    id: "10",
    bookID: "110",
    bookName: "The Complete Guide to Python",
    status: "Checked Out",
    dateUpdated: new Date("2024-11-18"),
    lastCheckedOutDate: new Date("2024-11-10"),
    dueDate: new Date("2024-11-17"),
    checkedOutBy: "Student-005",
    reservedBy: null,
    condition: "Good",
    returnDate: null,
  },
];

// Status badge configuration
const statusConfig = {
  Available: {
    variant: "default" as const,
    icon: CheckCircle,
    color: "bg-green-100 text-green-800 border-green-200",
  },
  "Checked Out": {
    variant: "secondary" as const,
    icon: BookOpen,
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  Reserved: {
    variant: "outline" as const,
    icon: Clock,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  "Under Repair": {
    variant: "secondary" as const,
    icon: Settings,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  Lost: {
    variant: "destructive" as const,
    icon: AlertCircle,
    color: "bg-red-100 text-red-800 border-red-200",
  },
};

// Condition badge configuration
const conditionConfig = {
  Excellent: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Good: "bg-blue-50 text-blue-700 border-blue-200",
  Damaged: "bg-amber-50 text-amber-700 border-amber-200",
};

// Define columns
const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "bookID",
    header: "Book ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("bookID")}</div>
    ),
  },
  {
    accessorKey: "bookName",
    header: "Book Name",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate font-medium">
        {row.getValue("bookName")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Book["status"];
      const config = statusConfig[status];
      const Icon = config.icon;

      return (
        <Badge variant={config.variant} className={`${config.color} gap-1`}>
          <Icon className="h-3 w-3" />
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dateUpdated",
    header: "Date Updated",
    cell: ({ row }) => {
      const date = row.getValue("dateUpdated") as Date;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {format(date, "MM/dd/yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "lastCheckedOutDate",
    header: "Last Checked Out",
    cell: ({ row }) => {
      const date = row.getValue("lastCheckedOutDate") as Date | null;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {date ? format(date, "MM/dd/yyyy") : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const date = row.getValue("dueDate") as Date | null;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {date ? format(date, "MM/dd/yyyy") : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "checkedOutBy",
    header: "Checked Out By",
    cell: ({ row }) => {
      const user = row.getValue("checkedOutBy") as string | null;
      return (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          {user || "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "reservedBy",
    header: "Reserved By",
    cell: ({ row }) => {
      const user = row.getValue("reservedBy") as string | null;
      return user || "-";
    },
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => {
      const condition = row.getValue("condition") as Book["condition"];
      return (
        <Badge variant="outline" className={conditionConfig[condition]}>
          {condition}
        </Badge>
      );
    },
  },
  {
    accessorKey: "returnDate",
    header: "Return Date",
    cell: ({ row }) => {
      const date = row.getValue("returnDate") as Date | null;
      return date ? format(date, "MM/dd/yyyy") : "-";
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

export default function BookStatusPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
            <BreadcrumbLink
              href="/admin/dashboard/main"
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/library">Library</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Book Status</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Status</h1>
          <p className="text-muted-foreground">
            Manage and track the status of all library books
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Book Status Management</CardTitle>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search books..."
                  className="pl-9 w-[250px]"
                  value={
                    (table.getColumn("bookName")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("bookName")
                      ?.setFilterValue(event.target.value)
                  }
                />
              </div>

              {/* Column Visibility */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
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
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Book
              </Button>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4" />
              </Button>
              {table.getFilteredSelectedRowModel().rows.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete ({table.getFilteredSelectedRowModel().rows.length})
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {table.getFilteredSelectedRowModel().rows.length} selected books
              from the library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                // Handle delete logic here
                setRowSelection({});
                setShowDeleteDialog(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
