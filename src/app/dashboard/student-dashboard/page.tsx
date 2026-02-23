// app/dashboard/student-dashboard/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Calendar,
  Clock,
  User,
  BookOpen,
  School,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  FileText,
  Award,
  BookMarked,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";

// Components
import RadarChart from "@/components/dashboard/radar-chart";
import BarChart from "@/components/dashboard/bar-chart";
import LineChart from "@/components/dashboard/line-chart";
import ProgressTable from "@/components/dashboard/progress-table";
import LibraryTable from "@/components/dashboard/library-table";

// Dummy data
import {
  userProgress,
  upcomingTests,
  timetableData,
  upcomingClasses,
  assignments,
  recentGrades,
  courses,
} from "@/data/dashboard/student-dashboard";
import { Progress } from "@/components/ui/progress";

export default function StudentDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Home className="h-4 w-4" />
            <span className="ml-2">Home</span>
          </Button>
          <span>/</span>
          <span className="font-medium text-foreground">Student Dashboard</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* Welcome Card with Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48 flex items-center justify-center">
                {/* Chart would go here */}
                <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">
                      {userProgress.progressPercentage}%
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Task Completion
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-pink-600">
                  {userProgress.welcomeMessage}
                </h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  Your tasks are {userProgress.progressPercentage}% completed
                  this week. Keep it up and improve your result. Progress is
                  very good!!!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {userProgress.tasks.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-sm">
                        {item.label} - {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tests */}
        <div className="space-y-4">
          {upcomingTests.map((test, index) => (
            <Card key={index} className={`${test.color} text-white border-0`}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-lg">{test.title}</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{test.dateTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Course Progress & Timetable */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Progress */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>
                Overview of your course completion
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-4">
                <div className="h-[400px]">
                  <RadarChart />
                </div>
              </TabsContent>
              <TabsContent value="courses">
                {/* <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Courses list will appear here
                </div> */}

                <TabsContent value="courses">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-6 pt-2">
                      {courses.map((course) => (
                        <div key={course.code} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{course.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {course.code}
                              </p>
                            </div>
                            <Badge variant="outline">{course.progress}%</Badge>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Instructor: {course.instructor}</span>
                            {course.nextClass && (
                              <span>Next: {course.nextClass}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Daily Timetable */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Timetable</CardTitle>
            <CardDescription>Today's schedule and classes</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="friday">
              <TabsList className="w-full">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                  (day) => (
                    <TabsTrigger
                      key={day}
                      value={day.toLowerCase()}
                      className="flex-1"
                    >
                      {day.slice(0, 3)}
                    </TabsTrigger>
                  ),
                )}
              </TabsList>
              {Object.entries(timetableData).map(([day, slots]) => (
                <TabsContent key={day} value={day} className="pt-4">
                  <ScrollArea className="h-[360px] pr-4">
                    <div className="space-y-4">
                      {slots.map((slot, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${getSlotClass(slot.type)}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-4">
                                <div>
                                  <div className="font-semibold">
                                    {slot.time}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {slot.duration}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold">
                                    {slot.subject}
                                  </h4>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{slot.location}</span>
                                  </div>
                                  {slot.teacher && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                      <User className="h-4 w-4" />
                                      <span>{slot.teacher}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline">{slot.type}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Progress, Time Spent, Upcoming Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[360px]">
              <ProgressTable />
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Time Spent Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Time Spent On Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[360px]">
              <BarChart />
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>Next scheduled sessions</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[360px]">
              <div className="space-y-4">
                {upcomingClasses.map((classItem, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={classItem.avatar} />
                        <AvatarFallback>
                          {classItem.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{classItem.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {classItem.subject}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{classItem.date}</div>
                      <div className="text-sm text-muted-foreground">
                        {classItem.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Test Results & Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Results Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>Performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <LineChart />
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Assignments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>Tasks to complete</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[360px]">
              <div className="space-y-4">
                {assignments.map((assignment, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold">{assignment.title}</h4>
                      <Badge
                        variant={
                          assignment.priority === "high"
                            ? "destructive"
                            : "default"
                        }
                      >
                        {assignment.priority}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-4 w-4" />
                        <span>{assignment.subject}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {assignment.due}</span>
                        {assignment.overdue && (
                          <Badge
                            variant="outline"
                            className="text-red-500 border-red-500"
                          >
                            Overdue
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        {assignment.status === "in-progress" && (
                          <>
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">In-progress</span>
                          </>
                        )}
                        {assignment.status === "pending" && (
                          <>
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span className="text-sm">Pending</span>
                          </>
                        )}
                        {assignment.status === "submitted" && (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Submitted</span>
                          </>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Recent Grades & Library Books */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Grades */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Grades</CardTitle>
              <CardDescription>Latest assessments</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[390px]">
              <div className="space-y-4">
                {recentGrades.map((grade, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50"
                  >
                    <div className={`p-3 rounded-full ${grade.color}`}>
                      <School className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{grade.title}</h4>
                        <Badge className={grade.color}>{grade.grade}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {grade.subject}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-sm">
                        <span className="text-muted-foreground">
                          {grade.date}
                        </span>
                        <span className="font-medium">{grade.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Library Books */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Library Book Issue List</CardTitle>
              <CardDescription>Currently borrowed books</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <LibraryTable />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper function for timetable slot styling
function getSlotClass(type: string) {
  switch (type) {
    case "success":
      return "bg-green-50 border-green-200";
    case "primary":
      return "bg-blue-50 border-blue-200";
    case "muted":
      return "bg-gray-50 border-gray-200";
    case "accent":
      return "bg-purple-50 border-purple-200";
    default:
      return "bg-card border";
  }
}
