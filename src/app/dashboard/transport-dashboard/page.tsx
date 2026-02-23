"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Bus,
  Users,
  MapPin,
  Clock,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Plus,
  Edit,
  FileText,
  Phone,
  Bell,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Mock data
const transportStats = [
  { label: "Total Buses", value: "12" },
  { label: "Active Buses", value: "6" },
  { label: "Delayed", value: "1" },
  { label: "Routes", value: "8" },
  { label: "Students", value: "320" },
];

const busRoutes = [
  {
    id: 1,
    name: "North Campus Route",
    bus: "BUS-001",
    status: "active" as const,
    students: 42,
    stops: 8,
    timeRange: "7:30 AM - 8:15 AM",
    lastUpdated: "5 minutes ago",
    selected: true,
  },
  {
    id: 2,
    name: "South Campus Route",
    bus: "BUS-002",
    status: "active" as const,
    students: 38,
    stops: 7,
    timeRange: "7:35 AM - 8:20 AM",
    lastUpdated: "8 minutes ago",
  },
  {
    id: 3,
    name: "East Campus Route",
    bus: "BUS-003",
    status: "delayed" as const,
    students: 45,
    stops: 9,
    timeRange: "7:25 AM - 8:15 AM",
    lastUpdated: "3 minutes ago",
  },
  {
    id: 4,
    name: "West Campus Route",
    bus: "BUS-004",
    status: "active" as const,
    students: 40,
    stops: 8,
    timeRange: "7:30 AM - 8:20 AM",
    lastUpdated: "10 minutes ago",
  },
  {
    id: 5,
    name: "Central Route",
    bus: "BUS-005",
    status: "active" as const,
    students: 36,
    stops: 6,
    timeRange: "7:40 AM - 8:20 AM",
    lastUpdated: "7 minutes ago",
  },
  {
    id: 6,
    name: "Suburban Route",
    bus: "BUS-006",
    status: "active" as const,
    students: 48,
    stops: 10,
    timeRange: "7:15 AM - 8:10 AM",
    lastUpdated: "12 minutes ago",
  },
];

const studentsPerRouteData = [
  { name: "North", students: 44 },
  { name: "South", students: 55 },
  { name: "East", students: 41 },
  { name: "West", students: 64 },
  { name: "Central", students: 22 },
];

const onTimePerformanceData = [
  { name: "On Time", value: 92, color: "#4CAF50" },
  { name: "Delayed", value: 5, color: "#FFC107" },
  { name: "Missed", value: 3, color: "#F44336" },
];

const weeklyUsageData = [
  { day: "Mon", morning: 120, afternoon: 140 },
  { day: "Tue", morning: 135, afternoon: 155 },
  { day: "Wed", morning: 130, afternoon: 150 },
  { day: "Thu", morning: 145, afternoon: 165 },
  { day: "Fri", morning: 140, afternoon: 160 },
  { day: "Sat", morning: 100, afternoon: 120 },
  { day: "Sun", morning: 80, afternoon: 100 },
];

const vehicleStatusData = [
  {
    id: "BUS-001",
    vehicle: "School Bus 1",
    status: "active" as const,
    driver: "John Smith",
    location: "North Route",
    lastUpdate: "2 mins ago",
    fuelLevel: 85,
  },
  {
    id: "BUS-002",
    vehicle: "School Bus 2",
    status: "maintenance" as const,
    driver: "Sarah Johnson",
    location: "Garage",
    lastUpdate: "1 hour ago",
    fuelLevel: 45,
  },
  {
    id: "VAN-001",
    vehicle: "Transport Van 1",
    status: "active" as const,
    driver: "Mike Davis",
    location: "East Route",
    lastUpdate: "5 mins ago",
    fuelLevel: 72,
  },
  {
    id: "VAN-002",
    vehicle: "Transport Van 2",
    status: "inactive" as const,
    driver: "Emily Wilson",
    location: "School Parking",
    lastUpdate: "30 mins ago",
    fuelLevel: 65,
  },
];

const routeCompletionData = [
  { route: "North", completion: 95 },
  { route: "South", completion: 88 },
  { route: "East", completion: 92 },
  { route: "West", completion: 85 },
  { route: "Central", completion: 90 },
];

