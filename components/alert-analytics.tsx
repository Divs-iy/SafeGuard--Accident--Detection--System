"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, TrendingDown, AlertTriangle, Clock, MapPin, Users } from "lucide-react"

interface AlertMetrics {
  period: string
  totalAlerts: number
  falsePositives: number
  responseTime: number
  deliveryRate: number
  criticalAlerts: number
  locations: { name: string; count: number }[]
  timeDistribution: { hour: number; count: number }[]
}

export function AlertAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")

  const [metrics] = useState<AlertMetrics>({
    period: "Last 7 days",
    totalAlerts: 156,
    falsePositives: 23,
    responseTime: 12,
    deliveryRate: 98.5,
    criticalAlerts: 8,
    locations: [
      { name: "New York, NY", count: 45 },
      { name: "Los Angeles, CA", count: 32 },
      { name: "Chicago, IL", count: 28 },
      { name: "Miami, FL", count: 21 },
      { name: "Houston, TX", count: 18 },
    ],
    timeDistribution: [
      { hour: 0, count: 2 },
      { hour: 6, count: 8 },
      { hour: 12, count: 25 },
      { hour: 18, count: 35 },
      { hour: 22, count: 12 },
    ],
  })

  const falsePositiveRate = (metrics.falsePositives / metrics.totalAlerts) * 100
  const successfulAlerts = metrics.totalAlerts - metrics.falsePositives

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Alert Analytics</h3>
          <p className="text-sm text-muted-foreground">Comprehensive analysis of alert patterns and performance</p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalAlerts}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +15% from previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">False Positive Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{falsePositiveRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
              -3% from previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.responseTime}s</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
              -2s from previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.deliveryRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +0.5% from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Alert Types Breakdown</CardTitle>
            <CardDescription>Distribution of different alert types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-sm">Accident Detected</span>
                </div>
                <div className="text-sm font-medium">{successfulAlerts - 45} alerts</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  <span className="text-sm">Manual SOS</span>
                </div>
                <div className="text-sm font-medium">45 alerts</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm">Test Alerts</span>
                </div>
                <div className="text-sm font-medium">12 alerts</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full" />
                  <span className="text-sm">False Positives</span>
                </div>
                <div className="text-sm font-medium">{metrics.falsePositives} alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Critical Alerts</CardTitle>
            <CardDescription>High-priority alerts requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Critical Alerts</span>
                <Badge variant="destructive">{metrics.criticalAlerts}</Badge>
              </div>

              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">High-Impact Collision</span>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="h-3 w-3" />
                      Broadway & 42nd St, NY
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />2 hours ago
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Manual SOS Activated</span>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="h-3 w-3" />
                      Central Park West, NY
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />4 hours ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Geographic Distribution
          </CardTitle>
          <CardDescription>Alert frequency by location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.locations.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <span className="text-sm font-medium">{location.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(location.count / metrics.locations[0].count) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8 text-right">{location.count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
