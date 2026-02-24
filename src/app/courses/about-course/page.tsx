import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Star,
  StarHalf,
  Users,
  Clock,
  Calendar,
  DollarSign,
  User,
  Globe,
  GraduationCap,
  Heart,
  Code,
  FileText,
  MessageCircle,
  ShieldCheck,
  RefreshCw,
  Monitor,
  CheckCircle,
  ChevronRight,
  BookOpen,
  Database,
} from "lucide-react";
import Image from "next/image";

export default function AboutCoursePage() {
  const courseDetails = {
    title: "Web Development",
    category: "Development",
    rating: 4.5,
    reviews: 128,
    students: 1240,
    lastUpdated: "Jan 2023",
    duration: "1 Year",
    price: "$230.00",
    instructor: "Abdul Saikh",
    startDate: "21st Jan 2023",
    language: "English",
    certificate: "Yes",
    image: "/images/banner/course1.png", // Replace with actual image path
  };

  const features = [
    { icon: Code, label: "Hands-on Coding" },
    { icon: FileText, label: "Real Projects" },
    { icon: MessageCircle, label: "Community Support" },
    { icon: ShieldCheck, label: "Industry Certificate" },
    { icon: RefreshCw, label: "Lifetime Updates" },
    { icon: Monitor, label: "Cross-platform" },
  ];

  const modules = [
    {
      title: "Module 1: Web Fundamentals",
      icon: Monitor,
      topics: [
        "Introduction to Computer and Internet",
        "HTML5 Structure and Semantics",
        "CSS3 Styling and Layouts",
        "Responsive Design Principles",
      ],
    },
    {
      title: "Module 2: Programming Fundamentals",
      icon: Code,
      topics: [
        "JavaScript Basics",
        "Object Oriented Programming Concepts",
        "Modern JavaScript (ES6+)",
        "DOM Manipulation",
      ],
    },
    {
      title: "Module 3: Backend Development",
      icon: Database,
      topics: [
        "Server-side Programming",
        "Database Design and Management",
        "RESTful API Development",
        "Authentication and Security",
      ],
    },
  ];

  const outcomes = [
    "Build responsive, modern websites using HTML5, CSS3 and JavaScript",
    "Develop full-stack web applications with frontend and backend integration",
    "Implement database design and management for web applications",
    "Create and consume RESTful APIs for data exchange",
    "Apply best practices for web security and performance optimization",
    "Deploy web applications to production environments",
    "Implement modern frontend frameworks for interactive UIs",
    "Collaborate effectively using version control and project management tools",
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="ml-2 text-sm text-gray-600">
          ({courseDetails.reviews} reviews)
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/admin/dashboard/main"
                className="flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/courses">Course</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>About Course</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mt-2">About Course</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Course Header Card */}
          <Card className="overflow-hidden">
            <div className="relative h-48 w-full bg-gradient-to-r from-blue-500 to-purple-600">
              <div className="absolute top-3 left-3">
                <Badge className="bg-white text-blue-600 hover:bg-white">
                  {courseDetails.category}
                </Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h2 className="text-xl font-bold text-white">
                  {courseDetails.title}
                </h2>
                {renderStars(courseDetails.rating)}
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>
                    {courseDetails.students.toLocaleString()} students
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Last updated: {courseDetails.lastUpdated}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About Course</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Master web development fundamentals and advanced techniques in
                this comprehensive course designed for beginners and
                intermediate developers alike.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{courseDetails.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">{courseDetails.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Instructor</p>
                    <p className="font-medium">{courseDetails.instructor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">{courseDetails.startDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-50 rounded-lg">
                    <Globe className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Language</p>
                    <p className="font-medium">{courseDetails.language}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-50 rounded-lg">
                    <GraduationCap className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Certificate</p>
                    <p className="font-medium">{courseDetails.certificate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full">Enroll Now</Button>
              <Button variant="outline" className="w-full">
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Course Description */}
              <div className="space-y-4">
                <p className="text-gray-600">
                  This comprehensive Web Development course covers everything
                  you need to become a professional web developer. From
                  front-end technologies like HTML, CSS, and JavaScript to
                  back-end frameworks and database management, you&apos;ll gain
                  hands-on experience building real-world web applications.
                </p>
                <p className="text-gray-600">
                  Throughout this course, you&apos;ll learn modern development
                  practices including responsive design, progressive web apps,
                  and API integration. Our project-based approach ensures
                  you&apos;ll build a portfolio of work to showcase your skills
                  to potential employers.
                </p>
                <p className="text-gray-600">
                  The curriculum is regularly updated to reflect the latest
                  industry standards and technologies, ensuring you graduate
                  with relevant, in-demand skills for today&apos;s job market.
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="p-2 bg-white rounded-md">
                        <feature.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Course Syllabus */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Course Syllabus</h3>
                <div className="space-y-4">
                  {modules.map((module, index) => (
                    <Card key={index} className="border">
                      <CardHeader className="py-3">
                        <div className="flex items-center gap-3">
                          <module.icon className="w-5 h-5 text-blue-600" />
                          <CardTitle className="text-base">
                            {module.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <ul className="space-y-2">
                          {module.topics.map((topic, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Learning Outcomes */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Learning Outcomes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
