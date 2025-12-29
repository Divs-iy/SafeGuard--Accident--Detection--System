"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Search, Filter, MoreHorizontal, MapPin, Phone, Mail, Shield } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "suspended"
  registrationDate: Date
  lastActive: Date
  location: string
  alertsCount: number
  emergencyContacts: number
}

export function UserManagement() {
  const [users] = useState<User[]>([
    {
      id: "user_001",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      registrationDate: new Date(2024, 0, 15),
      lastActive: new Date(),
      location: "New York, NY",
      alertsCount: 12,
      emergencyContacts: 3,
    },
    {
      id: "user_002",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 987-6543",
      status: "active",
      registrationDate: new Date(2024, 1, 3),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      location: "Los Angeles, CA",
      alertsCount: 8,
      emergencyContacts: 2,
    },
    {
      id: "user_003",
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "+1 (555) 456-7890",
      status: "inactive",
      registrationDate: new Date(2023, 11, 20),
      lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      location: "Chicago, IL",
      alertsCount: 25,
      emergencyContacts: 4,
    },
    {
      id: "user_004",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "+1 (555) 321-0987",
      status: "suspended",
      registrationDate: new Date(2024, 2, 10),
      lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      location: "Miami, FL",
      alertsCount: 45,
      emergencyContacts: 1,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50 border-green-200"
      case "inactive":
        return "text-gray-600 bg-gray-50 border-gray-200"
      case "suspended":
        return "text-red-600 bg-red-50 border-red-200"
    }
  }

  const handleUserAction = (userId: string, action: string) => {
    alert(`${action} action performed for user ${userId}`)
  }

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    suspended: users.filter((u) => u.status === "suspended").length,
  }

  return (
    <div className="space-y-6">
      {/* User Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
            <div className="w-2 h-2 bg-gray-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.inactive}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended Users</CardTitle>
            <div className="w-2 h-2 bg-red-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.suspended}</div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage user accounts and monitor user activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* User List */}
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{user.name.charAt(0)}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{user.name}</h3>
                        <Badge variant="outline" className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {user.location}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Registered: {user.registrationDate.toLocaleDateString()}</span>
                        <span>Last active: {user.lastActive.toLocaleDateString()}</span>
                        <span>Alerts: {user.alertsCount}</span>
                        <span>Contacts: {user.emergencyContacts}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                          className="bg-transparent"
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>User Details</DialogTitle>
                          <DialogDescription>Detailed information for {user.name}</DialogDescription>
                        </DialogHeader>
                        {selectedUser && (
                          <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <span className="text-sm font-medium text-muted-foreground">User ID</span>
                                <div className="font-mono text-sm">{selectedUser.id}</div>
                              </div>
                              <div className="space-y-2">
                                <span className="text-sm font-medium text-muted-foreground">Status</span>
                                <Badge variant="outline" className={getStatusColor(selectedUser.status)}>
                                  {selectedUser.status}
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <span className="text-sm font-medium text-muted-foreground">Registration Date</span>
                                <div>{selectedUser.registrationDate.toLocaleDateString()}</div>
                              </div>
                              <div className="space-y-2">
                                <span className="text-sm font-medium text-muted-foreground">Last Active</span>
                                <div>{selectedUser.lastActive.toLocaleDateString()}</div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUserAction(selectedUser.id, "suspend")}
                                className="bg-transparent"
                              >
                                <Shield className="h-4 w-4 mr-2" />
                                Suspend User
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUserAction(selectedUser.id, "reset")}
                                className="bg-transparent"
                              >
                                Reset Password
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm" className="bg-transparent">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Users Found</h3>
                  <p className="text-muted-foreground">No users match your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
