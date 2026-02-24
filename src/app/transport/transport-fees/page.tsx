"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  ChevronDown,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  MoreHorizontal,
  PlusCircle,
  RefreshCw,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Breadcrumb from '@/components/breadcrumb';
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define the data type
export type TransportFee = {
  id: string;
  student_name: string;
  student_image: string;
  student_id: string;
  class_section: string;
  route_name: string;
  amount: number;
  payment_date: Date;
  payment_method: "Online" | "Cash" | "Card";
  status: "Paid" | "Unpaid";
};

// Mock data
const data: TransportFee[] = [
  {
    id: "1",
    student_name: "Alice Johnson",
    student_image: "/assets/images/user/user1.jpg",
    student_id: "STU001",
    class_section: "10-A",
    route_name: "North Campus - Main Gate",
    amount: 500,
    payment_date: new Date("2023-09-01"),
    payment_method: "Online",
    status: "Paid",
  },
  {
    id: "2",
    student_name: "Bob Smith",
    student_image: "/assets/images/user/user2.jpg",
    student_id: "STU002",
    class_section: "9-B",
    route_name: "City Center - South Block",
    amount: 1200,
    payment_date: new Date("2023-09-02"),
    payment_method: "Cash",
    status: "Paid",
  },
  {
    id: "3",
    student_name: "Charlie Brown",
    student_image: "/assets/images/user/user3.jpg",
    student_id: "STU003",
    class_section: "11-C",
    route_name: "Airport Road - Science Wing",
    amount: 1500,
    payment_date: new Date("2023-09-03"),
    payment_method: "Online",
    status: "Unpaid",
  },
  {
    id: "4",
    student_name: "Diana Prince",
    student_image: "/assets/images/user/user4.jpg",
    student_id: "STU004",
    class_section: "8-A",
    route_name: "Green Valley - Arts College",
    amount: 800,
    payment_date: new Date("2023-09-04"),
    payment_method: "Card",
    status: "Paid",
  },
  {
    id: "5",
    student_name: "Ethan Hunt",
    student_image: "/assets/images/user/user5.jpg",
    student_id: "STU005",
    class_section: "12-B",
    route_name: "Railway Station - Hostel Block",
    amount: 1000,
    payment_date: new Date("2023-09-05"),
    payment_method: "Online",
    status: "Paid",
  },
  {
    id: "6",
    student_name: "Fiona Gallagher",
    student_image: "/assets/images/user/user6.jpg",
    student_id: "STU006",
    class_section: "10-B",
    route_name: "East Suburb - Library",
    amount: 2000,
    payment_date: new Date("2023-09-06"),
    payment_method: "Cash",
    status: "Paid",
  },
  {
    id: "7",
    student_name: "George Miller",
    student_image: "/assets/images/user/user7.jpg",
    student_id: "STU007",
    class_section: "7-C",
    route_name: "West End - Sports Complex",
    amount: 1800,
    payment_date: new Date("2023-09-07"),
    payment_method: "Online",
    status: "Paid",
  },
  {
    id: "8",
    student_name: "Hannah Abbott",
    student_image: "/assets/images/user/user8.jpg",
    student_id: "STU008",
    class_section: "11-A",
    route_name: "Hill Top - Medical Center",
    amount: 2500,
    payment_date: new Date("2023-09-08"),
    payment_method: "Card",
    status: "Paid",
  },
  {
    id: "9",
    student_name: "Ian Wright",
    student_image: "/assets/images/user/user9.jpg",
    student_id: "STU009",
    class_section: "9-A",
    route_name: "Market Square - Admin Block",
    amount: 600,
    payment_date: new Date("2023-09-09"),
    payment_method: "Online",
    status: "Unpaid",
  },
  {
    id: "10",
    student_name: "Julia Roberts",
    student_image: "/assets/images/user/user10.jpg",
    student_id: "STU010",
    class_section: "12-A",
    route_name: "Lake Side - Engineering Wing",
    amount: 1400,
    payment_date: new Date("2023-09-10"),
    payment_method: "Cash",
    status: "Paid",
  },
];

// Define columns
const columns: ColumnDef<TransportFee>[] = [
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
    accessorKey: "student_name",
    header: "Student Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={row.original.student_image}
            alt={row.original.student_name}
          />
          <AvatarFallback>
            {row.original.student_name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{row.original.student_name}</span>
      </div>
    ),
  },
  {
    accessorKey: "student_id",
    header: "Student ID",
  },
  {
    accessorKey: "class_section",
    header: "Class",
  },
  {
    accessorKey: "route_name",
    header: "Route",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="font-medium">${row.original.amount}</div>
    ),
  },
  {
    accessorKey: "payment_date",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        {format(row.original.payment_date, "MM/dd/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "payment_method",
    header: "Method",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.payment_method}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={
          row.original.status === "Paid"
            ? "bg-green-500/20 text-green-700 hover:bg-green-500/30"
            : "bg-orange-500/20 text-orange-700 hover:bg-orange-500/30"
        }
      >
        {row.original.status}
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

export default function TransportFeesPage() {
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
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const paidCount = data.filter((item) => item.status === "Paid").length;
  const unpaidCount = data.filter((item) => item.status === "Unpaid").length;
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const paidAmount = data
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + item.amount, 0);
  const collectionRate = Math.round((paidAmount / totalAmount) * 100);

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Breadcrumb and Header */}
      <div className="space-y-4">
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
              <BreadcrumbLink href="/transport">Transport</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Fees</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Transport Fees
            </h1>
            <p className="text-muted-foreground">
              Manage and track student transport fee payments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Fee Record
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total transport fees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Collection Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collectionRate}%</div>
            <Progress value={collectionRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{paidCount}</div>
            <p className="text-xs text-muted-foreground">Payment completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {unpaidCount}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Transport Fees Records</CardTitle>
              <CardDescription>
                Manage student transport fee payments and records
              </CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedRows.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedRows.length} selected
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => console.log("Delete selected", selectedRows)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              )}

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="pl-10 w-full sm:w-[250px]"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
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
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="sm" onClick={() => table.reset()}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-0">
          <div className="overflow-auto">
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
                      onClick={() =>
                        console.log("Row clicked", row.original.id)
                      }
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
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {table.getRowModel().rows.length} of {data.length} records
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
        </CardContent>
      </Card>

      {/* Additional Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Tip:</span> Select multiple rows to
          perform bulk actions
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
}
