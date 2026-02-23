// components/dashboard/progress-table.tsx
import { Progress } from "@/components/ui/progress";

const subjects = [
  { name: "Chemistry", progress: 30, duration: "2 Months", warning: true },
  { name: "Mathematics", progress: 55, duration: "3 Months" },
  { name: "Painting", progress: 67, duration: "1 Month" },
  { name: "Business Studies", progress: 70, duration: "2 Months" },
  { name: "Biology", progress: 24, duration: "3 Months", warning: true },
  { name: "Computer Studies", progress: 77, duration: "4 Months" },
  { name: "Geography", progress: 41, duration: "2 Months" },
];

export default function ProgressTable() {
  return (
    <div className="space-y-4">
      {subjects.map((subject, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">{subject.name}</span>
            <span className="text-sm text-muted-foreground">
              {subject.duration}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={subject.progress} className="flex-1" />
            <span
              className={`text-sm font-medium ${subject.warning ? "text-red-500" : "text-foreground"}`}
            >
              {subject.progress}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
