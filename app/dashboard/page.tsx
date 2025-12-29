"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Shield,
  AlertTriangle,
  Phone,
  MapPin,
  Activity,
  Users,
  Settings,
  Power,
  Smartphone,
  Navigation,
  Zap,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SensorMonitor } from "@/components/sensor-monitor"
import { LocationTracker } from "@/components/location-tracker"
import { EmergencyButton } from "@/components/emergency-button"

export default function DriverDashboard() {
  const [isMonitoring, setIsMonitoring] = useState(true)
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [gpsAccuracy, setGpsAccuracy] = useState(95)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isSimulating, setIsSimulating] = useState(false)
const [countdown, setCountdown] = useState(5)
const [alertSent, setAlertSent] = useState(false)
const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)


  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(20, prev - Math.random() * 0.5))
      setGpsAccuracy((prev) => 90 + Math.random() * 10)
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleToggleMonitoring = () => {
    setIsMonitoring(!isMonitoring)
  }
  const handleSimulateAlert = () => {  // OOYYEEE HOYEEE HOYEEE
  setIsSimulating(true)
  setAlertSent(false)
  setCountdown(5)

  const timer = setInterval(() => {
    setCountdown((prev) => {
      if (prev === 1) {
        clearInterval(timer)
        sendAlert()
      }
      return prev - 1
    })
  }, 1000)
}

const sendAlert = () => {
  setIsSimulating(false)
  setAlertSent(true)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      })
    })
  }
}


  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Driver Dashboard</h1>
            <p className="text-muted-foreground">Real-time accident detection and monitoring system</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isMonitoring ? "default" : "secondary"} className="px-3 py-1">
              <Activity className="h-4 w-4 mr-2" />
              {isMonitoring ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        {/* Main Control Panel */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Monitoring Status */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Monitoring Status
              </CardTitle>
              <CardDescription>Current system status and sensor readings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Label htmlFor="monitoring-toggle" className="text-base font-medium">
                    Accident Detection
                  </Label>
                  <Switch id="monitoring-toggle" checked={isMonitoring} onCheckedChange={handleToggleMonitoring} />
                </div>
                <div className="text-sm text-muted-foreground">Last update: {lastUpdate.toLocaleTimeString()}</div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      Battery Level
                    </Label>
                    <span className="text-sm font-medium">{Math.round(batteryLevel)}%</span>
                  </div>
                  <Progress value={batteryLevel} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Navigation className="h-4 w-4" />
                      GPS Accuracy
                    </Label>
                    <span className="text-sm font-medium">{Math.round(gpsAccuracy)}%</span>
                  </div>
                  <Progress value={gpsAccuracy} className="h-2" />
                </div>
              </div>

              <SensorMonitor isActive={isMonitoring} />
            </CardContent>
          </Card>

          {/* Emergency Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency
              </CardTitle>
              <CardDescription>Quick access to emergency features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
  className="w-full"
  variant="destructive"
  onClick={handleSimulateAlert}
  disabled={isSimulating}
>
  {isSimulating ? `Sending alert in ${countdown}s` : "Simulate Alert"}
</Button>

{alertSent && (
  <div className="text-sm text-muted-foreground space-y-1">
    <p>✅ Alert sent to emergency contact</p>
    {location && (
      <p>
        📍 Location:{" "}
        <a
          className="underline"
          target="_blank"
          href={`https://maps.google.com/?q=${location.lat},${location.lon}`}
        >
          View on Maps
        </a>
      </p>
    )}
  </div>
)}


              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Emergency Services
                </Button>

                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Alert Emergency Contacts
                </Button>

                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Share Location
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location and Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <LocationTracker
  alertSent={alertSent}
  location={location}
/>

          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>System events and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="p-1 bg-success rounded-full">
                    <div className="h-2 w-2 bg-success-foreground rounded-full" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">System Started</p>
                    <p className="text-xs text-muted-foreground">
                      Monitoring activated at {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="p-1 bg-primary rounded-full">
                    <div className="h-2 w-2 bg-primary-foreground rounded-full" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">GPS Connected</p>
                    <p className="text-xs text-muted-foreground">Location services active with high accuracy</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="p-1 bg-accent rounded-full">
                    <div className="h-2 w-2 bg-accent-foreground rounded-full" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Sensors Calibrated</p>
                    <p className="text-xs text-muted-foreground">Accelerometer and gyroscope ready</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used features and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="justify-start bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                Manage Contacts
              </Button>

              <Button variant="outline" className="justify-start bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Detection Settings
              </Button>

              <Button variant="outline" className="justify-start bg-transparent">
                <Activity className="h-4 w-4 mr-2" />
                View History
              </Button>

              <Button variant="outline" className="justify-start bg-transparent">
                <Power className="h-4 w-4 mr-2" />
                System Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
