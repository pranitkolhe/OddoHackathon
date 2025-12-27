"use client"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.subject || !formData.equipment || !formData.description) {
      return
    }

    setSubmittedData({
      ...formData,
      id: `REQ-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      status: "pending",
    })

    setSubmitted(true)

    setTimeout(() => {
      setFormData({ subject: "", equipment: "", description: "", priority: "medium" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Raise Maintenance Request</h1>
          <p className="text-muted-foreground mt-2">Submit a new maintenance request for any equipment</p>
        </div>

        {submitted && submittedData && (
          <Alert className="bg-primary/20 border-primary/30">
            <CheckCircle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary">
              Request submitted successfully! ID: {submittedData.id}
            </AlertDescription>
          </Alert>
        )}

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>New Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input
                  placeholder="Brief description of the issue"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-input"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Equipment</label>
                <Select
                  value={formData.equipment}
                  onValueChange={(value) => setFormData({ ...formData, equipment: value })}
                >
                  <SelectTrigger className="bg-input">
                    <SelectValue placeholder="Select equipment" />
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger className="bg-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe the issue in detail"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-input min-h-32"
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="text-base">How it works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>1. Fill out the form above with details about the maintenance issue</p>
            <p>2. Your request will be received by the maintenance team and assigned a request ID</p>
            <p>3. You can track the status of your request in the "My Requests" section</p>
            <p>4. The maintenance team will notify you when work is scheduled or completed</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
