// app/admin/settings/academic-rules/page.tsx
"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Columns,
  Download,
  Edit,
  Home,
  PlusCircle,
  RefreshCw,
  Search,
  Trash2,
  Calendar,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Mock data based on the Angular example
const initialRules = [
  {
    id: 1,
    ruleName: "Minimum Attendance",
    category: "General",
    appliedTo: "All Students",
    priority: "High",
    effectiveDate: "01/01/2024",
    status: "Active",
  },
  {
    id: 2,
    ruleName: "Late Submission Penalty",
    category: "Academic",
    appliedTo: "All Students",
    priority: "Medium",
    effectiveDate: "01/01/2024",
    status: "Active",
  },
  {
    id: 3,
    ruleName: "Pass Percentage",
    category: "Exam",
    appliedTo: "All Classes",
    priority: "High",
    effectiveDate: "01/01/2024",
    status: "Active",
  },
  {
    id: 4,
    ruleName: "Re-evaluation Policy",
    category: "Exam",
    appliedTo: "Board Classes",
    priority: "Medium",
    effectiveDate: "01/15/2024",
    status: "Active",
  },
  {
    id: 5,
    ruleName: "Scholarship Eligibility",
    category: "Financial",
    appliedTo: "Merit Students",
    priority: "Medium",
    effectiveDate: "02/01/2024",
    status: "Active",
  },
  {
    id: 6,
    ruleName: "Code of Conduct",
    category: "Discipline",
    appliedTo: "Everyone",
    priority: "High",
    effectiveDate: "01/01/2024",
    status: "Active",
  },
  {
    id: 7,
    ruleName: "Uniform Policy",
    category: "General",
    appliedTo: "Students",
    priority: "Low",
    effectiveDate: "01/01/2024",
    status: "Active",
  },
  {
    id: 8,
    ruleName: "Library Fine",
    category: "Facility",
    appliedTo: "Borrowers",
    priority: "Low",
    effectiveDate: "03/01/2024",
    status: "Active",
  },
  {
    id: 9,
    ruleName: "Mobile Phone Ban",
    category: "Discipline",
    appliedTo: "Students",
    priority: "Medium",
    effectiveDate: "01/01/2024",
    status: "Active",
  },
  {
    id: 10,
    ruleName: "Laboratory Safety",
    category: "Academic",
    appliedTo: "Science Students",
    priority: "High",
    effectiveDate: "01/01/2024",
    status: "Active",
  },
  {
    id: 11,
    ruleName: "Hostel Curfew",
    category: "Discipline",
    appliedTo: "Hostellers",
    priority: "High",
    effectiveDate: "01/01/2024",
    status: "Active",
  },
  {
    id: 12,
    ruleName: "Fee Payment Deadline",
    category: "Financial",
    appliedTo: "All Students",
    priority: "High",
    effectiveDate: "02/15/2024",
    status: "Active",
  },
  {
    id: 13,
    ruleName: "Exam Hall Rules",
    category: "Exam",
    appliedTo: "All Students",
    priority: "High",
    effectiveDate: "01/01/2024",
    status: "Active",
  },
];

// Define columns and their display names
const allColumns = [
  { key: "ruleName", label: "Rule Name" },
  { key: "category", label: "Category" },
  { key: "appliedTo", label: "Applied To" },
  { key: "priority", label: "Priority" },
  { key: "effectiveDate", label: "Effective Date" },
  { key: "status", label: "Status" },
];

