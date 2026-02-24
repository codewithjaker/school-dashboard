export type ComplaintStatus = "Open" | "In Progress" | "Resolved" | "Closed";
export type PriorityLevel = "Low" | "Medium" | "High";
export type ComplainantType = "Student" | "Parent" | "Staff";

export interface Complaint {
  id: string;
  complaintId: string;
  complainantName: string;
  complainantType: ComplainantType;
  complaintDate: Date;
  complaintTime: string;
  complaintDescription: string;
  status: ComplaintStatus;
  department: string;
  assignedTo: string;
  resolutionDate?: Date;
  priorityLevel: PriorityLevel;
  imageUrl?: string;
}

export const complaintData: Complaint[] = [
  {
    id: "1",
    complaintId: "C001",
    complainantName: "Alice Johnson",
    complainantType: "Parent",
    complaintDate: new Date("2024-11-20"),
    complaintTime: "09:00",
    complaintDescription: "The school lunch was cold and unappetizing.",
    status: "Resolved",
    department: "Administration",
    assignedTo: "John Smith",
    resolutionDate: new Date("2024-11-21"),
    priorityLevel: "Medium",
    imageUrl: "/api/placeholder/40/40",
  },
  {
    id: "2",
    complaintId: "C002",
    complainantName: "David Brown",
    complainantType: "Student",
    complaintDate: new Date("2024-11-21"),
    complaintTime: "13:15",
    complaintDescription:
      "The chemistry lab equipment is outdated and not working properly.",
    status: "In Progress",
    department: "Transportation",
    assignedTo: "Ms. Clara Green",
    priorityLevel: "High",
    imageUrl: "/api/placeholder/40/40",
  },
  {
    id: "3",
    complaintId: "C003",
    complainantName: "Sarah Miller",
    complainantType: "Staff",
    complaintDate: new Date("2024-11-19"),
    complaintTime: "10:45",
    complaintDescription: "Inappropriate behavior from a student during class.",
    status: "Closed",
    department: "Administration",
    assignedTo: "Principal Adams",
    resolutionDate: new Date("2024-11-20"),
    priorityLevel: "Medium",
    imageUrl: "/api/placeholder/40/40",
  },
  {
    id: "4",
    complaintId: "C004",
    complainantName: "Emily White",
    complainantType: "Parent",
    complaintDate: new Date("2024-11-22"),
    complaintTime: "11:30",
    complaintDescription: "The school bus was late on multiple occasions.",
    status: "Open",
    department: "Transportation",
    assignedTo: "Mr. Alan Brown",
    priorityLevel: "High",
    imageUrl: "/api/placeholder/40/40",
  },
  {
    id: "5",
    complaintId: "C005",
    complainantName: "Michael Green",
    complainantType: "Student",
    complaintDate: new Date("2024-11-21"),
    complaintTime: "14:00",
    complaintDescription: "The classroom is too noisy during study hours.",
    status: "In Progress",
    department: "Classroom",
    assignedTo: "Mr. Johnson",
    priorityLevel: "Medium",
    imageUrl: "/api/placeholder/40/40",
  },
  {
    id: "6",
    complaintId: "C006",
    complainantName: "Sophia Clark",
    complainantType: "Parent",
    complaintDate: new Date("2024-11-22"),
    complaintTime: "10:30",
    complaintDescription: "The school's website is not user-friendly.",
    status: "Resolved",
    department: "IT Department",
    assignedTo: "Ms. Laura White",
    resolutionDate: new Date("2024-11-22"),
    priorityLevel: "Low",
    imageUrl: "/api/placeholder/40/40",
  },
  {
    id: "7",
    complaintId: "C007",
    complainantName: "Alice Smith",
    complainantType: "Parent",
    complaintDate: new Date("2024-11-23"),
    complaintTime: "09:15",
    complaintDescription: "My child has been bullied by other students.",
    status: "Open",
    department: "Human Resources",
    assignedTo: "Ms. Rebecca Turner",
    priorityLevel: "High",
    imageUrl: "/api/placeholder/40/40",
  },
  {
    id: "8",
    complaintId: "C008",
    complainantName: "Tom Williams",
    complainantType: "Staff",
    complaintDate: new Date("2024-11-22"),
    complaintTime: "15:00",
    complaintDescription: "Insufficient resources in the library.",
    status: "In Progress",
    department: "Library",
    assignedTo: "Mr. Robert Lane",
    priorityLevel: "Medium",
    imageUrl: "/api/placeholder/40/40",
  },
  {
    id: "9",
    complaintId: "C009",
    complainantName: "Emily Carter",
    complainantType: "Student",
    complaintDate: new Date("2024-11-21"),
    complaintTime: "11:45",
    complaintDescription: "The gym facilities are not well maintained.",
    status: "Resolved",
    department: "Facilities",
    assignedTo: "Mr. Steve Brown",
    resolutionDate: new Date("2024-11-22"),
    priorityLevel: "Medium",
    imageUrl: "/api/placeholder/40/40",
  },
  {
    id: "10",
    complaintId: "C010",
    complainantName: "Brian Johnson",
    complainantType: "Parent",
    complaintDate: new Date("2024-11-22"),
    complaintTime: "12:30",
    complaintDescription: "Lack of communication regarding school events.",
    status: "Open",
    department: "Administration",
    assignedTo: "Ms. Linda Smith",
    priorityLevel: "Medium",
    imageUrl: "/api/placeholder/40/40",
  },
];
