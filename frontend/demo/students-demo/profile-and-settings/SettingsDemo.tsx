"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  User,
  Lock,
  Bell,
  Globe,
  Smartphone,
  Mail,
  Shield,
  Settings,
  Camera,
  Edit,
  Save,
  X,
  Check,
  Trash2,
  Link,
  LogOut,
  Download,
  Upload,
  Eye,
  EyeOff,
  Key,
} from "lucide-react"

export default function SettingsDemo() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    studentId: "STU2024001",
    program: "Computer Science",
    year: "3rd Year",
    gpa: "3.85",
    advisor: "Dr. Sarah Johnson",
    emergencyContact: "Jane Doe - (555) 987-6543",
    address: "123 University Ave, College Town, ST 12345",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    assignmentReminders: true,
    gradeUpdates: true,
    courseAnnouncements: true,
    discussionReplies: false,
    systemUpdates: true,
    weeklyDigest: true,
    eventReminders: true,
  })

  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    colorBlindSupport: false,
    voiceNavigation: false,
  })

  const linkedAccounts = [
    {
      id: 1,
      provider: "Google",
      email: "john.doe@gmail.com",
      connected: true,
      lastSync: "2 hours ago",
      icon: "🔗",
    },
    {
      id: 2,
      provider: "Microsoft",
      email: "john.doe@outlook.com",
      connected: true,
      lastSync: "1 day ago",
      icon: "🔗",
    },
    {
      id: 3,
      provider: "Apple iCloud",
      email: "john.doe@icloud.com",
      connected: false,
      lastSync: "Never",
      icon: "🔗",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-custom-gradient backdrop-blur-sm rounded-xl shadow-lg mb-4 sm:mb-6 p-4 sm:p-6 border border-purple-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Profile & Settings
              </h1>
              <p className="text-sm sm:text-base text-purple-100">Manage your personal information and preferences</p>
            </div>
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
              <Button variant="outline" size="sm" className="bg-white/50 border-purple-200 hover:bg-purple-50">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <Settings className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-2 border border-purple-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                {[
                  { id: "profile", label: "Profile", icon: User },
                  { id: "security", label: "Security", icon: Lock },
                  { id: "notifications", label: "Notifications", icon: Bell },
                  { id: "preferences", label: "Preferences", icon: Globe },
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className={`min-h-[48px] flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                        : "hover:bg-purple-50 text-gray-700"
                    }`}
                  >
                    <tab.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium truncate">{tab.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-4 sm:space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <CardTitle className="text-xl sm:text-2xl text-gray-800">Personal Information</CardTitle>
                      <Button
                        variant={isEditing ? "outline" : "default"}
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className={
                          isEditing
                            ? "border-purple-200 hover:bg-purple-50"
                            : "bg-gradient-to-r from-purple-600 to-indigo-600"
                        }
                      >
                        {isEditing ? (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Profile Picture Section */}
                      <div className="flex flex-col items-center gap-4 lg:w-48">
                        <div className="relative">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-400 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                            JD
                          </div>
                          {isEditing && (
                            <Button
                              size="sm"
                              className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 p-0 shadow-lg"
                            >
                              <Camera className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-lg text-gray-800">
                            {profileData.firstName} {profileData.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">{profileData.studentId}</p>
                          <Badge className="mt-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200">
                            {profileData.program}
                          </Badge>
                        </div>
                      </div>

                      {/* Profile Form */}
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                              First Name
                            </Label>
                            <Input
                              id="firstName"
                              value={profileData.firstName}
                              onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                              disabled={!isEditing}
                              className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                              Last Name
                            </Label>
                            <Input
                              id="lastName"
                              value={profileData.lastName}
                              onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                              disabled={!isEditing}
                              className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                              disabled={!isEditing}
                              className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                              disabled={!isEditing}
                              className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="program" className="text-sm font-medium text-gray-700">
                              Program
                            </Label>
                            <Input
                              id="program"
                              value={profileData.program}
                              onChange={(e) => setProfileData({ ...profileData, program: e.target.value })}
                              disabled={!isEditing}
                              className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                            />
                          </div>
                          <div>
                            <Label htmlFor="year" className="text-sm font-medium text-gray-700">
                              Academic Year
                            </Label>
                            <Input
                              id="year"
                              value={profileData.year}
                              onChange={(e) => setProfileData({ ...profileData, year: e.target.value })}
                              disabled={!isEditing}
                              className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                            />
                          </div>
                          <div>
                            <Label htmlFor="gpa" className="text-sm font-medium text-gray-700">
                              Current GPA
                            </Label>
                            <Input
                              id="gpa"
                              value={profileData.gpa}
                              disabled
                              className="mt-1 bg-gray-50 border-gray-200"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="advisor" className="text-sm font-medium text-gray-700">
                            Academic Advisor
                          </Label>
                          <Input
                            id="advisor"
                            value={profileData.advisor}
                            disabled
                            className="mt-1 bg-gray-50 border-gray-200"
                          />
                        </div>

                        <div>
                          <Label htmlFor="emergency" className="text-sm font-medium text-gray-700">
                            Emergency Contact
                          </Label>
                          <Input
                            id="emergency"
                            value={profileData.emergencyContact}
                            onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                            disabled={!isEditing}
                            className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                          />
                        </div>

                        <div>
                          <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                            Address
                          </Label>
                          <Input
                            id="address"
                            value={profileData.address}
                            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                            disabled={!isEditing}
                            className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                          />
                        </div>

                        {isEditing && (
                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex-1 sm:flex-none">
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setIsEditing(false)}
                              className="border-purple-200 hover:bg-purple-50 flex-1 sm:flex-none"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Linked Accounts</CardTitle>
                    <p className="text-sm text-gray-600">Connect your external accounts for seamless integration</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {linkedAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-purple-100 rounded-lg bg-gradient-to-r from-purple-50/50 to-indigo-50/50"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center border border-purple-200">
                              <Link className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-800">{account.provider}</h4>
                              <p className="text-sm text-gray-600 truncate">{account.email}</p>
                              <p className="text-xs text-gray-500">Last sync: {account.lastSync}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={account.connected ? "default" : "secondary"}
                              className={account.connected ? "bg-green-100 text-green-700 border-green-200" : ""}
                            >
                              {account.connected ? "Connected" : "Disconnected"}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              className={`${
                                account.connected
                                  ? "text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                                  : "text-green-600 hover:text-green-700 border-green-200 hover:bg-green-50"
                              }`}
                            >
                              {account.connected ? "Disconnect" : "Connect"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-4 sm:space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Password & Security</CardTitle>
                    <p className="text-sm text-gray-600">Manage your account security settings</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-green-800">Strong Password Active</h4>
                          <p className="text-sm text-green-700">Your password meets all security requirements</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Key className="h-5 w-5 text-purple-600" />
                            <div>
                              <h4 className="font-medium text-gray-800">Change Password</h4>
                              <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-200 hover:bg-purple-50 bg-transparent"
                          >
                            Update
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-purple-600" />
                            <div>
                              <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                              <p className="text-sm text-gray-600">Add an extra layer of security</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                              Disabled
                            </Badge>
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600">
                              Enable
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Smartphone className="h-5 w-5 text-purple-600" />
                            <div>
                              <h4 className="font-medium text-gray-800">Trusted Devices</h4>
                              <p className="text-sm text-gray-600">3 devices currently trusted</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-200 hover:bg-purple-50 bg-transparent"
                          >
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Password Reset Section */}
                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Password Reset</CardTitle>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                        Current Password
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className="pr-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex-1 sm:flex-none">
                        <Lock className="h-4 w-4 mr-2" />
                        Update Password
                      </Button>
                      <Button
                        variant="outline"
                        className="border-purple-200 hover:bg-purple-50 flex-1 sm:flex-none bg-transparent"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Notification Preferences</CardTitle>
                  <p className="text-sm text-gray-600">Choose how you want to receive notifications</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Communication Methods */}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">Communication Methods</h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "emailNotifications",
                          icon: Mail,
                          label: "Email Notifications",
                          desc: "Receive notifications via email",
                        },
                        {
                          key: "pushNotifications",
                          icon: Bell,
                          label: "Push Notifications",
                          desc: "Browser and mobile push notifications",
                        },
                        {
                          key: "smsNotifications",
                          icon: Smartphone,
                          label: "SMS Notifications",
                          desc: "Text message notifications for urgent items",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 border border-purple-100 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 text-purple-600 flex-shrink-0" />
                            <div>
                              <Label className="font-medium text-gray-800">{item.label}</Label>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                          </div>
                          <Switch
                            checked={notifications[item.key as keyof typeof notifications]}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Notifications */}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">Content Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: "assignmentReminders", label: "Assignment Reminders", desc: "Deadlines and due dates" },
                        { key: "gradeUpdates", label: "Grade Updates", desc: "When grades are posted or updated" },
                        {
                          key: "courseAnnouncements",
                          label: "Course Announcements",
                          desc: "Important course updates and news",
                        },
                        { key: "discussionReplies", label: "Discussion Replies", desc: "Replies to your forum posts" },
                        {
                          key: "systemUpdates",
                          label: "System Updates",
                          desc: "Platform maintenance and feature updates",
                        },
                        { key: "weeklyDigest", label: "Weekly Digest", desc: "Summary of weekly activities" },
                        { key: "eventReminders", label: "Event Reminders", desc: "Upcoming events and deadlines" },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 border border-purple-100 rounded-lg"
                        >
                          <div>
                            <Label className="font-medium text-gray-800">{item.label}</Label>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                          <Switch
                            checked={notifications[item.key as keyof typeof notifications]}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="space-y-4 sm:space-y-6">
                {/* Language & Region */}
                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Language & Accessibility Settings</CardTitle>
                    <p className="text-sm text-gray-600">Customize your experience and accessibility options</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-medium text-gray-700">Language</Label>
                        <select className="mt-1 w-full px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400">
                          <option>English (US)</option>
                          <option>Spanish (ES)</option>
                          <option>French (FR)</option>
                          <option>German (DE)</option>
                          <option>Chinese (ZH)</option>
                        </select>
                      </div>
                      <div>
                        <Label className="font-medium text-gray-700">Time Zone</Label>
                        <select className="mt-1 w-full px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400">
                          <option>Eastern Time (ET)</option>
                          <option>Central Time (CT)</option>
                          <option>Mountain Time (MT)</option>
                          <option>Pacific Time (PT)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-medium text-gray-700">Date Format</Label>
                        <select className="mt-1 w-full px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400">
                          <option>MM/DD/YYYY</option>
                          <option>DD/MM/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                      <div>
                        <Label className="font-medium text-gray-700">Theme</Label>
                        <select className="mt-1 w-full px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400">
                          <option>Light Mode</option>
                          <option>Dark Mode</option>
                          <option>Auto (System)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-4">Accessibility Options</h4>
                      <div className="space-y-4">
                        {[
                          {
                            key: "highContrast",
                            label: "High Contrast Mode",
                            desc: "Increase contrast for better visibility",
                          },
                          {
                            key: "largeText",
                            label: "Large Text",
                            desc: "Increase font size throughout the application",
                          },
                          {
                            key: "reducedMotion",
                            label: "Reduced Motion",
                            desc: "Minimize animations and transitions",
                          },
                          {
                            key: "screenReader",
                            label: "Screen Reader Support",
                            desc: "Optimize interface for screen readers",
                          },
                          {
                            key: "keyboardNavigation",
                            label: "Enhanced Keyboard Navigation",
                            desc: "Improved keyboard shortcuts and focus",
                          },
                          {
                            key: "colorBlindSupport",
                            label: "Color Blind Support",
                            desc: "Alternative color schemes for accessibility",
                          },
                          {
                            key: "voiceNavigation",
                            label: "Voice Navigation",
                            desc: "Enable voice commands and navigation",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 border border-purple-100 rounded-lg"
                          >
                            <div>
                              <Label className="font-medium text-gray-800">{item.label}</Label>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                            <Switch
                              checked={accessibility[item.key as keyof typeof accessibility]}
                              onCheckedChange={(checked) => setAccessibility({ ...accessibility, [item.key]: checked })}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Account Status */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Account Active</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Email Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">2FA Disabled</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Profile Complete</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-3" />
                    Download Data
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    <Upload className="h-4 w-4 mr-3" />
                    Import Settings
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    <Shield className="h-4 w-4 mr-3" />
                    Privacy Settings
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 mr-3" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Support & Help</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Need assistance with your account or settings?</p>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-purple-200 hover:bg-purple-50 bg-transparent"
                    >
                      Contact Support
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-purple-200 hover:bg-purple-50 bg-transparent"
                    >
                      Help Center
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-purple-200 hover:bg-purple-50 bg-transparent"
                    >
                      Privacy Policy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Current Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="text-gray-600">Last login:</p>
                    <p className="font-medium text-gray-800">Today at 2:30 PM</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">Device:</p>
                    <p className="font-medium text-gray-800">MacBook Pro - Chrome</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">Location:</p>
                    <p className="font-medium text-gray-800">New York, NY</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 bg-transparent"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
