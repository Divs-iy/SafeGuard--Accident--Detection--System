"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Bell, Phone, Mail, MessageSquare, Volume2, Clock, Shield, Settings } from "lucide-react"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    smsEnabled: true,
    emailEnabled: true,
    pushEnabled: true,
    voiceCallEnabled: false,
    countdownDuration: 30,
    retryAttempts: 3,
    retryInterval: 60,
    quietHours: {
      enabled: false,
      start: "22:00",
      end: "07:00",
    },
    sensitivity: 75,
    autoCancel: true,
    locationSharing: true,
    emergencyServices: false,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleQuietHoursChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [key]: value,
      },
    }))
  }

  const handleSaveSettings = () => {
    // Save settings logic here
    alert("Settings saved successfully!")
  }

  const handleTestNotifications = () => {
    alert("Test notifications sent to all enabled channels!")
  }

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Channels
          </CardTitle>
          <CardDescription>Configure how you want to receive emergency alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4" />
                <div>
                  <Label className="text-base">SMS Messages</Label>
                  <p className="text-sm text-muted-foreground">Text message alerts</p>
                </div>
              </div>
              <Switch
                checked={settings.smsEnabled}
                onCheckedChange={(value) => handleSettingChange("smsEnabled", value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <div>
                  <Label className="text-base">Email</Label>
                  <p className="text-sm text-muted-foreground">Email notifications</p>
                </div>
              </div>
              <Switch
                checked={settings.emailEnabled}
                onCheckedChange={(value) => handleSettingChange("emailEnabled", value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4" />
                <div>
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">App notifications</p>
                </div>
              </div>
              <Switch
                checked={settings.pushEnabled}
                onCheckedChange={(value) => handleSettingChange("pushEnabled", value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <div>
                  <Label className="text-base">Voice Calls</Label>
                  <p className="text-sm text-muted-foreground">Automated voice alerts</p>
                </div>
              </div>
              <Switch
                checked={settings.voiceCallEnabled}
                onCheckedChange={(value) => handleSettingChange("voiceCallEnabled", value)}
              />
            </div>
          </div>

          <Button variant="outline" onClick={handleTestNotifications} className="bg-transparent">
            Test All Notifications
          </Button>
        </CardContent>
      </Card>

      {/* Alert Timing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Alert Timing
          </CardTitle>
          <CardDescription>Configure timing and retry settings for alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Countdown Duration</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[settings.countdownDuration]}
                  onValueChange={(value) => handleSettingChange("countdownDuration", value[0])}
                  max={60}
                  min={10}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-12">{settings.countdownDuration}s</span>
              </div>
              <p className="text-sm text-muted-foreground">Time to cancel false positive alerts</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Retry Attempts</Label>
                <Select
                  value={settings.retryAttempts.toString()}
                  onValueChange={(value) => handleSettingChange("retryAttempts", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 attempt</SelectItem>
                    <SelectItem value="2">2 attempts</SelectItem>
                    <SelectItem value="3">3 attempts</SelectItem>
                    <SelectItem value="5">5 attempts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Retry Interval</Label>
                <Select
                  value={settings.retryInterval.toString()}
                  onValueChange={(value) => handleSettingChange("retryInterval", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">1 minute</SelectItem>
                    <SelectItem value="120">2 minutes</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detection Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Detection Settings
          </CardTitle>
          <CardDescription>Configure accident detection sensitivity and behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Detection Sensitivity</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[settings.sensitivity]}
                  onValueChange={(value) => handleSettingChange("sensitivity", value[0])}
                  max={100}
                  min={25}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-12">{settings.sensitivity}%</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Higher sensitivity detects minor impacts but may cause false positives
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Auto-cancel False Positives</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically cancel alerts if no movement detected after impact
                  </p>
                </div>
                <Switch
                  checked={settings.autoCancel}
                  onCheckedChange={(value) => handleSettingChange("autoCancel", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Location Sharing</Label>
                  <p className="text-sm text-muted-foreground">Include precise location in emergency alerts</p>
                </div>
                <Switch
                  checked={settings.locationSharing}
                  onCheckedChange={(value) => handleSettingChange("locationSharing", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Emergency Services Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically contact emergency services for critical alerts
                  </p>
                </div>
                <Switch
                  checked={settings.emergencyServices}
                  onCheckedChange={(value) => handleSettingChange("emergencyServices", value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Quiet Hours
          </CardTitle>
          <CardDescription>Configure quiet hours for non-critical notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Enable Quiet Hours</Label>
              <p className="text-sm text-muted-foreground">Reduce notification volume during specified hours</p>
            </div>
            <Switch
              checked={settings.quietHours.enabled}
              onCheckedChange={(value) => handleQuietHoursChange("enabled", value)}
            />
          </div>

          {settings.quietHours.enabled && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Select
                  value={settings.quietHours.start}
                  onValueChange={(value) => handleQuietHoursChange("start", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                    <SelectItem value="22:00">10:00 PM</SelectItem>
                    <SelectItem value="23:00">11:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>End Time</Label>
                <Select value={settings.quietHours.end} onValueChange={(value) => handleQuietHoursChange("end", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          <Settings className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
