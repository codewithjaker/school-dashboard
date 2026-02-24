export interface LessonPlan {
  id: string;
  topic: string;
  lessonName: string;
  class: string;
  subject: string;
  teacher: string;
  date: string;
  objectives: string;
  teachingMethod: string;
  status: "Completed" | "In Progress" | "Planned";
  createdAt: string;
  updatedAt: string;
}

export interface LessonPlanFormData {
  topic: string;
  lessonName: string;
  class: string;
  subject: string;
  teacher: string;
  date: string;
  objectives: string;
  teachingMethod: string;
  status: "Completed" | "In Progress" | "Planned";
}
