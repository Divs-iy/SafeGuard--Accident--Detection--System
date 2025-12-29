"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export function EmergencyButton({
  onAlert,
}: {
  onAlert: (location: { lat: number; lon: number }) => void
}) {
  const [isPressed, setIsPressed] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleEmergencyPress = () => {
    if (isPressed) return

    setIsPressed(true)
    setCountdown(10)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsPressed(false)

          // 🔹 send location ONLY here
          onAlert({
            lat: 23.0225,
            lon: 72.5714,
          })

          alert("Emergency alert sent to all contacts!")
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleCancel = () => {
    setIsPressed(false)
    setCountdown(0)
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleEmergencyPress}
        disabled={isPressed}
        className={cn(
          "w-full h-16 text-lg font-semibold",
          isPressed
            ? "bg-destructive hover:bg-destructive animate-pulse"
            : "bg-destructive hover:bg-destructive/90",
        )}
      >
        <AlertTriangle className="h-6 w-6 mr-2" />
        {isPressed ? `Sending Alert... ${countdown}s` : "Simulate Alert"}
      </Button>

      {isPressed && (
        <Button onClick={handleCancel} variant="outline" className="w-full bg-transparent">
          Cancel Alert
        </Button>
      )}
    </div>
  )
}
