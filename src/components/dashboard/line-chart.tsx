// components/dashboard/line-chart.tsx
"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { test: "Test 1", Mathematics: 65, Science: 80 },
  { test: "Test 2", Mathematics: 59, Science: 70 },
  { test: "Test 3", Mathematics: 80, Science: 45 },
  { test: "Test 4", Mathematics: 81, Science: 70 },
  { test: "Test 5", Mathematics: 56, Science: 65 },
  { test: "Test 6", Mathematics: 55, Science: 40 },
  { test: "Test 7", Mathematics: 40, Science: 60 },
];

export default function LineChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="test" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="Mathematics"
          stroke="#f77a9a"
          fill="#f77a9a"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="Science"
          stroke="#a054f7"
          fill="#a054f7"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
