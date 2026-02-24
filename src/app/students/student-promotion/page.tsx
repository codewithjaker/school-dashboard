"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Home,
  Search,
  Filter,
  PlusCircle,
  RefreshCw,
  Download,
  Edit,
  Trash2,
  ChevronDown,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

type StudentPromotion = {
  id: string;
  studentName: string;
  rollNo: number;
  currentClass: string;
  promotedClass: string;
  section: string;
  session: string;
  promotionDate: string;
  percentage: number;
  result: "Pass" | "Fail";
  status: "Promoted" | "Detained";
  avatar: string;
};

const studentPromotions: StudentPromotion[] = [
  {
    id: "1",
    studentName: "John Doe",
    rollNo: 101,
    currentClass: "Grade 5",
    promotedClass: "Grade 6",
    section: "A",
    session: "2023-2024",
    promotionDate: "06/15/2024",
    percentage: 90,
    result: "Pass",
    status: "Promoted",
    avatar: "/images/user/user1.jpg",
  },
  {
    id: "2",
    studentName: "Sarah Smith",
    rollNo: 102,
    currentClass: "Grade 5",
    promotedClass: "Grade 6",
    section: "B",
    session: "2023-2024",
    promotionDate: "06/15/2024",
    percentage: 84,
    result: "Pass",
    status: "Promoted",
    avatar: "/images/user/user2.jpg",
  },
  {
    id: "3",
    studentName: "Michael Brown",
    rollNo: 103,
    currentClass: "Grade 5",
    promotedClass: "Grade 6",
    section: "A",
    session: "2023-2024",
    promotionDate: "06/15/2024",
    percentage: 76,
    result: "Pass",
    status: "Promoted",
    avatar: "/images/user/user3.jpg",
  },
  {
    id: "4",
    studentName: "Emily Davis",
    rollNo: 104,
    currentClass: "Grade 4",
    promotedClass: "Grade 5",
    section: "C",
    session: "2023-2024",
    promotionDate: "06/15/2024",
    percentage: 94,
    result: "Pass",
    status: "Promoted",
    avatar: "/images/user/user4.jpg",
  },
  {
    id: "5",
    studentName: "David Wilson",
    rollNo: 105,
    currentClass: "Grade 4",
    promotedClass: "Grade 5",
    section: "B",
    session: "2023-2024",
    promotionDate: "06/15/2024",
    percentage: 62,
    result: "Pass",
    status: "Promoted",
   avatar: "/images/user/user5.jpg",
  },
  {
    id: "6",
    studentName: "Jessica Taylor",
    rollNo: 106,
    currentClass: "Grade 4",
    promotedClass: "Grade 4",
    section: "A",
    session: "2023-2024",
    promotionDate: "06/15/2024",
    percentage: 30,
    result: "Fail",
    status: "Detained",
    avatar: "/images/user/user6.jpg",
  },
  {
    id: "7",
    studentName: "Kevin Anderson",
    rollNo: 107,
    currentClass: "Grade 3",
    promotedClass: "Grade 4",
    section: "B",
    session: "2023-2024",
    promotionDate: "06/15/2024",
    percentage: 80,
    result: "Pass",
    status: "Promoted",
  avatar: "/images/user/user7.jpg",
  },
  {
    id: "8",
    studentName: "Linda Martinez",
    rollNo: 108,
    currentClass: "Grade 3",
    promotedClass: "Grade 4",
    section: "C",
    session: "2023-2024",
    promotionDate: "06/15/2024",
    percentage: 86,
    result: "Pass",
    status: "Promoted",
    avatar: "/images/user/user8.jpg",
  },
  {
    id: "9",
    studentName: "Robert Thomas",
    rollNo: 109,
    currentClass: "Grade 3",
    promotedClass: "Grade 4",
    section: "A",
    session: "2023-2024",
    promotionDate: "06/15/2024",
    percentage: 78,
    result: "Pass",
    status: "Promoted",
    avatar: "/images/user/user9.jpg",
  },
  {
    id: "10",
    studentName: "Jennifer Lee",
    rollNo: 110,
    currentClass: "Grade 2",
    promotedClass: "Grade 3",
    section: "B",
    session: "2023-2024",
    promotionDate: "06/15/2024",
    percentage: 92,
    result: "Pass",
    status: "Promoted",
    avatar: "/images/user/user10.jpg",
  },
];

const columns: ColumnDef<StudentPromotion>[] = [
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
    accessorKey: "studentName",
    header: "Student Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Image
          src={row.original.avatar}
          alt={row.original.studentName}
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="font-medium">{row.original.studentName}</span>
      </div>
    ),
  },
  {
    accessorKey: "rollNo",
    header: "Roll No",
  },
  {
    accessorKey: "currentClass",
    header: "Current Class",
  },
  {
    accessorKey: "promotedClass",
    header: "Promoted Class",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "session",
    header: "Session",
  },
  {
    accessorKey: "promotionDate",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>{row.original.promotionDate}</span>
      </div>
    ),
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
    cell: ({ row }) => `${row.original.percentage}%`,
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => (
      <Badge
        variant={row.original.result === "Pass" ? "default" : "destructive"}
        className={
          row.original.result === "Pass"
            ? "bg-green-100 text-green-800 hover:bg-green-100"
            : "bg-red-100 text-red-800 hover:bg-red-100"
        }
      >
        {row.original.result}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "Promoted" ? "default" : "destructive"}
        className={
          row.original.status === "Promoted"
            ? "bg-green-100 text-green-800 hover:bg-green-100"
            : "bg-red-100 text-red-800 hover:bg-red-100"
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default function StudentPromotionPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: studentPromotions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const breadcrumbItems = [
    { label: "Home", href: "/admin/dashboard/main", icon: Home },
    { label: "Student", href: "/students" },
    { label: "Promotion", href: "/students/student-promotion" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        {/* <Breadcrumb items={breadcrumbItems} /> */}
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/admin/dashboard"
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/students">Students</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Promotion</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Student Promotion
            </h1>
            <p className="text-muted-foreground">
              Manage student promotions and track academic progress
            </p>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Promotion Records</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search promotions..."
                className="pl-9 w-64"
                value={
                  (table
                    .getColumn("studentName")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("studentName")
                    ?.setFilterValue(event.target.value)
                }
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* Filter options would go here */}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon">
              <PlusCircle className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
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
                                header.getContext()
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
                            cell.getContext()
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
    </div>
  );
}
