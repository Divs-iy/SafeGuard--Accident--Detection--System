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
import EmergencyButton  from "@/components/emergency-button"
import { useRef } from "react"


export default function DriverDashboard() {
  const [isMonitoring, setIsMonitoring] = useState(true)
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [gpsAccuracy, setGpsAccuracy] = useState(95)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isSimulating, setIsSimulating] = useState(false)
  const [crashLock, setCrashLock] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  const [countdown, setCountdown] = useState(5)
const [alertSent, setAlertSent] = useState(false)
const [impactCount, setImpactCount] = useState(0)
const alarmRef = useRef<HTMLAudioElement | null>(null)
const [motionHits, setMotionHits] = useState(0)
const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)

// useEffect(() => {
//   const loggedIn = localStorage.getItem("driverLoggedIn")

//   if (!loggedIn) {
//     window.location.href = "/login"
//   }
// }, [])


  // Simulate real-time updates
  useEffect(() => {
    if(!isMonitoring) return;
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(20, prev - Math.random() * 0.5))
      setGpsAccuracy((prev) => 90 + Math.random() * 10)
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])
  useEffect(() => {  //sensors
  const handleMotion = (event: DeviceMotionEvent) => {
    const acc = event.accelerationIncludingGravity;
    const rot = event.rotationRate;

    if (!acc || !rot) return;

      const x = acc.x ?? 0
      const y = acc.y ?? 0
      const z = acc.z ?? 0
      const gForce = Math.sqrt(x*x + y*y + z*z)
    
    const rotation =
      Math.abs(rot.alpha || 0) +
      Math.abs(rot.beta || 0) +
      Math.abs(rot.gamma || 0);

    console.log("Acceleration:", gForce);
    console.log("Rotation:", rotation);

    if (gForce > 30 && rotation > 32 && !crashLock) {
  console.log("Crash detected!");
  setMotionHits((prev) => prev + 1)
  if(motionHits >= 2){
    console.log("crash confirmed");
  }
  setImpactCount((prev) => prev + 1)
  if(impactCount >=1){
    console.log("crash confirmed");
  }
  setTimeout(() => {
  setImpactCount(0)
}, 1200)

  setCrashLock(true);
  handleSimulateAlert();
  if (navigator.vibrate) {
  navigator.vibrate([500, 200, 500, 200, 500])
}

  setTimeout(() => {
    setCrashLock(false);
  }, 20000)
}
  }

  window.addEventListener("devicemotion", handleMotion);

  return () => {
    window.removeEventListener("devicemotion", handleMotion);
  };
}, [crashLock]);

  const handleToggleMonitoring = () => {
    setIsMonitoring(!isMonitoring)
  }
  const handleSimulateAlert = () => {  // OOYYEEE HOYEEE HOYEEE
  setIsSimulating(true)
  setAlertSent(false)
  setCountdown(5)
  const alarm = new Audio("/alarm.wav")
  alarm.loop = true
  alarm.play()

  alarmRef.current = alarm
  
  }
  useEffect(() => {
  if (!isSimulating) return;

  if (countdown <= 0) {
    sendAlert(); // your SMS function
    setAlertSent(true);
    setIsSimulating(false);
    return;
  }

  const timer = setTimeout(() => {
    setCountdown((prev) => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);

}, [countdown, isSimulating]);

const cancelAlert = () => {
  setIsSimulating(false);
  setCountdown(5);
  if (alarmRef.current) {
    alarmRef.current.pause()
    alarmRef.current.currentTime = 0
  }
  console.log("False alert cancelled");
}
const sendAlert = async() => {
  setIsSimulating(false)
  setAlertSent(true)
  if (alarmRef.current) {
  alarmRef.current.pause()
  alarmRef.current.currentTime = 0
}
// SEND SMS
  //await fetch("/api/send-sms", { method: "POST" }) //aaaaaaa- sms line!!!
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      setLocation({
        lat: lat,
        lon: lon,
      })
      //sms with location
      await fetch("/api/send-sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat, lon }),
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
{isSimulating && (
        <div className="fixed inset-0 bg-red-600 bg-opacity-100 flex flex-col items-center justify-center text-white z-50 text-center p-6 animate-fade">

          <h2>🚨Crash Detected</h2>
          <p>Sending alert in {countdown}s</p>

          <button onClick={cancelAlert} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg"
          >
            I'm Safe
          </button>
        </div>
      )}

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
};