'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { initials } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'

export default function ProfilePage() {
  const { currentUser, updateProfile, changePassword } = useStore()

  const [name, setName] = useState(currentUser?.name ?? '')
  const [email, setEmail] = useState(currentUser?.email ?? '')
  const [phone, setPhone] = useState(currentUser?.phone ?? '')
  const [address, setAddress] = useState(currentUser?.address ?? '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  if (!currentUser) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-bold">Please sign in</h1>
        <p className="mt-3 text-muted-foreground">Sign in to view and update your profile.</p>
      </section>
    )
  }

  function saveProfile() {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error('Name, email and phone are required.')
      return
    }

    updateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
    })

    toast.success('Profile updated successfully.')
  }

  function savePassword() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields.')
      return
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.')
      return
    }

    const result = changePassword(currentPassword, newPassword)

    if (!result.ok) {
      toast.error(result.error)
      return
    }

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    toast.success('Password changed successfully.')
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">MY PROFILE</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Account settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your personal information and account password.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Card className="h-fit">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Avatar className="size-20">
              <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
                {initials(currentUser.name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 font-semibold">{currentUser.name}</h2>
            <p className="mt-1 break-all text-sm text-muted-foreground">{currentUser.email}</p>
            <p className="mt-3 text-xs capitalize text-muted-foreground">
              {currentUser.role} account
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal information</CardTitle>
              <CardDescription>Update the information used for your bookings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>

              <Button onClick={saveProfile}>Save changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change password</CardTitle>
              <CardDescription>Use your current password to set a new password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm new password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button variant="outline" onClick={savePassword}>
                Change password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
