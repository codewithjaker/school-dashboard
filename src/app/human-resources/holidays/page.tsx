// app/human-resources/holidays/page.tsx
"use client";

import { useState, useMemo } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  Calendar,
  Download,
  Edit,
  Filter,
  Home,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Eye,
  FileDown,
} from "lucide-react";
import { format } from "date-fns";

// Types
export type Holiday = {
  id: string;
  holidayName: string;
  shift: "All Shifts" | "Day Shifts" | "Night Shifts";
  date: Date;
  holidayType: string;
  createdBy: string;
  creationDate: Date;
  approvalStatus: "Approved" | "Rejected" | "Pending";
  details: string;
};

export default function HolidaysPage() {
  const [data, setData] = useState<Holiday[]>([
    {
      id: "1",
      holidayName: "New Year",
      shift: "All Shifts",
      date: new Date("2021-12-31"),
      holidayType: "National",
      createdBy: "Admin",
      creationDate: new Date("2021-11-01"),
      approvalStatus: "Approved",
      details: "This festival is celebrate for.",
    },
    {
      id: "2",
      holidayName: "World Aids Day",
      shift: "Day Shifts",
      date: new Date("2021-12-10"),
      holidayType: "Awareness",
      createdBy: "Admin",
      creationDate: new Date("2021-11-01"),
      approvalStatus: "Approved",
      details: "This festival is celebrate for.",
    },
    {
      id: "3",
      holidayName: "World Milk Day",
      shift: "Night Shifts",
      date: new Date("2021-06-01"),
      holidayType: "Awareness",
      createdBy: "Admin",
      creationDate: new Date("2021-11-01"),
      approvalStatus: "Approved",
      details: "This festival is celebrate for.",
    },
    {
      id: "4",
      holidayName: "Diwali",
      shift: "All Shifts",
      date: new Date("2021-11-04"),
      holidayType: "Religious",
      createdBy: "Admin",
      creationDate: new Date("2021-11-01"),
      approvalStatus: "Approved",
      details: "This festival is celebrate for.",
    },
    {
      id: "5",
      holidayName: "Global Family Day",
      shift: "Night Shifts",
      date: new Date("2021-01-01"),
      holidayType: "Cultural",
      createdBy: "Admin",
      creationDate: new Date("2021-11-01"),
      approvalStatus: "Rejected",
      details: "This festival is celebrate for.",
    },

    {
      id: "6",
      holidayName: "Earth Hour",
      shift: "All Shifts",
      date: new Date("2021-03-27"),
      holidayType: "Environmental",
      createdBy: "Admin",
      creationDate: new Date("2021-11-01"),
      approvalStatus: "Approved",
      details: "This festival is celebrate for.",
    },
    {
      id: "7",
      holidayName: "World Book Day",
      shift: "All Shifts",
      date: new Date("2021-04-23"),
      holidayType: "Cultural",
      createdBy: "Admin",
      creationDate: new Date("2021-11-01"),
      approvalStatus: "Rejected",
      details: "This festival is celebrate for.",
    },
    {
      id: "8",
      holidayName: "International Yoga Day",
      shift: "Night Shifts",
      date: new Date("2021-06-21"),
      holidayType: "Health",
      createdBy: "Admin",
      creationDate: new Date("2021-11-01"),
      approvalStatus: "Approved",
      details: "This festival is celebrate for.",
    },
    {
      id: "9",
      holidayName: "Eid",
      shift: "Day Shifts",
      date: new Date("2021-04-11"),
      holidayType: "Religious",
      createdBy: "Admin",
      creationDate: new Date("2021-11-01"),
      approvalStatus: "Approved",
      details: "This festival is celebrate for.",
    },
    {
      id: "10",
      holidayName: "Holi",
      shift: "Night Shifts",
      date: new Date("2021-07-25"),
      holidayType: "Religious",
      createdBy: "Admin",
      creationDate: new Date("2021-11-01"),
      approvalStatus: "Approved",
      details: "This festival is celebrate for.",
    },
  ]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState<string | null>(null);

  const columns: ColumnDef<Holiday>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
        accessorKey: "holidayName",
        header: "Holiday Name",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("holidayName")}</div>
        ),
      },
      {
        accessorKey: "shift",
        header: "Shift",
        cell: ({ row }) => (
          <Badge variant="outline" className="capitalize">
            {row.getValue("shift")}
          </Badge>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
          const date = new Date(row.getValue("date"));
          return (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{format(date, "MM/dd/yyyy")}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "holidayType",
        header: "Holiday Type",
        cell: ({ row }) => (
          <Badge
            variant={
              row.getValue("holidayType") === "National"
                ? "default"
                : row.getValue("holidayType") === "Religious"
                  ? "secondary"
                  : "outline"
            }
          >
            {row.getValue("holidayType")}
          </Badge>
        ),
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
      },
      {
        accessorKey: "creationDate",
        header: "Creation Date",
        cell: ({ row }) => {
          const date = new Date(row.getValue("creationDate"));
          return (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{format(date, "MM/dd/yyyy")}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "approvalStatus",
        header: "Approval Status",
        cell: ({ row }) => {
          const status = row.getValue("approvalStatus") as string;
          return (
            <Badge
              variant={
                status === "Approved"
                  ? "success"
                  : status === "Rejected"
                    ? "destructive"
                    : "secondary"
              }
            >
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "details",
        header: "Details",
        cell: ({ row }) => (
          <div className="max-w-[200px] truncate">
            {row.getValue("details")}
          </div>
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
        ),
      },
    ],
    [],
  );

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

  const handleAddOrUpdateHoliday = (holiday: Omit<Holiday, "id">) => {
    if (editingHoliday) {
      setData(
        data.map((h) =>
          h.id === editingHoliday.id
            ? { ...holiday, id: editingHoliday.id }
            : h,
        ),
      );
      setEditingHoliday(null);
    } else {
      setData([
        ...data,
        {
          ...holiday,
          id: (data.length + 1).toString(),
          creationDate: new Date(),
          createdBy: "Admin",
        },
      ]);
    }
    setIsAddDialogOpen(false);
  };

  const handleDeleteHoliday = () => {
    if (holidayToDelete) {
      setData(data.filter((h) => h.id !== holidayToDelete));
      setHolidayToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteSelected = () => {
    const selectedIds = Object.keys(rowSelection);
    setData(data.filter((h) => !selectedIds.includes(h.id)));
    setRowSelection({});
  };

  const handleRefresh = () => {
    // In a real app, this would refetch data from the server
    console.log("Refreshing data...");
  };

  const handleExportToExcel = () => {
    // In a real app, this would trigger an Excel download
    console.log("Exporting to Excel...");
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/human-resources">HR</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/human-resources/holidays">
              All Holidays
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Holidays</h1>
          <p className="text-muted-foreground">
            Manage and organize company holidays
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Holidays</CardTitle>
              <CardDescription>
                View and manage all holiday records
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {Object.keys(rowSelection).length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteSelected}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected ({Object.keys(rowSelection).length})
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingHoliday(null);
                  setIsAddDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Holiday
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Table Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search holidays..."
                    value={
                      (table
                        .getColumn("holidayName")
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn("holidayName")
                        ?.setFilterValue(event.target.value)
                    }
                    className="pl-9 w-[300px]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
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
                  onClick={handleExportToExcel}
                  title="Export to Excel"
                >
                  <FileDown className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      title="Show/Hide columns"
                    >
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
                        No holidays found.
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
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  <div>Page</div>
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </strong>
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
