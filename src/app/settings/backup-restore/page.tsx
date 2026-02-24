// app/admin/settings/backup-restore/page.tsx
"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Filter,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Sample backup data
const backups = [
  { id: 1, name: "FULL_BACKUP_20241225", date: "2024-12-25 00:00:01", size: "250 MB", type: "Full", user: "System", status: "Completed" },
  { id: 2, name: "DB_INC_20241224", date: "2024-12-24 12:00:05", size: "45 MB", type: "Incremental", user: "admin_john", status: "Completed" },
  { id: 3, name: "MEDIA_FILES_20241220", date: "2024-12-20 03:00:10", size: "1.2 GB", type: "Manual", user: "sarah_m", status: "Completed" },
  { id: 4, name: "CONFIG_BACKUP_V1", date: "2024-12-15 09:30:00", size: "5 MB", type: "Manual", user: "will_c", status: "Completed" },
  { id: 5, name: "DAILY_SNAPSHOT_23", date: "2024-12-23 23:59:59", size: "150 MB", type: "Snapshot", user: "System", status: "Completed" },
  { id: 6, name: "POST_UPGRADE_BAK", date: "2024-12-10 14:00:00", size: "300 MB", type: "Full", user: "System", status: "Completed" },
  { id: 7, name: "FEES_DB_202412", date: "2024-12-01 10:15:20", size: "80 MB", type: "Manual", user: "emily_d", status: "Completed" },
  { id: 8, name: "REPORTS_CACHE_BAK", date: "2024-12-18 16:40:00", size: "120 MB", type: "Incremental", user: "mike_j", status: "Failed" },
  { id: 9, name: "USER_DOCS_2024", date: "2024-11-30 05:00:00", size: "500 MB", type: "Manual", user: "lisa_b", status: "Completed" },
  { id: 10, name: "OLD_ARCHIVE_2023", date: "2023-12-31 23:00:00", size: "2.5 GB", type: "Archival", user: "System", status: "Completed" },
  { id: 11, name: "WEEKLY_BACKUP_12", date: "2024-12-22 02:00:00", size: "700 MB", type: "Full", user: "System", status: "Completed" },
  { id: 12, name: "TEMP_DATA_BAK", date: "2024-12-19 11:20:00", size: "10 MB", type: "Incremental", user: "dev_team", status: "Failed" },
  { id: 13, name: "HOLIDAY_SNAPSHOT", date: "2024-12-25 08:00:00", size: "900 MB", type: "Snapshot", user: "admin_john", status: "Completed" },
];

// Map status to badge variant
const statusVariant: Record<string, "default" | "destructive" | "outline" | "secondary" | "success"> = {
  Completed: "success",
  Failed: "destructive",
};

export default function BackupRestorePage() {
  // State for search query
  const [searchQuery, setSearchQuery] = React.useState("");
  // State for selected rows
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  // State for pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Filter backups based on search query
  const filteredBackups = backups.filter((backup) =>
    backup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    backup.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    backup.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate filtered backups
  const totalPages = Math.ceil(filteredBackups.length / itemsPerPage);
  const paginatedBackups = filteredBackups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for selection
  const toggleAllRows = () => {
    if (selectedRows.length === paginatedBackups.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedBackups.map((b) => b.id));
    }
  };

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Placeholder action handlers
  const handleDelete = () => console.log("Delete selected", selectedRows);
  const handleAdd = () => console.log("Add backup");
  const handleRefresh = () => console.log("Refresh data");
  const handleDownload = () => console.log("Download XLSX");
  const handleEdit = (id: number) => console.log("Edit backup", id);
  const handleDeleteSingle = (id: number) => console.log("Delete backup", id);

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/settings">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Backup & Restore</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Backup & Restore</h1>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="w-64 pl-8"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // reset to first page on search
              }}
            />
          </div>

          {/* Action Buttons */}
          <Button variant="outline" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Show/Hide Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Backup Name</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Date</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Size</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Type</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>User</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Actions</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" onClick={handleAdd}>
            <Plus className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === paginatedBackups.length && paginatedBackups.length > 0}
                  onCheckedChange={toggleAllRows}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Backup Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBackups.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              paginatedBackups.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(backup.id)}
                      onCheckedChange={() => toggleRow(backup.id)}
                      aria-label={`Select ${backup.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{backup.name}</TableCell>
                  <TableCell>{backup.date}</TableCell>
                  <TableCell>{backup.size}</TableCell>
                  <TableCell>{backup.type}</TableCell>
                  <TableCell>{backup.user}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[backup.status] || "secondary"}>
                      {backup.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(backup.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSingle(backup.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredBackups.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredBackups.length)} of{" "}
            {filteredBackups.length} entries
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage((p) => p - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}