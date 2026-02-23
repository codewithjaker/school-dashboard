// components/dashboard/radar-chart.tsx
"use client";

import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';

const data = [
  { subject: 'Advanced Mathematics', A: 75, fullMark: 100 },
  { subject: 'Introduction to Physics', A: 60, fullMark: 100 },
  { subject: 'World Literature', A: 90, fullMark: 100 },
  { subject: 'Computer Science Fundamentals', A: 45, fullMark: 100 },
  { subject: 'Environmental Studies', A: 30, fullMark: 100 },
];

export default function RadarChart() {
  return (
    <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" width={300} height={330} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar name="Course Completion" dataKey="A" stroke="#3f51b5" fill="#3f51b5" fillOpacity={0.6} />
      <Tooltip />
      <Legend />
    </RechartsRadarChart>
  );
}