"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workingHours: string;
  shift: string;
  status: "present" | "leave" | "weekend";
  isLateCheckIn: boolean;
  isEarlyCheckOut: boolean;
  isShortHours: boolean;
}

interface AttendanceTableProps {
  data: AttendanceRecord[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AttendanceTable({
  data,
  onEdit,
  onDelete,
}: AttendanceTableProps) {
  const getStatusBadge = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "present":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            Present
          </Badge>
        );
      case "leave":
        return <Badge variant="destructive">Leave</Badge>;
      case "weekend":
        return (
          <Badge
            variant="outline"
            className="border-orange-500 text-orange-500"
          >
            Weekend
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Check In</TableHead>
            <TableHead className="text-center">Check Out</TableHead>
            <TableHead className="text-center">Working Hours</TableHead>
            <TableHead className="text-center">Shift</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="text-center font-medium">
                {record.date}
              </TableCell>

              <TableCell
                className={cn(
                  "text-center",
                  record.isLateCheckIn && "text-red-500 font-medium",
                )}
              >
                {record.checkIn}
                {record.isLateCheckIn && " ⚠️"}
              </TableCell>

              <TableCell
                className={cn(
                  "text-center",
                  record.isEarlyCheckOut && "text-red-500 font-medium",
                )}
              >
                {record.checkOut}
                {record.isEarlyCheckOut && " ⚠️"}
              </TableCell>

              <TableCell
                className={cn(
                  "text-center",
                  record.isShortHours && "text-red-500 font-medium",
                )}
              >
                {record.workingHours}
                {record.isShortHours && " ⚠️"}
              </TableCell>

              <TableCell className="text-center">{record.shift}</TableCell>

              <TableCell className="text-center">
                {getStatusBadge(record.status)}
              </TableCell>

              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(record.id)}
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(record.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
