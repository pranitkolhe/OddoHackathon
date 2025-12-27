"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Factory, 
  Users, 
  Calendar, 
  X,
  ArrowRight
} from "lucide-react"
import { useState } from "react"

interface Equipment {
  id: string
  name: string
  serial: string
  department: string
  team: string
  health: number
  status: "healthy" | "warning" | "critical"
  lastMaintenance: string
}

const equipmentData: Equipment[] = [
  {
    id: "1",
    name: "Motor Unit A-123",
    serial: "MU-2023-001",
    department: "Production Line 1",
    team: "Team Alpha",
    health: 92,
    status: "healthy",
    lastMaintenance: "2024-01-10",
  },
  {
    id: "2",
    name: "Pump Assembly B-456",
    serial: "PA-2023-002",
    department: "Production Line 2",
    team: "Team Beta",
    health: 65,
    status: "warning",
    lastMaintenance: "2023-12-05",
  },
  {
    id: "3",
    name: "Conveyor Belt C-789",
    serial: "CB-2023-003",
    department: "Logistics Hub",
    team: "Team Gamma",
    health: 78,
    status: "warning",
    lastMaintenance: "2024-01-01",
  },
  {
    id: "4",
    name: "Hydraulic Cylinder D-012",
    serial: "HC-2023-004",
    department: "Assembly Station",
    team: "Team Delta",
    health: 45,
    status: "critical",
    lastMaintenance: "2023-11-15",
  },
  {
    id: "5",
    name: "Control Panel E-345",
    serial: "CP-2023-005",
    department: "Control Room",
    team: "Team Alpha",
    health: 88,
    status: "healthy",
    lastMaintenance: "2024-01-08",
  },
  {
    id: "6",
    name: "Transformer F-678",
    serial: "TR-2023-006",
    department: "Power Station",
    team: "Team Epsilon",
    health: 34,
    status: "critical",
    lastMaintenance: "2023-10-20",
  },
]

export function EquipmentContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)

  const filteredEquipment = equipmentData.filter(
    (eq) =>
      eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.serial.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Helper for Status Visuals
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800"
      case "warning":
        return "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800"
      case "critical":
        return "text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800"
      default:
        return "text-slate-600 bg-slate-100 border-slate-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="w-4 h-4 mr-1.5" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 mr-1.5" />
      case "critical":
        return <Zap className="w-4 h-4 mr-1.5" />
      default:
        return null
    }
  }

  // Helper for Health Bar Color
  const getHealthBarColor = (health: number) => {
    if (health >= 80) return "bg-emerald-500"
    if (health >= 60) return "bg-amber-500"
    return "bg-rose-500"
  }

  return (
    <DashboardLayout>
      <div className="relative min-h-screen space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Equipment</h1>
            <p className="text-muted-foreground mt-1">Manage operational status and maintenance.</p>
          </div>
          <div className="w-full md:w-96 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search equipment..."
              className="pl-10 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
          {filteredEquipment.map((equipment) => (
            <Card
              key={equipment.id}
              onClick={() => setSelectedEquipment(equipment)}
              className={`group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/50 cursor-pointer ${
                selectedEquipment?.id === equipment.id ? "ring-2 ring-primary border-transparent" : ""
              }`}
            >
              <CardHeader className="pb-3 space-y-0">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-base font-semibold leading-tight group-hover:text-primary transition-colors">
                      {equipment.name}
                    </CardTitle>
                    <CardDescription className="font-mono text-xs">
                      {equipment.serial}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`shrink-0 capitalize ${getStatusColor(equipment.status)}`}
                  >
                    {getStatusIcon(equipment.status)}
                    {equipment.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-5">
                {/* Health Indicator */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" /> Health Score
                    </span>
                    <span className={equipment.health >= 80 ? "text-emerald-600" : equipment.health >= 60 ? "text-amber-600" : "text-rose-600"}>
                      {equipment.health}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getHealthBarColor(equipment.health)}`}
                      style={{ width: `${equipment.health}%` }}
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1.5">
                      <Factory className="w-3 h-3" /> Location
                    </p>
                    <p className="font-medium truncate">{equipment.department}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground flex items-center gap-1.5">
                      <Users className="w-3 h-3" /> Team
                    </p>
                    <p className="font-medium truncate">{equipment.team}</p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2 flex items-center justify-between border-t border-border/50">
                   <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {equipment.lastMaintenance}
                   </span>
                   <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-transparent hover:text-primary p-0">
                     Details <ArrowRight className="w-3 h-3 ml-1" />
                   </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Slide-over Details Panel (Custom implementation to avoid dependencies) */}
        {selectedEquipment && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity"
              onClick={() => setSelectedEquipment(null)}
            />
            
            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-card border-l shadow-2xl transition-transform duration-300 ease-in-out p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold">Equipment Details</h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedEquipment(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-8">
                {/* Header Info */}
                <div className="space-y-2">
                  <Badge variant="outline" className={`mb-2 w-fit ${getStatusColor(selectedEquipment.status)}`}>
                    {getStatusIcon(selectedEquipment.status)}
                    {selectedEquipment.status.toUpperCase()}
                  </Badge>
                  <h3 className="text-2xl font-bold tracking-tight">{selectedEquipment.name}</h3>
                  <p className="text-sm font-mono text-muted-foreground">{selectedEquipment.serial}</p>
                </div>

                {/* Health Visualization */}
                <div className="p-4 rounded-lg bg-secondary/30 border border-border space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">System Health</span>
                    <span className="font-bold text-xl">{selectedEquipment.health}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-3 border border-border">
                    <div
                      className={`h-full rounded-full ${getHealthBarColor(selectedEquipment.health)}`}
                      style={{ width: `${selectedEquipment.health}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selectedEquipment.health < 60 
                      ? "Attention Needed: Efficiency below threshold." 
                      : "System operating within normal parameters."}
                  </p>
                </div>

                {/* Detailed Stats */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Specifications</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="flex items-center gap-2 text-sm">
                        <Factory className="w-4 h-4 text-muted-foreground" /> Department
                      </span>
                      <span className="font-medium text-sm">{selectedEquipment.department}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" /> Assigned Team
                      </span>
                      <span className="font-medium text-sm">{selectedEquipment.team}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" /> Last Service
                      </span>
                      <span className="font-medium text-sm">{selectedEquipment.lastMaintenance}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1">Schedule Maintenance</Button>
                  <Button variant="outline" className="flex-1">View Logs</Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}