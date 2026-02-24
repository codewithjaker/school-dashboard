export type Session = {
  id: string;
  sessionName: string;
  startDate: string;
  endDate: string;
  instructor: string;
  room: string;
  status: "Active" | "Inactive";
};

export type SessionStatus = "Active" | "Inactive";
