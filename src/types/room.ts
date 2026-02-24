export type Room = {
  id: string;
  roomNumber: string;
  roomType: "Single" | "Double" | "Triple";
  floor: number;
  capacity: number;
  status: "Occupied" | "Vacant";
  currentOccupants: number;
  price: number;
  condition: "Excellent" | "Good" | "Needs Repair";
  assignedDate?: string;
  checkInDate?: string;
  block: string;
};

export type RoomTableColumn = {
  id: string;
  label: string;
  accessor: keyof Room;
  sortable?: boolean;
};
