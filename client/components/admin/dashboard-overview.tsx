"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Package, Clock, Users } from "lucide-react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// --- Constants & Data ---

const chartColors = {
  health: "hsl(217, 91%, 60%)", 
  requests: "hsl(142, 71%, 45%)", 
  pieBlue: "hsl(217, 91%, 60%)",
  pieYellow: "hsl(47, 95%, 57%)",
  pieGreen: "hsl(142, 71%, 45%)",
  pieRed: "hsl(0, 84%, 60%)",
}

const healthData = [
  { month: "Jan", health: 92, requests: 12 },
  { month: "Feb", health: 88, requests: 15 },
  { month: "Mar", health: 85, requests: 18 },
  { month: "Apr", health: 82, requests: 22 },
  { month: "May", health: 79, requests: 25 },
  { month: "Jun", health: 75, requests: 28 },
]

const requestStatusData = [
  { name: "New", value: 12, color: chartColors.pieBlue },
  { name: "In Progress", value: 18, color: chartColors.pieYellow },
  { name: "Completed", value: 42, color: chartColors.pieGreen },
  { name: "On Hold", value: 8, color: chartColors.pieRed },
]

const recentRequests = [
  { id: 1, equipment: "Motor Unit A-123", status: "In Progress", priority: "High", date: "2024-01-15" },
  { id: 2, equipment: "Pump Assembly B-456", status: "New", priority: "Critical", date: "2024-01-14" },
  { id: 3, equipment: "Conveyor Belt C-789", status: "Completed", priority: "Medium", date: "2024-01-13" },
  { id: 4, equipment: "Hydraulic Cylinder D-012", status: "In Progress", priority: "Medium", date: "2024-01-12" },
  { id: 5, equipment: "Control Panel E-345", status: "New", priority: "Low", date: "2024-01-11" },
]

// --- Custom Components ---

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
          {/* Explicitly forcing color classes for safety */}
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// --- Main Component ---

export function AdminDashboardOverview() {
  return (
    <div className="space-y-8 p-1">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">System overview and key metrics</p>
      </div>

      {/* --- KPI Cards Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total Equipment</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">245</div>
            <p className="text-xs text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">At Risk</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">12</div>
            <p className="text-xs text-muted-foreground">Below health threshold</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">28</div>
            <p className="text-xs text-muted-foreground">Avg. 3 days SLA</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Active Teams</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">8</div>
            <p className="text-xs text-muted-foreground">42 technicians</p>
          </CardContent>
        </Card>
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Equipment Health Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                health: { label: "Health Score", color: chartColors.health },
                requests: { label: "Requests", color: chartColors.requests },
              }}
              className="h-80 w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false} 
                    stroke="hsl(var(--border))"
                    opacity={0.4}
                  />
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
                  <Line 
                    type="monotone" 
                    dataKey="health" 
                    name="Health Score"
                    stroke={chartColors.health} 
                    strokeWidth={3}
                    dot={{ fill: chartColors.health, r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 7, fill: chartColors.health, strokeWidth: 0 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="requests"
                    name="Maintenance Requests" 
                    stroke={chartColors.requests}
                    strokeWidth={3} 
                    dot={{ fill: chartColors.requests, r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 7, fill: chartColors.requests, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="col-span-1">
          <CardHeader>
            {/* Added explicit foreground color */}
            <CardTitle className="text-lg text-foreground">Request Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ChartContainer config={{}} className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={requestStatusData}
                    cx="50%"
                    cy="50%"
                    label={({ name, value, cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius + 25;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      
                      return (
                        <text 
                          x={x} 
                          y={y} 
                          // FIX: Using Tailwind class instead of style fill
                          className="fill-slate-900 dark:fill-slate-100 text-xs font-medium"
                          textAnchor={x > cx ? 'start' : 'end'} 
                          dominantBaseline="central"
                        >
                          {`${name} (${value})`}
                        </text>
                      );
                    }}
                    outerRadius={90}
                    dataKey="value"
                    paddingAngle={4}
                    innerRadius={40}
                  >
                    {requestStatusData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="hsl(var(--background))" 
                        strokeWidth={3}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend content={<CustomLegend />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* --- Recent Requests Table Section --- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Recent Maintenance Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="font-medium text-sm text-foreground truncate">{request.equipment}</p>
                  <p className="text-xs text-muted-foreground">{request.date}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span
                    className={`px-2.5 py-0.5 text-xs rounded-full font-medium border ${
                      request.priority === "Critical"
                        ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                        : request.priority === "High"
                          ? "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800"
                          : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                    }`}
                  >
                    {request.priority}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-xs rounded-full font-medium border ${
                      request.status === "Completed"
                        ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                        : request.status === "In Progress"
                          ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                          : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}