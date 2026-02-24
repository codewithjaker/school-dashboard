"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Home,
  Search,
  Filter,
  PlusCircle,
  RefreshCw,
  Download,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronDown,
  Mail,
  Phone,
  Calendar,
  MapPin,
  User,
  Eye,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

type Student = {
  id: string;
  rollNo: number;
  name: string;
  email: string;
  gender: "male" | "female";
  mobile: string;
  department: string;
  date_of_birth: string;
  address: string;
  parent_guardian_mobile: string;
  profile_completion_status: "complete" | "incomplete";
  profileImage?: string;
};

const studentData: Student[] = [
  {
    id: "1",
    rollNo: 1,
    name: "John Deo",
    email: "john@email.com",
    gender: "male",
    mobile: "1234567890",
    department: "mathematics",
    date_of_birth: "2005-06-15",
    address: "123 Main St, Anytown, USA",
    parent_guardian_mobile: "0987654321",
    profile_completion_status: "complete",
    profileImage: "/images/user/user1.jpg",
  },
  {
    id: "2",
    rollNo: 2,
    name: "Sarah Smith",
    email: "sarah@email.com",
    gender: "female",
    mobile: "1234567890",
    department: "civil",
    date_of_birth: "2005-08-20",
    address: "456 Elm St, Anytown, USA",
    parent_guardian_mobile: "0987654322",
    profile_completion_status: "complete",
    profileImage: "/images/user/user2.jpg",
  },
  {
    id: "3",
    rollNo: 3,
    name: "John Deo",
    email: "john2@email.com",
    gender: "male",
    mobile: "1234567890",
    department: "computer",
    date_of_birth: "2005-04-15",
    address: "789 Pine St, Anytown, USA",
    parent_guardian_mobile: "0987654323",
    profile_completion_status: "complete",
    profileImage: "/images/user/user3.jpg",
  },
  {
    id: "4",
    rollNo: 4,
    name: "Jay Soni",
    email: "jay@email.com",
    gender: "female",
    mobile: "1234567890",
    department: "civil",
    date_of_birth: "2005-05-10",
    address: "321 Oak St, Anytown, USA",
    parent_guardian_mobile: "0987654324",
    profile_completion_status: "incomplete",
    profileImage: "/images/user/user4.jpg",
  },
  {
    id: "5",
    rollNo: 5,
    name: "Smita Parikh",
    email: "smita@email.com",
    gender: "male",
    mobile: "1234567890",
    department: "science",
    date_of_birth: "2005-03-30",
    address: "654 Maple St, Anytown, USA",
    parent_guardian_mobile: "0987654325",
    profile_completion_status: "complete",
   profileImage: "/images/user/user5.jpg",
  },
  {
    id: "6",
    rollNo: 6,
    name: "Pankaj Sinha",
    email: "pankaj@email.com",
    gender: "male",
    mobile: "1234567890",
    department: "computer",
    date_of_birth: "2005-02-12",
    address: "159 Cedar St, Anytown, USA",
    parent_guardian_mobile: "0987654326",
    profile_completion_status: "complete",
   profileImage: "/images/user/user6.jpg",
  },
  {
    id: "7",
    rollNo: 7,
    name: "Pankaj Sinha",
    email: "pankaj2@email.com",
    gender: "male",
    mobile: "1234567890",
    department: "computer",
    date_of_birth: "2005-11-21",
    address: "852 Birch St, Anytown, USA",
    parent_guardian_mobile: "0987654327",
    profile_completion_status: "complete",
    profileImage: "/images/user/user7.jpg",
  },
  {
    id: "8",
    rollNo: 8,
    name: "Jay Soni",
    email: "jay2@email.com",
    gender: "female",
    mobile: "1234567890",
    department: "civil",
    date_of_birth: "2005-07-18",
    address: "147 Spruce St, Anytown, USA",
    parent_guardian_mobile: "0987654328",
    profile_completion_status: "complete",
    profileImage: "/images/user/user8.jpg",
  },
  {
    id: "9",
    rollNo: 9,
    name: "Smita Parikh",
    email: "smita2@email.com",
    gender: "female",
    mobile: "1234567890",
    department: "mathematics",
    date_of_birth: "2005-09-25",
    address: "258 Fir St, Anytown, USA",
    parent_guardian_mobile: "0987654329",
    profile_completion_status: "complete",
    profileImage: "/images/user/user9.jpg",
  },
  {
    id: "10",
    rollNo: 10,
    name: "Pooja Patel",
    email: "pooja@email.com",
    gender: "male",
    mobile: "1234567890",
    department: "civil",
    date_of_birth: "2005-10-05",
    address: "369 Willow St, Anytown, USA",
    parent_guardian_mobile: "0987654330",
    profile_completion_status: "complete",
    profileImage: "/images/user/user10.jpg",
  },
];

const columns: ColumnDef<Student>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {student.profileImage ? (
              <img
                src={student.profileImage}
                alt={student.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-gray-500" />
            )}
          </div>
          <span className="font-medium">{student.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span className="truncate max-w-[180px]">{row.getValue("email")}</span>
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.getValue("gender") as string;
      return (
        <Badge
          variant={gender === "male" ? "default" : "secondary"}
          className={
            gender === "male"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-purple-100 text-purple-800 hover:bg-purple-100"
          }
        >
          {gender}
        </Badge>
      );
    },
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("mobile")}</span>
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("department")}</div>
    ),
  },
  {
    accessorKey: "date_of_birth",
    header: "Date of Birth",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date_of_birth"));
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(date, "MM/dd/yyyy")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 max-w-[200px]">
        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span className="truncate">{row.getValue("address")}</span>
      </div>
    ),
  },
  {
    accessorKey: "parent_guardian_mobile",
    header: "Parent/Guardian Mobile",
    cell: ({ row }) => <div>{row.getValue("parent_guardian_mobile")}</div>,
  },
  {
    accessorKey: "profile_completion_status",
    header: "Profile Completion",
    cell: ({ row }) => {
      const status = row.getValue("profile_completion_status") as string;
      return (
        <Badge
          variant={status === "complete" ? "default" : "destructive"}
          className={
            status === "complete"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : ""
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original;

      const handleEdit = () => {
        console.log("Edit student:", student.id);
        // Implement edit logic here
      };

      const handleDelete = () => {
        console.log("Delete student:", student.id);
        // Implement delete logic here
      };

      return (
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
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];

export default function AllStudentsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: studentData,
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
  });

  const handleRefresh = () => {
    // Implement refresh logic
    console.log("Refreshing data...");
  };

  const handleAddStudent = () => {
    // Implement add student logic
    console.log("Adding new student...");
  };

  const handleExport = () => {
    // Implement export logic
    console.log("Exporting data...");
  };

  return (
    <div className="space-y-6">
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

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Students</h1>
          <p className="text-muted-foreground">
            Manage and view all student records
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Students List</CardTitle>

            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="pl-9 w-full sm:w-[250px]"
                />
              </div>

              {/* Column Visibility */}
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleRefresh}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Refresh</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleAddStudent}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add Student</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleExport}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Export Data</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
}
