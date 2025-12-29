"use client"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Compass, Zap } from "lucide-react"

interface SensorMonitorProps {
  isActive: boolean
}

export function SensorMonitor({ isActive }: SensorMonitorProps) {
  const [accelerometer, setAccelerometer] = useState({ x: 0, y: 0, z: 9.8 })
  const [gyroscope, setGyroscope] = useState({ x: 0, y: 0, z: 0 })
  const [sensitivity, setSensitivity] = useState(75)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      // Simulate sensor readings
      setAccelerometer({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: 9.8 + (Math.random() - 0.5) * 0.5,
      })

      setGyroscope({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 10,
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive])

  const getSensorStatus = (value: number, threshold: number) => {
    return Math.abs(value) > threshold ? "warning" : "success"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Sensor Readings</h3>
        <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Monitoring" : "Paused"}</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">Accelerometer</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>X-axis</span>
              <span
                className={`font-mono ${getSensorStatus(accelerometer.x, 1.5) === "warning" ? "text-warning" : "text-success"}`}
              >
                {accelerometer.x.toFixed(2)} m/s²
              </span>
            </div>
            <div className="flex justify-between">
              <span>Y-axis</span>
              <span
                className={`font-mono ${getSensorStatus(accelerometer.y, 1.5) === "warning" ? "text-warning" : "text-success"}`}
              >
                {accelerometer.y.toFixed(2)} m/s²
              </span>
            </div>
            <div className="flex justify-between">
              <span>Z-axis</span>
              <span
                className={`font-mono ${getSensorStatus(accelerometer.z - 9.8, 1.5) === "warning" ? "text-warning" : "text-success"}`}
              >
                {accelerometer.z.toFixed(2)} m/s²
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4" />
            <span className="text-sm font-medium">Gyroscope</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>X-axis</span>
              <span
                className={`font-mono ${getSensorStatus(gyroscope.x, 5) === "warning" ? "text-warning" : "text-success"}`}
              >
                {gyroscope.x.toFixed(2)} °/s
              </span>
            </div>
            <div className="flex justify-between">
              <span>Y-axis</span>
              <span
                className={`font-mono ${getSensorStatus(gyroscope.y, 5) === "warning" ? "text-warning" : "text-success"}`}
              >
                {gyroscope.y.toFixed(2)} °/s
              </span>
            </div>
            <div className="flex justify-between">
              <span>Z-axis</span>
              <span
                className={`font-mono ${getSensorStatus(gyroscope.z, 5) === "warning" ? "text-warning" : "text-success"}`}
              >
                {gyroscope.z.toFixed(2)} °/s
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Detection Sensitivity
          </span>
          <span className="text-sm">{sensitivity}%</span>
        </div>
        <Progress value={sensitivity} className="h-2" />
      </div>
    </div>
  )
}
