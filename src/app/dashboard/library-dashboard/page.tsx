"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Home,
  BookOpen,
  Users,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  Bell,
  Phone,
  CheckCircle,
  PlusCircle,
  Download,
  Filter,
  MoreVertical,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Mock data
const statsData = [
  {
    title: "Total Books",
    value: "5,842",
    change: "+12%",
    progress: 12,
    icon: BookOpen,
    color: "bg-green-500",
  },
  {
    title: "Books Issued",
    value: "1,245",
    change: "+21%",
    progress: 21,
    icon: TrendingUp,
    color: "bg-blue-500",
  },
  {
    title: "Active Members",
    value: "842",
    change: "+76%",
    progress: 76,
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Overdue Books",
    value: "68",
    change: "+5%",
    progress: 5,
    icon: AlertCircle,
    color: "bg-orange-500",
  },
];

const collectionData = [
  {
    genre: "Fiction",
    available: 1840,
    issued: 400,
    reserved: 120,
  },
  {
    genre: "Non-Fiction",
    available: 950,
    issued: 200,
    reserved: 80,
  },
  {
    genre: "Science",
    available: 1100,
    issued: 350,
    reserved: 100,
  },
  {
    genre: "History",
    available: 1200,
    issued: 300,
    reserved: 90,
  },
  {
    genre: "Biography",
    available: 780,
    issued: 150,
    reserved: 50,
  },
  {
    genre: "Self-Help",
    available: 940,
    issued: 230,
    reserved: 70,
  },
];

const monthlyIssuedData = [
  { month: "Jan", issued: 85, returned: 78 },
  { month: "Feb", issued: 72, returned: 68 },
  { month: "Mar", issued: 90, returned: 82 },
  { month: "Apr", issued: 65, returned: 60 },
  { month: "May", issued: 78, returned: 72 },
  { month: "Jun", issued: 92, returned: 85 },
  { month: "Jul", issued: 88, returned: 80 },
  { month: "Aug", issued: 76, returned: 70 },
  { month: "Sep", issued: 81, returned: 75 },
  { month: "Oct", issued: 95, returned: 88 },
  { month: "Nov", issued: 84, returned: 78 },
  { month: "Dec", issued: 91, returned: 84 },
];

const genreDistributionData = [
  { name: "Fiction", value: 44, color: "#4CAF50" },
  { name: "Non-Fiction", value: 55, color: "#2196F3" },
  { name: "Science", value: 13, color: "#FFC107" },
  { name: "History", value: 43, color: "#FF5722" },
  { name: "Biography", value: 22, color: "#9C27B0" },
  { name: "Self-Help", value: 18, color: "#3F51B5" },
];

const recentIssuedBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    member: "John Smith",
    issueDate: "2023-06-15",
    dueDate: "2023-06-29",
    status: "Active",
  },
  {
    id: 2,
    title: "The Psychology of Money",
    member: "Emma Johnson",
    issueDate: "2023-06-14",
    dueDate: "2023-06-28",
    status: "Active",
  },
  {
    id: 3,
    title: "Sapiens",
    member: "Michael Brown",
    issueDate: "2023-06-12",
    dueDate: "2023-06-26",
    status: "Active",
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    member: "Sarah Wilson",
    issueDate: "2023-06-10",
    dueDate: "2023-06-24",
    status: "Active",
  },
  {
    id: 5,
    title: "To Kill a Mockingbird",
    member: "David Lee",
    issueDate: "2023-06-08",
    dueDate: "2023-06-22",
    status: "Active",
  },
];

const overdueBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    borrower: "Robert Taylor",
    daysOverdue: 12,
    contact: "robert.taylor@example.com",
  },
  {
    id: 2,
    title: "1984",
    borrower: "Jennifer Davis",
    daysOverdue: 8,
    contact: "jennifer.davis@example.com",
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    borrower: "Thomas Wilson",
    daysOverdue: 5,
    contact: "thomas.wilson@example.com",
  },
  {
    id: 4,
    title: "The Alchemist",
    borrower: "Lisa Anderson",
    daysOverdue: 3,
    contact: "lisa.anderson@example.com",
  },
  {
    id: 5,
    title: "Brave New World",
    borrower: "Daniel Martinez",
    daysOverdue: 10,
    contact: "daniel.martinez@example.com",
  },
];

const newMembersData = [
  { month: "Jan", count: 20 },
  { month: "Feb", count: 34 },
  { month: "Mar", count: 27 },
  { month: "Apr", count: 56 },
  { month: "May", count: 47 },
  { month: "Jun", count: 44 },
  { month: "Jul", count: 55 },
  { month: "Aug", count: 58 },
  { month: "Sep", count: 32 },
  { month: "Oct", count: 35 },
  { month: "Nov", count: 47 },
  { month: "Dec", count: 50 },
];

