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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, PlusCircle, RefreshCw, Download, Filter } from "lucide-react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  ArrowUpDown,
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

interface Teacher {
  id: string;
  name: string;
  department: string;
  email: string;
  gender: "male" | "female";
  mobile: string;
  degree: string;
  address: string;
  hireDate: Date;
  salary: number;
  image: string;
}

const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "John Deo",
    department: "mathematics",
    email: "test@email.com",
    gender: "male",
    mobile: "1234567890",
    degree: "M.Sc., PHD.",
    address: "123 Main St, Anytown, USA",
    hireDate: new Date("2018-02-25"),
    salary: 50000,
    image: "/images/user/user1.jpg",
  },
  {
    id: "2",
    name: "Sarah Smith",
    department: "civil",
    email: "test@email.com",
    gender: "female",
    mobile: "1234567890",
    degree: "M.C.A.",
    address: "123 Main St, Anytown, USA",
    hireDate: new Date("2018-02-12"),
    salary: 50000,
    image: "/images/user/user2.jpg",
  },
  {
    id: "3",
    name: "John Deo",
    department: "civil",
    email: "test@email.com",
    gender: "male",
    mobile: "1234567890",
    degree: "B.A., M.A.",
    address: "123 Main St, Anytown, USA",
    hireDate: new Date("2018-02-25"),
    salary: 50000,
    image: "/images/user/user3.jpg",
  },
  {
    id: "4",
    name: "Jay Soni",
    department: "mathematics",
    email: "test@email.com",
    gender: "female",
    mobile: "1234567890",
    degree: "M.Com., P.H.D.",
    address: "123 Main St, Anytown, USA",
    hireDate: new Date("2018-02-25"),
    salary: 50000,
    image: "/images/user/user4.jpg",
  },
  {
    id: "5",
    name: "Smita Parikh",
    department: "science",
    email: "test@email.com",
    gender: "male",
    mobile: "1234567890",
    degree: "B.C.A., M.C.A.",
    address: "123 Main St, Anytown, USA",
    hireDate: new Date("2018-02-25"),
    salary: 50000,
    image: "/images/user/user5.jpg",
  },
  {
    id: "6",
    name: "Pankaj Sinha",
    department: "Computer",
    email: "test@email.com",
    gender: "male",
    mobile: "1234567890",
    degree: "M.Com., P.H.D.",
    address: "123 Main St, Anytown, USA",
    hireDate: new Date("2018-02-25"),
    salary: 50000,
    image: "/images/user/user6.jpg",
  },
  {
    id: "7",
    name: "Pankaj Sinha",
    department: "mechanical",
    email: "test@email.com",
    gender: "male",
    mobile: "1234567890",
    degree: "M.Sc., PHD.",
    address: "123 Main St, Anytown, USA",
    hireDate: new Date("2018-02-25"),
    salary: 50000,
    image: "/images/user/user7.jpg",
  },
  {
    id: "8",
    name: "Jay Soni",
    department: "mathematics",
    email: "test@email.com",
    gender: "female",
    mobile: "1234567890",
    degree: "B.B.A., M.B.A.",
    address: "123 Main St, Anytown, USA",
    hireDate: new Date("2018-02-25"),
    salary: 50000,
    image: "/images/user/user8.jpg",
  },
  {
    id: "9",
    name: "Smita Parikh",
    department: "mathematics",
    email: "test@email.com",
    gender: "female",
    mobile: "1234567890",
    degree: "B.B.A., M.B.A.",
    address: "123 Main St, Anytown, USA",
    hireDate: new Date("2018-02-25"),
    salary: 50000,
    image: "/images/user/user9.jpg",
  },
  {
    id: "10",
    name: "Pooja Patel",
    department: "civil",
    email: "test@email.com",
    gender: "male",
    mobile: "1234567890",
    degree: "M.Com., P.H.D.",
    address: "123 Main St, Anytown, USA",
    hireDate: new Date("2018-02-25"),
    salary: 50000,
    image: "/images/user/user10.jpg",
  },
];

export default function AllTeachersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const handleDelete = (id?: string) => {
    console.log("Deleted data successfully");
  };

  const columns: ColumnDef<Teacher>[] = [
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-semibold"
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const teacher = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={teacher.image} alt={teacher.name} />
              <AvatarFallback>
                {teacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{teacher.name}</p>
              <p className="text-sm text-muted-foreground">
                {teacher.department}
              </p>
            </div>
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
          <span className="truncate max-w-[180px]">
            {row.getValue("email")}
          </span>
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
          <Phone className="h-4 w-4 text-green-600" />
          <span>{row.getValue("mobile")}</span>
        </div>
      ),
    },
    {
      accessorKey: "degree",
      header: "Degree",
      cell: ({ row }) => (
        <div className="truncate max-w-[150px]">{row.getValue("degree")}</div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 truncate max-w-[200px]">
          <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <span className="truncate">{row.getValue("address")}</span>
        </div>
      ),
    },
    {
      accessorKey: "hireDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Hire Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue("hireDate") as Date;
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-amber-600" />
            <span>{format(date, "MM/dd/yyyy")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "salary",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Salary
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const salary = parseFloat(row.getValue("salary"));
        return <div className="font-medium">${salary.toLocaleString()}</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const teacher = row.original;
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
                    This action cannot be undone. This will permanently delete
                    the student record and remove their data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: mockTeachers,
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Implement search logic here
  };

  const handleExport = () => {
    // Implement export logic here
    console.log("Exporting data...");
  };

  const handleRefresh = () => {
    // Implement refresh logic here
    console.log("Refreshing data...");
  };

  const handleDeleteSelected = () => {
    // Implement delete logic here
    console.log("Deleting selected items...");
    setShowDeleteDialog(false);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        {/* <Breadcrumb items={breadcrumbItems} /> */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/teachers">Teacher</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Teacher</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold tracking-tight mt-4">All Teacher</h1>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">All Teachers</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and view all teachers in the system
              </p>
            </div>
            {/* <TeacherTableToolbar /> */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search teachers..."
                  className="pl-8 w-full sm:w-[250px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>

              <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete Selected Teachers
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the selected teachers from the system.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteSelected}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="h-4 w-4 mr-2" />
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem checked>
                    Name
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Department
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Email
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Gender
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Mobile
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Degree
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Address
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Hire Date
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Salary
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button size="sm" className="h-9 bg-green-600 hover:bg-green-700">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Teacher
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <Separator className="mt-4" />
        </CardHeader>
        <CardContent>
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
                        No teachers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
