"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Search,
  Plus,
  RefreshCw,
  Download,
  Filter,
  Home,
  User,
  Phone,
  Mail,
  Calendar,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define the data type
export type AdmissionInquiry = {
  id: string;
  studentName: string;
  studentImage: string;
  guardianName: string;
  contactNumber: string;
  emailAddress: string;
  dateOfInquiry: Date;
  inquirySource: "Website" | "Referral" | "Social Media" | "Email" | "Walk-in";
  status: "New" | "In Process" | "Closed" | "Follow-up";
  followUpDate: Date;
  assignedTo: string;
  campusLocation: string;
  previousEducation: string;
};

// Sample data
const data: AdmissionInquiry[] = [
  {
    id: "1",
    studentName: "Alice Johnson",
    studentImage: "/assets/images/user/user1.jpg",
    guardianName: "Michael Johnson",
    contactNumber: "+1234567891",
    emailAddress: "alice.johnson@example.com",
    dateOfInquiry: new Date("2024-11-22"),
    inquirySource: "Website",
    status: "Closed",
    followUpDate: new Date("2024-11-29"),
    assignedTo: "Emily Clark",
    campusLocation: "Main Campus",
    previousEducation: "High School Diploma",
  },
  {
    id: "2",
    studentName: "David Smith",
    studentImage: "/assets/images/user/user2.jpg",
    guardianName: "Laura Smith",
    contactNumber: "+1234567892",
    emailAddress: "david.smith@example.com",
    dateOfInquiry: new Date("2024-11-21"),
    inquirySource: "Referral",
    status: "In Process",
    followUpDate: new Date("2024-11-30"),
    assignedTo: "John Doe",
    campusLocation: "North Campus",
    previousEducation: "High School Diploma",
  },
  {
    id: "3",
    studentName: "Sophia Brown",
    studentImage: "/assets/images/user/user3.jpg",
    guardianName: "David Brown",
    contactNumber: "+1234567893",
    emailAddress: "sophia.brown@example.com",
    dateOfInquiry: new Date("2024-11-20"),
    inquirySource: "Social Media",
    status: "Closed",
    followUpDate: new Date("2024-12-01"),
    assignedTo: "Jessica Taylor",
    campusLocation: "Main Campus",
    previousEducation: "A-Level",
  },
  {
    id: "4",
    studentName: "Liam Wilson",
    studentImage: "/assets/images/user/user4.jpg",
    guardianName: "Rebecca Wilson",
    contactNumber: "+1234567894",
    emailAddress: "liam.wilson@example.com",
    dateOfInquiry: new Date("2024-11-19"),
    inquirySource: "Website",
    status: "New",
    followUpDate: new Date("2024-11-28"),
    assignedTo: "Mark Harris",
    campusLocation: "South Campus",
    previousEducation: "High School Diploma",
  },
  {
    id: "5",
    studentName: "Emma Martinez",
    studentImage: "/assets/images/user/user5.jpg",
    guardianName: "Carlos Martinez",
    contactNumber: "+1234567895",
    emailAddress: "emma.martinez@example.com",
    dateOfInquiry: new Date("2024-11-18"),
    inquirySource: "Email",
    status: "New",
    followUpDate: new Date("2024-11-27"),
    assignedTo: "Sophia Johnson",
    campusLocation: "Main Campus",
    previousEducation: "Associate Degree",
  },
  {
    id: "6",
    studentName: "Olivia Garcia",
    studentImage: "/assets/images/user/user6.jpg",
    guardianName: "Thomas Garcia",
    contactNumber: "+1234567896",
    emailAddress: "olivia.garcia@example.com",
    dateOfInquiry: new Date("2024-11-17"),
    inquirySource: "Website",
    status: "New",
    followUpDate: new Date("2024-11-26"),
    assignedTo: "Anna Lee",
    campusLocation: "West Campus",
    previousEducation: "High School Diploma",
  },
  {
    id: "7",
    studentName: "Noah Taylor",
    studentImage: "/assets/images/user/user7.jpg",
    guardianName: "Linda Taylor",
    contactNumber: "+1234567897",
    emailAddress: "noah.taylor@example.com",
    dateOfInquiry: new Date("2024-11-16"),
    inquirySource: "Social Media",
    status: "In Process",
    followUpDate: new Date("2024-11-25"),
    assignedTo: "Chris Green",
    campusLocation: "Main Campus",
    previousEducation: "High School Diploma",
  },
  {
    id: "8",
    studentName: "Ava Anderson",
    studentImage: "/assets/images/user/user8.jpg",
    guardianName: "James Anderson",
    contactNumber: "+1234567898",
    emailAddress: "ava.anderson@example.com",
    dateOfInquiry: new Date("2024-11-15"),
    inquirySource: "Website",
    status: "Closed",
    followUpDate: new Date("2024-11-24"),
    assignedTo: "David White",
    campusLocation: "South Campus",
    previousEducation: "High School Diploma",
  },
  {
    id: "9",
    studentName: "Ethan Lee",
    studentImage: "/assets/images/user/user9.jpg",
    guardianName: "Patricia Lee",
    contactNumber: "+1234567899",
    emailAddress: "ethan.lee@example.com",
    dateOfInquiry: new Date("2024-11-14"),
    inquirySource: "Referral",
    status: "In Process",
    followUpDate: new Date("2024-11-23"),
    assignedTo: "Matthew King",
    campusLocation: "East Campus",
    previousEducation: "High School Diploma",
  },
  {
    id: "10",
    studentName: "Mia Rodriguez",
    studentImage: "/assets/images/user/user10.jpg",
    guardianName: "Luis Rodriguez",
    contactNumber: "+1234567800",
    emailAddress: "mia.rodriguez@example.com",
    dateOfInquiry: new Date("2024-11-13"),
    inquirySource: "Website",
    status: "New",
    followUpDate: new Date("2024-11-22"),
    assignedTo: "Emma Clark",
    campusLocation: "Main Campus",
    previousEducation: "A-Level",
  },
];

