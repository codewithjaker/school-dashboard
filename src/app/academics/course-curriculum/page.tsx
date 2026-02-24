"use client";

import * as React from "react";

import { Download, RefreshCw, Filter, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2, MoreVertical, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

export type CourseCurriculum = {
  id: string;
  courseName: string;
  className: string;
  subjectName: string;
  description: string;
  duration: string;
  referenceMaterial: string;
  status: "active" | "inactive";
};

export const data: CourseCurriculum[] = [
  {
    id: "1",
    courseName: "Algebra Basics",
    className: "Class 1",
    subjectName: "Mathematics",
    description: "Introduction to variables and equations.",
    duration: "4 weeks",
    referenceMaterial: "NCERT Mathematics",
    status: "active",
  },
  {
    id: "2",
    courseName: "Photosynthesis",
    className: "Class 2",
    subjectName: "Science",
    description: "Understanding how plants make food.",
    duration: "2 weeks",
    referenceMaterial: "Science Today",
    status: "active",
  },
  {
    id: "3",
    courseName: "Essay Writing",
    className: "Class 3",
    subjectName: "English",
    description: "Techniques for effective writing.",
    duration: "3 weeks",
    referenceMaterial: "English Grammar",
    status: "active",
  },
  {
    id: "4",
    courseName: "Ancient Civilizations",
    className: "Class 4",
    subjectName: "History",
    description: "Study of early human societies.",
    duration: "5 weeks",
    referenceMaterial: "History World",
    status: "inactive",
  },
  {
    id: "5",
    courseName: "Map Reading",
    className: "Class 5",
    subjectName: "Geography",
    description: "Basics of cartography and map use.",
    duration: "2 weeks",
    referenceMaterial: "Geography Atlas",
    status: "active",
  },
  {
    id: "6",
    courseName: "Newton Laws",
    className: "Class 6",
    subjectName: "Physics",
    description: "Fundamental laws of motion.",
    duration: "4 weeks",
    referenceMaterial: "Concepts of Physics",
    status: "active",
  },
  {
    id: "7",
    courseName: "Periodic Table",
    className: "Class 7",
    subjectName: "Chemistry",
    description: "Exploring chemical elements.",
    duration: "3 weeks",
    referenceMaterial: "Chemistry Lab Manual",
    status: "active",
  },
  {
    id: "8",
    courseName: "Cell Structure",
    className: "Class 8",
    subjectName: "Biology",
    description: "The building blocks of life.",
    duration: "3 weeks",
    referenceMaterial: "Modern Biology",
    status: "active",
  },
  {
    id: "9",
    courseName: "Python Basics",
    className: "Class 9",
    subjectName: "Computer Science",
    description: "Introduction to programming with Python.",
    duration: "6 weeks",
    referenceMaterial: "Python for Beginners",
    status: "active",
  },
  {
    id: "10",
    courseName: "Supply and Demand",
    className: "Class 10",
    subjectName: "Economics",
    description: "Market forces and pricing.",
    duration: "4 weeks",
    referenceMaterial: "Economics Today",
    status: "active",
  },
];

export const columns: ColumnDef<CourseCurriculum>[] = [
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
    accessorKey: "courseName",
    header: "Course Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("courseName")}</div>
    ),
  },
  {
    accessorKey: "className",
    header: "Class",
  },
  {
    accessorKey: "subjectName",
    header: "Subject",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "referenceMaterial",
    header: "Reference Material",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "active" ? "default" : "secondary"}
          className={
            status === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-orange-100 text-orange-800 hover:bg-orange-100"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const course = row.original;
  //     const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  //     return (
  //       <>
  //         <div className="flex items-center gap-2">
  //           <Button
  //             variant="ghost"
  //             size="icon"
  //             className="h-8 w-8"
  //             onClick={() => console.log("Edit", course.id)}
  //           >
  //             <Edit className="h-4 w-4" />
  //           </Button>
  //           <Button
  //             variant="ghost"
  //             size="icon"
  //             className="h-8 w-8 text-destructive hover:text-destructive"
  //             onClick={() => setShowDeleteDialog(true)}
  //           >
  //             <Trash2 className="h-4 w-4" />
  //           </Button>
  //         </div>

  //         <AlertDialog
  //           open={showDeleteDialog}
  //           onOpenChange={setShowDeleteDialog}
  //         >
  //           <AlertDialogContent>
  //             <AlertDialogHeader>
  //               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
  //               <AlertDialogDescription>
  //                 This action will permanently delete the course curriculum for{" "}
  //                 <span className="font-semibold">{course.courseName}</span>.
  //                 This action cannot be undone.
  //               </AlertDialogDescription>
  //             </AlertDialogHeader>
  //             <AlertDialogFooter>
  //               <AlertDialogCancel>Cancel</AlertDialogCancel>
  //               <AlertDialogAction
  //                 onClick={() => {
  //                   console.log("Delete", course.id);
  //                   setShowDeleteDialog(false);
  //                 }}
  //                 className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
  //               >
  //                 Delete
  //               </AlertDialogAction>
  //             </AlertDialogFooter>
  //           </AlertDialogContent>
  //         </AlertDialog>
  //       </>
  //     );
  //   },
  // },
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

export default function CourseCurriculumPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
            <BreadcrumbLink href="/students">Students</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Course Curriculum</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>
                Manage and organize course curriculum across different classes
                and subjects
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              {/* <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Course
              </Button> */}
              <Button asChild>
                <Link href="/admin/academics/course-curriculum/new-curriculum">
                  <Plus className="mr-2 h-4 w-4" />
                  New Curriculum
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search courses..." className="pl-10" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4 mr-2" />
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
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
