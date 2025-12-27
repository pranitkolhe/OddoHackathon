"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

interface MaintenanceRequest {
  id: string
  subject: string
  equipment: string
  priority: "low" | "medium" | "high" | "critical"
  status: "pending" | "assigned" | "in-progress" | "completed"
  requestDate: string
  assignedTeam: string
  progress: number
}

const myRequests: MaintenanceRequest[] = [
  {
    id: "REQ-2024-001",
    subject: "Motor Unit Overheating",
    equipment: "Motor Unit A-123",
    priority: "high",
    status: "in-progress",
    requestDate: "2024-01-10",
    assignedTeam: "Team Alpha",
    progress: 65,
  },
  {
    id: "REQ-2024-002",
    subject: "Pump Assembly Noise",
    equipment: "Pump Assembly B-456",
    priority: "critical",
    status: "assigned",
    requestDate: "2024-01-12",
    assignedTeam: "Team Beta",
    progress: 20,
  },
  {
    id: "REQ-2024-003",
    subject: "Conveyor Belt Maintenance",
    equipment: "Conveyor Belt C-789",
    priority: "medium",
    status: "completed",
    requestDate: "2024-01-05",
    assignedTeam: "Team Gamma",
    progress: 100,
  },
  {
    id: "REQ-2024-004",
    subject: "Control Panel Update",
    equipment: "Control Panel E-345",
    priority: "low",
    status: "pending",
    requestDate: "2024-01-14",
    assignedTeam: "Unassigned",
    progress: 0,
  },
  {
    id: "REQ-2024-005",
    subject: "Transformer Inspection",
    equipment: "Transformer F-678",
    priority: "critical",
    status: "in-progress",
    requestDate: "2024-01-08",
    assignedTeam: "Team Epsilon",
    progress: 45,
  },
]

export function MyRequestsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredRequests = myRequests.filter((req) => {
    const matchesSearch =
      req.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || req.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-destructive/20 text-destructive border-destructive/30"
      case "high":
        return "bg-accent/20 text-accent border-accent/30"
      case "medium":
        return "bg-primary/20 text-primary border-primary/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-primary/20 text-primary border-primary/30"
      case "in-progress":
        return "bg-accent/20 text-accent border-accent/30"
      case "assigned":
        return "bg-secondary/20 text-secondary border-secondary/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const stats = {
    total: myRequests.length,
    pending: myRequests.filter((r) => r.status === "pending").length,
    inProgress: myRequests.filter((r) => r.status === "in-progress" || r.status === "assigned").length,
    completed: myRequests.filter((r) => r.status === "completed").length,
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Requests</h1>
          <p className="text-muted-foreground mt-2">Track your maintenance requests and their status</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, equipment, or subject..."
                  className="pl-10 bg-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {["all", "pending", "in-progress", "completed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 text-sm rounded-md transition ${
                      filterStatus === status ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="border border-border rounded-lg p-4 hover:bg-muted/50 transition space-y-3"
                >
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{request.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">{request.equipment}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getPriorityColor(request.priority)} border`}>
                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                      </Badge>
                      <Badge className={`${getStatusColor(request.status)} border`}>
                        {request.status.charAt(0).toUpperCase() + request.status.replace("-", " ").slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Request ID</p>
                      <p className="font-medium">{request.id}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Assigned Team</p>
                      <p className="font-medium">{request.assignedTeam}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Request Date</p>
                      <p className="font-medium">{request.requestDate}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{request.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-full rounded-full transition-all ${
                          request.progress === 100
                            ? "bg-primary"
                            : request.progress >= 50
                              ? "bg-accent"
                              : "bg-secondary"
                        }`}
                        style={{ width: `${request.progress}%` }}
                      />
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
