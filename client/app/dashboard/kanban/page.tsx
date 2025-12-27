"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  GripVertical, 
  Clock, 
  Search, 
  Plus, 
  Calendar, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Tag,
  MessageSquare
} from "lucide-react"
import { useState } from "react"

// --- Interfaces ---

interface KanbanCard {
  id: string
  subject: string
  description: string
  equipment: string
  priority: "critical" | "high" | "medium" | "low"
  slaHours: number
  assignee: string
  assigneeAvatar: string
  createdDate: string
  comments: number
}

interface ColumnCards {
  [key: string]: KanbanCard[]
}

// --- Mock Data ---

const initialCards: ColumnCards = {
  new: [
    {
      id: "1",
      subject: "Pump Assembly Noise",
      description: "Unusual grinding noise detected during startup sequence. Vibration analysis suggests bearing wear.",
      equipment: "Pump Assembly B-456",
      priority: "critical",
      slaHours: 4,
      assignee: "Alex M.",
      assigneeAvatar: "AM",
      createdDate: "2024-01-15",
      comments: 3
    },
    {
      id: "2",
      subject: "Motor Unit Overheating",
      description: "Thermal sensors triggered warning at 85°C. Needs coolant system check.",
      equipment: "Motor Unit A-123",
      priority: "high",
      slaHours: 8,
      assignee: "Sarah J.",
      assigneeAvatar: "SJ",
      createdDate: "2024-01-14",
      comments: 1
    },
  ],
  inProgress: [
    {
      id: "3",
      subject: "Conveyor Belt Alignment",
      description: "Belt drifting to the left on sector 4. Rollers need adjustment.",
      equipment: "Conveyor Belt C-789",
      priority: "high",
      slaHours: 6,
      assignee: "Mike D.",
      assigneeAvatar: "MD",
      createdDate: "2024-01-13",
      comments: 5
    },
    {
      id: "4",
      subject: "Hydraulic Cylinder Repair",
      description: "Seal leakage observed. Parts ordered, awaiting delivery.",
      equipment: "Hydraulic Cylinder D-012",
      priority: "medium",
      slaHours: 24,
      assignee: "Alex M.",
      assigneeAvatar: "AM",
      createdDate: "2024-01-12",
      comments: 0
    },
  ],
  repaired: [
    {
      id: "5",
      subject: "Control Panel Reset",
      description: "Software glitch caused deadlock. Hard reset performed and firmware updated.",
      equipment: "Control Panel E-345",
      priority: "medium",
      slaHours: 12,
      assignee: "Sarah J.",
      assigneeAvatar: "SJ",
      createdDate: "2024-01-10",
      comments: 2
    },
  ],
  scrap: [
    {
      id: "6",
      subject: "Old Motor Unit Disposal",
      description: "Unit beyond economical repair. Scheduled for recycling.",
      equipment: "Motor Unit G-999",
      priority: "low",
      slaHours: 48,
      assignee: "Mike D.",
      assigneeAvatar: "MD",
      createdDate: "2024-01-08",
      comments: 0
    },
  ],
}

const columnConfig = [
  { key: "new", label: "To Do", color: "border-t-4 border-t-slate-400" },
  { key: "inProgress", label: "In Progress", color: "border-t-4 border-t-blue-500" },
  { key: "repaired", label: "Repaired / QA", color: "border-t-4 border-t-emerald-500" },
  { key: "scrap", label: "Scrap / Hold", color: "border-t-4 border-t-rose-500" },
]

