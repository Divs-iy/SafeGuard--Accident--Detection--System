"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { User, Shield, Lock, Trash2, Download, Upload, Eye, EyeOff, Save, RefreshCw } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationSettings } from "@/components/notification-settings"

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  emergencyMedicalInfo: string
  profilePicture?: string
}

interface PrivacySettings {
  shareLocationWithContacts: boolean
  shareLocationWithEmergencyServices: boolean
  allowDataCollection: boolean
  allowMarketingEmails: boolean
  shareUsageStatistics: boolean
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  biometricEnabled: boolean
  sessionTimeout: number
  loginNotifications: boolean
  deviceTrust: boolean
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    emergencyMedicalInfo: "Type 1 Diabetes, Allergic to Penicillin",
  })

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    shareLocationWithContacts: true,
    shareLocationWithEmergencyServices: true,
    allowDataCollection: true,
    allowMarketingEmails: false,
    shareUsageStatistics: true,
  })

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    biometricEnabled: true,
    sessionTimeout: 30,
    loginNotifications: true,
    deviceTrust: true,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleProfileUpdate = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handlePrivacyUpdate = (field: keyof PrivacySettings, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [field]: value }))
  }

  const handleSecurityUpdate = (field: keyof SecuritySettings, value: boolean | number) => {
    setSecurity((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveSettings = () => {
    alert("Settings saved successfully!")
  }

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!")
      return
    }
    alert("Password changed successfully!")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleExportData = () => {
    alert("Your data export has been initiated. You will receive an email when it's ready.")
  }

  const handleDeleteAccount = () => {
    alert("Account deletion initiated. You will receive a confirmation email.")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details and emergency information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => handleProfileUpdate("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => handleProfileUpdate("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileUpdate("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleProfileUpdate("dateOfBirth", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalInfo">Emergency Medical Information</Label>
                  <Input
                    id="medicalInfo"
                    placeholder="Allergies, medical conditions, medications..."
                    value={profile.emergencyMedicalInfo}
                    onChange={(e) => handleProfileUpdate("emergencyMedicalInfo", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    This information will be shared with emergency responders if needed
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Data Sharing
                </CardTitle>
                <CardDescription>Control how your data is used and shared</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Share Location with Emergency Contacts</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow emergency contacts to see your location during alerts
                      </p>
                    </div>
                    <Switch
                      checked={privacy.shareLocationWithContacts}
                      onCheckedChange={(value) => handlePrivacyUpdate("shareLocationWithContacts", value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Share Location with Emergency Services</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically share precise location with emergency responders
                      </p>
                    </div>
                    <Switch
                      checked={privacy.shareLocationWithEmergencyServices}
                      onCheckedChange={(value) => handlePrivacyUpdate("shareLocationWithEmergencyServices", value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Allow Data Collection for Improvements</Label>
                      <p className="text-sm text-muted-foreground">
                        Help improve accident detection by sharing anonymized sensor data
                      </p>
                    </div>
                    <Switch
                      checked={privacy.allowDataCollection}
                      onCheckedChange={(value) => handlePrivacyUpdate("allowDataCollection", value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Marketing Communications</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                    </div>
                    <Switch
                      checked={privacy.allowMarketingEmails}
                      onCheckedChange={(value) => handlePrivacyUpdate("allowMarketingEmails", value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Share Usage Statistics</Label>
                      <p className="text-sm text-muted-foreground">
                        Share anonymized usage data to help improve the service
                      </p>
                    </div>
                    <Switch
                      checked={privacy.shareUsageStatistics}
                      onCheckedChange={(value) => handlePrivacyUpdate("shareUsageStatistics", value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security & Authentication
                </CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={security.twoFactorEnabled ? "default" : "secondary"}>
                        {security.twoFactorEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                      <Switch
                        checked={security.twoFactorEnabled}
                        onCheckedChange={(value) => handleSecurityUpdate("twoFactorEnabled", value)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Biometric Authentication</Label>
                      <p className="text-sm text-muted-foreground">Use fingerprint or face recognition to unlock</p>
                    </div>
                    <Switch
                      checked={security.biometricEnabled}
                      onCheckedChange={(value) => handleSecurityUpdate("biometricEnabled", value)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Login Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notified when someone signs into your account</p>
                    </div>
                    <Switch
                      checked={security.loginNotifications}
                      onCheckedChange={(value) => handleSecurityUpdate("loginNotifications", value)}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Session Timeout</Label>
                    <Select
                      value={security.sessionTimeout.toString()}
                      onValueChange={(value) => handleSecurityUpdate("sessionTimeout", Number.parseInt(value))}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                        <SelectItem value="0">Never</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">Automatically sign out after period of inactivity</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={handlePasswordChange} disabled={!currentPassword || !newPassword || !confirmPassword}>
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <NotificationSettings />
          </TabsContent>

          {/* Account Management */}
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data & Account Management</CardTitle>
                <CardDescription>Export your data or manage your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">Export Your Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Download a copy of all your data including alerts, contacts, and settings
                      </p>
                    </div>
                    <Button variant="outline" onClick={handleExportData} className="bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">Import Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        Import settings and preferences from a backup file
                      </p>
                    </div>
                    <Button variant="outline" className="bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Settings
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">Reset to Defaults</h3>
                      <p className="text-sm text-muted-foreground">Reset all settings to their default values</p>
                    </div>
                    <Button variant="outline" className="bg-transparent">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset Settings
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Danger Zone */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
                  <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-destructive">Delete Account</h4>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove all
                              your data from our servers, including:
                              <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Your profile and personal information</li>
                                <li>All emergency contacts</li>
                                <li>Alert history and settings</li>
                                <li>All preferences and configurations</li>
                              </ul>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Yes, delete my account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
