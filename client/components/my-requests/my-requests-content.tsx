"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  MoreHorizontal,
  FileText,
  Calendar,
  User,
  X,
  MessageSquare
} from "lucide-react"
import { useState } from "react"

// --- Types ---

interface RequestUpdate {
  date: string
  message: string
  author: string
}

interface MaintenanceRequest {
  id: string
  subject: string
  description: string
  equipment: string
  priority: "low" | "medium" | "high" | "critical"
  status: "pending" | "assigned" | "in-progress" | "completed"
  requestDate: string
  assignedTeam: string
  technician: string
  technicianAvatar: string
  progress: number
  updates: RequestUpdate[]
}

// --- Mock Data ---

const myRequests: MaintenanceRequest[] = [
  {
    id: "REQ-2024-001",
    subject: "Motor Unit Overheating",
    description: "The motor unit is consistently running above 85°C. Thermal cutoff triggers every 2 hours.",
    equipment: "Motor Unit A-123",
    priority: "high",
    status: "in-progress",
    requestDate: "2024-01-10",
    assignedTeam: "Team Alpha",
    technician: "John S.",
    technicianAvatar: "JS",
    progress: 65,
    updates: [
        { date: "2024-01-10 09:00", message: "Request received and assigned to Team Alpha.", author: "System" },
        { date: "2024-01-11 14:00", message: "Initial inspection completed. Ordering replacement coolant pump.", author: "John S." },
    ]
  },
  {
    id: "REQ-2024-002",
    subject: "Pump Assembly Noise",
    description: "Loud grinding noise coming from the main bearing housing.",
    equipment: "Pump Assembly B-456",
    priority: "critical",
    status: "assigned",
    requestDate: "2024-01-12",
    assignedTeam: "Team Beta",
    technician: "Sarah J.",
    technicianAvatar: "SJ",
    progress: 20,
    updates: [
        { date: "2024-01-12 10:30", message: "Request flagged as Critical. Technician dispatched.", author: "System" },
    ]
  },
  {
    id: "REQ-2024-003",
    subject: "Conveyor Belt Maintenance",
    description: "Routine tension adjustment and lubrication.",
    equipment: "Conveyor Belt C-789",
    priority: "medium",
    status: "completed",
    requestDate: "2024-01-05",
    assignedTeam: "Team Gamma",
    technician: "Mike D.",
    technicianAvatar: "MD",
    progress: 100,
    updates: [
        { date: "2024-01-05 08:00", message: "Work started.", author: "Mike D." },
        { date: "2024-01-05 11:00", message: "Maintenance completed successfully. Belt tension set to spec.", author: "Mike D." },
    ]
  },
  {
    id: "REQ-2024-004",
    subject: "Control Panel Update",
    description: "Firmware update required for the new HMI interface.",
    equipment: "Control Panel E-345",
    priority: "low",
    status: "pending",
    requestDate: "2024-01-14",
    assignedTeam: "Unassigned",
    technician: "N/A",
    technicianAvatar: "",
    progress: 0,
    updates: [
        { date: "2024-01-14 09:15", message: "Request submitted.", author: "You" },
    ]
  },
]

// --- Helper Functions ---

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical": return "text-rose-600 bg-rose-100 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800"
    case "high": return "text-orange-600 bg-orange-100 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800"
    case "medium": return "text-blue-600 bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
    default: return "text-slate-600 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "text-emerald-600 bg-emerald-100 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
    case "in-progress": return "text-blue-600 bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
    case "assigned": return "text-purple-600 bg-purple-100 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800"
    default: return "text-slate-600 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
  }
}

const getProgressBarColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-500"
      case "in-progress": return "bg-blue-500"
      case "assigned": return "bg-purple-500"
      default: return "bg-slate-300"
    }
}

