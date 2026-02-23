// components/dashboard/bar-chart.tsx
"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", Physics: 44, Computer: 13, Management: 11, Mathematics: 21 },
  { day: "Tue", Physics: 55, Computer: 23, Management: 17, Mathematics: 7 },
  { day: "Wed", Physics: 41, Computer: 20, Management: 15, Mathematics: 25 },
  { day: "Thu", Physics: 67, Computer: 8, Management: 15, Mathematics: 13 },
  { day: "Fri", Physics: 22, Computer: 13, Management: 21, Mathematics: 22 },
  { day: "Sat", Physics: 43, Computer: 27, Management: 14, Mathematics: 8 },
];

export default function BarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Physics" fill="#25b9c1" />
        <Bar dataKey="Computer" fill="#4b4bcb" />
        <Bar dataKey="Management" fill="#ea9022" />
        <Bar dataKey="Mathematics" fill="#9e9e9e" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
