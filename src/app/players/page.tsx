"use client";

import { useState, useMemo } from "react";
import {
  Calendar,
  Filter,
  Download,
  Printer,
  RefreshCw,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  ChevronDown,
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  FileSpreadsheet,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
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

// Define Player type
export type Player = {
  id: string;
  playerId: string;
  name: string;
  avatar: string;
  sport: string;
  dateOfJoin: Date;
};

const data: Player[] = [
  {
    id: "1",
    playerId: "SP826329",
    name: "Francis",
    avatar: "/placeholder.svg?height=40&width=40",
    sport: "Cricket",
    dateOfJoin: new Date("2024-04-25"),
  },
  {
    id: "2",
    playerId: "SP826328",
    name: "Cheryl",
    avatar: "/placeholder.svg?height=40&width=40",
    sport: "Throwball",
    dateOfJoin: new Date("2024-04-28"),
  },
  {
    id: "3",
    playerId: "SP826327",
    name: "Daniel",
    avatar: "/placeholder.svg?height=40&width=40",
    sport: "Football",
    dateOfJoin: new Date("2024-05-04"),
  },
  {
    id: "4",
    playerId: "SP826326",
    name: "Irene",
    avatar: "/placeholder.svg?height=40&width=40",
    sport: "Tennis",
    dateOfJoin: new Date("2024-05-16"),
  },
  {
    id: "5",
    playerId: "SP826325",
    name: "Keith",
    avatar: "/placeholder.svg?height=40&width=40",
    sport: "Basketball",
    dateOfJoin: new Date("2024-05-20"),
  },
  {
    id: "6",
    playerId: "SP826325",
    name: "Keith",
    avatar: "/placeholder.svg?height=40&width=40",
    sport: "Badminton",
    dateOfJoin: new Date("2024-05-20"),
  },
  {
    id: "7",
    playerId: "SP826325",
    name: "Keith",
    avatar: "/placeholder.svg?height=40&width=40",
    sport: "Carrom",
    dateOfJoin: new Date("2024-05-20"),
  },
  {
    id: "8",
    playerId: "SP826325",
    name: "Keith",
    avatar: "/placeholder.svg?height=40&width=40",
    sport: "Chess",
    dateOfJoin: new Date("2024-05-20"),
  },
  {
    id: "9",
    playerId: "SP826325",
    name: "Keith",
    avatar: "/placeholder.svg?height=40&width=40",
    sport: "Hockey",
    dateOfJoin: new Date("2024-05-20"),
  },
  {
    id: "10",
    playerId: "SP826325",
    name: "Keith",
    avatar: "/placeholder.svg?height=40&width=40",
    sport: "Volleyball",
    dateOfJoin: new Date("2024-05-20"),
  },
];

const columns: ColumnDef<Player>[] = [
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
    accessorKey: "playerId",
    header: "ID",
    cell: ({ row }) => (
      <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
        {row.getValue("playerId")}
      </a>
    ),
  },
  {
    accessorKey: "name",
    header: "Player Name",
    cell: ({ row }) => {
      const player = row.original;
      return (
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={player.avatar} alt={player.name} />
            <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{player.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sport",
    header: "Sports",
    cell: ({ row }) => {
      const sport = row.getValue("sport") as string;
      const colorClass = sportColors[sport] || "bg-gray-100 text-gray-800";
      return (
        <Badge className={colorClass} variant="secondary">
          {sport}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dateOfJoin",
    header: "Date of Join",
    cell: ({ row }) => {
      const date = row.getValue("dateOfJoin") as Date;
      return format(date, "dd MMM yyyy");
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

// Sport badge colors mapping
const sportColors: Record<string, string> = {
  Cricket: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  Throwball: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  Football: "bg-green-100 text-green-800 hover:bg-green-100",
  Tennis: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  Basketball: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  Badminton: "bg-red-100 text-red-800 hover:bg-red-100",
  Carrom: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
  Chess: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  Hockey: "bg-teal-100 text-teal-800 hover:bg-teal-100",
  Volleyball: "bg-pink-100 text-pink-800 hover:bg-pink-100",
};

export default function PlayersPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 31),
  });

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

  const filteredData = useMemo(() => {
    if (selectedSport === "all") return data;
    return data.filter((player) => player.sport === selectedSport);
  }, [selectedSport]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Players</h1>
          <Breadcrumb className="mt-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/management">Management</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Players</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Printer className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Player
          </Button>
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Players List</CardTitle>
              <CardDescription>Manage and view all players</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Date Range */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full md:w-auto justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>

              {/* Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-4">
                  <form className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-4">Filter</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="player-filter">Player</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select player" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="francis">Francis</SelectItem>
                              <SelectItem value="cheryl">Cheryl</SelectItem>
                              <SelectItem value="daniel">Daniel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sport-filter">Sport</Label>
                          <Select
                            value={selectedSport}
                            onValueChange={setSelectedSport}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select sport" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Sports</SelectItem>
                              <SelectItem value="Cricket">Cricket</SelectItem>
                              <SelectItem value="Throwball">
                                Throwball
                              </SelectItem>
                              <SelectItem value="Football">Football</SelectItem>
                              <SelectItem value="Tennis">Tennis</SelectItem>
                              <SelectItem value="Basketball">
                                Basketball
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedSport("all");
                          setDateRange({
                            from: new Date(2024, 0, 1),
                            to: new Date(2024, 11, 31),
                          });
                        }}
                      >
                        Reset
                      </Button>
                      <Button type="submit">Apply</Button>
                    </div>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <ChevronDown className="h-4 w-4" />
                    Sort by A-Z
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Ascending</DropdownMenuItem>
                  <DropdownMenuItem>Descending</DropdownMenuItem>
                  <DropdownMenuItem>Recently Viewed</DropdownMenuItem>
                  <DropdownMenuItem>Recently Added</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Pagination Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="rows-per-page">Rows per page</Label>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 25, 50, 100].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search players..."
                  className="pl-9 w-full md:w-[300px]"
                  value={
                    (table.getColumn("name")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                  }
                />
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
                  {filteredData.length ? (
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
                  <ChevronLeft className="h-4 w-4" />
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
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