export function MyRequestsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null)

  const filteredRequests = myRequests.filter((req) => {
    const matchesSearch =
      req.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || req.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: myRequests.length,
    pending: myRequests.filter((r) => r.status === "pending").length,
    inProgress: myRequests.filter((r) => r.status === "in-progress" || r.status === "assigned").length,
    completed: myRequests.filter((r) => r.status === "completed").length,
  }

  return (
    <DashboardLayout>
      <div className="relative min-h-screen space-y-8 pb-10">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Requests</h1>
          <p className="text-muted-foreground mt-2">Track the status and history of your maintenance tickets.</p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-500">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <ArrowRight className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{stats.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <Card className="min-h-[500px]">
          <CardHeader className="border-b border-border/50">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              
              {/* Filter Tabs */}
              <div className="flex bg-muted p-1 rounded-lg">
                {["all", "pending", "in-progress", "completed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                      filterStatus === status 
                      ? "bg-background text-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  className="pl-9 bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    onClick={() => setSelectedRequest(request)}
                    className="group flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-muted/30 transition cursor-pointer gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-muted-foreground">{request.id}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{request.requestDate}</span>
                      </div>
                      <h4 className="font-semibold text-base group-hover:text-primary transition-colors">{request.subject}</h4>
                      <p className="text-sm text-muted-foreground truncate mt-1">{request.equipment}</p>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8 shrink-0">
                        {/* Progress Bar (Visual only) */}
                        <div className="hidden md:block w-32 space-y-1.5">
                            <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-semibold">
                                <span>Progress</span>
                                <span>{request.progress}%</span>
                            </div>
                            <Progress value={request.progress} className="h-1.5 bg-secondary" indicatorClassName={getProgressBarColor(request.status)} />
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-2 min-w-[140px] justify-end">
                            <Badge variant="outline" className={`capitalize ${getPriorityColor(request.priority)}`}>
                                {request.priority}
                            </Badge>
                            <Badge variant="outline" className={`capitalize ${getStatusColor(request.status)}`}>
                                {request.status}
                            </Badge>
                        </div>
                        
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                    <p>No requests found matching your filters.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Slide-Over Drawer Details */}
        {selectedRequest && (
            <>
                {/* Backdrop */}
                <div 
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                    onClick={() => setSelectedRequest(null)}
                />
                
                {/* Drawer */}
                <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] bg-card border-l shadow-2xl transition-transform animate-in slide-in-from-right duration-300 flex flex-col">
                    
                    {/* Drawer Header */}
                    <div className="p-6 border-b border-border bg-muted/20">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="bg-background">{selectedRequest.id}</Badge>
                                    <Badge variant="outline" className={`capitalize ${getStatusColor(selectedRequest.status)}`}>{selectedRequest.status}</Badge>
                                </div>
                                <h2 className="text-xl font-bold">{selectedRequest.subject}</h2>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedRequest(null)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Drawer Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        
                        {/* Description */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-foreground">Description</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg border border-border">
                                {selectedRequest.description}
                            </p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><FileText className="w-3 h-3"/> Equipment</span>
                                <p className="text-sm font-medium">{selectedRequest.equipment}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Priority</span>
                                <p className={`text-sm font-medium capitalize ${
                                    selectedRequest.priority === 'critical' ? 'text-rose-600' : 
                                    selectedRequest.priority === 'high' ? 'text-orange-600' : 'text-foreground'
                                }`}>
                                    {selectedRequest.priority}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><User className="w-3 h-3"/> Technician</span>
                                <div className="flex items-center gap-2">
                                    {selectedRequest.technicianAvatar ? (
                                        <Avatar className="h-5 w-5">
                                            <AvatarFallback className="text-[9px] bg-primary/10 text-primary">{selectedRequest.technicianAvatar}</AvatarFallback>
                                        </Avatar>
                                    ) : (
                                        <div className="h-5 w-5 rounded-full bg-muted" />
                                    )}
                                    <p className="text-sm font-medium">{selectedRequest.technician}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3"/> Requested</span>
                                <p className="text-sm font-medium">{selectedRequest.requestDate}</p>
                            </div>
                        </div>

                        {/* Timeline / Updates */}
                        <div className="space-y-4 pt-4 border-t border-border">
                            <h3 className="text-sm font-semibold flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Timeline Updates
                            </h3>
                            <div className="relative space-y-6 pl-2">
                                {/* Vertical Line */}
                                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />
                                
                                {selectedRequest.updates.map((update, idx) => (
                                    <div key={idx} className="relative flex gap-4">
                                        <div className="w-4 h-4 rounded-full bg-background border-2 border-primary z-10 mt-1 shrink-0" />
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm">{update.message}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {update.author} • {update.date}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-border bg-background flex gap-3">
                        <Button className="flex-1" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-2" /> Message Tech
                        </Button>
                        {selectedRequest.status === 'completed' ? (
                             <Button className="flex-1" variant="default">Reopen Ticket</Button>
                        ) : (
                             <Button className="flex-1" variant="destructive">Cancel Request</Button>
                        )}
                    </div>

                </div>
            </>
        )}

      </div>
    </DashboardLayout>
  )
}