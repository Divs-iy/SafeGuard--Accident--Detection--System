"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Server, Database, Wifi, Smartphone, AlertTriangle, CheckCircle, Activity, Zap } from "lucide-react"

interface SystemHealth {
  component: string
  status: "healthy" | "warning" | "critical"
  uptime: number
  responseTime: number
  lastCheck: Date
  details: string
}

export function SystemMetrics() {
  const [systemHealth] = useState<SystemHealth[]>([
    {
      component: "API Server",
      status: "healthy",
      uptime: 99.9,
      responseTime: 45,
      lastCheck: new Date(),
      details: "All endpoints responding normally",
    },
    {
      component: "Database",
      status: "healthy",
      uptime: 99.8,
      responseTime: 12,
      lastCheck: new Date(),
      details: "Connection pool stable, queries optimized",
    },
    {
      component: "SMS Gateway",
      status: "warning",
      uptime: 98.5,
      responseTime: 1200,
      lastCheck: new Date(),
      details: "Slightly elevated response times",
    },
    {
      component: "GPS Services",
      status: "healthy",
      uptime: 99.7,
      responseTime: 200,
      lastCheck: new Date(),
      details: "Location accuracy within normal range",
    },
    {
      component: "Push Notifications",
      status: "healthy",
      uptime: 99.6,
      responseTime: 800,
      lastCheck: new Date(),
      details: "Delivery rates optimal",
    },
    {
      component: "Email Service",
      status: "critical",
      uptime: 95.2,
      responseTime: 3000,
      lastCheck: new Date(),
      details: "Service degradation detected, investigating",
    },
  ])

  const [resourceUsage] = useState({
    cpu: 45,
    memory: 68,
    storage: 32,
    bandwidth: 23,
  })

  const getStatusIcon = (status: SystemHealth["status"]) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: SystemHealth["status"]) => {
    switch (status) {
      case "healthy":
        return "text-green-600 bg-green-50 border-green-200"
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "critical":
        return "text-red-600 bg-red-50 border-red-200"
    }
  }

  const getComponentIcon = (component: string) => {
    switch (component) {
      case "API Server":
        return <Server className="h-4 w-4" />
      case "Database":
        return <Database className="h-4 w-4" />
      case "SMS Gateway":
      case "Push Notifications":
      case "Email Service":
        return <Smartphone className="h-4 w-4" />
      case "GPS Services":
        return <Wifi className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const overallHealth = systemHealth.filter((s) => s.status === "healthy").length / systemHealth.length

  return (
    <div className="space-y-6">
      {/* Overall System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health Overview
          </CardTitle>
          <CardDescription>Real-time monitoring of all system components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Health</span>
                <span className="text-sm">{Math.round(overallHealth * 100)}%</span>
              </div>
              <Progress value={overallHealth * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Healthy Services</span>
                <span className="text-sm">
                  {systemHealth.filter((s) => s.status === "healthy").length}/{systemHealth.length}
                </span>
              </div>
              <div className="flex gap-1">
                {systemHealth.map((service, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded ${
                      service.status === "healthy"
                        ? "bg-green-500"
                        : service.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Avg Response Time</span>
                <span className="text-sm">
                  {Math.round(systemHealth.reduce((acc, s) => acc + s.responseTime, 0) / systemHealth.length)}ms
                </span>
              </div>
              <Progress
                value={Math.min(
                  (systemHealth.reduce((acc, s) => acc + s.responseTime, 0) / systemHealth.length / 1000) * 100,
                  100,
                )}
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">System Uptime</span>
                <span className="text-sm">
                  {(systemHealth.reduce((acc, s) => acc + s.uptime, 0) / systemHealth.length).toFixed(1)}%
                </span>
              </div>
              <Progress
                value={systemHealth.reduce((acc, s) => acc + s.uptime, 0) / systemHealth.length}
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component Status */}
      <Card>
        <CardHeader>
          <CardTitle>Component Status</CardTitle>
          <CardDescription>Detailed status of individual system components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemHealth.map((component, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getComponentIcon(component.component)}
                    {getStatusIcon(component.status)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{component.component}</h3>
                      <Badge variant="outline" className={getStatusColor(component.status)}>
                        {component.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{component.details}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Uptime: {component.uptime}%</span>
                      <span>Response: {component.responseTime}ms</span>
                      <span>Last check: {component.lastCheck.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="bg-transparent">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Resource Usage
          </CardTitle>
          <CardDescription>Current system resource utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">CPU Usage</span>
                  <span className="text-sm">{resourceUsage.cpu}%</span>
                </div>
                <Progress value={resourceUsage.cpu} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <span className="text-sm">{resourceUsage.memory}%</span>
                </div>
                <Progress value={resourceUsage.memory} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Storage Usage</span>
                  <span className="text-sm">{resourceUsage.storage}%</span>
                </div>
                <Progress value={resourceUsage.storage} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Bandwidth Usage</span>
                  <span className="text-sm">{resourceUsage.bandwidth}%</span>
                </div>
                <Progress value={resourceUsage.bandwidth} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
