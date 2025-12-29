"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, Phone, Mail, Activity, Compass, ExternalLink, Download } from "lucide-react"

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

interface AlertDetailsModalProps {
  alert: Alert
  onClose: () => void
}

export function AlertDetailsModal({ alert, onClose }: AlertDetailsModalProps) {
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

  const handleOpenMaps = () => {
    const mapsUrl = `https://maps.google.com/?q=${alert.location.latitude},${alert.location.longitude}`
    window.open(mapsUrl, "_blank")
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Alert Details
            <Badge variant="outline" className={getSeverityColor(alert.severity)}>
              {alert.severity}
            </Badge>
          </DialogTitle>
          <DialogDescription>Detailed information about alert #{alert.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Alert Type</div>
                <div className="capitalize">{alert.type.replace("_", " ")}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <Badge variant="outline">{alert.status}</Badge>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Timestamp</div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {alert.timestamp.toLocaleString()}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Response Time</div>
                <div>{alert.responseTime > 0 ? `${alert.responseTime} seconds` : "N/A"}</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Description</div>
              <div className="p-3 bg-muted/50 rounded-lg">{alert.description}</div>
            </div>
          </div>

          <Separator />

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Location Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <div>
                  <div className="font-medium">{alert.location.address}</div>
                  <div className="text-sm text-muted-foreground">
                    {alert.location.latitude.toFixed(6)}, {alert.location.longitude.toFixed(6)}
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={handleOpenMaps} className="bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in Maps
              </Button>
            </div>
          </div>

          <Separator />

          {/* Notification Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notification Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Contacts Notified</div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {alert.contactsNotified} emergency contacts
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Notification Methods</div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">SMS & Email</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sensor Data (if available) */}
          {alert.sensorData && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sensor Data</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <span className="font-medium">Accelerometer</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>X-axis:</span>
                        <span className="font-mono">{alert.sensorData.accelerometer.x.toFixed(2)} m/s²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Y-axis:</span>
                        <span className="font-mono">{alert.sensorData.accelerometer.y.toFixed(2)} m/s²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Z-axis:</span>
                        <span className="font-mono">{alert.sensorData.accelerometer.z.toFixed(2)} m/s²</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Compass className="h-4 w-4" />
                      <span className="font-medium">Gyroscope</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>X-axis:</span>
                        <span className="font-mono">{alert.sensorData.gyroscope.x.toFixed(2)} °/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Y-axis:</span>
                        <span className="font-mono">{alert.sensorData.gyroscope.y.toFixed(2)} °/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Z-axis:</span>
                        <span className="font-mono">{alert.sensorData.gyroscope.z.toFixed(2)} °/s</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Impact Severity</span>
                    <span className="text-lg font-bold">{alert.sensorData.impact.toFixed(1)}/10</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
