"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ComposedChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Activity, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

// --- Constants & Data ---

const chartColors = {
  emerald: "hsl(142, 71%, 45%)", // Success/Good
  amber: "hsl(47, 95%, 57%)",    // Warning/Pending
  rose: "hsl(0, 84%, 60%)",      // Error/Critical
  blue: "hsl(217, 91%, 60%)",    // Neutral/Info
  purple: "hsl(262, 83%, 58%)",  // Secondary
}

const healthTrendData = [
  { month: "Jan", avg: 92, min: 75, max: 98 },
  { month: "Feb", avg: 88, min: 68, max: 96 },
  { month: "Mar", avg: 85, min: 62, max: 94 },
  { month: "Apr", avg: 82, min: 58, max: 92 },
  { month: "May", avg: 79, min: 54, max: 90 },
  { month: "Jun", avg: 75, min: 48, max: 88 },
]

const teamWorkloadData = [
  { team: "Alpha", completed: 10, pending: 2 },
  { team: "Beta", completed: 12, pending: 3 },
  { team: "Gamma", completed: 8, pending: 2 },
  { team: "Delta", completed: 14, pending: 4 },
  { team: "Epsilon", completed: 11, pending: 3 },
  { team: "Zeta", completed: 7, pending: 1 },
]

const requestTrendData = [
  { week: "W1", new: 8, inProgress: 12, completed: 5 },
  { week: "W2", new: 10, inProgress: 15, completed: 8 },
  { week: "W3", new: 7, inProgress: 14, completed: 11 },
  { week: "W4", new: 12, inProgress: 16, completed: 9 },
  { week: "W5", new: 9, inProgress: 13, completed: 12 },
]

const departmentMetricsData = [
  { department: "Production Line 1", health: 78, requests: 12, efficiency: 85, status: "warning" },
  { department: "Production Line 2", health: 72, requests: 15, efficiency: 78, status: "warning" },
  { department: "Logistics Hub", health: 85, requests: 8, efficiency: 92, status: "healthy" },
  { department: "Assembly Station", health: 68, requests: 18, efficiency: 71, status: "critical" },
  { department: "Control Room", health: 88, requests: 5, efficiency: 95, status: "healthy" },
  { department: "Power Station", health: 65, requests: 10, efficiency: 68, status: "critical" },
]

// --- Custom Components ---

// Custom Legend to ensure text visibility in both Light/Dark modes
const CustomLegend = ({ payload }: any) => {
  if (!payload || !payload.length) return null;
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div 
            className="h-3 w-3 rounded-full" 
            style={{ backgroundColor: entry.color }} 
          />
          <span className="text-sm font-medium text-foreground">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 min-h-screen pb-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics & Insights</h1>
            <p className="text-muted-foreground mt-2">Deep dive into system performance, efficiency, and trends.</p>
          </div>
        </div>

        {/* Main Chart: Health Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Equipment Health Trends
            </CardTitle>
            <CardDescription>6-month analysis of average vs. extreme health scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                avg: { label: "Average Health", color: chartColors.blue },
                min: { label: "Minimum Recorded", color: chartColors.rose },
                max: { label: "Maximum Recorded", color: chartColors.emerald },
              }}
              className="h-[350px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={healthTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis 
                    dataKey="month" 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={10} 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} 
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={10} 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} 
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend content={<CustomLegend />} />
                  
                  {/* Min/Max Range Area for better visual context */}
                  <Area type="monotone" dataKey="min" stroke="transparent" fill={chartColors.rose} fillOpacity={0.1} />
                  
                  {/* Lines */}
                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke={chartColors.blue}
                    strokeWidth={3}
                    dot={{ fill: chartColors.blue, r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                    name="Average Health"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="min" 
                    stroke={chartColors.rose} 
                    strokeWidth={2} 
                    strokeDasharray="4 4" 
                    dot={false} 
                    name="Minimum" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="max" 
                    stroke={chartColors.emerald} 
                    strokeWidth={2} 
                    strokeDasharray="4 4" 
                    dot={false} 
                    name="Maximum" 
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Secondary Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          
          {/* Workload Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Team Workload Distribution</CardTitle>
              <CardDescription>Active vs Completed tasks per team</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  completed: { label: "Completed Tasks", color: chartColors.emerald },
                  pending: { label: "Pending Tasks", color: chartColors.amber },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamWorkloadData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis
                      dataKey="team"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis 
                      tickLine={false} 
                      axisLine={false} 
                      tickMargin={10}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend content={<CustomLegend />} />
                    {/* Stacked Bars for cleaner look */}
                    <Bar dataKey="completed" stackId="a" fill={chartColors.emerald} radius={[0, 0, 4, 4]} />
                    <Bar dataKey="pending" stackId="a" fill={chartColors.amber} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Request Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Request Processing Volume</CardTitle>
              <CardDescription>Weekly breakdown of ticket status</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  new: { label: "New", color: chartColors.blue },
                  inProgress: { label: "In Progress", color: chartColors.amber },
                  completed: { label: "Completed", color: chartColors.emerald },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={requestTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis 
                        dataKey="week" 
                        tickLine={false} 
                        axisLine={false} 
                        tickMargin={10} 
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis 
                        tickLine={false} 
                        axisLine={false} 
                        tickMargin={10} 
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <ChartTooltip cursor={{fill: 'hsl(var(--muted)/0.3)'}} content={<ChartTooltipContent />} />
                    <Legend content={<CustomLegend />} />
                    <Bar dataKey="new" fill={chartColors.blue} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="inProgress" fill={chartColors.purple} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" fill={chartColors.emerald} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Department Efficiency Metrics
            </CardTitle>
            <CardDescription>Live performance indicators by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {/* Table Header */}
              <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground uppercase tracking-wider pb-4 px-2">
                <div className="col-span-4">Department</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-2 text-center">Open Requests</div>
                <div className="col-span-4 pl-4">Efficiency Score</div>
              </div>

              {/* Table Rows */}
              {departmentMetricsData.map((dept, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-12 items-center py-4 px-2 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors rounded-lg"
                >
                  
                  {/* Department Name & Health */}
                  <div className="col-span-4">
                    <p className="font-semibold text-sm">{dept.department}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Health Index: {dept.health}%</p>
                  </div>

                  {/* Status Badge */}
                  <div className="col-span-2 flex justify-center">
                    <Badge variant="outline" className={`
                        ${dept.status === 'healthy' ? 'text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800' : ''}
                        ${dept.status === 'warning' ? 'text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800' : ''}
                        ${dept.status === 'critical' ? 'text-rose-600 border-rose-200 bg-rose-50 dark:bg-rose-900/20 dark:border-rose-800' : ''}
                    `}>
                        {dept.status === 'healthy' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {dept.status === 'warning' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {dept.status === 'critical' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {dept.status.charAt(0).toUpperCase() + dept.status.slice(1)}
                    </Badge>
                  </div>

                  {/* Request Count */}
                  <div className="col-span-2 text-center">
                    <span className="font-bold text-sm">{dept.requests}</span>
                  </div>

                  {/* Efficiency Bar */}
                  <div className="col-span-4 pl-4">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              dept.efficiency >= 80 ? "bg-emerald-500" : 
                              dept.efficiency >= 70 ? "bg-amber-500" : "bg-rose-500"
                            }`}
                            style={{ width: `${dept.efficiency}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{dept.efficiency}%</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}