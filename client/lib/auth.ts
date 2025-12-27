const JWT_SECRET = "gearguard-secret-key-demo"

export interface AuthUser {
  id: string
  email: string
  role: "admin" | "technician" | "employee"
  name: string
}

export const mockUsers = {
  admin: {
    id: "1",
    email: "admin@gearguard.com",
    password: "admin123",
    role: "admin" as const,
    name: "Admin User",
  },
  technician: {
    id: "2",
    email: "tech@gearguard.com",
    password: "tech123",
    role: "technician" as const,
    name: "John Technician",
  },
  employee: {
    id: "3",
    email: "emp@gearguard.com",
    password: "emp123",
    role: "employee" as const,
    name: "Jane Employee",
  },
}

export function encodeToken(user: AuthUser): string {
  return btoa(JSON.stringify(user))
}

export function decodeToken(token: string): AuthUser | null {
  try {
    return JSON.parse(atob(token))
  } catch {
    return null
  }
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null

  const token = localStorage.getItem("authToken")
  if (!token) return null

  return decodeToken(token)
}
