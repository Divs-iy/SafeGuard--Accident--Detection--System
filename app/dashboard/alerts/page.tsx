"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Bell,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AlertDetailsModal } from "@/components/alert-details-modal"
import { NotificationSettings } from "@/components/notification-settings"

interface Alert {
  id: string
  type: "accident_detected" | "manual_sos" | "test_alert" | "false_positive"
  status: "sent" | "delivered" | "failed" | "cancelled"
  timestamp: Date
  location: {
    latitude: number
    longitude: number
    address: string
  }
  severity: "low" | "medium" | "high" | "critical"
  contactsNotified: number
  responseTime: number
  description: string
  sensorData?: {
    accelerometer: { x: number; y: number; z: number }
    gyroscope: { x: number; y: number; z: number }
    impact: number
  }
}

export default function AlertSystemPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "accident_detected",
      status: "delivered",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      location: {
        latitude: 40.7128,
        longitude: -74.006,
        address: "Broadway & 42nd St, New York, NY",
      },
      severity: "high",
      contactsNotified: 3,
      responseTime: 15,
      description: "High-impact collision detected based on sensor readings",
      sensorData: {
        accelerometer: { x: 15.2, y: -8.7, z: 22.1 },
        gyroscope: { x: 45.3, y: -12.8, z: 67.9 },
        impact: 8.5,
      },
    },
    {
      id: "2",
      type: "manual_sos",
      status: "delivered",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      location: {
        latitude: 40.7589,
        longitude: -73.9851,
        address: "Central Park West, New York, NY",
      },
      severity: "critical",
      contactsNotified: 3,
      responseTime: 8,
      description: "Manual SOS button activated by user",
    },
    {
      id: "3",
      type: "test_alert",
      status: "delivered",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      location: {
        latitude: 40.7505,
        longitude: -73.9934,
        address: "Times Square, New York, NY",
      },
      severity: "low",
      contactsNotified: 2,
      responseTime: 12,
      description: "System test alert sent to verify functionality",
    },
    {
      id: "4",
      type: "false_positive",
      status: "cancelled",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      location: {
        latitude: 40.7282,
        longitude: -74.0776,
        address: "Brooklyn Bridge, New York, NY",
      },
      severity: "medium",
      contactsNotified: 0,
      responseTime: 0,
      description: "False positive cancelled by user within countdown period",
    },
  ])

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")

  const filteredAlerts = alerts.filter((alert) => {
    const statusMatch = filterStatus === "all" || alert.status === filterStatus
    const typeMatch = filterType === "all" || alert.type === filterType
    return statusMatch && typeMatch
  })

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "accident_detected":
        return <AlertTriangle className="h-4 w-4" />
      case "manual_sos":
        return <AlertTriangle className="h-4 w-4" />
      case "test_alert":
        return <CheckCircle className="h-4 w-4" />
      case "false_positive":
        return <XCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: Alert["status"]) => {
    switch (status) {
      case "sent":
        return "bg-blue-500"
      case "delivered":
        return "bg-green-500"
      case "failed":
        return "bg-red-500"
      case "cancelled":
        return "bg-gray-500"
    }
  }

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "critical":
        return "text-red-600 bg-red-50 border-red-200"
    }
  }

  const handleTestAlert = () => {
    const testAlert: Alert = {
      id: Date.now().toString(),
      type: "test_alert",
      status: "sent",
      timestamp: new Date(),
      location: {
        latitude: 40.7128,
        longitude: -74.006,
        address: "Current Location",
      },
      severity: "low",
      contactsNotified: 2,
      responseTime: 0,
      description: "Test alert initiated by user",
    }

    setAlerts([testAlert, ...alerts])

    // Simulate delivery
    setTimeout(() => {
      setAlerts((prev) =>
        prev.map((alert) => (alert.id === testAlert.id ? { ...alert, status: "delivered", responseTime: 10 } : alert)),
      )
    }, 2000)
  }

  const stats = {
    total: alerts.length,
    delivered: alerts.filter((a) => a.status === "delivered").length,
    failed: alerts.filter((a) => a.status === "failed").length,
    avgResponseTime: Math.round(alerts.reduce((acc, alert) => acc + alert.responseTime, 0) / alerts.length),
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Alert System</h1>
            <p className="text-muted-foreground">Monitor emergency alerts and notification history</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleTestAlert} className="bg-transparent">
              <Bell className="h-4 w-4 mr-2" />
              Send Test Alert
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export History
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time alerts sent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.delivered}</div>
              <p className="text-xs text-muted-foreground">Successfully delivered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.failed}</div>
              <p className="text-xs text-muted-foreground">Delivery failures</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgResponseTime}s</div>
              <p className="text-xs text-muted-foreground">Average response time</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="history" className="space-y-4">
          <TabsList>
            <TabsTrigger value="history">Alert History</TabsTrigger>
            <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="accident_detected">Accident Detected</SelectItem>
                        <SelectItem value="manual_sos">Manual SOS</SelectItem>
                        <SelectItem value="test_alert">Test Alert</SelectItem>
                        <SelectItem value="false_positive">False Positive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button variant="outline" className="bg-transparent">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Complete history of all emergency alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getAlertIcon(alert.type)}
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(alert.status)}`} />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium capitalize">{alert.type.replace("_", " ")}</h3>
                            <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            <Badge variant="outline">{alert.status}</Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {alert.timestamp.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {alert.location.address}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {alert.contactsNotified} contacts
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="text-sm font-medium">
                          {alert.responseTime > 0 ? `${alert.responseTime}s` : "-"}
                        </div>
                        <div className="text-xs text-muted-foreground">Response Time</div>
                      </div>
                    </div>
                  ))}

                  {filteredAlerts.length === 0 && (
                    <div className="text-center py-8">
                      <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Alerts Found</h3>
                      <p className="text-muted-foreground mb-4">No alerts match your current filter criteria.</p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFilterStatus("all")
                          setFilterType("all")
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <NotificationSettings />
          </TabsContent>
        </Tabs>

        {/* Alert Details Modal */}
        {selectedAlert && <AlertDetailsModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />}
      </div>
    </DashboardLayout>
  )
}