const libraryMetrics = [
  { name: "Circulation Rate", value: 76, color: "#4CAF50" },
  { name: "Member Engagement", value: 83, color: "#2196F3" },
  { name: "Collection Usage", value: 65, color: "#9C27B0" },
  { name: "Digital Access", value: 91, color: "#FF9800" },
  { name: "Program Attendance", value: 58, color: "#F44336" },
];

const newBooks = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    addedDate: "2023-06-14",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Biography",
    addedDate: "2023-06-12",
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    addedDate: "2023-06-10",
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    genre: "Biography",
    addedDate: "2023-06-08",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    addedDate: "2023-06-06",
  },
];

const reminders = [
  {
    type: "overdue",
    title: "Return Reminder: The Great Gatsby",
    info: "2023-06-18 - Robert Taylor",
  },
  {
    type: "reservation",
    title: "Book Reservation: Atomic Habits",
    info: "2023-06-20 - Alice Johnson",
  },
  {
    type: "overdue",
    title: "Return Reminder: 1984",
    info: "2023-06-22 - Jennifer Davis",
  },
  {
    type: "reservation",
    title: "Book Reservation: Sapiens",
    info: "2023-06-25 - William Brown",
  },
];

export default function LibraryDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">
                  <Home className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Library Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold tracking-tight mt-2">
            Library Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Book
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                    <div className="flex items-center gap-2 mt-4">
                      <Progress value={stat.progress} className="w-24" />
                      <span className="text-xs text-muted-foreground">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${stat.color} p-3 rounded-lg text-white`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Collection Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Library Collection Statistics</CardTitle>
                <CardDescription>
                  Distribution by genre and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={collectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="genre" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="available" fill="#4CAF50" name="Available" />
                      <Bar dataKey="issued" fill="#2196F3" name="Issued" />
                      <Bar dataKey="reserved" fill="#FF9800" name="Reserved" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Books Issued Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Books Issued Over Time</CardTitle>
                <CardDescription>Monthly trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyIssuedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="issued"
                        stroke="#4CAF50"
                        fill="#4CAF50"
                        fillOpacity={0.3}
                        name="Books Issued"
                      />
                      <Area
                        type="monotone"
                        dataKey="returned"
                        stroke="#2196F3"
                        fill="#2196F3"
                        fillOpacity={0.3}
                        name="Books Returned"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Genre Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Genre-wise Distribution</CardTitle>
                <CardDescription>Percentage of total collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genreDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {genreDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly New Members */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly New Members</CardTitle>
                <CardDescription>Registration trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={newMembersData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#64C248" name="New Members" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Issued Books */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Issued Books</CardTitle>
                    <CardDescription>Last 5 issued books</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Member</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentIssuedBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium">
                            {book.title}
                          </TableCell>
                          <TableCell>{book.member}</TableCell>
                          <TableCell>{book.dueDate}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {book.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Overdue Books */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Overdue Books</CardTitle>
                    <CardDescription>Requires immediate attention</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>Borrower</TableHead>
                        <TableHead>Days Overdue</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {overdueBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium">
                            {book.title}
                          </TableCell>
                          <TableCell>{book.borrower}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              book.daysOverdue > 10 
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-orange-50 text-orange-700 border-orange-200"
                            }>
                              {book.daysOverdue} days
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="icon" variant="ghost">
                                <Bell className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="books" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Book Management</CardTitle>
              <CardDescription>Manage all books in the library</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date Range
                    </Button>
                  </div>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Book
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Genre</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Added Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newBooks.map((book, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{book.genre}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Available
                          </Badge>
                        </TableCell>
                        <TableCell>{book.addedDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Member Management</CardTitle>
              <CardDescription>Manage library members and subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter Members
                    </Button>
                  </div>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Add New Member
                  </Button>
                </div>
                <div className="text-center py-8 text-muted-foreground">
                  Member management content will be displayed here
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Newly Added Books */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Newly Added Books</CardTitle>
                <CardDescription>Recently added to collection</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Added Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newBooks.map((book, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{book.genre}</Badge>
                      </TableCell>
                      <TableCell>{book.addedDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Reminders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Reminders</CardTitle>
                <CardDescription>Upcoming actions required</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72">
              <div className="space-y-4">
                {reminders.map((reminder, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      reminder.type === "overdue"
                        ? "border-red-200 bg-red-50"
                        : "border-blue-200 bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded ${
                          reminder.type === "overdue"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {reminder.type === "overdue" ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">
                          {reminder.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {reminder.info}
                        </p>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Library Usage Metrics */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Library Usage Metrics</CardTitle>
          <CardDescription>Overall performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {libraryMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full border-8"
                    style={{
                      borderColor: `${metric.color}20`,
                      borderLeftColor: metric.color,
                      borderTopColor: metric.color,
                      transform: 'rotate(45deg)',
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
                      <span className="text-xl font-bold">{metric.value}%</span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium">{metric.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}