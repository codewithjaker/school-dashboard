'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, PlusCircle, BadgeIcon, Save } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Mock data for roles
const roles = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full access to all modules',
    status: 'Active',
    priority: 'Critical',
  },
  {
    id: 2,
    name: 'Admin',
    description: 'Administrative access with some restrictions',
    status: 'Active',
    priority: 'High',
  },
  {
    id: 3,
    name: 'Teacher',
    description: 'Academic and student management',
    status: 'Active',
    priority: 'Medium',
  },
  {
    id: 4,
    name: 'Accountant',
    description: 'Financial and fee management',
    status: 'Active',
    priority: 'Medium',
  },
  {
    id: 5,
    name: 'Librarian',
    description: 'Library and books management',
    status: 'Active',
    priority: 'Low',
  },
  {
    id: 6,
    name: 'Student',
    description: 'Self-service access',
    status: 'Active',
    priority: 'Low',
  },
  {
    id: 7,
    name: 'Parent',
    description: 'Ward progress monitoring',
    status: 'Active',
    priority: 'Low',
  },
  {
    id: 8,
    name: 'Clerk',
    description: 'Data entry and general assistance',
    status: 'Active',
    priority: 'Medium',
  },
  {
    id: 9,
    name: 'Receptionist',
    description: 'Front office management',
    status: 'Active',
    priority: 'Low',
  },
  {
    id: 10,
    name: 'Guest',
    description: 'Limited trial access',
    status: 'Inactive',
    priority: 'Low',
  },
]

// Mock data for permissions matrix
const modules = [
  { name: 'Students' },
  { name: 'Teachers' },
  { name: 'Academics' },
  { name: 'Finance' },
  { name: 'Library' },
  { name: 'Hostel' },
  { name: 'Transport' },
  { name: 'Settings' },
]

export default function RolePermissionsPage() {
  const [selectedRole, setSelectedRole] = useState(roles[0])
  const [roleName, setRoleName] = useState(selectedRole.name)
  const [priority, setPriority] = useState(selectedRole.priority)
  const [status, setStatus] = useState(selectedRole.status)
  const [description, setDescription] = useState(selectedRole.description)

  // Permissions state (simplified - all checked for demo)
  const [permissions, setPermissions] = useState(
    modules.map((module) => ({
      module: module.name,
      view: true,
      create: true,
      edit: true,
      delete: true,
    }))
  )

  const handleRoleSelect = (role: (typeof roles)[0]) => {
    setSelectedRole(role)
    setRoleName(role.name)
    setPriority(role.priority)
    setStatus(role.status)
    setDescription(role.description)
  }

  const handleSave = () => {
    console.log('Save changes', {
      roleName,
      priority,
      status,
      description,
      permissions,
    })
  }

  const togglePermission = (
    moduleIndex: number,
    field: 'view' | 'create' | 'edit' | 'delete'
  ) => {
    setPermissions((prev) =>
      prev.map((item, idx) =>
        idx === moduleIndex
          ? { ...item, [field]: !item[field] }
          : item
      )
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/dashboard/main" className="flex items-center hover:text-foreground">
          <Home className="h-4 w-4" />
        </Link>
        <span>/</span>
        <span>Settings</span>
        <span>/</span>
        <span className="text-foreground font-medium">Role & Permissions</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left column - Roles list */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Roles</CardTitle>
              <Button variant="ghost" size="icon" title="Add New Role">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-3 cursor-pointer transition-colors hover:bg-muted ${
                      selectedRole.id === role.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => handleRoleSelect(role)}
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium">{role.name}</h5>
                      <Badge
                        variant={role.status === 'Active' ? 'success' : 'destructive'}
                      >
                        {role.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Role form and permissions */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                Role <span className="font-normal">Information</span>
              </CardTitle>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roleName">Role Name</Label>
                  <div className="relative">
                    <Input
                      id="roleName"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                      className="pr-10"
                    />
                    <BadgeIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Permissions <span className="font-normal">Matrix</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-4">Module Name</TableHead>
                      <TableHead className="text-center">View</TableHead>
                      <TableHead className="text-center">Create</TableHead>
                      <TableHead className="text-center">Edit</TableHead>
                      <TableHead className="text-center">Delete</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissions.map((perm, index) => (
                      <TableRow key={perm.module}>
                        <TableCell className="pl-4 font-medium">
                          {perm.module}
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={perm.view}
                            onCheckedChange={() => togglePermission(index, 'view')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={perm.create}
                            onCheckedChange={() => togglePermission(index, 'create')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={perm.edit}
                            onCheckedChange={() => togglePermission(index, 'edit')}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={perm.delete}
                            onCheckedChange={() => togglePermission(index, 'delete')}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}