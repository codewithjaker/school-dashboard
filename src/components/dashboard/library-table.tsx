// components/dashboard/library-table.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar } from "lucide-react";

const books = [
  {
    id: "AI99876",
    title: "Computer Programming",
    author: "John Deo",
    issueDate: "10/03/2024",
    returnDate: "03/23/2024",
    status: "Issue",
  },
  {
    id: "BT67657",
    title: "Design Pattern In Java",
    author: "Airi Satou",
    issueDate: "04/14/2024",
    returnDate: "04/28/2024",
    status: "Return",
  },
  {
    id: "RT67013",
    title: "The Mathematics Principles",
    author: "Angelica Ramos",
    issueDate: "04/17/2024",
    returnDate: "04/24/2024",
    status: "Issue",
  },
  {
    id: "PS2398",
    title: "Angular 10 Advance",
    author: "Jens Brincker",
    issueDate: "04/21/2024",
    returnDate: "04/29/2024",
    status: "Issue",
  },
  {
    id: "MO4987",
    title: "SEO Optimization",
    author: "Cara Stevens",
    issueDate: "05/11/2024",
    returnDate: "05/18/2024",
    status: "Return",
  },
];

export default function LibraryTable() {
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-7 bg-muted/50 p-4 text-sm font-medium">
        <div>Book ID</div>
        <div className="col-span-2">Book Title</div>
        <div>Author</div>
        <div>Issue Date</div>
        <div>Status</div>
        <div>Actions</div>
      </div>
      {books.map((book) => (
        <div
          key={book.id}
          className="grid grid-cols-7 items-center p-4 border-t"
        >
          <div className="font-medium">{book.id}</div>
          <div className="col-span-2">{book.title}</div>
          <div>{book.author}</div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            {book.issueDate}
          </div>
          <div>
            <Badge variant={book.status === "Issue" ? "default" : "secondary"}>
              {book.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
