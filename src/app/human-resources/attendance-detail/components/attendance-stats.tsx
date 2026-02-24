import { Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface AttendanceStatsProps {
  stats: {
    avgWorkingHours: string
    avgInTime: string
    avgOutTime: string
    avgBreakTime: string
  }
}

export function AttendanceStats({ stats }: AttendanceStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6 text-center">
          <Clock className="h-8 w-8 mx-auto mb-3 text-green-500" />
          <h3 className="text-2xl font-bold text-green-600 mb-1">{stats.avgWorkingHours}</h3>
          <p className="text-sm text-muted-foreground">Average Working Hours</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 text-center">
          <Clock className="h-8 w-8 mx-auto mb-3 text-blue-500" />
          <h3 className="text-2xl font-bold text-blue-600 mb-1">{stats.avgInTime}</h3>
          <p className="text-sm text-muted-foreground">Average In Time</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 text-center">
          <Clock className="h-8 w-8 mx-auto mb-3 text-purple-500" />
          <h3 className="text-2xl font-bold text-purple-600 mb-1">{stats.avgOutTime}</h3>
          <p className="text-sm text-muted-foreground">Average Out Time</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 text-center">
          <Clock className="h-8 w-8 mx-auto mb-3 text-orange-500" />
          <h3 className="text-2xl font-bold text-orange-600 mb-1">{stats.avgBreakTime}</h3>
          <p className="text-sm text-muted-foreground">Average Break Time</p>
        </CardContent>
      </Card>
    </div>
  )
}