"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Plus, RefreshCw, Download, Filter, Search } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Calendar, Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

export type LessonPlan = {
  id: string;
  topic: string;
  lessonName: string;
  className: string;
  subject: string;
  teacher: string;
  date: string;
  objectives: string;
  teachingMethod: string;
  status: "Completed" | "In Progress" | "Planned";
};

const data: LessonPlan[] = [
  {
    id: "1",
    topic: "Algebra Basics",
    lessonName: "Introduction to Algebra",
    className: "Class 1",
    subject: "Mathematics",
    teacher: "John Doe",
    date: "10/01/2023",
    objectives: "Understand basic algebra concepts",
    teachingMethod: "Lecture",
    status: "Completed",
  },
  {
    id: "2",
    topic: "Plant Biology",
    lessonName: "Photosynthesis Process",
    className: "Class 2",
    subject: "Science",
    teacher: "Jane Smith",
    date: "10/02/2023",
    objectives: "Learn photosynthesis",
    teachingMethod: "Lab",
    status: "In Progress",
  },
  {
    id: "3",
    topic: "Literature",
    lessonName: "Modern Poetry",
    className: "Class 3",
    subject: "English",
    teacher: "Alice Brown",
    date: "10/03/2023",
    objectives: "Analyze modern poems",
    teachingMethod: "Discussion",
    status: "Planned",
  },
  {
    id: "4",
    topic: "World History",
    lessonName: "The French Revolution",
    className: "Class 4",
    subject: "History",
    teacher: "Bob White",
    date: "10/04/2023",
    objectives: "Understand revolution events",
    teachingMethod: "Video",
    status: "Completed",
  },
  {
    id: "5",
    topic: "Physical Geography",
    lessonName: "World Map Basics",
    className: "Class 5",
    subject: "Geography",
    teacher: "Charlie Green",
    date: "10/05/2023",
    objectives: "Map identification",
    teachingMethod: "Workshop",
    status: "In Progress",
  },
  {
    id: "6",
    topic: "Classical Mechanics",
    lessonName: "Laws of Motion",
    className: "Class 6",
    subject: "Physics",
    teacher: "David Black",
    date: "10/06/2023",
    objectives: "Newton laws",
    teachingMethod: "Problem Solving",
    status: "Planned",
  },
  {
    id: "7",
    topic: "Inorganic Chemistry",
    lessonName: "Chemical Bonding",
    className: "Class 7",
    subject: "Chemistry",
    teacher: "Emma Watson",
    date: "10/07/2023",
    objectives: "Bond types",
    teachingMethod: "Lecture",
    status: "Completed",
  },
  {
    id: "8",
    topic: "Human Biology",
    lessonName: "Human Anatomy",
    className: "Class 8",
    subject: "Biology",
    teacher: "Frank Miller",
    date: "10/08/2023",
    objectives: "Body systems",
    teachingMethod: "Presentation",
    status: "In Progress",
  },
  {
    id: "9",
    topic: "Intro to CS",
    lessonName: "Algorithms and Flowcharts",
    className: "Class 9",
    subject: "Computer Science",
    teacher: "Grace Hopper",
    date: "10/09/2023",
    objectives: "Flowchart design",
    teachingMethod: "Coding",
    status: "Planned",
  },
  {
    id: "10",
    topic: "Basic Economics",
    lessonName: "Macroeconomics",
    className: "Class 10",
    subject: "Economics",
    teacher: "Henry Ford",
    date: "10/10/2023",
    objectives: "Economic principles",
    teachingMethod: "Seminar",
    status: "Completed",
  },
];

const columns: ColumnDef<LessonPlan>[] = [
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
    accessorKey: "topic",
    header: "Topic",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("topic")}</div>
    ),
  },
  {
    accessorKey: "lessonName",
    header: "Lesson Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("lessonName")}</div>
    ),
  },
  {
    accessorKey: "className",
    header: "Class",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "teacher",
    header: "Teacher",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("date")}</span>
      </div>
    ),
  },
  {
    accessorKey: "objectives",
    header: "Objectives",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue("objectives")}</div>
    ),
  },
  {
    accessorKey: "teachingMethod",
    header: "Teaching Method",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as LessonPlan["status"];
      const variant = {
        Completed: "default",
        "In Progress": "warning",
        Planned: "outline",
      }[status];

      return <Badge variant={variant as any}>{status}</Badge>;
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

export default function LessonPlanningPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
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
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col gap-6">
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
            <BreadcrumbLink href="/students">'Academics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Lesson Planning</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Lesson Planning</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search lesson plans..."
                  className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem checked>
                    Topic
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Lesson Name
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Class
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Subject
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Teacher
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>
                    Status
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>

              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Lesson Plan
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
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