// Status badge configuration
const statusConfig: Record<
  string,
  {
    variant: "default" | "secondary" | "destructive" | "outline" | "success";
    label: string;
  }
> = {
  New: { variant: "success", label: "New" },
  "In Process": { variant: "secondary", label: "In Process" },
  Closed: { variant: "destructive", label: "Closed" },
  "Follow-up": { variant: "default", label: "Follow-up" },
};

export default function AdmissionInquiryPage() {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  // Define columns
  const columns: ColumnDef<AdmissionInquiry>[] = [
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
      accessorKey: "studentName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0 font-medium"
          >
            Student Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const inquiry = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={inquiry.studentImage}
                alt={inquiry.studentName}
              />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="font-medium">{inquiry.studentName}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "guardianName",
      header: "Guardian Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("guardianName")}</div>
      ),
    },
    {
      accessorKey: "contactNumber",
      header: "Contact Number",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-green-600" />
          <span>{row.getValue("contactNumber")}</span>
        </div>
      ),
    },
    {
      accessorKey: "emailAddress",
      header: "Email Address",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-red-600" />
          <span className="truncate">{row.getValue("emailAddress")}</span>
        </div>
      ),
    },
    {
      accessorKey: "dateOfInquiry",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0 font-medium"
          >
            Date of Inquiry
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue("dateOfInquiry") as Date;
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-amber-600" />
            <span>{format(date, "MM/dd/yyyy")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "inquirySource",
      header: "Inquiry Source",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const config = statusConfig[status] || {
          variant: "outline",
          label: status,
        };
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "followUpDate",
      header: "Follow Up Date",
      cell: ({ row }) => {
        const date = row.getValue("followUpDate") as Date;
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-amber-600" />
            <span>{format(date, "MM/dd/yyyy")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned To",
    },
    {
      accessorKey: "campusLocation",
      header: "Campus Location",
    },
    {
      accessorKey: "previousEducation",
      header: "Previous Education",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const inquiry = row.original;
        return (
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(inquiry.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(inquiry.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleView(inquiry.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];

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
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  // Action handlers
  const handleEdit = (id: string) => {
    console.log("Edit inquiry:", id);
    // router.push(`/front-office/admission-inquiry/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    console.log("Delete inquiry:", id);
    // Add delete confirmation dialog
  };

  const handleView = (id: string) => {
    console.log("View inquiry:", id);
    // router.push(`/front-office/admission-inquiry/${id}`);
  };

  const handleAdd = () => {
    console.log("Add new inquiry");
    // router.push('/front-office/admission-inquiry/new');
  };

  const handleExport = () => {
    console.log("Export data");
    // Implement export logic
  };

  const handleRefresh = () => {
    console.log("Refresh data");
    // Implement refresh logic
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/admin/dashboard"
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/front-office">Front Office</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Admission Inquiry</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Admission Inquiry
          </h1>
          <p className="text-muted-foreground">
            Manage admission inquiries and follow-ups
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Admission Inquiries</CardTitle>
              <CardDescription>
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search inquiries..."
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="w-[300px] pl-9"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
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
                </TooltipProvider>

                <TooltipProvider>
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
                      <p>Export to Excel</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={handleAdd}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add New Inquiry</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Column Visibility */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
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
                      onClick={() => handleView(row.original.id)}
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
          <div className="flex items-center justify-between py-4">
            <div className="text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
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
