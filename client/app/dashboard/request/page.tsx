"use client"

import type React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  Camera, 
  Info, 
  Phone,
  Clock,
  ArrowRight,
  FileText
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock Equipment List
const equipmentOptions = [
  "Motor Unit A-123",
  "Pump Assembly B-456",
  "Conveyor Belt C-789",
  "Hydraulic Cylinder D-012",
  "Control Panel E-345",
  "Transformer F-678",
]

export default function RaiseRequestPage() {
  const [formData, setFormData] = useState({
    subject: "",
    equipment: "",
    description: "",
    priority: "medium",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successId, setSuccessId] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.subject || !formData.equipment || !formData.description) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newId = `REQ-${Math.floor(Math.random() * 10000)}`
      setSuccessId(newId)
      setFormData({ subject: "", equipment: "", description: "", priority: "medium" })
      setIsSubmitting(false)
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessId(null), 5000)
    }, 1500)
  }

  // Helper for priority visual
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
        case 'critical': return <span className="flex items-center gap-2 text-rose-600"><span className="w-2 h-2 rounded-full bg-rose-500"/>Critical</span>
        case 'high': return <span className="flex items-center gap-2 text-orange-600"><span className="w-2 h-2 rounded-full bg-orange-500"/>High</span>
        case 'medium': return <span className="flex items-center gap-2 text-blue-600"><span className="w-2 h-2 rounded-full bg-blue-500"/>Medium</span>
        case 'low': return <span className="flex items-center gap-2 text-slate-600"><span className="w-2 h-2 rounded-full bg-slate-500"/>Low</span>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Raise Maintenance Request</h1>
          <p className="text-muted-foreground mt-2">Submit a ticket for equipment repair, inspection, or general maintenance.</p>
        </div>

        {/* Success Notification */}
        {successId && (
          <Alert className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Request Submitted Successfully</AlertTitle>
            <AlertDescription>
              Your ticket ID is <strong>{successId}</strong>. The maintenance team has been notified.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Ticket Details</CardTitle>
                    <CardDescription>Please provide as much detail as possible to help us resolve the issue faster.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Subject Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Issue Subject <span className="text-rose-500">*</span>
                            </label>
                            <Input
                                placeholder="e.g., Conveyor Belt Slipping"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="bg-background"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Equipment Select */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Affected Equipment <span className="text-rose-500">*</span>
                                </label>
                                <Select
                                    value={formData.equipment}
                                    onValueChange={(value) => setFormData({ ...formData, equipment: value })}
                                >
                                    <SelectTrigger className="bg-background">
                                        <SelectValue placeholder="Select equipment..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {equipmentOptions.map((equipment) => (
                                        <SelectItem key={equipment} value={equipment}>
                                            {equipment}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Priority Select */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Urgency Level
                                </label>
                                <Select
                                    value={formData.priority}
                                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                                >
                                    <SelectTrigger className="bg-background">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">{getPriorityBadge('low')}</SelectItem>
                                        <SelectItem value="medium">{getPriorityBadge('medium')}</SelectItem>
                                        <SelectItem value="high">{getPriorityBadge('high')}</SelectItem>
                                        <SelectItem value="critical">{getPriorityBadge('critical')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                Detailed Description <span className="text-rose-500">*</span>
                            </label>
                            <Textarea
                                placeholder="Describe the sound, error codes, or specific behavior..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="bg-background min-h-[150px] resize-none"
                            />
                        </div>

                        {/* File Upload Placeholder */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Attachments (Optional)</label>
                            <div className="border-2 border-dashed border-border rounded-lg p-6 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center">
                                <div className="p-3 bg-secondary rounded-full mb-3">
                                    <Camera className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                                <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or PDF (max. 10MB)</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" className="w-full md:w-auto min-w-[150px]" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>Processing...</>
                                ) : (
                                    <>Submit Request <ArrowRight className="w-4 h-4 ml-2" /></>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            
            {/* Context Card 1: Emergency */}
            <Card className="border-rose-200 bg-rose-50 dark:bg-rose-900/10 dark:border-rose-900">
                <CardHeader className="pb-3">
                    <CardTitle className="text-rose-700 dark:text-rose-400 flex items-center gap-2 text-lg">
                        <AlertCircle className="w-5 h-5" /> Safety Hazard?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-rose-600/90 dark:text-rose-300 mb-4">
                        Do not use this form for immediate safety threats (fire, chemical spill, sparks).
                    </p>
                    <Button variant="destructive" className="w-full shadow-sm">
                        <Phone className="w-4 h-4 mr-2" /> Call Emergency Line
                    </Button>
                </CardContent>
            </Card>

            {/* Context Card 2: Workflow */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Workflow Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-border" />

                    <div className="relative flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center z-10 bg-background border border-border">
                            <FileText className="w-4 h-4" />
                        </div>
                        <div className="pt-2">
                            <h4 className="text-sm font-medium">Request Submitted</h4>
                            <p className="text-xs text-muted-foreground">Ticket assigned to triage.</p>
                        </div>
                    </div>

                    <div className="relative flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center z-10 bg-background border border-border">
                            <Clock className="w-4 h-4" />
                        </div>
                        <div className="pt-2">
                            <h4 className="text-sm font-medium">Technician Assigned</h4>
                            <p className="text-xs text-muted-foreground">Within 4 hours (Std SLA).</p>
                        </div>
                    </div>

                    <div className="relative flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center z-10 bg-background border border-border">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="pt-2">
                            <h4 className="text-sm font-medium">Completion</h4>
                            <p className="text-xs text-muted-foreground">You will be notified via email.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Context Card 3: Help */}
            <Card className="bg-secondary/20 border-none">
                <CardContent className="pt-6">
                    <div className="flex gap-3">
                        <Info className="w-5 h-5 text-muted-foreground shrink-0" />
                        <p className="text-xs text-muted-foreground">
                            <strong>Tip:</strong> Uploading a photo of the error code or damage significantly reduces diagnosis time.
                        </p>
                    </div>
                </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}