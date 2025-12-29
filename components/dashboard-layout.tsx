"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Shield, LayoutDashboard, Users, AlertTriangle, Settings, BarChart3, Menu, LogOut, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState("dashboard")

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "contacts", name: "Emergency Contacts", icon: Users, href: "/dashboard/contacts" },
    { id: "alerts", name: "Alert System", icon: AlertTriangle, href: "/dashboard/alerts" },
    { id: "admin", name: "Admin Panel", icon: BarChart3, href: "/dashboard/admin" },
    { id: "settings", name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ]

  const handleLogout = () => {
    window.location.href = "/logout"
  }

  const Sidebar = ({ className }: { className?: string }) => (
    <div className={cn("flex h-full flex-col bg-sidebar", className)}>
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-sidebar-primary rounded-lg">
            <Shield className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="font-semibold text-sidebar-foreground">SafeGuard</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              activeTab === item.id
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="h-4 w-4 mr-3" />
            {item.name}
          </Button>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground">
          <User className="h-4 w-4 mr-3" />
          Profile
        </Button>
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <div className="flex flex-col flex-1">
          {/* Mobile Header */}
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">SafeGuard</span>
            </div>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </header>

          {/* Desktop Header */}
          <header className="hidden lg:flex h-14 items-center justify-end gap-4 border-b bg-background px-6">
            <ThemeToggle />
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>

        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  )
}