export default function AcademicRulesPage() {
  // State for data
  const [rules, setRules] = React.useState(initialRules);

  // Search state
  const [searchQuery, setSearchQuery] = React.useState("");

  // Selection state
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());

  // Column visibility state (all visible by default)
  const [columnVisibility, setColumnVisibility] = React.useState(
    Object.fromEntries(allColumns.map((col) => [col.key, true]))
  );

  // Pagination state
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  // Filter data based on search query
  const filteredRules = React.useMemo(() => {
    if (!searchQuery.trim()) return rules;
    const query = searchQuery.toLowerCase();
    return rules.filter(
      (rule) =>
        rule.ruleName.toLowerCase().includes(query) ||
        rule.category.toLowerCase().includes(query) ||
        rule.appliedTo.toLowerCase().includes(query) ||
        rule.priority.toLowerCase().includes(query) ||
        rule.effectiveDate.includes(query) ||
        rule.status.toLowerCase().includes(query)
    );
  }, [rules, searchQuery]);

  // Paginated data
  const paginatedRules = React.useMemo(() => {
    const start = pageIndex * pageSize;
    return filteredRules.slice(start, start + pageSize);
  }, [filteredRules, pageIndex, pageSize]);

  const totalPages = Math.ceil(filteredRules.length / pageSize);

  // Handlers for selection
  const toggleAllRows = () => {
    if (selectedRows.size === paginatedRules.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedRules.map((r) => r.id)));
    }
  };

  const toggleRow = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  // Handlers for actions (mock functions)
  const handleDeleteSelected = () => {
    if (selectedRows.size === 0) return;
    const newRules = rules.filter((r) => !selectedRows.has(r.id));
    setRules(newRules);
    setSelectedRows(new Set());
  };

  const handleAdd = () => {
    alert("Add new rule – mock action");
  };

  const handleRefresh = () => {
    alert("Refresh data – mock action");
  };

  const handleDownload = () => {
    alert("Download as XLSX – mock action");
  };

  const handleEdit = (id: number) => {
    alert(`Edit rule ${id} – mock action`);
  };

  const handleDelete = (id: number) => {
    const newRules = rules.filter((r) => r.id !== id);
    setRules(newRules);
    // remove from selection if present
    if (selectedRows.has(id)) {
      const newSelected = new Set(selectedRows);
      newSelected.delete(id);
      setSelectedRows(newSelected);
    }
  };

  // Reset page index when search changes
  React.useEffect(() => {
    setPageIndex(0);
  }, [searchQuery]);

  return (
    <div className="space-y-4 p-6 md:p-8">
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
            <BreadcrumbPage>Academic Rules</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Academic Rules</h1>
        <div className="flex items-center gap-2">
          {/* Delete selected button (only visible when rows selected) */}
          {selectedRows.size > 0 && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleDeleteSelected}
              title="Delete selected"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}

          {/* Column visibility dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" title="Show/Hide Column">
                <Columns className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {allColumns.map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.key}
                  checked={columnVisibility[col.key]}
                  onCheckedChange={(checked) =>
                    setColumnVisibility((prev) => ({ ...prev, [col.key]: checked }))
                  }
                >
                  {col.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add button */}
          <Button variant="outline" size="icon" onClick={handleAdd} title="Add">
            <PlusCircle className="h-4 w-4" />
          </Button>

          {/* Refresh button */}
          <Button variant="outline" size="icon" onClick={handleRefresh} title="Refresh">
            <RefreshCw className="h-4 w-4" />
          </Button>

          {/* Download button */}
          <Button variant="outline" size="icon" onClick={handleDownload} title="Xlsx Download">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {/* Select column */}
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      paginatedRules.length > 0 &&
                      selectedRows.size === paginatedRules.length
                    }
                    onCheckedChange={toggleAllRows}
                    aria-label="Select all"
                  />
                </TableHead>

                {/* Dynamic columns based on visibility */}
                {allColumns.map(
                  (col) =>
                    columnVisibility[col.key] && (
                      <TableHead key={col.key}>{col.label}</TableHead>
                    )
                )}

                {/* Actions column (always visible) */}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRules.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={allColumns.filter((c) => columnVisibility[c.key]).length + 2}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRules.map((rule) => (
                  <TableRow key={rule.id}>
                    {/* Select checkbox */}
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.has(rule.id)}
                        onCheckedChange={() => toggleRow(rule.id)}
                        aria-label={`Select rule ${rule.ruleName}`}
                      />
                    </TableCell>

                    {/* Data cells */}
                    {columnVisibility.ruleName && (
                      <TableCell className="font-medium">{rule.ruleName}</TableCell>
                    )}
                    {columnVisibility.category && <TableCell>{rule.category}</TableCell>}
                    {columnVisibility.appliedTo && <TableCell>{rule.appliedTo}</TableCell>}
                    {columnVisibility.priority && <TableCell>{rule.priority}</TableCell>}
                    {columnVisibility.effectiveDate && (
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{rule.effectiveDate}</span>
                        </div>
                      </TableCell>
                    )}
                    {columnVisibility.status && (
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {rule.status}
                        </Badge>
                      </TableCell>
                    )}

                    {/* Action buttons */}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(rule.id)}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(rule.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination and page size selector */}
        {filteredRules.length > 0 && (
          <div className="flex items-center justify-between border-t p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Showing {pageIndex * pageSize + 1} to{" "}
                {Math.min((pageIndex + 1) * pageSize, filteredRules.length)} of{" "}
                {filteredRules.length} results
              </span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setPageIndex(0);
                }}
              >
                <SelectTrigger className="h-8 w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 20, 50].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                    className={pageIndex === 0 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setPageIndex(page - 1)}
                      isActive={pageIndex === page - 1}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
                    className={
                      pageIndex === totalPages - 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}