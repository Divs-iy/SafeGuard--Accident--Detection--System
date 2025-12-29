"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Users, Plus, Phone, Mail, Edit, Trash2, UserCheck, Clock } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface EmergencyContact {
  id: string
  name: string
  phone: string
  email: string
  relationship: string
  priority: number
  isActive: boolean
  lastContacted?: Date
}

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      relationship: "Spouse",
      priority: 1,
      isActive: true,
      lastContacted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      name: "Michael Davis",
      phone: "+1 (555) 987-6543",
      email: "michael.davis@email.com",
      relationship: "Brother",
      priority: 2,
      isActive: true,
    },
    {
      id: "3",
      name: "Dr. Emily Chen",
      phone: "+1 (555) 456-7890",
      email: "dr.chen@hospital.com",
      relationship: "Doctor",
      priority: 3,
      isActive: false,
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null)
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    relationship: "",
    priority: contacts.length + 1,
  })

  const handleAddContact = () => {
    const contact: EmergencyContact = {
      id: Date.now().toString(),
      ...newContact,
      isActive: true,
    }
    setContacts([...contacts, contact])
    setNewContact({ name: "", phone: "", email: "", relationship: "", priority: contacts.length + 2 })
    setIsAddDialogOpen(false)
  }

  const handleEditContact = (contact: EmergencyContact) => {
    setEditingContact(contact)
    setNewContact({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      relationship: contact.relationship,
      priority: contact.priority,
    })
  }

  const handleUpdateContact = () => {
    if (!editingContact) return

    setContacts(contacts.map((c) => (c.id === editingContact.id ? { ...c, ...newContact } : c)))
    setEditingContact(null)
    setNewContact({ name: "", phone: "", email: "", relationship: "", priority: contacts.length + 1 })
  }

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id))
  }

  const handleToggleActive = (id: string) => {
    setContacts(contacts.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)))
  }

  const handleTestContact = (contact: EmergencyContact) => {
    // Simulate sending test message
    setContacts(contacts.map((c) => (c.id === contact.id ? { ...c, lastContacted: new Date() } : c)))
    alert(`Test message sent to ${contact.name}`)
  }

  const activeContacts = contacts.filter((c) => c.isActive).length
  const totalContacts = contacts.length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Emergency Contacts</h1>
            <p className="text-muted-foreground">Manage your emergency contact list and notification preferences</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Emergency Contact</DialogTitle>
                <DialogDescription>
                  Add a new person to your emergency contact list. They will be notified in case of an accident.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Select
                      value={newContact.relationship}
                      onValueChange={(value) => setNewContact({ ...newContact, relationship: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Spouse">Spouse</SelectItem>
                        <SelectItem value="Parent">Parent</SelectItem>
                        <SelectItem value="Child">Child</SelectItem>
                        <SelectItem value="Sibling">Sibling</SelectItem>
                        <SelectItem value="Friend">Friend</SelectItem>
                        <SelectItem value="Doctor">Doctor</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select
                    value={newContact.priority.toString()}
                    onValueChange={(value) => setNewContact({ ...newContact, priority: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Highest Priority</SelectItem>
                      <SelectItem value="2">2 - High Priority</SelectItem>
                      <SelectItem value="3">3 - Medium Priority</SelectItem>
                      <SelectItem value="4">4 - Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddContact} disabled={!newContact.name || !newContact.phone}>
                  Add Contact
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalContacts}</div>
              <p className="text-xs text-muted-foreground">Emergency contacts configured</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Contacts</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeContacts}</div>
              <p className="text-xs text-muted-foreground">Will receive emergency alerts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">&lt; 30s</div>
              <p className="text-xs text-muted-foreground">Average alert delivery time</p>
            </CardContent>
          </Card>
        </div>

        {/* Contacts List */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
            <CardDescription>
              Manage your emergency contact list. Contacts are notified in priority order during emergencies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contacts
                .sort((a, b) => a.priority - b.priority)
                .map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                        <span className="text-sm font-semibold text-primary">{contact.priority}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{contact.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {contact.relationship}
                          </Badge>
                          <Badge variant={contact.isActive ? "default" : "secondary"} className="text-xs">
                            {contact.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {contact.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {contact.email}
                          </div>
                        </div>
                        {contact.lastContacted && (
                          <p className="text-xs text-muted-foreground">
                            Last contacted: {contact.lastContacted.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTestContact(contact)}
                        className="bg-transparent"
                      >
                        Test
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleActive(contact.id)}
                        className="bg-transparent"
                      >
                        {contact.isActive ? "Disable" : "Enable"}
                      </Button>

                      <Dialog
                        open={editingContact?.id === contact.id}
                        onOpenChange={(open) => !open && setEditingContact(null)}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditContact(contact)}
                            className="bg-transparent"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Emergency Contact</DialogTitle>
                            <DialogDescription>Update the contact information and preferences.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Full Name</Label>
                                <Input
                                  id="edit-name"
                                  value={newContact.name}
                                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-relationship">Relationship</Label>
                                <Select
                                  value={newContact.relationship}
                                  onValueChange={(value) => setNewContact({ ...newContact, relationship: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Spouse">Spouse</SelectItem>
                                    <SelectItem value="Parent">Parent</SelectItem>
                                    <SelectItem value="Child">Child</SelectItem>
                                    <SelectItem value="Sibling">Sibling</SelectItem>
                                    <SelectItem value="Friend">Friend</SelectItem>
                                    <SelectItem value="Doctor">Doctor</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-phone">Phone Number</Label>
                              <Input
                                id="edit-phone"
                                type="tel"
                                value={newContact.phone}
                                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-email">Email Address</Label>
                              <Input
                                id="edit-email"
                                type="email"
                                value={newContact.email}
                                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-priority">Priority Level</Label>
                              <Select
                                value={newContact.priority.toString()}
                                onValueChange={(value) =>
                                  setNewContact({ ...newContact, priority: Number.parseInt(value) })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 - Highest Priority</SelectItem>
                                  <SelectItem value="2">2 - High Priority</SelectItem>
                                  <SelectItem value="3">3 - Medium Priority</SelectItem>
                                  <SelectItem value="4">4 - Low Priority</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setEditingContact(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateContact}>Update Contact</Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Emergency Contact</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {contact.name} from your emergency contacts? This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteContact(contact.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete Contact
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}

              {contacts.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Emergency Contacts</h3>
                  <p className="text-muted-foreground mb-4">
                    Add emergency contacts to receive notifications in case of an accident.
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Contact
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
