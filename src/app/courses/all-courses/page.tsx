// app/courses/all-courses/page.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, Clock, Star, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

// Course data type
interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  rating: number;
  image: string;
  instructor: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
}

// Sample course data
const courses: Course[] = [
  {
    id: 1,
    title: "PHP Development Course",
    description:
      "In this course, you'll explore the basic structure of a web application and how a web browser interacts with a web server.",
    category: "Development",
    duration: "25 mins",
    rating: 4.5,
    image: "/images/banner/course1.png",
    instructor: {
      name: "John Deo",
      avatar: "/images/user/user1.jpg",
    },
    likes: 368,
    comments: 48,
  },
  {
    id: 2,
    title: "Java Development Course",
    description:
      "Learn Java programming fundamentals and build robust applications with industry-standard practices.",
    category: "Programming",
    duration: "45 mins",
    rating: 4.8,
    image: "/images/banner/course2.png",
    instructor: {
      name: "Sarah Smith",
      avatar: "/images/user/user2.jpg",
    },
    likes: 2951,
    comments: 254,
  },
  {
    id: 3,
    title: "Angular Development Course",
    description:
      "Master Angular framework and build dynamic, responsive web applications with modern best practices.",
    category: "Frontend",
    duration: "25 mins",
    rating: 4.9,
    image: "/images/banner/course3.png",
    instructor: {
      name: "Airi Satou",
      avatar: "/images/user/user3.jpg",
    },
    likes: 7871,
    comments: 658,
  },
  {
    id: 4,
    title: "SEO Optimization Course",
    description:
      "Learn effective SEO strategies to improve website visibility and drive organic traffic to your business.",
    category: "Marketing",
    duration: "30 mins",
    rating: 4.7,
    image: "/images/banner/course4.png",
    instructor: {
      name: "Ashton Cox",
      avatar: "/images/user/user4.jpg",
    },
    likes: 1258,
    comments: 158,
  },
  {
    id: 5,
    title: "Python for Data Science",
    description:
      "Dive into data analysis, visualization, and machine learning using Python and its powerful libraries.",
    category: "Data Science",
    duration: "60 mins",
    rating: 4.6,
    image: "/images/banner/course2.png",
    instructor: {
      name: "Emily Johnson",
      avatar: "/images/user/user5.jpg",
    },
    likes: 3412,
    comments: 312,
  },
  {
    id: 6,
    title: "React JS Complete Guide",
    description:
      "Learn React from scratch, understand component lifecycle, and build high-performance SPAs.",
    category: "Frontend",
    duration: "40 mins",
    rating: 4.7,
    image: "/images/banner/course1.png",
    instructor: {
      name: "Michael Lee",
      avatar: "/images/user/user6.jpg",
    },
    likes: 2210,
    comments: 178,
  },
  {
    id: 7,
    title: "UX/UI Design Fundamentals",
    description:
      "Understand user-centered design, wireframing, and UI tools to build intuitive interfaces.",
    category: "Design",
    duration: "50 mins",
    rating: 4.4,
    image: "/images/banner/course4.png",
    instructor: {
      name: "Laura Kim",
      avatar: "/images/user/user7.jpg",
    },
    likes: 1298,
    comments: 143,
  },
  {
    id: 8,
    title: "DevOps with Docker & Kubernetes",
    description:
      "Master containerization and orchestration with practical hands-on projects in Docker and Kubernetes.",
    category: "DevOps",
    duration: "75 mins",
    rating: 4.9,
    image: "/images/banner/course3.png",
    instructor: {
      name: "Robert Brown",
      avatar: "/images/user/user8.jpg",
    },
    likes: 4120,
    comments: 367,
  },
];

// Category colors mapping
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Development: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    Programming: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    Frontend: "bg-green-100 text-green-800 hover:bg-green-200",
    Marketing: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    "Data Science": "bg-red-100 text-red-800 hover:bg-red-200",
    Design: "bg-pink-100 text-pink-800 hover:bg-pink-200",
    DevOps: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
    Security: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    "AI/ML": "bg-teal-100 text-teal-800 hover:bg-teal-200",
    "Mobile Development": "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
  };
  return colors[category] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
};

export default function AllCoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href="/admin/dashboard/main"
                  className="flex items-center gap-1"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/courses">Course</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Course</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold mt-4">All Course</h1>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 pt-0"
          >
            {/* Course Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <Badge
                  className={`px-3 py-1 font-medium ${getCategoryColor(course.category)}`}
                >
                  {course.category}
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{course.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg line-clamp-1">
                {course.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 mt-2">
                {course.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-3">
              {/* Instructor Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                  />
                  <AvatarFallback>
                    {course.instructor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {course.instructor.name}
                </span>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-3 flex justify-between">
              <Button size="sm" className="font-medium">
                View Details
              </Button>
              <div className="flex gap-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Heart className="h-4 w-4" />
                  <span>{course.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MessageCircle className="h-4 w-4" />
                  <span>{course.comments}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
