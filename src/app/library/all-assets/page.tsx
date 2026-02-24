"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  DropdownMenuCheckboxItem,
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
  Download,
  Filter,
  Home,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Edit,
  Calendar,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define the Asset type
type Asset = {
  id: string;
  bookNumber: string;
  title: string;
  subject: string;
  purchaseDate: string;
  department: string;
  type: string;
  status: "in stock" | "out of stock" | "issue" | "repair";
  lastBorrowed?: string;
  borrowerName?: string;
  shelfLocation: string;
};

// Mock data
const assetsData: Asset[] = [
  {
    id: "1",
    bookNumber: "B123451",
    title: "Web Programming",
    subject: "mathematics",
    purchaseDate: "02/25/2019",
    department: "civil",
    type: "news paper",
    status: "out of stock",
    lastBorrowed: "01/15/2022",
    borrowerName: "Jane Doe",
    shelfLocation: "C3",
  },
  {
    id: "2",
    bookNumber: "B123452",
    title: "Java Black Book",
    subject: "java",
    purchaseDate: "02/17/2019",
    department: "computer",
    type: "book",
    status: "in stock",
    lastBorrowed: "",
    borrowerName: "",
    shelfLocation: "B2",
  },
  {
    id: "3",
    bookNumber: "B123453",
    title: "Parallel Computing",
    subject: "networking",
    purchaseDate: "02/13/2019",
    department: "computer",
    type: "dvd",
    status: "out of stock",
    lastBorrowed: "",
    borrowerName: "",
    shelfLocation: "C4",
  },
  {
    id: "4",
    bookNumber: "B123454",
    title: "Politics Science",
    subject: "politics",
    purchaseDate: "02/01/2019",
    department: "computer",
    type: "book",
    status: "in stock",
    lastBorrowed: "",
    borrowerName: "",
    shelfLocation: "B1",
  },
  {
    id: "5",
    bookNumber: "B123455",
    title: "Networking",
    subject: "animation",
    purchaseDate: "02/02/2019",
    department: "mathematics",
    type: "cd",
    status: "out of stock",
    lastBorrowed: "",
    borrowerName: "",
    shelfLocation: "D1",
  },
  {
    id: "6",
    bookNumber: "B123456",
    title: "Time History",
    subject: "java",
    purchaseDate: "02/26/2019",
    department: "mechanical",
    type: "book",
    status: "issue",
    lastBorrowed: "03/10/2022",
    borrowerName: "John Smith",
    shelfLocation: "A2",
  },
  {
    id: "7",
    bookNumber: "B123457",
    title: "Politics",
    subject: "politics",
    purchaseDate: "02/22/2019",
    department: "civil",
    type: "book",
    status: "issue",
    lastBorrowed: "01/20/2022",
    borrowerName: "Alice Johnson",
    shelfLocation: "B3",
  },
  {
    id: "8",
    bookNumber: "B123458",
    title: "Networking",
    subject: "mathematics",
    purchaseDate: "02/19/2019",
    department: "computer",
    type: "book",
    status: "repair",
    lastBorrowed: "",
    borrowerName: "",
    shelfLocation: "A3",
  },
  {
    id: "9",
    bookNumber: "B123459",
    title: "Web Programming",
    subject: "networking",
    purchaseDate: "02/15/2019",
    department: "civil",
    type: "book",
    status: "issue",
    lastBorrowed: "02/25/2022",
    borrowerName: "Michael Brown",
    shelfLocation: "C1",
  },
  {
    id: "10",
    bookNumber: "B1234510",
    title: "Computer Fundamental",
    subject: "animation",
    purchaseDate: "02/27/2019",
    department: "mathematics",
    type: "book",
    status: "issue",
    lastBorrowed: "03/01/2022",
    borrowerName: "Emily Davis",
    shelfLocation: "A4",
  },
];

// Define columns
const columns: ColumnDef<Asset>[] = [
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
    accessorKey: "bookNumber",
    header: "Book Number",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("bookNumber")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "purchaseDate",
    header: "Purchase Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("purchaseDate"));
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(date, "MM/dd/yyyy")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Asset["status"];
      const variantMap = {
        "in stock": "default",
        "out of stock": "destructive",
        issue: "secondary",
        repair: "outline",
      } as const;

      const colorMap = {
        "in stock": "bg-green-100 text-green-800 border-green-200",
        "out of stock": "bg-orange-100 text-orange-800 border-orange-200",
        issue: "bg-purple-100 text-purple-800 border-purple-200",
        repair: "bg-brown-100 text-brown-800 border-brown-200",
      };

      return (
        <Badge variant={variantMap[status]} className={colorMap[status]}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastBorrowed",
    header: "Last Borrowed",
    cell: ({ row }) => {
      const date = row.getValue("lastBorrowed");
      if (!date) return <span>-</span>;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(new Date(date as string), "MM/dd/yyyy")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "borrowerName",
    header: "Borrower Name",
    cell: ({ row }) => {
      const name = row.getValue("borrowerName");
      return <span>{name ? (name as string) : "-"}</span>;
    },
  },
  {
    accessorKey: "shelfLocation",
    header: "Shelf Location",
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

export default function AllAssetsPage() {
  const [data, setData] = useState<Asset[]>(assetsData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

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
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const handleRefresh = () => {
    // In a real app, this would refetch data
    setData([...assetsData]);
  };

  const handleDeleteSelected = () => {
    const selectedIds = selectedRows.map((row) => row.original.id);
    const newData = data.filter((asset) => !selectedIds.includes(asset.id));
    setData(newData);
    table.resetRowSelection();
  };

  const handleExport = () => {
    // Implement export logic here
    console.log("Exporting data...");
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link
              href="/admin/dashboard/main"
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href="/library">Assets</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All Assets</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Assets</h1>
          <p className="text-muted-foreground">
            Manage and track all library assets
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <CardTitle>All Assets</CardTitle>
              <CardDescription>
                View and manage all library assets in one place
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              {selectedRows.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteSelected}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedRows.length})
                </Button>
              )}
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search assets..."
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="pl-9 w-full sm:w-[300px]"
              />
            </div>

            <div className="flex items-center gap-2">
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

              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                title="Refresh"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleExport}
                title="Export to XLSX"
              >
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
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>

            <div className="flex items-center gap-6 lg:gap-8">
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

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
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
