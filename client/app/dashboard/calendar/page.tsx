"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2,
  Search,
  Plus,
  MoreHorizontal
} from "lucide-react"
import { useState } from "react"

// --- Types ---

interface ScheduledJob {
  id: string
  date: string
  time: string
  equipment: string
  type: "preventive" | "corrective" | "inspection"
  duration: string
  status: "scheduled" | "completed" | "cancelled" | "overdue"
  technician: string
}

// --- Mock Data ---

const scheduledJobs: ScheduledJob[] = [
  {
    id: "1",
    date: "2024-01-20",
    time: "09:00",
    equipment: "Motor Unit A-123",
    type: "preventive",
    duration: "2h",
    status: "completed",
    technician: "JD"
  },
  {
    id: "2",
    date: "2024-01-20",
    time: "14:00",
    equipment: "Pump Assembly B-456",
    type: "corrective",
    duration: "4h",
    status: "scheduled",
    technician: "SM"
  },
  {
    id: "3",
    date: "2024-01-21",
    time: "10:00",
    equipment: "Conveyor Belt C-789",
    type: "inspection",
    duration: "1h",
    status: "scheduled",
    technician: "JD"
  },
  {
    id: "4",
    date: "2024-01-22",
    time: "08:00",
    equipment: "Control Panel E-345",
    type: "preventive",
    duration: "3h",
    status: "overdue",
    technician: "AK"
  },
  {
    id: "5",
    date: "2024-01-23",
    time: "11:00",
    equipment: "Hydraulic Cylinder D-012",
    type: "corrective",
    duration: "5h",
    status: "scheduled",
    technician: "SM"
  },
  {
    id: "6",
    date: "2024-01-24",
    time: "13:00",
    equipment: "Transformer F-678",
    type: "inspection",
    duration: "2h",
    status: "scheduled",
    technician: "AK"
  },
  {
    id: "7",
    date: "2024-01-20",
    time: "16:30",
    equipment: "Safety Valve Check",
    type: "inspection",
    duration: "30m",
    status: "scheduled",
    technician: "JD"
  },
]

// --- Helper Functions ---

