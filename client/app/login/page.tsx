"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { encodeToken, mockUsers } from "@/lib/auth"
import { AlertCircle, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<"admin" | "technician" | "employee">("admin")

  const handleQuickLogin = async (role: "admin" | "technician" | "employee") => {
    setLoading(true)
    setError("")

    try {
      const user = mockUsers[role]
      const token = encodeToken(user)

      localStorage.setItem("authToken", token)
      document.cookie = `authToken=${token}; path=/; max-age=86400`

      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">GearGuard</h1>
          </div>
          <p className="text-muted-foreground">Intelligent Maintenance Management</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Demo Login</CardTitle>
            <CardDescription>Select a role to login with demo credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={selectedRole} onValueChange={(v: any) => setSelectedRole(v)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="technician">Tech</TabsTrigger>
                <TabsTrigger value="employee">Employee</TabsTrigger>
              </TabsList>

              <TabsContent value="admin" className="space-y-3 mt-4">
                <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
                  <p className="font-medium">Admin User</p>
                  <p className="text-muted-foreground">Full system access</p>
                </div>
                <Button onClick={() => handleQuickLogin("admin")} disabled={loading} className="w-full">
                  {loading ? "Logging in..." : "Login as Admin"}
                </Button>
              </TabsContent>

              <TabsContent value="technician" className="space-y-3 mt-4">
                <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
                  <p className="font-medium">Technician</p>
                  <p className="text-muted-foreground">Kanban board & calendar access</p>
                </div>
                <Button onClick={() => handleQuickLogin("technician")} disabled={loading} className="w-full">
                  {loading ? "Logging in..." : "Login as Technician"}
                </Button>
              </TabsContent>

              <TabsContent value="employee" className="space-y-3 mt-4">
                <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
                  <p className="font-medium">Employee</p>
                  <p className="text-muted-foreground">Request creation & tracking</p>
                </div>
                <Button onClick={() => handleQuickLogin("employee")} disabled={loading} className="w-full">
                  {loading ? "Logging in..." : "Login as Employee"}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground">
          This is a demo environment. No real credentials are required.
        </p>
      </div>
    </div>
  )
}
