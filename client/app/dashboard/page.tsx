"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { AdminDashboardOverview } from "@/components/admin/dashboard-overview"
import { getCurrentUser } from "@/lib/auth"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUser(getCurrentUser())
  }, [])

  if (!mounted || !user) {
    return null
  }

  return (
    <DashboardLayout>
      {user.role === "admin" && <AdminDashboardOverview />}

      {user.role === "technician" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back, {user.name}!</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Your Workload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You have 5 tasks in progress and 3 pending tasks. Navigate to the Kanban board to manage your work.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {user.role === "employee" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back, {user.name}!</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Submit Maintenance Request</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Use the "Raise Request" option to submit a new maintenance request or check your existing requests.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  )
}