const getTypeColor = (type: string) => {
  switch (type) {
    case "preventive":
      return "text-blue-600 bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
    case "corrective":
      return "text-rose-600 bg-rose-100 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800"
    case "inspection":
      return "text-amber-600 bg-amber-100 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getTypeDotColor = (type: string) => {
    switch (type) {
      case "preventive": return "bg-blue-500"
      case "corrective": return "bg-rose-500"
      case "inspection": return "bg-amber-500"
      default: return "bg-slate-500"
    }
}

// --- Components ---

function CalendarGrid({ 
  currentDate, 
  selectedDate, 
  onSelectDate, 
  onPrevMonth, 
  onNextMonth 
}: { 
  currentDate: Date, 
  selectedDate: string, 
  onSelectDate: (d: string) => void,
  onPrevMonth: () => void,
  onNextMonth: () => void
}) {
  
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const monthDays = getDaysInMonth(currentDate)
  const firstDayOfWeek = getFirstDayOfMonth(currentDate)

  return (
    <Card className="h-full border-none shadow-none md:border md:shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </CardTitle>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" onClick={onPrevMonth} className="h-8 w-8">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onNextMonth} className="h-8 w-8">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Day Labels */}
        <div className="grid grid-cols-7 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2 uppercase tracking-wide">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 auto-rows-[1fr]">
          {/* Empty cells for previous month */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Days */}
          {Array.from({ length: monthDays }).map((_, i) => {
            const day = i + 1
            const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            // Adjust for timezone offset to compare strings correctly
            const dateStr = new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
            
            const jobsOnDay = scheduledJobs.filter((job) => job.date === dateStr)
            const isToday = new Date().toISOString().split("T")[0] === dateStr
            const isSelected = selectedDate === dateStr

            return (
              <div
                key={day}
                onClick={() => onSelectDate(dateStr)}
                className={`
                  relative aspect-square rounded-xl border p-2 flex flex-col items-start justify-between cursor-pointer transition-all duration-200
                  ${isSelected 
                    ? "ring-2 ring-primary border-transparent bg-primary/5" 
                    : "border-border hover:border-primary/50 hover:bg-muted/50"}
                  ${isToday ? "bg-accent/10" : "bg-card"}
                `}
              >
                <span className={`text-sm font-medium ${isToday ? "text-primary font-bold" : ""}`}>
                    {day}
                </span>
                
                {/* Job Indicators */}
                <div className="flex gap-1 flex-wrap content-end w-full">
                  {jobsOnDay.slice(0, 4).map((job) => (
                    <div
                      key={job.id}
                      className={`h-1.5 w-1.5 rounded-full ${getTypeDotColor(job.type)}`}
                    />
                  ))}
                  {jobsOnDay.length > 4 && (
                    <span className="text-[9px] text-muted-foreground leading-none">+</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 15)) // Jan 2024
  const [selectedDate, setSelectedDate] = useState<string>("2024-01-20")

  const jobsOnSelectedDate = scheduledJobs.filter((job) => job.date === selectedDate)
  
  // Sort by time
  jobsOnSelectedDate.sort((a, b) => a.time.localeCompare(b.time))

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 h-[calc(100vh-2rem)] flex flex-col">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
            <p className="text-muted-foreground mt-1">Manage preventive and corrective maintenance tasks.</p>
          </div>
          <Button>
             <Plus className="w-4 h-4 mr-2" /> Schedule Job
          </Button>
        </div>

        {/* Content Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden pb-4">
          
          {/* Left: Calendar (8 Cols) */}
          <div className="lg:col-span-8 overflow-y-auto">
            <CalendarGrid 
                currentDate={currentDate} 
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
            />
          </div>

          {/* Right: Daily Detail Panel (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-1">
            
            {/* Selected Date Summary */}
            <Card className="flex-1 flex flex-col">
              <CardHeader className="border-b border-border bg-muted/20 pb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-base">
                            {new Date(selectedDate).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                            {jobsOnSelectedDate.length} jobs scheduled
                        </p>
                    </div>
                    {jobsOnSelectedDate.length > 0 && (
                        <Badge variant="outline" className="bg-background">
                            {Math.round(jobsOnSelectedDate.reduce((acc, curr) => acc + parseInt(curr.duration), 0))}h Total Load
                        </Badge>
                    )}
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                {jobsOnSelectedDate.length > 0 ? (
                  jobsOnSelectedDate.map((job) => (
                    <div 
                        key={job.id} 
                        className="group relative flex flex-col gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/30 hover:border-primary/30 transition-all duration-200 shadow-sm"
                    >
                      {/* Job Header */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="font-mono text-xs">
                                {job.time}
                            </Badge>
                            <Badge variant="outline" className={`capitalize ${getTypeColor(job.type)}`}>
                                {job.type}
                            </Badge>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Job Details */}
                      <div>
                        <h4 className="font-semibold text-sm">{job.equipment}</h4>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {job.duration}
                            </span>
                            <span className="flex items-center gap-1">
                                <Avatar className="h-4 w-4">
                                    <AvatarFallback className="text-[8px] bg-primary text-primary-foreground">{job.technician}</AvatarFallback>
                                </Avatar> Tech {job.technician}
                            </span>
                        </div>
                      </div>

                      {/* Status Footer */}
                      <div className="pt-3 mt-1 border-t border-border/50 flex justify-between items-center">
                         <div className="flex items-center gap-1.5 text-xs font-medium">
                            {job.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                            {job.status === 'overdue' && <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />}
                            {job.status === 'scheduled' && <Wrench className="w-3.5 h-3.5 text-muted-foreground" />}
                            <span className={`capitalize ${
                                job.status === 'completed' ? 'text-emerald-600' : 
                                job.status === 'overdue' ? 'text-rose-600' : 'text-muted-foreground'
                            }`}>
                                {job.status}
                            </span>
                         </div>
                         {job.status === 'scheduled' && (
                             <Button variant="link" size="sm" className="h-auto p-0 text-primary text-xs">Reschedule</Button>
                         )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 opacity-60">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <CalendarIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">No maintenance scheduled</p>
                    <p className="text-xs text-muted-foreground">Enjoy the downtime or schedule a new task.</p>
                    <Button variant="outline" size="sm" className="mt-2">Add Task</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Summary (Small Card) */}
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-primary">Next 7 Days Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-2xl font-bold">12</span>
                            <span className="text-xs text-muted-foreground ml-1">jobs pending</span>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-8 h-1 bg-blue-500 rounded-full" title="Preventive" />
                            <div className="w-3 h-1 bg-rose-500 rounded-full" title="Corrective" />
                            <div className="w-5 h-1 bg-amber-500 rounded-full" title="Inspection" />
                        </div>
                    </div>
                </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}