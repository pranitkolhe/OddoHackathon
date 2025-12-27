"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCurrentUser, type AuthUser } from "@/lib/auth"
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  KanbanSquare,
  Calendar,
  Plus,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)

    const isDarkMode = localStorage.getItem("theme") === "dark"
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [router])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem("theme", newDark ? "dark" : "light")
    if (newDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    document.cookie = "authToken=; path=/; max-age=0"
    router.push("/login")
  }

  if (!mounted || !user) {
    return null
  }

  const getNavigation = () => {
    const commonNav = [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ]

    const roleNav = {
      admin: [
        { label: "Equipment", href: "/dashboard/equipment", icon: Package },
        { label: "Teams", href: "/dashboard/teams", icon: Users },
        { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      ],
      technician: [
        { label: "Kanban Board", href: "/dashboard/kanban", icon: KanbanSquare },
        { label: "Schedule", href: "/dashboard/calendar", icon: Calendar },
      ],
      employee: [
        { label: "Raise Request", href: "/dashboard/request", icon: Plus },
        { label: "My Requests", href: "/dashboard/my-requests", icon: BarChart3 },
      ],
    }

    return [...commonNav, ...(roleNav[user.role] || [])]
  }

  return (
    <div className="flex h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 md:static md:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Package className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <h1 className="font-bold text-lg text-sidebar-foreground">GearGuard</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {getNavigation().map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
                  asChild
                >
                  <span>
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </span>
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-start gap-2 bg-transparent"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {isDark ? "Light" : "Dark"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-destructive hover:text-destructive bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/70">{user.name}</p>
          <p className="text-xs text-sidebar-foreground/50 capitalize">{user.role}</p>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">{children}</div>
        </div>
      </main>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
