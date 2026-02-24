"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Search,
  PlusCircle,
  RefreshCw,
  Download,
  Filter,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MoreVertical,
  Eye,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
export type Staff = {
  id: string;
  name: string;
  department: string;
  role: string;
  mobile: string;
  email: string;
  address: string;
  status: "Active" | "Inactive";
  joining_date: string;
  gender: "Male" | "Female";
  image: string;
};

const data: Staff[] = [
  {
    id: "1",
    name: "Bertie Jones",
    department: "Maintenance",
    role: "General maintenance",
    mobile: "1234567890",
    email: "test@email.com",
    address: "11, Shyam appt. Rajkot",
    status: "Active",
    joining_date: "02/25/2018",
    gender: "Male",
    image: "/assets/images/user/user1.jpg",
  },
  {
    id: "2",
    name: "Sarah Smith",
    department: "Administration",
    role: "Clerk",
    mobile: "1234567890",
    email: "test@email.com",
    address: "22, tilak appt. surat",
    status: "Active",
    joining_date: "02/12/2018",
    gender: "Female",
    image: "/assets/images/user/user2.jpg",
  },
  {
    id: "3",
    name: "Bethaney Spence",
    department: "Library",
    role: "Librarian",
    mobile: "1234567890",
    email: "test@email.com",
    address: "201, Shyamal, Puna",
    status: "Active",
    joining_date: "02/25/2018",
    gender: "Female",
    image: "/assets/images/user/user3.jpg",
  },
  {
    id: "4",
    name: "Jay Soni",
    department: "Administration",
    role: "Clerk",
    mobile: "1234567890",
    email: "test@email.com",
    address: "11, Shyam appt. Rajkot",
    status: "Active",
    joining_date: "02/25/2018",
    gender: "Male",
    image: "/assets/images/user/user4.jpg",
  },
  {
    id: "5",
    name: "Pam Abbott",
    department: "Procurement",
    role: "Purchase Officer",
    mobile: "1234567890",
    email: "test@email.com",
    address: "11, Shyam appt. Rajkot",
    status: "Active",
    joining_date: "02/25/2018",
    gender: "Female",
    image: "/assets/images/user/user5.jpg",
  },
];

const columns: ColumnDef<Staff>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.original.image} alt={row.original.name} />
          <AvatarFallback>
            {row.original.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-green-600" />
        <span>{row.original.mobile}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-red-600" />
        <span className="truncate">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-blue-600" />
        <span className="truncate max-w-[200px]">{row.original.address}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "Active" ? "default" : "secondary"}
        className={
          row.original.status === "Active"
            ? "bg-green-100 text-green-800 hover:bg-green-100"
            : "bg-red-100 text-red-800 hover:bg-red-100"
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "joining_date",
    header: "Joining Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-amber-600" />
        <span>{row.original.joining_date}</span>
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={
          row.original.gender === "Male"
            ? "border-blue-200 text-blue-800 bg-blue-50"
            : "border-pink-200 text-pink-800 bg-pink-50"
        }
      >
        {row.original.gender}
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

export default function AllStaffPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
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
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All Staff</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Staff</h1>
          <p className="text-muted-foreground">
            Manage and view all staff members
          </p>
        </div>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Staff
        </Button>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl">Staff Members</CardTitle>

            {/* Table Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search staff..."
                  className="pl-9 w-full sm:w-[250px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      title="Show/Hide Columns"
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Name</DropdownMenuItem>
                    <DropdownMenuItem>Department</DropdownMenuItem>
                    <DropdownMenuItem>Role</DropdownMenuItem>
                    <DropdownMenuItem>Mobile</DropdownMenuItem>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Address</DropdownMenuItem>
                    <DropdownMenuItem>Status</DropdownMenuItem>
                    <DropdownMenuItem>Joining Date</DropdownMenuItem>
                    <DropdownMenuItem>Gender</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" size="icon" title="Refresh">
                  <RefreshCw className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon" title="Download XLSX">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* <StaffTable /> */}
          <div className="space-y-4">
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
