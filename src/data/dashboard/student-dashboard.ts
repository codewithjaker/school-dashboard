// Types
export interface Task {
  label: string;
  time: string;
  color: string;
}

export interface Test {
  title: string;
  dateTime: string;
  color: string; // for card background
}

export interface TimetableSlot {
  time: string;
  duration: string;
  subject: string;
  location: string;
  teacher: string | null;
  type: "success" | "primary" | "muted" | "accent";
}

export interface UpcomingClass {
  name: string;
  subject: string;
  date: string;
  time: string;
  avatar: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  due: string;
  priority: "high" | "medium" | "low";
  status: "in-progress" | "pending" | "submitted";
  overdue: boolean;
}

export interface Grade {
  id: string;
  title: string;
  subject: string;
  date: string;
  score: string;
  grade: string;
  color: string; // bg and text color class
}

export interface Course {
  id: string;
  name: string;
  code: string;
  progress: number; // percentage
  instructor: string;
  nextClass?: string;
}

// User progress data
export const userProgress = {
  name: "Sarah",
  progressPercentage: 80,
  welcomeMessage: "Good Job, Sarah. Keep Going!!",
  tasks: [
    { label: "Development", time: "1 hour 50 Mins", color: "bg-blue-500" },
    { label: "Java Class", time: "50 Mins", color: "bg-green-500" },
    { label: "Painting", time: "1 hour 20 Mins", color: "bg-yellow-500" },
    { label: "Geography Class", time: "30 Mins", color: "bg-purple-500" },
  ] as Task[],
};

// Upcoming tests (cards)
export const upcomingTests: Test[] = [
  {
    title: "English Vocabulary Test",
    dateTime: "25, Feb, 2024. 04:00 PM",
    color: "bg-purple-600",
  },
  {
    title: "Science Homework Submission",
    dateTime: "28, Feb, 2024. 10:00 AM",
    color: "bg-green-600",
  },
];

// Daily timetable data for each day
export const timetableData: Record<string, TimetableSlot[]> = {
  monday: [
    {
      time: "08:30 AM",
      duration: "1h 30m",
      subject: "Mathematics",
      location: "Room 101",
      teacher: "Prof. John Smith",
      type: "primary",
    },
    {
      time: "10:15 AM",
      duration: "1h 30m",
      subject: "Physics",
      location: "Lab 2",
      teacher: "Dr. Emily Davis",
      type: "success",
    },
    {
      time: "12:00 PM",
      duration: "45m",
      subject: "Lunch Break",
      location: "Cafeteria",
      teacher: null,
      type: "muted",
    },
    {
      time: "01:00 PM",
      duration: "1h 30m",
      subject: "History",
      location: "Room 203",
      teacher: "Ms. Laura Brown",
      type: "accent",
    },
  ],
  tuesday: [
    {
      time: "09:00 AM",
      duration: "1h 30m",
      subject: "Chemistry",
      location: "Lab 1",
      teacher: "Prof. Robert Wilson",
      type: "success",
    },
    {
      time: "10:45 AM",
      duration: "1h 30m",
      subject: "English Literature",
      location: "Room 205",
      teacher: "Dr. James Wilson",
      type: "primary",
    },
    {
      time: "12:15 PM",
      duration: "45m",
      subject: "Lunch Break",
      location: "Cafeteria",
      teacher: null,
      type: "muted",
    },
    {
      time: "01:30 PM",
      duration: "2h",
      subject: "Art",
      location: "Studio",
      teacher: "Ms. Karen White",
      type: "accent",
    },
  ],
  wednesday: [
    {
      time: "08:30 AM",
      duration: "1h 30m",
      subject: "Computer Science",
      location: "Lab 3",
      teacher: "Prof. Maria Johnson",
      type: "success",
    },
    {
      time: "10:15 AM",
      duration: "1h 30m",
      subject: "Geography",
      location: "Room 204",
      teacher: "Mr. David Miller",
      type: "primary",
    },
    {
      time: "12:00 PM",
      duration: "45m",
      subject: "Lunch Break",
      location: "Cafeteria",
      teacher: null,
      type: "muted",
    },
    {
      time: "01:00 PM",
      duration: "1h 30m",
      subject: "Physical Education",
      location: "Gym",
      teacher: "Coach Taylor",
      type: "accent",
    },
  ],
  thursday: [
    {
      time: "09:00 AM",
      duration: "1h 30m",
      subject: "Biology",
      location: "Lab 4",
      teacher: "Dr. Sarah Adams",
      type: "success",
    },
    {
      time: "10:45 AM",
      duration: "1h 30m",
      subject: "Mathematics",
      location: "Room 101",
      teacher: "Prof. John Smith",
      type: "primary",
    },
    {
      time: "12:15 PM",
      duration: "45m",
      subject: "Lunch Break",
      location: "Cafeteria",
      teacher: null,
      type: "muted",
    },
    {
      time: "01:30 PM",
      duration: "1h 30m",
      subject: "Music",
      location: "Music Room",
      teacher: "Mr. Alan Green",
      type: "accent",
    },
  ],
  friday: [
    {
      time: "08:30 AM",
      duration: "1h 30m",
      subject: "Physics",
      location: "Lab 3",
      teacher: "Prof. Maria Johnson",
      type: "success",
    },
    {
      time: "10:15 AM",
      duration: "1h 30m",
      subject: "English Literature",
      location: "Room 205",
      teacher: "Dr. James Wilson",
      type: "primary",
    },
    {
      time: "12:00 PM",
      duration: "45m",
      subject: "Lunch Break",
      location: "Cafeteria",
      teacher: null,
      type: "muted",
    },
    {
      time: "01:00 PM",
      duration: "1h 30m",
      subject: "Study Hall",
      location: "Library",
      teacher: "Ms. Karen White",
      type: "accent",
    },
  ],
};