const studentTransportData = [
  { route: "North Route", total: 42, present: 38, absent: 4, specialNeeds: 3 },
  { route: "South Route", total: 55, present: 51, absent: 4, specialNeeds: 5 },
  { route: "East Route", total: 38, present: 35, absent: 3, specialNeeds: 2 },
  { route: "West Route", total: 64, present: 60, absent: 4, specialNeeds: 6 },
  {
    route: "Central Route",
    total: 22,
    present: 20,
    absent: 2,
    specialNeeds: 1,
  },
];

export default function TransportDashboard() {
  const [selectedRoute, setSelectedRoute] = useState(busRoutes[0]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "delayed":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "inactive":
        return <XCircle className="w-4 h-4 text-gray-400" />;
      case "maintenance":
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
        );
      case "maintenance":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600">
            Maintenance
          </Badge>
        );
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "delayed":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Delayed</Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Breadcrumb and Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Transport Dashboard
          </h1>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
            <Home className="w-4 h-4" />
            <ChevronRight className="w-3 h-3" />
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Transport Dashboard</span>
          </div>
        </div>
        <Button>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Transport Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bus className="w-5 h-5" />
              <CardTitle>Transport Overview</CardTitle>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {transportStats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-lg border">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Routes List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Bus Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {busRoutes.map((route) => (
                      <div
                        key={route.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-accent ${
                          selectedRoute.id === route.id
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                        onClick={() => setSelectedRoute(route)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(route.status)}
                            <span className="font-medium">{route.name}</span>
                          </div>
                          <Badge variant="outline">{route.bus}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span>{route.students} students</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{route.stops} stops</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{route.timeRange}</div>
                            <div className="text-xs text-muted-foreground">
                              Updated {route.lastUpdated}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Route Details */}
            <Card>
              <CardHeader>
                <CardTitle>Route Details: {selectedRoute.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="stops">Stops</TabsTrigger>
                    <TabsTrigger value="students">Students</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Bus Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Bus Number:
                            </span>
                            <span className="font-medium">
                              {selectedRoute.bus}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Status:
                            </span>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(selectedRoute.status)}
                              <span className="capitalize">
                                {selectedRoute.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">
                          Driver Information
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Driver Name:
                            </span>
                            <span className="font-medium">John Smith</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Contact:
                            </span>
                            <span className="font-medium">(555) 123-4567</span>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full">
                          <MapPin className="w-4 h-4 mr-2" />
                          View on Map
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Driver
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Bell className="w-4 h-4 mr-2" />
                          Send Alert
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 border-t">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Route
            </Button>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Routes
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Transport Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Students per Route */}
        <Card>
          <CardHeader>
            <CardTitle>Students per Route</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentsPerRouteData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="students"
                    fill="#2196F3"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* On-Time Performance */}
        <Card>
          <CardHeader>
            <CardTitle>On-Time Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={onTimePerformanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {onTimePerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold"
                  >
                    92%
                  </text>
                  <text
                    x="50%"
                    y="60%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm text-muted-foreground"
                  >
                    On Time
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {onTimePerformanceData.map((item) => (
                <div key={item.name} className="flex items-center space-x-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Transport Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Transport Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="morning"
                    stackId="1"
                    stroke="#2196F3"
                    fill="#2196F3"
                    fillOpacity={0.3}
                    name="Morning"
                  />
                  <Area
                    type="monotone"
                    dataKey="afternoon"
                    stackId="1"
                    stroke="#FF9800"
                    fill="#FF9800"
                    fillOpacity={0.3}
                    name="Afternoon"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Status Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Vehicle Status</CardTitle>
          <Button variant="ghost" size="icon">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b">
              <div>ID</div>
              <div>Vehicle</div>
              <div>Status</div>
              <div>Driver</div>
              <div>Location</div>
              <div>Last Update</div>
              <div>Fuel Level</div>
            </div>
            <div className="divide-y">
              {vehicleStatusData.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="grid grid-cols-7 gap-4 p-4 items-center"
                >
                  <div className="font-medium">{vehicle.id}</div>
                  <div>{vehicle.vehicle}</div>
                  <div>{getStatusBadge(vehicle.status)}</div>
                  <div>{vehicle.driver}</div>
                  <div>{vehicle.location}</div>
                  <div className="text-sm text-muted-foreground">
                    {vehicle.lastUpdate}
                  </div>
                  <div className="space-y-1">
                    <Progress value={vehicle.fuelLevel} className="h-2" />
                    <div className="text-sm text-right">
                      {vehicle.fuelLevel}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Route Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Route Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={routeCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="route" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="completion"
                    stroke="#6777EF"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Student Transport */}
        <Card>
          <CardHeader>
            <CardTitle>Student Transport</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                <div>Route</div>
                <div>Total Students</div>
                <div>Present Today</div>
                <div>Absent</div>
                <div>Special Needs</div>
              </div>
              <div className="divide-y max-h-[270px] overflow-y-auto">
                {studentTransportData.map((data, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 p-4">
                    <div className="font-medium">{data.route}</div>
                    <div>{data.total}</div>
                    <div className="flex items-center space-x-1">
                      <span>{data.present}</span>
                      {data.present >= data.total * 0.9 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div>{data.absent}</div>
                    <div>{data.specialNeeds}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


// // app/dashboard/transport-dashboard/page.tsx
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import {
//   BarChart3,
//   Bus,
//   Car,
//   Calendar,
//   TrendingUp,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   MapPin,
//   Users,
//   Fuel,
//   Wrench,
//   Download,
//   Eye,
//   MoreVertical,
//   Home,
// } from "lucide-react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// export default function TransportDashboard() {
//   const stats = [
//     {
//       title: "Total Vehicles",
//       value: "142",
//       change: "+12%",
//       description: "from last month",
//       icon: <Car className="h-5 w-5" />,
//       color: "bg-blue-500",
//     },
//     {
//       title: "Active Trips",
//       value: "68",
//       change: "+8%",
//       description: "currently running",
//       icon: <Bus className="h-5 w-5" />,
//       color: "bg-green-500",
//     },
//     {
//       title: "Maintenance Due",
//       value: "24",
//       change: "-5%",
//       description: "vehicles needing service",
//       icon: <Wrench className="h-5 w-5" />,
//       color: "bg-amber-500",
//     },
//     {
//       title: "Fuel Consumption",
//       value: "2,845L",
//       change: "-12%",
//       description: "daily average",
//       icon: <Fuel className="h-5 w-5" />,
//       color: "bg-purple-500",
//     },
//   ];

//   const recentTrips = [
//     {
//       id: "TRP-001",
//       vehicle: "Bus A-102",
//       driver: "John Smith",
//       route: "Downtown - Airport",
//       status: "in_progress",
//       departure: "08:30 AM",
//       estimatedArrival: "09:45 AM",
//       passengers: 42,
//     },
//     {
//       id: "TRP-002",
//       vehicle: "Bus B-205",
//       driver: "Sarah Johnson",
//       route: "North Station - Campus",
//       status: "completed",
//       departure: "07:45 AM",
//       estimatedArrival: "08:30 AM",
//       passengers: 38,
//     },
//     {
//       id: "TRP-003",
//       vehicle: "Minibus C-301",
//       driver: "Michael Brown",
//       route: "East Terminal - Hotel Zone",
//       status: "scheduled",
//       departure: "10:15 AM",
//       estimatedArrival: "11:00 AM",
//       passengers: 18,
//     },
//     {
//       id: "TRP-004",
//       vehicle: "Bus D-108",
//       driver: "Emma Wilson",
//       route: "Central - Westgate",
//       status: "delayed",
//       departure: "09:00 AM",
//       estimatedArrival: "10:30 AM",
//       passengers: 45,
//     },
//     {
//       id: "TRP-005",
//       vehicle: "Coach E-401",
//       driver: "David Lee",
//       route: "Main Terminal - Convention",
//       status: "in_progress",
//       departure: "08:00 AM",
//       estimatedArrival: "09:15 AM",
//       passengers: 52,
//     },
//   ];

//   const maintenanceAlerts = [
//     {
//       vehicle: "Bus A-102",
//       issue: "Brake Inspection Due",
//       severity: "high",
//       daysLeft: 2,
//       lastService: "2024-01-15",
//     },
//     {
//       vehicle: "Bus B-205",
//       issue: "Oil Change Required",
//       severity: "medium",
//       daysLeft: 7,
//       lastService: "2024-01-20",
//     },
//     {
//       vehicle: "Minibus C-301",
//       issue: "Tire Replacement",
//       severity: "high",
//       daysLeft: 1,
//       lastService: "2024-01-10",
//     },
//     {
//       vehicle: "Van D-108",
//       issue: "Engine Tune-up",
//       severity: "medium",
//       daysLeft: 14,
//       lastService: "2024-01-05",
//     },
//     {
//       vehicle: "Coach E-401",
//       issue: "AC System Check",
//       severity: "low",
//       daysLeft: 30,
//       lastService: "2024-01-18",
//     },
//   ];

//   const vehicleTypes = [
//     { type: "Buses", count: 68, percentage: 48 },
//     { type: "Minibuses", count: 42, percentage: 30 },
//     { type: "Vans", count: 20, percentage: 14 },
//     { type: "Coaches", count: 12, percentage: 8 },
//   ];

//   const utilizationData = [
//     { hour: "6 AM", utilization: 35 },
//     { hour: "8 AM", utilization: 85 },
//     { hour: "10 AM", utilization: 65 },
//     { hour: "12 PM", utilization: 45 },
//     { hour: "2 PM", utilization: 60 },
//     { hour: "4 PM", utilization: 90 },
//     { hour: "6 PM", utilization: 70 },
//     { hour: "8 PM", utilization: 40 },
//   ];

//   return (
//     <div className="flex flex-col gap-6">
//       {/* Breadcrumb */}
//       <Breadcrumb>
//         <BreadcrumbList>
//           <BreadcrumbItem>
//             <BreadcrumbLink href="/dashboard">
//               <Home className="h-4 w-4" />
//             </BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbSeparator />
//           <BreadcrumbItem>
//             <BreadcrumbPage>Transport Dashboard</BreadcrumbPage>
//           </BreadcrumbItem>
//         </BreadcrumbList>
//       </Breadcrumb>

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">
//             Transport Dashboard
//           </h1>
//           <p className="text-muted-foreground">
//             Monitor and manage your transportation fleet in real-time
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Button variant="outline">
//             <Calendar className="mr-2 h-4 w-4" />
//             Today: Feb 15, 2024
//           </Button>
//           <Button>
//             <Download className="mr-2 h-4 w-4" />
//             Export Report
//           </Button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat, index) => (
//           <Card key={index}>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div className={`p-2 rounded-lg ${stat.color} text-white`}>
//                   {stat.icon}
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <TrendingUp className="h-4 w-4 text-green-500" />
//                   <span className="text-sm font-medium text-green-500">
//                     {stat.change}
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <p className="text-sm font-medium text-muted-foreground">
//                   {stat.title}
//                 </p>
//                 <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
//                 <p className="text-xs text-muted-foreground mt-1">
//                   {stat.description}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Recent Trips */}
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle>Recent Trips</CardTitle>
//                 <CardDescription>
//                   Currently active and recently completed trips
//                 </CardDescription>
//               </div>
//               <Button variant="outline">View All</Button>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Trip ID</TableHead>
//                   <TableHead>Vehicle</TableHead>
//                   <TableHead>Driver</TableHead>
//                   <TableHead>Route</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Passengers</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {recentTrips.map((trip) => (
//                   <TableRow key={trip.id}>
//                     <TableCell className="font-medium">{trip.id}</TableCell>
//                     <TableCell>{trip.vehicle}</TableCell>
//                     <TableCell>{trip.driver}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center">
//                         <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
//                         {trip.route}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           trip.status === "completed"
//                             ? "default"
//                             : trip.status === "in_progress"
//                               ? "secondary"
//                               : trip.status === "delayed"
//                                 ? "destructive"
//                                 : "outline"
//                         }
//                       >
//                         {trip.status === "completed" && (
//                           <CheckCircle className="mr-1 h-3 w-3" />
//                         )}
//                         {trip.status === "in_progress" && (
//                           <Clock className="mr-1 h-3 w-3" />
//                         )}
//                         {trip.status === "delayed" && (
//                           <AlertCircle className="mr-1 h-3 w-3" />
//                         )}
//                         {trip.status.replace("_", " ")}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center">
//                         <Users className="mr-1 h-4 w-4 text-muted-foreground" />
//                         {trip.passengers}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreVertical className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem>
//                             <Eye className="mr-2 h-4 w-4" />
//                             View Details
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>Track Vehicle</DropdownMenuItem>
//                           <DropdownMenuItem>Contact Driver</DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Charts and Analytics */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Vehicle Utilization</CardTitle>
//             <CardDescription>Daily fleet utilization rate</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {utilizationData.map((data, index) => (
//                 <div key={index} className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium">{data.hour}</span>
//                     <span className="text-sm text-muted-foreground">
//                       {data.utilization}%
//                     </span>
//                   </div>
//                   <Progress value={data.utilization} className="h-2" />
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Vehicle Type Distribution */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Fleet Composition</CardTitle>
//             <CardDescription>Vehicle type distribution</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {vehicleTypes.map((type, index) => (
//                 <div key={index} className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`h-3 w-3 rounded-full ${
//                           index === 0
//                             ? "bg-blue-500"
//                             : index === 1
//                               ? "bg-green-500"
//                               : index === 2
//                                 ? "bg-amber-500"
//                                 : "bg-purple-500"
//                         }`}
//                       />
//                       <span className="text-sm font-medium">{type.type}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm font-bold">{type.count}</span>
//                       <span className="text-sm text-muted-foreground">
//                         ({type.percentage}%)
//                       </span>
//                     </div>
//                   </div>
//                   <Progress value={type.percentage} className="h-2" />
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Maintenance Alerts */}
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle>Maintenance Alerts</CardTitle>
//                 <CardDescription>
//                   Upcoming and overdue maintenance tasks
//                 </CardDescription>
//               </div>
//               <Button variant="outline">Schedule All</Button>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Vehicle</TableHead>
//                   <TableHead>Issue</TableHead>
//                   <TableHead>Severity</TableHead>
//                   <TableHead>Days Left</TableHead>
//                   <TableHead>Last Service</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {maintenanceAlerts.map((alert, index) => (
//                   <TableRow key={index}>
//                     <TableCell className="font-medium">
//                       {alert.vehicle}
//                     </TableCell>
//                     <TableCell>{alert.issue}</TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           alert.severity === "high"
//                             ? "destructive"
//                             : alert.severity === "medium"
//                               ? "outline"
//                               : "secondary"
//                         }
//                       >
//                         {alert.severity}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center">
//                         <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
//                         {alert.daysLeft} days
//                       </div>
//                     </TableCell>
//                     <TableCell>{alert.lastService}</TableCell>
//                     <TableCell>
//                       <div className="flex gap-2">
//                         <Button size="sm" variant="outline">
//                           Reschedule
//                         </Button>
//                         <Button size="sm">Mark Complete</Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Tabs Section */}
//         <div className="lg:col-span-2">
//           <Tabs defaultValue="performance">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="performance">Performance</TabsTrigger>
//               <TabsTrigger value="fuel">Fuel Efficiency</TabsTrigger>
//               <TabsTrigger value="routes">Route Analytics</TabsTrigger>
//             </TabsList>
//             <TabsContent value="performance" className="space-y-4 mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Driver Performance</CardTitle>
//                   <CardDescription>
//                     Top performing drivers this month
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {[
//                       { name: "John Smith", trips: 142, rating: 4.9 },
//                       { name: "Sarah Johnson", trips: 138, rating: 4.8 },
//                       { name: "Michael Brown", trips: 125, rating: 4.7 },
//                       { name: "Emma Wilson", trips: 118, rating: 4.6 },
//                     ].map((driver, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between p-3 rounded-lg border"
//                       >
//                         <div>
//                           <p className="font-medium">{driver.name}</p>
//                           <p className="text-sm text-muted-foreground">
//                             {driver.trips} trips completed
//                           </p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <div className="flex">
//                             {[...Array(5)].map((_, i) => (
//                               <div
//                                 key={i}
//                                 className={`h-4 w-4 ${
//                                   i < Math.floor(driver.rating)
//                                     ? "text-yellow-400 fill-yellow-400"
//                                     : "text-gray-300"
//                                 }`}
//                               >
//                                 ★
//                               </div>
//                             ))}
//                           </div>
//                           <span className="font-bold">{driver.rating}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }
