"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Users,
  AlertTriangle,
  Activity,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  RefreshCw,
  MapPin,
  Clock,
  Shield,
  Zap,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SystemMetrics } from "@/components/system-metrics"
import { UserManagement } from "@/components/user-management"
import { AlertAnalytics } from "@/components/alert-analytics"

interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalAlerts: number
  falsePositives: number
  responseTime: number
  systemUptime: number
  alertsToday: number
  criticalAlerts: number
}

interface RecentActivity {
  id: string
  type: "user_registered" | "alert_sent" | "false_positive" | "system_error"
  description: string
  timestamp: Date
  severity: "low" | "medium" | "high"
  userId?: string
  location?: string
}

export default function AdminDashboard() {
  const [stats] = useState<SystemStats>({
    totalUsers: 1247,
    activeUsers: 892,
    totalAlerts: 3456,
    falsePositives: 234,
    responseTime: 12,
    systemUptime: 99.8,
    alertsToday: 23,
    criticalAlerts: 3,
  })

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "alert_sent",
      description: "High-impact accident detected for user John Doe",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      severity: "high",
      userId: "user_123",
      location: "Broadway & 42nd St, NY",
    },
    {
      id: "2",
      type: "user_registered",
      description: "New user Sarah Johnson registered",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      severity: "low",
      userId: "user_456",
    },
    {
      id: "3",
      type: "false_positive",
      description: "False positive cancelled by user Mike Chen",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      severity: "medium",
      userId: "user_789",
      location: "Central Park, NY",
    },
    {
      id: "4",
      type: "system_error",
      description: "GPS service temporarily unavailable",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      severity: "high",
    },
    {
      id: "5",
      type: "alert_sent",
      description: "Manual SOS activated by user Emma Wilson",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      severity: "high",
      userId: "user_101",
      location: "Times Square, NY",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredActivity = recentActivity.filter((activity) => {
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || activity.type === filterType
    return matchesSearch && matchesFilter
  })

  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "alert_sent":
        return <AlertTriangle className="h-4 w-4" />
      case "user_registered":
        return <Users className="h-4 w-4" />
      case "false_positive":
        return <Shield className="h-4 w-4" />
      case "system_error":
        return <Zap className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: RecentActivity["severity"]) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
    }
  }

  const handleExportData = () => {
    alert("System data exported successfully!")
  }

  const handleRefreshData = () => {
    alert("Data refreshed!")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Admin Dashboard</h1>
            <p className="text-muted-foreground">System monitoring and user management</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRefreshData} className="bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleExportData} className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts Today</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.alertsToday}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                -8% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.systemUptime}%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Alert Analytics</TabsTrigger>
            <TabsTrigger value="system">System Health</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Performance Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.responseTime}s</div>
                  <p className="text-sm text-muted-foreground">Average alert delivery</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">False Positive Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {Math.round((stats.falsePositives / stats.totalAlerts) * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {stats.falsePositives} of {stats.totalAlerts} alerts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Critical Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{stats.criticalAlerts}</div>
                  <p className="text-sm text-muted-foreground">Requiring immediate attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activity</CardTitle>
                <CardDescription>Latest events and system notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search and Filter */}
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search activity..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-48">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Activity</SelectItem>
                        <SelectItem value="alert_sent">Alerts Sent</SelectItem>
                        <SelectItem value="user_registered">User Registrations</SelectItem>
                        <SelectItem value="false_positive">False Positives</SelectItem>
                        <SelectItem value="system_error">System Errors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Activity List */}
                  <div className="space-y-3">
                    {filteredActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          {getActivityIcon(activity.type)}
                          <Badge variant="outline" className={getSeverityColor(activity.severity)}>
                            {activity.severity}
                          </Badge>
                        </div>

                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {activity.timestamp.toLocaleString()}
                            </div>
                            {activity.userId && (
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {activity.userId}
                              </div>
                            )}
                            {activity.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {activity.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredActivity.length === 0 && (
                      <div className="text-center py-8">
                        <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Activity Found</h3>
                        <p className="text-muted-foreground">No activity matches your search criteria.</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <AlertAnalytics />
          </TabsContent>

          <TabsContent value="system">
            <SystemMetrics />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
