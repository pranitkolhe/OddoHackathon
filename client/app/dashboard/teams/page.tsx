"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  Search, 
  MoreHorizontal, 
  TrendingUp, 
  Briefcase,
  X,
  Mail,
  Phone
} from "lucide-react"
import { useState } from "react"

interface TeamMember {
  name: string
  role: string
  avatar: string
  status: "available" | "busy" | "offline"
}

interface Team {
  id: string
  name: string
  members: number
  activeRequests: number
  completedThisMonth: number
  avgResponseTime: string
  lead: string
  leadAvatar: string
  email: string
  teamMembers: TeamMember[]
}

// Extended Mock Data
const teamsData: Team[] = [
  {
    id: "1",
    name: "Team Alpha",
    members: 5,
    activeRequests: 3,
    completedThisMonth: 12,
    avgResponseTime: "2.5h",
    lead: "John Smith",
    leadAvatar: "JS",
    email: "alpha@company.com",
    teamMembers: [
        { name: "John Smith", role: "Lead Tech", avatar: "JS", status: "busy" },
        { name: "Alice Doe", role: "Technician", avatar: "AD", status: "available" },
        { name: "Bob Brown", role: "Technician", avatar: "BB", status: "available" },
    ]
  },
  {
    id: "2",
    name: "Team Beta",
    members: 6,
    activeRequests: 8, // High load
    completedThisMonth: 15,
    avgResponseTime: "2.0h",
    lead: "Sarah Johnson",
    leadAvatar: "SJ",
    email: "beta@company.com",
    teamMembers: [
        { name: "Sarah Johnson", role: "Lead Tech", avatar: "SJ", status: "busy" },
        { name: "Mike Ross", role: "Specialist", avatar: "MR", status: "busy" },
    ]
  },
  {
    id: "3",
    name: "Team Gamma",
    members: 4,
    activeRequests: 2,
    completedThisMonth: 10,
    avgResponseTime: "3.0h",
    lead: "Mike Davis",
    leadAvatar: "MD",
    email: "gamma@company.com",
    teamMembers: [
        { name: "Mike Davis", role: "Lead Tech", avatar: "MD", status: "available" },
    ]
  },
  {
    id: "4",
    name: "Team Delta",
    members: 7,
    activeRequests: 4,
    completedThisMonth: 18,
    avgResponseTime: "1.5h",
    lead: "Emily Chen",
    leadAvatar: "EC",
    email: "delta@company.com",
    teamMembers: []
  },
  {
    id: "5",
    name: "Team Epsilon",
    members: 5,
    activeRequests: 6,
    completedThisMonth: 14,
    avgResponseTime: "2.8h",
    lead: "Robert Wilson",
    leadAvatar: "RW",
    email: "epsilon@company.com",
    teamMembers: []
  },
  {
    id: "6",
    name: "Team Zeta",
    members: 4,
    activeRequests: 1,
    completedThisMonth: 8,
    avgResponseTime: "3.5h",
    lead: "Lisa Anderson",
    leadAvatar: "LA",
    email: "zeta@company.com",
    teamMembers: []
  },
]

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  const filteredTeams = teamsData.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.lead.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate load percentage (assuming max capacity of 10 tasks for visual)
  const getLoadPercentage = (requests: number) => Math.min((requests / 10) * 100, 100)
  
  const getLoadColor = (requests: number) => {
    if (requests >= 7) return "bg-rose-500" // High Load
    if (requests >= 4) return "bg-amber-500" // Medium Load
    return "bg-emerald-500" // Low Load
  }

  const getLoadBadge = (requests: number) => {
    if (requests >= 7) return <Badge variant="outline" className="bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800">High Load</Badge>
    if (requests >= 4) return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">Moderate</Badge>
    return <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">Optimal</Badge>
  }

  return (
    <DashboardLayout>
      <div className="relative min-h-screen space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Maintenance Teams</h1>
            <p className="text-muted-foreground mt-1">Overview of team performance and availability.</p>
          </div>
          <div className="w-full md:w-80 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search teams or leads..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <Card 
              key={team.id} 
              className={`group hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 ${
                 team.activeRequests >= 7 ? "border-l-rose-500" : 
                 team.activeRequests >= 4 ? "border-l-amber-500" : 
                 "border-l-emerald-500"
              }`}
              onClick={() => setSelectedTeam(team)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">{team.leadAvatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">{team.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">Lead: {team.lead}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-border/50 bg-secondary/20 rounded-lg p-2">
                  <div className="text-center border-r border-border/50 last:border-0">
                    <p className="text-xs text-muted-foreground">Members</p>
                    <p className="text-lg font-bold">{team.members}</p>
                  </div>
                  <div className="text-center border-r border-border/50 last:border-0">
                    <p className="text-xs text-muted-foreground">Done</p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{team.completedThisMonth}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Avg Time</p>
                    <p className="text-lg font-bold">{team.avgResponseTime}</p>
                  </div>
                </div>

                {/* Workload Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" /> Current Load
                    </span>
                    {getLoadBadge(team.activeRequests)}
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-500 ${getLoadColor(team.activeRequests)}`}
                        style={{ width: `${getLoadPercentage(team.activeRequests)}%` }}
                    />
                  </div>
                  <p className="text-xs text-right text-muted-foreground">
                    {team.activeRequests} active tasks
                  </p>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Slide-Over Drawer */}
        {selectedTeam && (
            <>
                {/* Backdrop */}
                <div 
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                    onClick={() => setSelectedTeam(null)}
                />
                
                {/* Drawer Content */}
                <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-card border-l shadow-2xl transition-transform duration-300 ease-in-out p-0 flex flex-col">
                    {/* Drawer Header */}
                    <div className="p-6 border-b border-border bg-muted/20">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-14 w-14 border-2 border-background shadow-sm">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">{selectedTeam.leadAvatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-xl font-bold">{selectedTeam.name}</h2>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Mail className="w-3 h-3" /> {selectedTeam.email}
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedTeam(null)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="flex gap-2">
                             <Button className="flex-1 h-9 text-xs" variant="default">Assign Task</Button>
                             <Button className="flex-1 h-9 text-xs" variant="outline"><Phone className="w-3 h-3 mr-2"/> Contact Lead</Button>
                        </div>
                    </div>

                    {/* Drawer Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        
                        {/* Performance Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" /> Performance Metrics
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg border border-border bg-card">
                                    <p className="text-sm text-muted-foreground">Efficiency Rate</p>
                                    <p className="text-2xl font-bold text-emerald-600">94%</p>
                                </div>
                                <div className="p-4 rounded-lg border border-border bg-card">
                                    <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                                    <p className="text-2xl font-bold text-blue-600">4.8/5</p>
                                </div>
                            </div>
                        </div>

                        {/* Team Members Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Users className="w-4 h-4" /> Team Members ({selectedTeam.members})
                                </h3>
                                <Button variant="link" size="sm" className="h-auto p-0 text-primary">View All</Button>
                            </div>
                            
                            <div className="space-y-3">
                                {selectedTeam.teamMembers.length > 0 ? (
                                    selectedTeam.teamMembers.map((member, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback className="text-xs bg-secondary">{member.avatar}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">{member.name}</p>
                                                    <p className="text-xs text-muted-foreground">{member.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${
                                                    member.status === 'available' ? 'bg-emerald-500' : 
                                                    member.status === 'busy' ? 'bg-amber-500' : 'bg-slate-300'
                                                }`} />
                                                <span className="text-xs text-muted-foreground capitalize">{member.status}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-6 text-muted-foreground text-sm border border-dashed rounded-lg">
                                        Members list loading...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )}
      </div>
    </DashboardLayout>
  )
}