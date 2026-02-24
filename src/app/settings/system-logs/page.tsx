// app/admin/settings/system-logs/components/system-logs-client.tsx
"use client";

import * as React from "react";
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
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

type LogEntry = {
  id: string;
  timestamp: string;
  user: string;
  activity: string;
  module: string;
  severity: "Info" | "Warning" | "Error" | "Alert";
  status: string;
};

const mockData: LogEntry[] = [
  {
    id: "1",
    timestamp: "2024-12-25 10:00:05",
    user: "admin_john",
    activity: "User Login",
    module: "Auth",
    severity: "Info",
    status: "Success",
  },
  {
    id: "2",
    timestamp: "2024-12-25 10:05:12",
    user: "sarah_m",
    activity: "Updated Profile",
    module: "Settings",
    severity: "Info",
    status: "Success",
  },
  {
    id: "3",
    timestamp: "2024-12-25 10:10:45",
    user: "mike_j",
    activity: "Deleted Report",
    module: "Reports",
    severity: "Warning",
    status: "Success",
  },
  {
    id: "4",
    timestamp: "2024-12-25 10:15:30",
    user: "system",
    activity: "Database Backup",
    module: "System",
    severity: "Info",
    status: "Success",
  },
  {
    id: "5",
    timestamp: "2024-12-25 10:20:20",
    user: "admin_john",
    activity: "Bulk Upload Failure",
    module: "Registration",
    severity: "Error",
    status: "Failed",
  },
  {
    id: "6",
    timestamp: "2024-12-25 10:25:55",
    user: "emily_d",
    activity: "Generated Fee Invoice",
    module: "Finance",
    severity: "Info",
    status: "Success",
  },
  {
    id: "7",
    timestamp: "2024-12-25 10:30:10",
    user: "lisa_b",
    activity: "Role Permission Change",
    module: "Security",
    severity: "Alert",
    status: "Success",
  },
  {
    id: "8",
    timestamp: "2024-12-25 10:35:40",
    user: "will_c",
    activity: "Cleared Cache",
    module: "Maintenance",
    severity: "Info",
    status: "Success",
  },
  {
    id: "9",
    timestamp: "2024-12-25 10:40:05",
    user: "system",
    activity: "Mail Server Error",
    module: "Communication",
    severity: "Error",
    status: "Failed",
  },
  {
    id: "10",
    timestamp: "2024-12-25 10:45:22",
    user: "amanda_l",
    activity: "Exam Marks Entry",
    module: "Academics",
    severity: "Info",
    status: "Success",
  },
  {
    id: "11",
    timestamp: "2024-12-25 10:50:15",
    user: "kevin_r",
    activity: "Generated Report",
    module: "Reports",
    severity: "Info",
    status: "Success",
  },
  {
    id: "12",
    timestamp: "2024-12-25 10:55:30",
    user: "nancy_p",
    activity: "Payment Received",
    module: "Finance",
    severity: "Info",
    status: "Success",
  },
  {
    id: "13",
    timestamp: "2024-12-25 11:00:00",
    user: "system",
    activity: "Scheduled Backup",
    module: "System",
    severity: "Info",
    status: "Success",
  },
];

type ColumnKey = keyof LogEntry | "select" | "actions";

const allColumns: { key: ColumnKey; label: string; visible: boolean }[] = [
  { key: "select", label: "Select", visible: true },
  { key: "timestamp", label: "Timestamp", visible: true },
  { key: "user", label: "User", visible: true },
  { key: "activity", label: "Activity", visible: true },
  { key: "module", label: "Module", visible: true },
  { key: "severity", label: "Severity", visible: true },
  { key: "status", label: "Status", visible: true },
  { key: "actions", label: "Actions", visible: true },
];

const severityColor = {
  Info: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  Warning: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  Error: "bg-red-100 text-red-800 hover:bg-red-100",
  Alert: "bg-purple-100 text-purple-800 hover:bg-purple-100",
};

