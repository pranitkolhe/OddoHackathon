"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Wrench, Users, AlertTriangle, Clock, Moon, Sun, Menu, X } from "lucide-react"

export default function GearGuardDashboard() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("overview")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark"
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  // Equipment data
  const equipment = [
    {
      id: 1,
      name: "CNC Machine-01",
      serial: "SN-001",
      category: "Production",
      status: "Active",
      health: 92,
      team: "Mechanics",
    },
    {
      id: 2,
      name: "Office Printer-A2",
      serial: "SN-002",
      category: "IT",
      status: "At Risk",
      health: 35,
      team: "IT Support",
    },
    {
      id: 3,
      name: "Delivery Vehicle-F150",
      serial: "SN-003",
      category: "Fleet",
      status: "Active",
      health: 78,
      team: "Fleet Maintenance",
    },
    {
      id: 4,
      name: "HVAC Unit-3",
      serial: "SN-004",
      category: "Facility",
      status: "Active",
      health: 88,
      team: "Electricians",
    },
  ]

  // Maintenance Teams
  const teams = [
    { id: 1, name: "Mechanics", members: 5, activeRequests: 3 },
    { id: 2, name: "IT Support", members: 3, activeRequests: 2 },
    { id: 3, name: "Fleet Maintenance", members: 4, activeRequests: 1 },
  ]

  // Maintenance Requests
  const requests = [
    {
      id: 1,
      type: "Corrective",
      equipment: "Office Printer-A2",
      subject: "Paper Jam Issue",
      status: "New",
      priority: "High",
      scheduledDate: "2025-01-15",
    },
    {
      id: 2,
      type: "Preventive",
      equipment: "CNC Machine-01",
      subject: "Monthly Maintenance",
      status: "In Progress",
      priority: "Medium",
      scheduledDate: "2025-01-20",
    },
    {
      id: 3,
      type: "Corrective",
      equipment: "HVAC Unit-3",
      subject: "Filter Replacement",
      status: "New",
      priority: "Medium",
      scheduledDate: "2025-01-18",
    },
    {
      id: 4,
      type: "Preventive",
      equipment: "Delivery Vehicle-F150",
      subject: "Oil Change",
      status: "Repaired",
      priority: "Low",
      scheduledDate: "2025-01-10",
    },
  ]

  // Kanban columns
  const kanbanColumns = [
    { name: "New", status: "New", color: "bg-blue-500" },
    { name: "In Progress", status: "In Progress", color: "bg-yellow-500" },
    { name: "Repaired", status: "Repaired", color: "bg-green-500" },
    { name: "Scrap", status: "Scrap", color: "bg-red-500" },
  ]

  // Chart data
  const healthTrendData = [
    { month: "Dec", avg: 72 },
    { month: "Jan", avg: 75 },
    { month: "Feb", avg: 78 },
    { month: "Mar", avg: 81 },
  ]

  const requestDistribution = [
    { name: "Corrective", value: 45, fill: "hsl(var(--color-destructive))" },
    { name: "Preventive", value: 40, fill: "hsl(var(--color-primary))" },
    { name: "Scrap", value: 15, fill: "hsl(var(--color-muted))" },
  ]

  const teamWorkload = [
    { name: "Mechanics", requests: 8 },
    { name: "IT Support", requests: 5 },
    { name: "Fleet Maintenance", requests: 3 },
    { name: "Electricians", requests: 6 },
  ]

  const getHealthColor = (health: number) => {
    if (health >= 80) return "bg-green-500"
    if (health >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Repaired":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Scrap":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                G
              </div>
              <h1 className="text-xl font-bold hidden sm:inline">GearGuard</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" className="text-sm">
                Equipment
              </Button>
              <Button variant="ghost" className="text-sm">
                Teams
              </Button>
              <Button variant="ghost" className="text-sm">
                Maintenance
              </Button>
              <Button variant="ghost" className="text-sm">
                Reports
              </Button>
            </nav>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden bg-transparent"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2 border-t border-border pt-4">
              <Button variant="ghost" className="w-full justify-start text-sm">
                Equipment
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                Teams
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                Maintenance
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                Reports
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Wrench className="h-4 w-4 text-primary" />
                Total Equipment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{equipment.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Active assets</p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                At Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{equipment.filter((e) => e.health < 50).length}</div>
              <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4 text-accent" />
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{requests.filter((r) => r.status === "New").length}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting assignment</p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-primary" />
                Active Teams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{teams.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Maintenance teams</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-muted">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Equipment Health Status</CardTitle>
                  <CardDescription>Current health scores by equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={equipment} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        className="text-xs fill-muted-foreground"
                      />
                      <YAxis className="text-xs fill-muted-foreground" domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--color-card))",
                          border: "1px solid hsl(var(--color-border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Bar dataKey="health" fill="hsl(var(--color-primary))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Request Status Distribution</CardTitle>
                  <CardDescription>Maintenance requests by type</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={requestDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={80}
                      >
                        {requestDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--color-card))",
                          border: "1px solid hsl(var(--color-border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-border">
              <CardHeader>
                <CardTitle>Recent Maintenance Requests</CardTitle>
                <CardDescription>Latest equipment requests across all teams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.slice(0, 3).map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm">{request.subject}</h4>
                          <Badge variant="outline" className="text-xs">
                            {request.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{request.equipment}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        <Badge variant="secondary" className="text-xs">
                          {request.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Equipment Tab */}
          <TabsContent value="equipment" className="space-y-4">
            <div className="space-y-4">
              {equipment.map((item) => (
                <Card
                  key={item.id}
                  className="border border-border overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col gap-4 sm:gap-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <Badge variant="outline">{item.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.serial} • {item.category} • {item.team}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Health Score</span>
                          <span className="text-sm font-bold">{item.health}%</span>
                        </div>
                        <Progress value={item.health} className="h-2" />
                      </div>
                      <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                        View Maintenance History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Kanban Tab */}
          <TabsContent value="kanban" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {kanbanColumns.map((column) => (
                <div key={column.status} className="space-y-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/50">
                    <div className={`h-3 w-3 rounded-full ${column.color}`} />
                    <h3 className="font-semibold text-sm">{column.name}</h3>
                    <span className="ml-auto text-xs bg-muted px-2 py-1 rounded font-medium">
                      {requests.filter((r) => r.status === column.status).length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {requests
                      .filter((r) => r.status === column.status)
                      .map((request) => (
                        <Card
                          key={request.id}
                          className="border border-border cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
                        >
                          <CardContent className="pt-4">
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <h4 className="font-semibold text-sm">{request.subject}</h4>
                                <p className="text-xs text-muted-foreground">{request.equipment}</p>
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="secondary" className="text-xs">
                                  {request.type}
                                </Badge>
                                <Badge
                                  className={`text-xs ${request.priority === "High" ? "bg-red-600" : request.priority === "Medium" ? "bg-yellow-600" : "bg-blue-600"} text-white`}
                                >
                                  {request.priority}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{request.scheduledDate}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((team) => (
                <Card key={team.id} className="border border-border">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">{team.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Team Members</span>
                        <span className="text-lg font-bold">{team.members}</span>
                      </div>
                      <Progress value={(team.members / 5) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Active Requests</span>
                        <span className="text-lg font-bold">{team.activeRequests}</span>
                      </div>
                      <Progress value={(team.activeRequests / 5) * 100} className="h-2" />
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      Manage Team
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Health Score Trend</CardTitle>
                  <CardDescription>Average equipment health over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={healthTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                      <YAxis className="text-xs fill-muted-foreground" domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--color-card))",
                          border: "1px solid hsl(var(--color-border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="avg"
                        stroke="hsl(var(--color-primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--color-primary))", r: 5 }}
                        name="Average Health %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>Team Workload Distribution</CardTitle>
                  <CardDescription>Active maintenance requests by team</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={teamWorkload} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        className="text-xs fill-muted-foreground"
                      />
                      <YAxis className="text-xs fill-muted-foreground" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--color-card))",
                          border: "1px solid hsl(var(--color-border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Bar dataKey="requests" fill="hsl(var(--color-accent))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
