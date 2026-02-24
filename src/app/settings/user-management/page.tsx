// app/admin/settings/user-management/page.tsx
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  Search,
  Trash2,
  Filter,
  PlusCircle,
  RefreshCw,
  Download,
  Edit,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Dummy data based on the Angular example
type User = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  role: string;
  lastLogin: string;
  status: "Active" | "Inactive";
  avatar: string;
};

const users: User[] = [
  {
    id: 1,
    fullName: "John Doe",
    username: "admin_john",
    email: "john@example.com",
    role: "Super Admin",
    lastLogin: "2024-12-25 10:00",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?u=1",
  },
  {
    id: 2,
    fullName: "Sarah Smith",
    username: "sarah_m",
    email: "sarah@example.com",
    role: "Admin",
    lastLogin: "2024-12-24 15:30",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?u=2",
  },
  {
    id: 3,
    fullName: "Mike Johnson",
    username: "mike_j",
    email: "mike@example.com",
    role: "Teacher",
    lastLogin: "2024-12-25 08:45",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?u=3",
  },
  {
    id: 4,
    fullName: "Emily Davis",
    username: "emily_d",
    email: "emily@example.com",
    role: "Accountant",
    lastLogin: "2024-12-23 11:20",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?u=4",
  },
  {
    id: 5,
    fullName: "David Wilson",
    username: "david_w",
    email: "david@example.com",
    role: "Teacher",
    lastLogin: "2024-12-25 09:15",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?u=5",
  },
  {
    id: 6,
    fullName: "Lisa Brown",
    username: "lisa_b",
    email: "lisa@example.com",
    role: "Admin",
    lastLogin: "2024-12-24 07:00",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?u=6",
  },
  {
    id: 7,
    fullName: "Robert Taylor",
    username: "robert_t",
    email: "robert@example.com",
    role: "Teacher",
    lastLogin: "2024-12-22 14:10",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?u=7",
  },
  {
    id: 8,
    fullName: "Jennifer White",
    username: "jenn_w",
    email: "jennifer@example.com",
    role: "Librarian",
    lastLogin: "2024-12-25 10:30",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?u=8",
  },
  {
    id: 9,
    fullName: "William Clark",
    username: "will_c",
    email: "william@example.com",
    role: "IT Support",
    lastLogin: "2024-12-24 22:00",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?u=9",
  },
  {
    id: 10,
    fullName: "Amanda Lee",
    username: "amanda_l",
    email: "amanda@example.com",
    role: "Registrar",
    lastLogin: "2024-12-25 07:50",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?u=10",
  },
  // two extra rows to reach 13 total
  {
    id: 11,
    fullName: "Kevin Martin",
    username: "kevin_m",
    email: "kevin@example.com",
    role: "Teacher",
    lastLogin: "2024-12-21 16:20",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?u=11",
  },
  {
    id: 12,
    fullName: "Nancy Garcia",
    username: "nancy_g",
    email: "nancy@example.com",
    role: "Admin",
    lastLogin: "2024-12-20 09:10",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?u=12",
  },
  {
    id: 13,
    fullName: "Thomas Moore",
    username: "thomas_m",
    email: "thomas@example.com",
    role: "Teacher",
    lastLogin: "2024-12-19 11:45",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?u=13",
  },
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Filter data based on search (simple implementation)
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedUsers.map((user) => user.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const isAllSelected =
    paginatedUsers.length > 0 &&
    paginatedUsers.every((user) => selectedRows.includes(user.id));

  const isIndeterminate =
    !isAllSelected &&
    paginatedUsers.some((user) => selectedRows.includes(user.id));

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 p-4 md:p-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href="/admin/dashboard/main"
            className="flex items-center gap-1 hover:text-foreground"
          >
            <Home className="h-4 w-4" />
          </Link>
          <span>/</span>
          <span>Settings</span>
          <span>/</span>
          <span className="text-foreground font-medium">User Management</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>

        {/* Main Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-4">
              <CardTitle className="text-lg font-semibold">
                User Management
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // reset to first page on search
                  }}
                  className="w-[250px] pl-8"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => console.log("Delete selected")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Show/Hide Column</TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Full Name</DropdownMenuItem>
                  <DropdownMenuItem>Username</DropdownMenuItem>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Role</DropdownMenuItem>
                  <DropdownMenuItem>Last Login</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem>Actions</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => console.log("Add user")}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      console.log("Refresh");
                      setSearchTerm("");
                      setSelectedRows([]);
                    }}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Refresh</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => console.log("Download XLSX")}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Xlsx Download</TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={isAllSelected}
                        indeterminate={isIndeterminate}
                        onCheckedChange={(checked) =>
                          handleSelectAll(checked as boolean)
                        }
                      />
                    </TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(user.id)}
                            onCheckedChange={(checked) =>
                              handleSelectRow(user.id, checked as boolean)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img
                              src={user.avatar}
                              alt={user.fullName}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                            <span className="font-medium">{user.fullName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "Active" ? "default" : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Items per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="h-8 w-16 rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {[5, 10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {totalItems === 0
                    ? "0 – 0 of 0"
                    : `${(currentPage - 1) * pageSize + 1} – ${Math.min(
                        currentPage * pageSize,
                        totalItems
                      )} of ${totalItems}`}
                </span>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}