export default function SystemLogsClient() {
  const [data, setData] = React.useState<LogEntry[]>(mockData);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortColumn, setSortColumn] = React.useState<ColumnKey | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc",
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    new Set(),
  );
  const [columns, setColumns] = React.useState(allColumns);

  // Filtering
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [data, searchTerm]);

  // Sorting
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      let aVal = a[sortColumn as keyof LogEntry] ?? "";
      let bVal = b[sortColumn as keyof LogEntry] ?? "";
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });
    return sorted;
  }, [filteredData, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Handle sort toggle
  const handleSort = (column: ColumnKey) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = new Set(paginatedData.map((item) => item.id));
      setSelectedRows(newSelected);
    } else {
      setSelectedRows(new Set());
    }
  };

  // Handle select row
  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  // Toggle column visibility
  const toggleColumn = (key: ColumnKey) => {
    setColumns(
      columns.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col,
      ),
    );
  };

  // Reset to first page on filter change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortColumn, sortDirection]);

  const visibleColumns = columns.filter((col) => col.visible);

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard/main">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/settings">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>System Logs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">System Logs</h2>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[200px] pl-8 md:w-[300px]"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Delete button (hidden initially) */}
            <Button variant="ghost" size="icon" className="hidden text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>

            {/* Show/Hide Column */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {columns.map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.key}
                    checked={col.visible}
                    onCheckedChange={() => toggleColumn(col.key)}
                  >
                    {col.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Add */}
            <Button variant="ghost" size="icon">
              <PlusCircle className="h-4 w-4" />
            </Button>

            {/* Refresh */}
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>

            {/* Download XLSX */}
            <Button variant="ghost" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Table */}
          <div className="overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {visibleColumns.map((col) => {
                    if (col.key === "select") {
                      return (
                        <TableHead key={col.key} className="w-12">
                          <Checkbox
                            checked={
                              paginatedData.length > 0 &&
                              paginatedData.every((row) =>
                                selectedRows.has(row.id),
                              )
                            }
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                      );
                    }
                    if (col.key === "actions") {
                      return <TableHead key={col.key}>Actions</TableHead>;
                    }
                    return (
                      <TableHead
                        key={col.key}
                        className={cn(
                          "cursor-pointer select-none",
                          sortColumn === col.key && "font-semibold",
                        )}
                        onClick={() => handleSort(col.key)}
                      >
                        <div className="flex items-center gap-1">
                          {col.label}
                          {sortColumn === col.key && (
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform",
                                sortDirection === "desc" && "rotate-180",
                              )}
                            />
                          )}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={visibleColumns.length}
                      className="text-center text-muted-foreground"
                    >
                      No results
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((row) => (
                    <TableRow key={row.id}>
                      {visibleColumns.map((col) => {
                        if (col.key === "select") {
                          return (
                            <TableCell key={col.key}>
                              <Checkbox
                                checked={selectedRows.has(row.id)}
                                onCheckedChange={(checked) =>
                                  handleSelectRow(row.id, checked as boolean)
                                }
                              />
                            </TableCell>
                          );
                        }
                        if (col.key === "actions") {
                          return (
                            <TableCell key={col.key} className="space-x-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          );
                        }
                        if (col.key === "severity") {
                          return (
                            <TableCell key={col.key}>
                              <Badge
                                className={cn(
                                  "font-normal",
                                  severityColor[row.severity],
                                )}
                              >
                                {row.severity}
                              </Badge>
                            </TableCell>
                          );
                        }
                        const value = row[col.key as keyof LogEntry];
                        return (
                          <TableCell
                            key={col.key}
                            className="truncate max-w-[200px]"
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">Items per page:</p>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-20">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 50].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                {currentPage * pageSize - pageSize + 1} –{" "}
                {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
                {sortedData.length}
              </p>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronDown className="h-4 w-4 rotate-90" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
