"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Download,
  Plus,
  RefreshCw,
  Trash2,
  Calendar,
  Clock,
  Phone,
  User,
  MoreVertical,
  Edit,
  Trash,
  Filter,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useState } from "react";
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
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Visitor = {
  id: string;
  visitorName: string;
  visitDate: Date;
  visitTime: string;
  purposeOfVisit: string;
  contactNumber: string;
  visitorType:
    | "Parent"
    | "Vendor"
    | "Guest"
    | "Volunteer"
    | "Contractor"
    | "Applicant";
  departmentPersonVisited: string;
};

const data: Visitor[] = [
  {
    id: "1",
    visitorName: "John Doe",
    visitDate: new Date(2024, 10, 22),
    visitTime: "10:30",
    purposeOfVisit: "Meeting with a teacher",
    contactNumber: "+1234567890",
    visitorType: "Parent",
    departmentPersonVisited: "Mathematics Department",
  },
  {
    id: "2",
    visitorName: "Emily Smith",
    visitDate: new Date(2024, 10, 22),
    visitTime: "11:00",
    purposeOfVisit: "Parent-Teacher Conference",
    contactNumber: "+1987654321",
    visitorType: "Parent",
    departmentPersonVisited: "Science Department",
  },
  {
    id: "3",
    visitorName: "David Johnson",
    visitDate: new Date(2024, 10, 22),
    visitTime: "09:30",
    purposeOfVisit: "Delivering supplies",
    contactNumber: "+1231231234",
    visitorType: "Vendor",
    departmentPersonVisited: "Administration",
  },
  {
    id: "4",
    visitorName: "Sarah Connor",
    visitDate: new Date(2024, 10, 22),
    visitTime: "12:00",
    purposeOfVisit: "Guest Speaker",
    contactNumber: "+4567891230",
    visitorType: "Guest",
    departmentPersonVisited: "Social Studies Department",
  },
  {
    id: "5",
    visitorName: "Lisa Ray",
    visitDate: new Date(2024, 10, 22),
    visitTime: "13:00",
    purposeOfVisit: "Student pick-up",
    contactNumber: "+3216549870",
    visitorType: "Parent",
    departmentPersonVisited: "Main Office",
  },
  {
    id: "6",
    visitorName: "Tom Harris",
    visitDate: new Date(2024, 10, 22),
    visitTime: "11:30",
    purposeOfVisit: "Meeting with the principal",
    contactNumber: "+6543219870",
    visitorType: "Parent",
    departmentPersonVisited: "Principal's Office",
  },
  {
    id: "7",
    visitorName: "Karen Williams",
    visitDate: new Date(2024, 10, 22),
    visitTime: "14:00",
    purposeOfVisit: "Volunteering",
    contactNumber: "+7894561230",
    visitorType: "Volunteer",
    departmentPersonVisited: "Library",
  },
  {
    id: "8",
    visitorName: "Brian Davis",
    visitDate: new Date(2024, 10, 22),
    visitTime: "15:00",
    purposeOfVisit: "Maintenance work",
    contactNumber: "+1597534862",
    visitorType: "Contractor",
    departmentPersonVisited: "Maintenance",
  },
  {
    id: "9",
    visitorName: "Angela Martinez",
    visitDate: new Date(2024, 10, 22),
    visitTime: "09:15",
    purposeOfVisit: "Class presentation",
    contactNumber: "+8521479630",
    visitorType: "Guest",
    departmentPersonVisited: "Art Department",
  },
  {
    id: "10",
    visitorName: "Steven Taylor",
    visitDate: new Date(2024, 10, 22),
    visitTime: "10:00",
    purposeOfVisit: "Job interview",
    contactNumber: "+9876543210",
    visitorType: "Applicant",
    departmentPersonVisited: "Administration",
  },
];

const visitorTypeColors: Record<Visitor["visitorType"], string> = {
  Parent: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  Vendor: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  Guest: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  Volunteer: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  Contractor: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  Applicant: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
};

export const columns: ColumnDef<Visitor>[] = [
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
    accessorKey: "visitorName",
    header: "Visitor Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.getValue("visitorName")}</span>
      </div>
    ),
  },
  {
    accessorKey: "visitDate",
    header: "Visit Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        {format(row.getValue("visitDate"), "MM/dd/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "visitTime",
    header: "Visit Time",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        {row.getValue("visitTime")}
      </div>
    ),
  },
  {
    accessorKey: "purposeOfVisit",
    header: "Purpose of Visit",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.getValue("purposeOfVisit")}
      </div>
    ),
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-muted-foreground" />
        {row.getValue("contactNumber")}
      </div>
    ),
  },
  {
    accessorKey: "visitorType",
    header: "Visitor Type",
    cell: ({ row }) => {
      const type = row.getValue("visitorType") as Visitor["visitorType"];
      return (
        <Badge variant="secondary" className={visitorTypeColors[type]}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "departmentPersonVisited",
    header: "Department/Person Visited",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.getValue("departmentPersonVisited")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" title="Edit">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Delete">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default function VisitorBookPage() {
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
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard/main">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/front-office">Front Office</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Visitor Book</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Visitor Book</h1>
          <p className="text-muted-foreground">
            Manage and track all visitor entries
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Visitor
        </Button>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Visitor Records</CardTitle>
              <CardDescription>
                View and manage all visitor information
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search visitors..."
                  className="pl-8 w-[200px] lg:w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon" title="Refresh">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Download">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Filter">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon" title="Delete">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* <VisitorBookTable /> */}
          <div className="space-y-4">
            {/* Column Visibility Toggle */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
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
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {table.getRowModel().rows.length} of {data.length}{" "}
                entries
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
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