export default function KanbanPage() {
  const [cards, setCards] = useState<ColumnCards>(initialCards)
  const [draggedCard, setDraggedCard] = useState<{ cardId: string; fromColumn: string } | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null)

  // --- Drag & Drop Logic ---

  const handleDragStart = (e: React.DragEvent, cardId: string, columnKey: string) => {
    setDraggedCard({ cardId, fromColumn: columnKey })
    // Slight delay to allow the ghost image to form before hiding the original
    setTimeout(() => {
        const target = e.target as HTMLElement;
        target.classList.add('opacity-50', 'grayscale');
    }, 0);
  }

  const handleDragEnd = (e: React.DragEvent) => {
     const target = e.target as HTMLElement;
     target.classList.remove('opacity-50', 'grayscale');
     setDraggedCard(null);
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (toColumn: string) => {
    if (!draggedCard) return

    const { cardId, fromColumn } = draggedCard

    if (fromColumn === toColumn) {
      setDraggedCard(null)
      return
    }

    const card = cards[fromColumn].find((c) => c.id === cardId)
    if (!card) return

    setCards({
      ...cards,
      [fromColumn]: cards[fromColumn].filter((c) => c.id !== cardId),
      [toColumn]: [...cards[toColumn], card],
    })

    setDraggedCard(null)
  }

  // --- Visual Helpers ---

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800"
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800"
      case "medium":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
    }
  }

  const getSLAColor = (hours: number) => {
    if (hours <= 4) return "text-rose-600 dark:text-rose-400 font-bold"
    if (hours <= 12) return "text-orange-600 dark:text-orange-400"
    return "text-muted-foreground"
  }

  return (
    <DashboardLayout>
      <div className="relative h-[calc(100vh-2rem)] flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Maintenance Board</h1>
            <p className="text-muted-foreground mt-1">Drag and drop tasks to update status.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                    placeholder="Filter tasks..." 
                    className="pl-10" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <Button>
                <Plus className="w-4 h-4 mr-2" /> New Task
             </Button>
          </div>
        </div>

        {/* Board Container */}
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex h-full min-w-max gap-6">
            {columnConfig.map((column) => {
              // Filter logic applied per column
              const filteredCards = cards[column.key].filter(c => 
                c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.equipment.toLowerCase().includes(searchTerm.toLowerCase())
              );

              return (
                <div key={column.key} className="w-[320px] flex flex-col h-full rounded-xl bg-muted/30 border border-border/50">
                  
                  {/* Column Header */}
                  <div className={`p-4 bg-card rounded-t-xl border-b border-border shadow-sm flex items-center justify-between ${column.color}`}>
                    <span className="font-semibold text-sm">{column.label}</span>
                    <Badge variant="secondary" className="rounded-md px-2 min-w-[1.5rem] justify-center">
                        {cards[column.key].length}
                    </Badge>
                  </div>

                  {/* Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(column.key)}
                    className="flex-1 p-3 space-y-3 overflow-y-auto"
                  >
                    {filteredCards.map((card) => (
                      <div
                        key={card.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, card.id, column.key)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedCard(card)}
                        className="group bg-card hover:bg-card/80 border border-border rounded-lg p-3 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200"
                      >
                        {/* Card Header: Labels */}
                        <div className="flex justify-between items-start mb-2">
                           <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 border ${getPriorityStyles(card.priority)}`}>
                              {card.priority}
                           </Badge>
                           <GripVertical className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
                        </div>

                        {/* Content */}
                        <p className="text-sm font-semibold leading-tight mb-1 group-hover:text-primary transition-colors">
                            {card.subject}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
                            {card.equipment}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{card.assigneeAvatar}</AvatarFallback>
                                </Avatar>
                                {card.comments > 0 && (
                                    <span className="flex items-center text-xs text-muted-foreground gap-1">
                                        <MessageSquare className="w-3 h-3" /> {card.comments}
                                    </span>
                                )}
                            </div>
                            <div className={`flex items-center gap-1 text-xs ${getSLAColor(card.slaHours)}`}>
                                <Clock className="w-3 h-3" />
                                <span>{card.slaHours}h</span>
                            </div>
                        </div>
                      </div>
                    ))}
                    
                    {filteredCards.length === 0 && (
                        <div className="h-24 flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-lg text-muted-foreground text-xs">
                           <span>No tasks</span>
                        </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Slide-Over Drawer Details */}
        {selectedCard && (
            <>
                <div 
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                    onClick={() => setSelectedCard(null)}
                />
                <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] bg-card border-l shadow-2xl p-6 overflow-y-auto flex flex-col transition-transform animate-in slide-in-from-right duration-300">
                    
                    {/* Drawer Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="space-y-1">
                             <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="uppercase tracking-wider text-[10px]">
                                    {selectedCard.id}
                                </Badge>
                                <Badge variant="outline" className={`capitalize ${getPriorityStyles(selectedCard.priority)}`}>
                                    {selectedCard.priority} Priority
                                </Badge>
                             </div>
                             <h2 className="text-xl font-bold">{selectedCard.subject}</h2>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedCard(null)}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Drawer Body */}
                    <div className="space-y-8 flex-1">
                        
                        {/* Main Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><Tag className="w-3 h-3"/> Equipment</span>
                                <p className="text-sm font-medium">{selectedCard.equipment}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><User className="w-3 h-3"/> Assignee</span>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-5 w-5">
                                        <AvatarFallback className="text-[10px]">{selectedCard.assigneeAvatar}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-sm font-medium">{selectedCard.assignee}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3"/> Created</span>
                                <p className="text-sm font-medium">{selectedCard.createdDate}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3"/> SLA Remaining</span>
                                <p className={`text-sm font-medium ${getSLAColor(selectedCard.slaHours)}`}>{selectedCard.slaHours} Hours</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-sm font-semibold mb-2">Description</h3>
                            <div className="p-3 bg-muted/30 rounded-lg border border-border text-sm leading-relaxed">
                                {selectedCard.description}
                            </div>
                        </div>

                         {/* Actions Placeholder */}
                         <div className="pt-4 border-t border-border space-y-3">
                             <h3 className="text-sm font-semibold">Actions</h3>
                             <div className="flex gap-2">
                                 <Button className="flex-1">Mark Complete</Button>
                                 <Button variant="outline" className="flex-1">Add Note</Button>
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