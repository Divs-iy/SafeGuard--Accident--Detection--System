"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, ExternalLink } from "lucide-react"

type Location = {
  lat: number
  lon: number
}

export function LocationTracker() {
  const [alertSent, setAlertSent] = useState(false)
  const [location, setLocation] = useState<Location | null>(null)

  // TEMP: simulate alert trigger (later connect to EmergencyButton)
  const simulateAlert = () => {
    setLocation({
      lat: 23.0225,
      lon: 72.5714, // Ahmedabad
    })
    setAlertSent(true)
  }

  const openInMaps = () => {
    if (!location) return
    window.open(
      `https://maps.google.com/?q=${location.lat},${location.lon}`,
      "_blank"
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Tracking
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Badge variant={alertSent ? "default" : "secondary"}>
          <Navigation className="h-3 w-3 mr-1" />
          {alertSent ? "Location Locked" : "Waiting for Alert"}
        </Badge>

        {alertSent && location ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Latitude</span>
              <span className="font-mono">{location.lat}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Longitude</span>
              <span className="font-mono">{location.lon}</span>
            </div>

            <Button
              onClick={openInMaps}
              variant="outline"
              className="w-full bg-transparent mt-2"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in Maps
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Location will appear here after an emergency alert is sent.
          </p>
        )}

        {/* REMOVE THIS later — only for testing */}
        
      </CardContent>
    </Card>
  )
}