// Upcoming classes list
export const upcomingClasses: UpcomingClass[] = [
  {
    name: "Cara Stevens",
    subject: "Mathematics",
    date: "12 June '24",
    time: "09:00-10:00",
    avatar: "/avatars/01.png",
  },
  {
    name: "Airi Satou",
    subject: "Computer Studies",
    date: "13 June '24",
    time: "11:00-12:00",
    avatar: "/avatars/02.png",
  },
  {
    name: "Jens Brincker",
    subject: "Geography",
    date: "15 June '24",
    time: "09:30-10:30",
    avatar: "/avatars/03.png",
  },
  {
    name: "Angelica Ramos",
    subject: "Chemistry",
    date: "16 June '24",
    time: "14:00-15:00",
    avatar: "/avatars/04.png",
  },
  {
    name: "Cara Stevens",
    subject: "Painting",
    date: "18 June '24",
    time: "11:00-12:30",
    avatar: "/avatars/05.png",
  },
  {
    name: "Jacob Ryan",
    subject: "Business Studies",
    date: "22 June '24",
    time: "13:00-14:15",
    avatar: "/avatars/06.png",
  },
];

// Upcoming assignments
export const assignments: Assignment[] = [
  {
    id: "1",
    title: "Research Paper on Renewable Energy",
    subject: "Environmental Science",
    due: "Oct 25, 2023",
    priority: "high" as const,
    status: "in-progress" as const,
    overdue: true,
  },
  {
    id: "2",
    title: "Algebra Problem Set",
    subject: "Mathematics",
    due: "Oct 20, 2023",
    priority: "medium" as const,
    status: "pending" as const,
    overdue: true,
  },
  {
    id: "3",
    title: "Book Report",
    subject: "English Literature",
    due: "Oct 30, 2023",
    priority: "medium" as const,
    status: "pending" as const,
    overdue: true,
  },
  {
    id: "4",
    title: "Chemistry Lab Report",
    subject: "Chemistry",
    due: "Oct 18, 2023",
    priority: "high" as const,
    status: "submitted" as const,
    overdue: true,
  },
  {
    id: "5",
    title: "History Timeline Project",
    subject: "History",
    due: "Nov 5, 2023",
    priority: "low" as const,
    status: "in-progress" as const,
    overdue: true,
  },
];

// Recent grades
export const recentGrades: Grade[] = [
  {
    id: "1",
    title: "Algebra Quiz",
    subject: "Mathematics",
    date: "Oct 15, 2023",
    score: "92/100",
    grade: "A",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "2",
    title: "Chemistry Lab Report",
    subject: "Science",
    date: "Oct 12, 2023",
    score: "87/100",
    grade: "B+",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "3",
    title: "Essay Assignment",
    subject: "English",
    date: "Oct 10, 2023",
    score: "90/100",
    grade: "A-",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "4",
    title: "World War II Test",
    subject: "History",
    date: "Oct 8, 2023",
    score: "83/100",
    grade: "B",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "5",
    title: "Programming Project",
    subject: "Computer Science",
    date: "Oct 5, 2023",
    score: "98/100",
    grade: "A+",
    color: "bg-green-100 text-green-800",
  },
];

// Courses
export const courses: Course[] = [
  {
    id: "1",
    name: "Mathematics",
    code: "MATH101",
    progress: 75,
    instructor: "Prof. John Smith",
    nextClass: "Tomorrow 09:00",
  },
  {
    id: "2",
    name: "Physics",
    code: "PHY102",
    progress: 60,
    instructor: "Dr. Emily Davis",
    nextClass: "Today 10:15",
  },
  {
    id: "3",
    name: "English Literature",
    code: "ENG205",
    progress: 90,
    instructor: "Dr. James Wilson",
    nextClass: "Wed 08:30",
  },
  {
    id: "4",
    name: "Chemistry",
    code: "CHEM101",
    progress: 45,
    instructor: "Prof. Robert Wilson",
    nextClass: "Tue 09:00",
  },
  {
    id: "5",
    name: "Computer Science",
    code: "CS201",
    progress: 80,
    instructor: "Prof. Maria Johnson",
    nextClass: "Tomorrow 08:30",
  },
  {
    id: "6",
    name: "History",
    code: "HIST101",
    progress: 70,
    instructor: "Ms. Laura Brown",
    nextClass: "Mon 13:00",
  },
];
